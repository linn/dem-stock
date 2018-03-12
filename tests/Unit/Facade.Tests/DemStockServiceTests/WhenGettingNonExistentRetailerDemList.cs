namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingNonExistentRetailerDemList : ContextBase
    {
        private int retailerId;

        private IResult<RetailerDemList> result;

        [SetUp]
        public void SetUp()
        {
            this.retailerId = 200;
            this.DemListRepository.GetByRetailerId(this.retailerId).Returns((RetailerDemList)null);
            this.result = this.Sut.GetRetailerDemList(this.retailerId);
        }

        [Test]
        public void ShouldTryToGetRetailerList()
        {
            this.DemListRepository.Received().GetByRetailerId(200);
        }

        [Test]
        public void ShouldReturnNotFound()
        {
            this.result.Should().BeOfType<NotFoundResult<RetailerDemList>>();
        }
    }
}
