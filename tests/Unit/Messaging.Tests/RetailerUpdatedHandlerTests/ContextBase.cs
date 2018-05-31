namespace Linn.DemStock.Messaging.Tests.RetailerUpdatedHandlerTests
{
    using Linn.Common.Logging;
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Messaging.Handlers;

    using NSubstitute;

    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected RetailerUpdatedHandler Sut { get; private set; }

        protected ITransactionManager TransactionManager { get; private set; }

        protected ILog Log { get; private set; }

        protected IRetailerDemListRepository RetailerDemListRepository { get; private set; }

        [SetUp]
        public void EstablishContext()
        {
            this.TransactionManager = Substitute.For<ITransactionManager>();
            this.Log = Substitute.For<ILog>();
            this.RetailerDemListRepository = Substitute.For<IRetailerDemListRepository>();

            this.Sut = new RetailerUpdatedHandler(
                this.TransactionManager,
                this.Log,
                this.RetailerDemListRepository);
        }
    }
}