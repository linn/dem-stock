namespace Linn.DemStock.Service.Tests.RetailerDemListModuleTests
{
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources;
    using Linn.DemStock.Resources.RequestResources;

    using Nancy;
    using Nancy.Testing;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenSettingRootProduct : ContextBase
    {
        private SetRootProductRequestResource requestResource;

        private RootProduct rootProduct;

        [SetUp]
        public void SetUp()
        {
            this.requestResource = new SetRootProductRequestResource { Quantity = 3, RootProductUri = "/rp/50" };

            this.rootProduct = new RootProduct("/rp/50", 3);
            this.DemStockService.SetRetailerListRootProduct(234, "/rp/50", 3)
                .Returns(new SuccessResult<RootProduct>(this.rootProduct));

            this.Response = this.Browser.Put(
                "/sales/dem-stock/retailer-lists/234/products",
                with =>
                    {
                        with.Header("Accept", "application/json");
                        with.JsonBody(this.requestResource);
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
            this.DemStockService.Received().SetRetailerListRootProduct(234, "/rp/50", 3);
        }

        [Test]
        public void ShouldReturnResource()
        {
            var resource = this.Response.Body.DeserializeJson<RootProductResource>();
            resource.RootProductUri.Should().Be(this.rootProduct.RootProductUri);
            resource.Quantity.Should().Be(this.rootProduct.Quantity);
        }
    }
}