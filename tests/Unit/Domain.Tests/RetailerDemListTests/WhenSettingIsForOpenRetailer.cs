namespace Linn.DemStock.Domain.Tests.RetailerDemListTests
{
    using System;

    using FluentAssertions;

    using NUnit.Framework;

    public class WhenSettingIsForOpenRetailer : ContextBase
    {
        private DateTime? dateClosed;

        [SetUp]
        public void SetUp()
        {
            this.dateClosed = null;
            this.Sut.SetIsForOpenRetailer(this.dateClosed, "/1");
        }

        [Test]
        public void ShouldBeCurrent()
        {
            this.Sut.IsForOpenRetailer.Should().BeTrue();
        }
    }
}
