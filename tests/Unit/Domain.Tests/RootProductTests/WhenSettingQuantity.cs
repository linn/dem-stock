namespace Linn.DemStock.Domain.Tests.RootProductTests
{
    using System;

    using FluentAssertions;

    using NUnit.Framework;

    public class WhenSettingQuantity : ContextBase
    {
        private DateTime previouslyUpdatedOn;

        [SetUp]
        public void SetUp()
        {
            this.previouslyUpdatedOn = this.Sut.UpdatedOn;
            this.Sut.SetQuantity(6);
        }

        [Test]
        public void ShouldUpdateRootProduct()
        {
            this.Sut.Quantity.Should().Be(6);
            this.Sut.UpdatedOn.Should().BeAfter(this.previouslyUpdatedOn);
        }
    }
}
