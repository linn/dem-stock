namespace Linn.DemStock.Service.Tests.RetailerDemListModuleTests
{
    using System;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources;
    using Linn.DemStock.Resources.RequestResources;

    using Nancy;
    using Nancy.Testing;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenSettingLastReviewedOn : ContextBase
    {
        private UpdateDateRequestResource requestResource;

        private RetailerDemList retailerDemList;

        [SetUp]
        public void SetUp()
        {
            this.requestResource = new UpdateDateRequestResource { UpdatedDate = "2018-03-14T13:45:33+00:00" };

            this.retailerDemList = new RetailerDemList(234, "/employee/200");
            this.retailerDemList.SetLastReviewedDate(1.April(2018), "/employees/21");

            this.DemStockService.UpdateRetailerDemListDetails(234, Arg.Any<DateTime?>(), null)
                .Returns(new SuccessResult<RetailerDemList>(this.retailerDemList));

            this.Response = this.Browser.Put(
                "/retailers/234/dem-stock",
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
            this.DemStockService.Received().UpdateRetailerDemListDetails(234, Arg.Any<DateTime?>(), null);
        }

        [Test]
        public void ShouldReturnResource()
        {
            var resource = this.Response.Body.DeserializeJson<RetailerDemListResource>();
            resource.RetailerId.Should().Be(this.retailerDemList.RetailerId);
            resource.LastReviewedOn.Should().Be("2018-04-01T00:00:00.0000000Z");
        }
    }
}