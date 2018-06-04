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

    public class WhenGettingRetailerDemListByLastReviewed : ContextBase
    {
        private RetailerDemList retailerDemList1;

        private RetailerDemList retailerDemList2;

        [SetUp]
        public void SetUp()
        {
            this.retailerDemList1 = new RetailerDemList(1, "/employee/200");
            this.retailerDemList2 = new RetailerDemList(2, "/employee/200");
            this.DemStockService.GetRetailerDemListsByLastReviewed()
                .Returns(new SuccessResult<IEnumerable<RetailerDemList>>(new[] { this.retailerDemList1, this.retailerDemList2 }));

            this.Response = this.Browser.Get(
                "/retailers/dem-stock/last-reviewed",
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
            this.DemStockService.Received().GetRetailerDemListsByLastReviewed();
        }

        [Test]
        public void ShouldReturnResource()
        {
            var resources = this.Response.Body.DeserializeJson<IEnumerable<RetailerDemListResource>>();
            resources.Count().Should().Be(2);
        }
    }
}