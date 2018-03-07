namespace Linn.DemStock.Service.Tests.RetailerDemListModuleTests
{
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
            this.DemStockService.GetRetailer("/retailers/200")
                .Returns(new SuccessResult<RetailerDemList>(this.retailerDemList));

            this.Response = this.Browser.Get(
                "/sales/dem-stock/retailers",
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
        public void ShouldReturnResource()
        {
            var resources = this.Response.Body.DeserializeJson<RetailerDemListResource>();
            resources.RetailerUri.Should().Be(this.retailerDemList.RetailerUri);
        }
    }
}