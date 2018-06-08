namespace Linn.DemStock.Service.Tests.RetailerDemListModuleTests
{
    using System.Collections.Generic;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain.Models;

    using Nancy;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRetailerDemListsWithoutProductExport : ContextBase
    {
        private RetailerDemListModel retailerDemList1;

        private RetailerDemListModel retailerDemList2;

        private string productUri;

        [SetUp]
        public void SetUp()
        {
            this.productUri = "/root-products/808";
            this.retailerDemList1 = new RetailerDemListModel();
            this.retailerDemList2 = new RetailerDemListModel();
            this.DemStockService.GetRetailerDemListModelsWithoutProduct(this.productUri)
                .Returns(new SuccessResult<IEnumerable<RetailerDemListModel>>(new[] { this.retailerDemList1, this.retailerDemList2 }));

            this.Response = this.Browser.Get(
                "/retailers/dem-stock/lists-without-product/export",
                with =>
                    {
                        with.Query("productUri", this.productUri);
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
            this.DemStockService.Received().GetRetailerDemListModelsWithoutProduct(this.productUri);
        }
    }
}