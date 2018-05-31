namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using System.Collections.Generic;
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRetailerDemListsByLastReviewed : ContextBase
    {
        private IResult<IEnumerable<RetailerDemList>> results;

        private RetailerDemList retailerDemList1;

        private RetailerDemList retailerDemList2;

        private RetailerDemList retailerDemList3;

        [SetUp]
        public void SetUp()
        {
            this.retailerDemList1 = new RetailerDemList(1, "/employee/200") { Id = 10 };
            this.retailerDemList2 = new RetailerDemList(2, "/employee/200") { Id = 20 };
            this.retailerDemList3 = new RetailerDemList(3, "/employee/200") { Id = 30 };
            this.retailerDemList1.SetLastReviewedDate(7.May(2018), "/employees/555");
            this.retailerDemList2.SetLastReviewedDate(7.April(2018), "/employees/555");
            this.DemListRepository.GetRetailerDemLists()
                .Returns(new[] { this.retailerDemList1, this.retailerDemList2, this.retailerDemList3 });
            this.results = this.Sut.GetRetailerDemListsByLastReviewed();
        }

        [Test]
        public void ShouldGetRetailerList()
        {
            this.DemListRepository.Received().GetRetailerDemLists();
        }

        [Test]
        public void ShouldReturnRetailers()
        {
            this.results.Should().BeOfType<SuccessResult<IEnumerable<RetailerDemList>>>();
            var dataResults = ((SuccessResult<IEnumerable<RetailerDemList>>)this.results).Data.ToArray();
            dataResults.Length.Should().Be(3);
            dataResults[0].RetailerId.Should().Be(3);
            dataResults[1].RetailerId.Should().Be(2);
            dataResults[2].RetailerId.Should().Be(1);
        }
    }
}
