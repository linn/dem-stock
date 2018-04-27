namespace Linn.DemStock.Messaging.Tests.InvoiceCreatedHandlerTests
{
    using Linn.Common.Logging;
    using Linn.DemStock.Messaging.Handlers;

    using NSubstitute;

    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected InvoiceCreatedHandler Sut { get; private set; }

        protected ILog Log { get; private set; }

        protected IInvoiceProcessingService InvoiceProcessingService { get; private set; }

        [SetUp]
        public void EstablishContext()
        {
            this.Log = Substitute.For<ILog>();
            this.InvoiceProcessingService = Substitute.For<IInvoiceProcessingService>();

            this.Sut = new InvoiceCreatedHandler(
                this.Log,
                this.InvoiceProcessingService);
        }
    }
}