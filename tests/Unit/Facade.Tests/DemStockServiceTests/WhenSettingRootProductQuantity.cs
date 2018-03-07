namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenSettingRootProductQuantity : ContextBase
    {
        private int retailerDemListId;

        private IResult<RootProduct> result;

        private RetailerDemList retailerDemList;

        [SetUp]
        public void SetUp()
        {
            this.retailerDemListId = 1;
            this.retailerDemList = new RetailerDemList("/retailers/50") { Id = this.retailerDemListId };
            this.DemListRepository.GetById(this.retailerDemListId).Returns(this.retailerDemList);
            this.result = this.Sut.SetRetailerListRootProduct(this.retailerDemListId, "/rp/50", 3);
        }

        [Test]
        public void ShouldSetRootProductQuantity()
        {
            this.retailerDemList.RootProducts.Should().HaveCount(1);
            this.retailerDemList.RootProducts.First().Quantity.Should().Be(3);
            this.retailerDemList.RootProducts.First().RootProductUri.Should().Be("/rp/50");
        }

        [Test]
        public void ShouldGetRetailerDemList()
        {
            this.DemListRepository.Received().GetById(this.retailerDemListId);
        }

        [Test]
        public void ShouldReturnRootProduct()
        {
            this.result.Should().BeOfType<SuccessResult<RootProduct>>();
            var dataResult = ((SuccessResult<RootProduct>)this.result).Data;
            dataResult.Quantity.Should().Be(3);
            dataResult.RootProductUri.Should().Be("/rp/50");
        }
    }
}
