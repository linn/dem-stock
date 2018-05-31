namespace Linn.DemStock.Domain.Tests.RetailerDemListTests
{
    using System;
    using System.Linq;

    using FluentAssertions;

    using Linn.DemStock.Domain.RetailerDemListActivities;

    using NUnit.Framework;

    public class WhenSettingIsForOpenRetailerWhenClosed : ContextBase
    {
        private DateTime? dateClosed;

        [SetUp]
        public void SetUp()
        {
            this.dateClosed = DateTime.UtcNow;
            this.Sut.SetIsForOpenRetailer(this.dateClosed, "/1");
        }

        [Test]
        public void ShouldNotBeCurrent()
        {
            this.Sut.IsForOpenRetailer.Should().BeFalse();
        }

        [Test]
        public void ShouldAddActivity()
        {
            this.Sut.Activities.Count.Should().Be(2);
            this.Sut.Activities.First(a => a is UpdateIsOpenActivity).As<UpdateIsOpenActivity>().IsForOpenRetailer.Should().BeFalse();
            this.Sut.Activities.First(a => a is UpdateIsOpenActivity).As<UpdateIsOpenActivity>().UpdatedByUri.Should().Be("/1");
        }
    }
}
