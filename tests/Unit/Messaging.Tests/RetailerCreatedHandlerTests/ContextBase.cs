namespace Linn.DemStock.Messaging.Tests.RetailerCreatedHandlerTests
{
    using Linn.Common.Logging;
    using Linn.Common.Messaging.RabbitMQ;
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Messaging.Handlers;

    using NSubstitute;

    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected RetailerCreatedHandler Sut { get; private set; }

        protected ITransactionManager TransactionManager { get; private set; }

        protected IRabbitTerminator RabbitTerminator { get; private set; }

        protected ILog Log { get; private set; }

        protected IRetailerDemListRepository RetailerDemListRepository { get; private set; }

        [SetUp]
        public void EstablishContext()
        {
            this.TransactionManager = Substitute.For<ITransactionManager>();
            this.RabbitTerminator = Substitute.For<IRabbitTerminator>();
            this.Log = Substitute.For<ILog>();
            this.RetailerDemListRepository = Substitute.For<IRetailerDemListRepository>();

            this.Sut = new RetailerCreatedHandler(
                this.TransactionManager,
                this.Log,
                this.RabbitTerminator,
                this.RetailerDemListRepository);
        }
    }
}