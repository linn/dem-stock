namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenSettingRootProductOnNonExistentDemList : ContextBase
    {
        private IResult<RootProduct> result;

        [SetUp]
        public void SetUp()
        {
            this.DemListRepository.GetById(Arg.Any<int>()).Returns((RetailerDemList)null);
            this.result = this.Sut.SetRetailerListRootProduct(1, "/rp/50", 3);
        }

        [Test]
        public void ShouldTryToGetRetailerDemList()
        {
            this.DemListRepository.Received().GetById(1);
        }

        [Test]
        public void ShouldReturnNotFound()
        {
            this.result.Should().BeOfType<NotFoundResult<RootProduct>>();
        }
    }
}
