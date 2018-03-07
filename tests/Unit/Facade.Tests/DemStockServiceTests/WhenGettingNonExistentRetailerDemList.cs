namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using System.Collections.Generic;
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingNonExistentRetailerDemList : ContextBase
    {
        private string retailerUri;

        private IResult<RetailerDemList> result;

        [SetUp]
        public void SetUp()
        {
            this.retailerUri = "/retailers/200";
            this.DemListRepository.GetByRetailerUri(this.retailerUri).Returns((RetailerDemList)null);
            this.result = this.Sut.GetRetailer(this.retailerUri);
        }

        [Test]
        public void ShouldTryToGetRetailerList()
        {
            this.DemListRepository.Received().GetByRetailerUri("/retailers/200");
        }

        [Test]
        public void ShouldReturnNotFound()
        {
            this.result.Should().BeOfType<NotFoundResult<RetailerDemList>>();
        }
    }
}
