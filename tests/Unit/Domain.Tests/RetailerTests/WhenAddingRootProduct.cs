namespace Linn.DemStock.Domain.Tests.RetailerTests
{
    using FluentAssertions;

    using NUnit.Framework;

    public class WhenAddingRootProduct : ContextBase
    {
        private string rootProductUri;

        [SetUp]
        public void SetUp()
        {
            this.rootProductUri = "/root-products/200";
            this.Sut.AddRootProduct(this.rootProductUri);
        }

        [Test]
        public void ShouldAddRootProductToList()
        {
            this.Sut.RootProducts.Count.Should().Be(1);
            this.Sut.RootProducts.Should().Contain(r => r.RootProductUri == this.rootProductUri);
        }
    }
}
