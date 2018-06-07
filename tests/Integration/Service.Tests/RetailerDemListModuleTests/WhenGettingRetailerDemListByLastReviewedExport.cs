namespace Linn.DemStock.Service.Tests.RetailerDemListModuleTests
{
    using System.Collections.Generic;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Models;

    using Nancy;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRetailerDemListByLastReviewedExport : ContextBase
    {
        private RetailerDemListModel retailerDemList1;

        private RetailerDemListModel retailerDemList2;

        [SetUp]
        public void SetUp()
        {
            this.retailerDemList1 = new RetailerDemListModel();
            this.retailerDemList2 = new RetailerDemListModel();
            this.DemStockService.GetRetailerDemListModelsByLastReviewed()
                .Returns(new SuccessResult<IEnumerable<RetailerDemListModel>>(new[] { this.retailerDemList1, this.retailerDemList2 }));

            this.Response = this.Browser.Get(
                "/retailers/dem-stock/last-reviewed/export",
                with =>
                    {
                    }).Result;
        }

        [Test]
        public void ShouldReturnOk()
        {
            this.Response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Test]
        public void ShouldCallService()
        {
            this.DemStockService.Received().GetRetailerDemListModelsByLastReviewed();
        }
    }
}