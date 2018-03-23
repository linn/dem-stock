namespace Linn.DemStock.Domain.Tests.RetailerDemListCreatorTests
{
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain.Repositories;

    using NSubstitute;

    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected RetailerDemListCreator Sut { get; private set; }

        protected ITransactionManager TransactionManager { get; private set; }

        protected IRetailerDemListRepository DemListRepository { get; private set; }

        [SetUp]
        public void SetUpContext()
        {
            this.TransactionManager = Substitute.For<ITransactionManager>();
            this.DemListRepository = Substitute.For<IRetailerDemListRepository>();
            this.Sut = new RetailerDemListCreator(this.TransactionManager, this.DemListRepository);
        }
    }
}
