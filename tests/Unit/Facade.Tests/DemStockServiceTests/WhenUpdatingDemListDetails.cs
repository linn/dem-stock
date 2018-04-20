namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenUpdatingDemListDetails : ContextBase
    {
        private int retailerId;

        private IResult<RetailerDemList> result;

        private RetailerDemList retailerDemList;

        [SetUp]
        public void SetUp()
        {
            this.retailerId = 50;
            this.retailerDemList = new RetailerDemList(this.retailerId, "employee/200") { Id = 12 };
            this.DemListRepository.GetByRetailerId(this.retailerId).Returns(this.retailerDemList);
            this.result = this.Sut.UpdateRetailerDemListDetails(this.retailerId, 1.April(2018));
        }

        [Test]
        public void ShouldSetLastReviewedOn()
        {
            this.retailerDemList.LastReviewedOn.Should().BeCloseTo(1.April(2018));
        }

        [Test]
        public void ShouldGetRetailerDemList()
        {
            this.DemListRepository.Received().GetByRetailerId(this.retailerId);
        }

        [Test]
        public void ShouldCommitChanges()
        {
            this.TransactionManager.Received().Commit();
        }

        [Test]
        public void ShouldReturnRetailerDemList()
        {
            this.result.Should().BeOfType<SuccessResult<RetailerDemList>>();
            var dataResult = ((SuccessResult<RetailerDemList>)this.result).Data;
            dataResult.LastReviewedOn.Should().Be(1.April(2018));
            dataResult.RetailerId.Should().Be(this.retailerId);
        }
    }
}
