namespace Linn.DemStock.Messaging
{
    using System.Collections.Generic;
    using System.Linq;

    using Linn.Common.Logging;
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Proxy;
    using Linn.DemStock.Resources.External;

    public class InvoiceProcessingService : IInvoiceProcessingService
    {
        private readonly ILog log;

        private readonly ITransactionManager transactionManager;

        private readonly IRetailerDemListRepository retailerDemListRepository;

        private readonly IRetailerProxy retailerProxy;

        private readonly IProductsProxy productsProxy;

        public InvoiceProcessingService(
            ILog log,
            ITransactionManager transactionManager,
            IRetailerDemListRepository retailerDemListRepository,
            IRetailerProxy retailerProxy,
            IProductsProxy productsProxy)
        {
            this.log = log;
            this.transactionManager = transactionManager;
            this.retailerDemListRepository = retailerDemListRepository;
            this.retailerProxy = retailerProxy;
            this.productsProxy = productsProxy;
        }

        public void CaptureDemRootProductsFromInvoice(InvoiceResource invoiceResource)
        {
            this.log.Info($"Checking invoice {invoiceResource.id} for dem stock");
            var demLines = invoiceResource.lines.Where(a => a.forDemonstration).ToList();
            if (!demLines.Any())
            {
                return;
            }

            this.ProcessDemRootProducts(invoiceResource.id, demLines);
        }

        private void ProcessDemRootProducts(int invoiceId, IEnumerable<InvoiceLineResource> demLines)
        {
            var foundDemProducts = false;

            if (!demLines.Any())
            {
                return;
            }

            var salesCustomerHref = demLines.First().links.First(l => l.Rel == "sales-customer")?.Href;
            if (string.IsNullOrEmpty(salesCustomerHref))
            {
                return;
            }

            var retailerId = this.retailerProxy.GetRetailerId(salesCustomerHref);
            if (!retailerId.HasValue)
            {
                return;
            }

            var retailerDemList = this.retailerDemListRepository.GetByRetailerId(retailerId.Value);

            foreach (var invoiceResourceLine in demLines)
            {
                RootProduct rootProduct = null;

                var partUri = invoiceResourceLine.links.FirstOrDefault(l => l.Rel == "productUri")?.Href;
                if (partUri != null)
                {
                    var rootProductUri = this.productsProxy.GetRootProductUri(partUri);
                    if (rootProductUri != null)
                    {
                        rootProduct = new RootProduct(rootProductUri, invoiceResourceLine.quantity);
                    }
                }

                if (rootProduct == null)
                {
                    continue;
                }


                this.log.Info($"Adding root product {rootProduct.RootProductUri} from invoice {invoiceId} line {invoiceResourceLine.number} to dem list {retailerDemList.Id} for retailer {retailerId}.");
                foundDemProducts = true;

                retailerDemList.IncrementRootProductQuantity(
                    rootProduct.RootProductUri,
                    "/employees/100",
                    rootProduct.Quantity);
            }

            if (foundDemProducts)
            {
                this.transactionManager.Commit();
            }
        }
    }
}