namespace Linn.DemStock.Service.Tests.RetailerDemListModuleTests
{
    using System.Collections.Generic;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain.Models;

    using Nancy;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingAllRootProductsOnDemExport : ContextBase
    {
        private RootProductOnDemModel rootProductOnDem1;

        private RootProductOnDemModel rootProductOnDem2;

        [SetUp]
        public void SetUp()
        {
            
            this.rootProductOnDem1 = new RootProductOnDemModel();
            this.rootProductOnDem2 = new RootProductOnDemModel();
            this.DemStockService.GetAllRootProductsOnDem()
                .Returns(new SuccessResult<IEnumerable<RootProductOnDemModel>>(new[] { this.rootProductOnDem1, this.rootProductOnDem2 }));

            this.Response = this.Browser.Get(
                "/retailers/dem-stock/root-products/export",
                with => { }).Result;
        }

        [Test]
        public void ShouldReturnOk()
        {
            this.Response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Test]
        public void ShouldCallService()
        {
            this.DemStockService.Received().GetAllRootProductsOnDem();
        }
    }
}