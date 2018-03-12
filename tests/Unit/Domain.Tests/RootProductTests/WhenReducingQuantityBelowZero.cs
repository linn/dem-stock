namespace Linn.DemStock.Domain.Tests.RootProductTests
{
    using FluentAssertions;

    using NUnit.Framework;

    public class WhenReducingQuantityBelowZero : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            this.Sut.SetQuantity(-6);
        }

        [Test]
        public void ShouldUpdateRootProduct()
        {
            this.Sut.Quantity.Should().Be(0);
        }
    }
}
