namespace Linn.DemStock.Service.Tests.RetailerDemListModuleTests
{
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources;

    using Nancy;
    using Nancy.Testing;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRetailer : ContextBase
    {
        private RetailerDemList retailerDemList;

        [SetUp]
        public void SetUp()
        {
            this.retailerDemList = new RetailerDemList("/retailers/200");
            this.retailerDemList.SetRootProductQuantity("/products/100", "/employees/50", 3);
            this.DemStockService.GetRetailer("/retailers/200")
                .Returns(new SuccessResult<RetailerDemList>(this.retailerDemList));

            this.Response = this.Browser.Get(
                "/sales/dem-stock/retailer-lists",
                with =>
                    {
                        with.Header("Accept", "application/json");
                        with.Query("retailerUri", "/retailers/200");
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
            this.DemStockService.Received().GetRetailer("/retailers/200");
        }

        [Test]
        public void ShouldReturnResource()
        {
            var resource = this.Response.Body.DeserializeJson<RetailerDemListResource>();
            resource.RetailerUri.Should().Be(this.retailerDemList.RetailerUri);
            resource.RootProducts.Should().HaveCount(1);
            resource.RootProducts.First().Quantity.Should().Be(3);
            resource.RootProducts.First().RootProductUri.Should().Be("/products/100");
        }
    }
}