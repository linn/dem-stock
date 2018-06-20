namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using System.Collections.Generic;
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Models;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRetailerDemListModelsWithoutProduct : ContextBase
    {
        private IResult<IEnumerable<RetailerDemListModel>> results;

        private RetailerDemList retailerDemList1;

        private RetailerDemList retailerDemList2;

        private RetailerDemList retailerDemList3;

        private string rootProductUri;

        [SetUp]
        public void SetUp()
        {
            this.rootProductUri = "/rp/1";
            this.retailerDemList1 = new RetailerDemList(1, "/employee/200") { Id = 10, RootProducts = { new RootProduct("/rp/1") } };
            this.retailerDemList2 = new RetailerDemList(2, "/employee/200") { Id = 20, RootProducts = { new RootProduct("/rp/2") } };
            this.retailerDemList3 = new RetailerDemList(3, "/employee/200") { Id = 30, RootProducts = { new RootProduct("/rp/1") } };
            this.DemListRepository.GetRetailerDemLists()
                .Returns(new[] { this.retailerDemList1, this.retailerDemList2, this.retailerDemList3 });
            this.results = this.Sut.GetRetailerDemListModelsWithoutProduct(this.rootProductUri);
        }

        [Test]
        public void ShouldGetRetailerList()
        {
            this.DemListRepository.Received().GetRetailerDemLists();
        }

        [Test]
        public void ShouldReturnRetailers()
        {
            this.results.Should().BeOfType<SuccessResult<IEnumerable<RetailerDemListModel>>>();
            var dataResults = ((SuccessResult<IEnumerable<RetailerDemListModel>>)this.results).Data.ToArray();
            dataResults.Length.Should().Be(1);
            dataResults.Should().Contain(a => a.RetailerId == 2);
        }
    }
}
