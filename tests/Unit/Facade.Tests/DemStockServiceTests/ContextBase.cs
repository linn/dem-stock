namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Facade.Services;

    using NSubstitute;

    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected DemStockService Sut { get; private set; }

        protected IRetailerDemListRepository DemListRepository { get; private set; }

        protected ITransactionManager TransactionManager { get; private set; }

        [SetUp]
        public void SetUpContext()
        {
            this.DemListRepository = Substitute.For<IRetailerDemListRepository>();
            this.TransactionManager = Substitute.For<ITransactionManager>();
            this.Sut = new DemStockService(this.TransactionManager, this.DemListRepository);
        }
    }
}
