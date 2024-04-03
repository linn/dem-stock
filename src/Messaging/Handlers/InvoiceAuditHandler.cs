namespace Linn.DemStock.Messaging.Handlers
{
    using System.Text;

    using Linn.Common.Logging;
    using Linn.Common.Messaging.RabbitMQ.Unicast;
    using Linn.DemStock.Resources.External;

    using Newtonsoft.Json;

    public class InvoiceAuditHandler
    {
        private readonly ILog log;

        private readonly IInvoiceProcessingService invoiceProcessingService;

        public InvoiceAuditHandler(ILog log, IInvoiceProcessingService invoiceProcessingService)
        {
            this.log = log;
            this.invoiceProcessingService = invoiceProcessingService;
        }

        public bool Execute(IReceivedMessage message)
        {
            var content = Encoding.UTF8.GetString(message.Body);
            var resource = JsonConvert.DeserializeObject<InvoiceResource>(content);
            this.log.Info($"Auditing invoice {resource.id} for dem root products");

            this.invoiceProcessingService.AuditDemRootProductsFromInvoice(resource);

            return true;
        }
    }
}
