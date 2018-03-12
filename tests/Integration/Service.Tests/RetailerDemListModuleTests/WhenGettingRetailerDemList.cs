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

    public class WhenGettingRetailerDemList : ContextBase
    {
        private RetailerDemList retailerDemList;

        [SetUp]
        public void SetUp()
        {
            this.retailerDemList = new RetailerDemList(200);
            this.retailerDemList.SetRootProductQuantity("/products/100", "/employees/50", 3);
            this.DemStockService.GetRetailerDemList(200)
                .Returns(new SuccessResult<RetailerDemList>(this.retailerDemList));

            this.Response = this.Browser.Get(
                "/retailers/200/dem-stock",
                with =>
                    {
                        with.Header("Accept", "application/json");
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
            this.DemStockService.Received().GetRetailerDemList(200);
        }

        [Test]
        public void ShouldReturnResource()
        {
            var resource = this.Response.Body.DeserializeJson<RetailerDemListResource>();
            resource.RetailerId.Should().Be(this.retailerDemList.RetailerId);
            resource.RootProducts.Should().HaveCount(1);
            resource.RootProducts.First().Quantity.Should().Be(3);
            resource.RootProducts.First().RootProductUri.Should().Be("/products/100");
        }
    }
}