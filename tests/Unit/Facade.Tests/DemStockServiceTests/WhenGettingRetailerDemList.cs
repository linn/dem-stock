namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using System.Collections.Generic;
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRetailerDemList : ContextBase
    {
        private string retailerUri;

        private IResult<RetailerDemList> result;

        private RetailerDemList retailerDemList;

        [SetUp]
        public void SetUp()
        {
            this.retailerUri = "/retailers/200";
            this.retailerDemList = new RetailerDemList(this.retailerUri) { LastReviewedOn = 7.March(2018), Id = 20 };
            this.retailerDemList.SetRootProductQuantity("/products/123", "/employees/555", 3);
            this.DemListRepository.GetByRetailerUri(this.retailerUri).Returns(this.retailerDemList);
            this.result = this.Sut.GetRetailer(this.retailerUri);
        }

        [Test]
        public void ShouldGetRetailerList()
        {
            this.DemListRepository.Received().GetByRetailerUri("/retailers/200");
        }

        [Test]
        public void ShouldReturnRetailer()
        {
            this.result.Should().BeOfType<SuccessResult<RetailerDemList>>();
            var dataResult = ((SuccessResult<RetailerDemList>)this.result).Data;
            dataResult.RetailerUri.Should().Be(this.retailerDemList.RetailerUri);
            dataResult.Id.Should().Be(this.retailerDemList.Id);
            dataResult.LastReviewedOn.Should().Be(this.retailerDemList.LastReviewedOn);
            dataResult.RootProducts.Should().HaveCount(1);
            dataResult.RootProducts.First().RootProductUri.Should()
                .Be(this.retailerDemList.RootProducts.First().RootProductUri);
            dataResult.RootProducts.First().Quantity.Should().Be(this.retailerDemList.RootProducts.First().Quantity);
        }
    }
}
