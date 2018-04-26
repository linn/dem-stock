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

            var rootProducts = this.GetDemRootProducts(demLines);
            if (!rootProducts.Any())
            {
                return;
            }

            var retailerId = this.retailerProxy.GetRetailerId(invoiceResource.links.First(l => l.Rel == "sales-customer").Href);
            var retailerDemList = this.retailerDemListRepository.GetByRetailerId(retailerId);
            foreach (var rootProduct in rootProducts)
            {
                retailerDemList.IncrementRootProductQuantity(
                    rootProduct.RootProductUri,
                    "/employees/100",
                    rootProduct.Quantity);
            }

            this.transactionManager.Commit();
        }

        private IList<RootProduct> GetDemRootProducts(IEnumerable<InvoiceLineResource> demLines)
        {
            var rootProducts = new List<RootProduct>();
            foreach (var invoiceResourceLine in demLines)
            {
                var partUri = invoiceResourceLine.links.FirstOrDefault(l => l.Rel == "productUri")?.Href;
                if (partUri != null)
                {
                    var rootProductUri = this.productsProxy.GetRootProductUri(partUri);
                    if (rootProductUri != null)
                    {
                        rootProducts.Add(new RootProduct(rootProductUri, invoiceResourceLine.quantity));
                    }
                }
            }

            return rootProducts;
        }
    }
}