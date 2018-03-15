namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRetailerDemList : ContextBase
    {
        private int retailerId;

        private IResult<RetailerDemList> result;

        private RetailerDemList retailerDemList;

        [SetUp]
        public void SetUp()
        {
            this.retailerId = 200;
            this.retailerDemList = new RetailerDemList(this.retailerId) { Id = 20 };
            this.retailerDemList.SetLastReviewedDate(7.March(2018), "/employees/555");
            this.retailerDemList.SetRootProductQuantity("/products/123", "/employees/555", 3);
            this.DemListRepository.GetByRetailerId(this.retailerId).Returns(this.retailerDemList);
            this.result = this.Sut.GetRetailerDemList(this.retailerId);
        }

        [Test]
        public void ShouldGetRetailerList()
        {
            this.DemListRepository.Received().GetByRetailerId(200);
        }

        [Test]
        public void ShouldReturnRetailer()
        {
            this.result.Should().BeOfType<SuccessResult<RetailerDemList>>();
            var dataResult = ((SuccessResult<RetailerDemList>)this.result).Data;
            dataResult.RetailerId.Should().Be(this.retailerDemList.RetailerId);
            dataResult.Id.Should().Be(this.retailerDemList.Id);
            dataResult.LastReviewedOn.Should().Be(this.retailerDemList.LastReviewedOn);
            dataResult.RootProducts.Should().HaveCount(1);
            dataResult.RootProducts.First().RootProductUri.Should()
                .Be(this.retailerDemList.RootProducts.First().RootProductUri);
            dataResult.RootProducts.First().Quantity.Should().Be(this.retailerDemList.RootProducts.First().Quantity);
        }
    }
}
