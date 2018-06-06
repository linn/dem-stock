namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Facade.Services;
    using Linn.DemStock.Proxy;

    using NSubstitute;

    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected DemStockService Sut { get; private set; }

        protected IRetailerDemListRepository DemListRepository { get; private set; }

        protected ITransactionManager TransactionManager { get; private set; }

        protected IRetailerProxy RetailerProxy { get; private set; }

        protected ISalesRegionProxy SalesRegionProxy { get; private set; }

        [SetUp]
        public void SetUpContext()
        {
            this.DemListRepository = Substitute.For<IRetailerDemListRepository>();
            this.TransactionManager = Substitute.For<ITransactionManager>();
            this.RetailerProxy = Substitute.For<IRetailerProxy>();
            this.SalesRegionProxy = Substitute.For<ISalesRegionProxy>();
            this.Sut = new DemStockService(
                this.TransactionManager,
                this.DemListRepository,
                this.RetailerProxy,
                this.SalesRegionProxy);
        }
    }
}
