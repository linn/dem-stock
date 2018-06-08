namespace Linn.DemStock.Domain.Tests.RetailerDemListTests
{
    using FluentAssertions;

    using NUnit.Framework;

    public class WhenHasNotOnList : ContextBase
    {
        private bool result;

        private string productUri;

        [SetUp]
        public void SetUp()
        {
            this.productUri = "/rp/1";
            this.Sut.SetRootProductQuantity("/rp/2", string.Empty, 1);
            this.result = this.Sut.HasOnList(this.productUri);
        }

        [Test]
        public void ShouldBeFalse()
        {
            this.result.Should().BeFalse();
        }
    }
}
