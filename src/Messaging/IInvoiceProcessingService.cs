namespace Linn.DemStock.Messaging
{
    using Linn.DemStock.Resources.External;

    public interface IInvoiceProcessingService
    {
        void CaptureDemRootProductsFromInvoice(InvoiceResource invoiceResource);
    }
}
