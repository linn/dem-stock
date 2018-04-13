namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using System.Collections.Generic;
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.RetailerDemListActivities;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRetailerDemListActivities : ContextBase
    {
        private int retailerId;

        private IResult<IEnumerable<RetailerDemListActivity>> result;

        private RetailerDemList retailerDemList;

        [SetUp]
        public void SetUp()
        {
            this.retailerId = 200;
            this.retailerDemList = new RetailerDemList(this.retailerId) { Id = 20 };
            this.retailerDemList.SetLastReviewedDate(7.March(2018), "/employees/555");
            this.retailerDemList.SetRootProductQuantity("/products/123", "/employees/555", 3);
            this.DemListRepository.GetByRetailerId(this.retailerId).Returns(this.retailerDemList);
            this.result = this.Sut.GetRetailerDemListActivities(this.retailerId);
        }

        [Test]
        public void ShouldGetRetailerList()
        {
            this.DemListRepository.Received().GetByRetailerId(200);
        }

        [Test]
        public void ShouldReturnRetailer()
        {
            this.result.Should().BeOfType<SuccessResult<IEnumerable<RetailerDemListActivity>>>();
            var dataResult = ((SuccessResult<IEnumerable<RetailerDemListActivity>>)this.result).Data;
            // dataResult.Count.Should().Be(2);
        }
    }
}
