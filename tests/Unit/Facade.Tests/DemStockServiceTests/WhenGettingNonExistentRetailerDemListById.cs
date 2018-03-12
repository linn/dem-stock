namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingNonExistentRetailerDemListById : ContextBase
    {
        private int retailerDemListId;

        private IResult<RetailerDemList> result;

        [SetUp]
        public void SetUp()
        {
            this.retailerDemListId = 1;
            this.DemListRepository.GetById(this.retailerDemListId).Returns((RetailerDemList)null);
            this.result = this.Sut.GetRetailerDemListById(this.retailerDemListId);
        }

        [Test]
        public void ShouldTryToGetRetailerList()
        {
            this.DemListRepository.Received().GetById(this.retailerDemListId);
        }

        [Test]
        public void ShouldReturnNotFound()
        {
            this.result.Should().BeOfType<NotFoundResult<RetailerDemList>>();
        }
    }
}
