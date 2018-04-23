namespace Linn.DemStock.Domain.Tests.RetailerDemListCreatorTests
{
    using Linn.DemStock.Domain.Repositories;

    using NSubstitute;

    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected RetailerDemListCreator Sut { get; private set; }

        protected IRetailerDemListRepository DemListRepository { get; private set; }

        [SetUp]
        public void SetUpContext()
        {
            this.DemListRepository = Substitute.For<IRetailerDemListRepository>();
            this.Sut = new RetailerDemListCreator(this.DemListRepository);
        }
    }
}
