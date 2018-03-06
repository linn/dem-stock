namespace Linn.DemStock.Domain.Tests.RetailerTests
{
    using System;
    using System.Linq;

    using FluentAssertions;

    using Linn.DemStock.Domain.RetailerActivities;

    using NUnit.Framework;

    public class WhenSettingLastReviewedOn : ContextBase
    {
        private DateTime reviewedOn;

        [SetUp]
        public void SetUp()
        {
            this.reviewedOn = 6.March(2018);
            this.Sut.SetLastReviewedDate(this.reviewedOn, "/employees/2");
        }

        [Test]
        public void ShouldUpdateLastReviewedOn()
        {
            this.Sut.LastReviewedOn.Should().Be(this.reviewedOn);
            this.Sut.Activities.Count.Should().Be(1);
            this.Sut.Activities.First(a => a is UpdateLastReviewedOnActivity).As<UpdateLastReviewedOnActivity>()
                .LastReviewedOn.Should().Be(this.reviewedOn);
            this.Sut.Activities.First(a => a is UpdateLastReviewedOnActivity).As<UpdateLastReviewedOnActivity>().UpdatedByUri
                .Should().Be("/employees/2");
        }
    }
}
