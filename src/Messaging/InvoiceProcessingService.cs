namespace Linn.DemStock.Messaging
{
    using System;
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

        public void AuditDemRootProductsFromInvoice(InvoiceResource invoiceResource)
        {
            this.log.Info($"Auditing invoice {invoiceResource.id} for dem stock");
            var demLines = invoiceResource.lines.Where(a => a.forDemonstration).ToList();
            if (!demLines.Any())
            {
                return;
            }

            DateTime invDate;
            if (!DateTime.TryParse(invoiceResource.raised, out invDate))
            {
                return;
            }

            this.ProcessDemRootProducts(invoiceResource.id, demLines, invDate, true);
        }

        private void ProcessDemRootProducts(
            int invoiceId,
            IEnumerable<InvoiceLineResource> demLines,
            DateTime? invoiceDateTime = null,
            bool audit = false)
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

            // if audit mode and retailer dem list has been reviewed since invoice then leave alone
            if (audit && retailerDemList.LastReviewedOn > invoiceDateTime)
            {
                return;
            }

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

                    // if audit and already has the product then don't increment quantity
                    if (audit && retailerDemList.HasOnList(rootProductUri))
                    {
                        continue;
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
                    audit ? "/employees/7004" : "/employees/100", // so i can pull out what it has done
                    rootProduct.Quantity);
            }

            if (foundDemProducts)
            {
                this.transactionManager.Commit();
            }
        }
    }
}