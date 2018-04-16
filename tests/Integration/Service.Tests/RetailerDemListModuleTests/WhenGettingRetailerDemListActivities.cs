namespace Linn.DemStock.Service.Tests.RetailerDemListModuleTests
{
    using System.Collections.Generic;
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.RetailerDemListActivities;
    using Linn.DemStock.Resources;

    using Nancy;
    using Nancy.Testing;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRetailerDemListActivities : ContextBase
    {
        private RetailerDemList retailerDemList;

        [SetUp]
        public void SetUp()
        {
            this.retailerDemList = new RetailerDemList(200);
            this.retailerDemList.SetRootProductQuantity("/products/100", "/employees/50", 3);
            this.retailerDemList.SetLastReviewedDate(13.April(2018), "/employees/21");
            this.DemStockService.GetRetailerDemList(200)
                .Returns(new SuccessResult<RetailerDemList>(this.retailerDemList));

            this.DemStockService.GetRetailerDemListActivities(200).Returns(
                new SuccessResult<IEnumerable<RetailerDemListActivity>>(this.retailerDemList.Activities));

            this.Response = this.Browser.Get(
                "/retailers/200/dem-stock/activities",
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
            this.DemStockService.Received().GetRetailerDemListActivities(200);
        }

        [Test]
        public void ShouldReturnResource()
        {
            var resource = this.Response.Body.DeserializeJson<RetailerDemListActivitiesResource>();
            resource.Activities.Count().Should().Be(2);
            resource.Activities.First().ActivityType.Should().Be("UpdateRootProductActivity");
            resource.Activities.First().UpdatedByUri.Should().Be("/employees/50");
            resource.Activities.Last().ActivityType.Should().Be("UpdateLastReviewedOnActivity");
            resource.Activities.Last().UpdatedByUri.Should().Be("/employees/21");
        }
    }
}