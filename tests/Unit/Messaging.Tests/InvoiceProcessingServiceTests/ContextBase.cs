namespace Linn.DemStock.Messaging.Tests.InvoiceProcessingServiceTests
{
    using Linn.Common.Logging;
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Proxy;

    using NSubstitute;

    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected IInvoiceProcessingService Sut { get; private set; }

        protected ITransactionManager TransactionManager { get; private set; }

        protected ILog Log { get; private set; }

        protected IRetailerDemListRepository RetailerDemListRepository { get; private set; }

        protected IRetailerProxy RetailerProxy { get; private set; }

        protected IProductsProxy ProductsProxy { get; private set; }

        [SetUp]
        public void EstablishContext()
        {
            this.TransactionManager = Substitute.For<ITransactionManager>();
            this.Log = Substitute.For<ILog>();
            this.RetailerDemListRepository = Substitute.For<IRetailerDemListRepository>();
            this.RetailerProxy = Substitute.For<IRetailerProxy>();
            this.ProductsProxy = Substitute.For<IProductsProxy>();

            this.Sut = new InvoiceProcessingService(
                this.Log,
                this.TransactionManager,
                this.RetailerDemListRepository,
                this.RetailerProxy,
                this.ProductsProxy);
        }
    }
}