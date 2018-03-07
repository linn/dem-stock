namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Facade.Services;

    using NSubstitute;

    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected DemStockService Sut { get; private set; }

        protected IRetailerDemListRepository DemListRepository { get; private set; }

        [SetUp]
        public void SetUpContext()
        {
            this.DemListRepository = Substitute.For<IRetailerDemListRepository>();
            this.Sut = new DemStockService(this.DemListRepository);
        }
    }
}
