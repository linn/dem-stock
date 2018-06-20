namespace Linn.DemStock.Service.Tests.RetailerDemListModuleTests
{
    using System.Collections.Generic;
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources;

    using Nancy;
    using Nancy.Testing;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRetailerDemListsWithoutProduct : ContextBase
    {
        private RetailerDemList retailerDemList1;

        private RetailerDemList retailerDemList2;

        private string productUri;

        [SetUp]
        public void SetUp()
        {
            this.productUri = "/root-products/1";
            this.retailerDemList1 = new RetailerDemList(1, "/employee/200");
            this.retailerDemList2 = new RetailerDemList(2, "/employee/200");
            this.DemStockService.GetRetailerDemListsWithoutProduct(this.productUri)
                .Returns(new SuccessResult<IEnumerable<RetailerDemList>>(new[] { this.retailerDemList1, this.retailerDemList2 }));

            this.Response = this.Browser.Get(
                "/retailers/dem-stock/lists-without-product",
                with =>
                    {
                        with.Header("Accept", "application/json");
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
            this.DemStockService.Received().GetRetailerDemListsWithoutProduct(this.productUri);
        }

        [Test]
        public void ShouldReturnResource()
        {
            var resources = this.Response.Body.DeserializeJson<IEnumerable<RetailerDemListResource>>();
            resources.Count().Should().Be(2);
        }
    }
}