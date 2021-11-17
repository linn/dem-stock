namespace Linn.DemStock.Domain.Tests.RetailerDemListTests
{
    using System;
    using System.Linq;

    using FluentAssertions;
    using FluentAssertions.Extensions;

    using Linn.DemStock.Domain.RetailerDemListActivities;

    using NUnit.Framework;

    public class WhenSettingLastReviewedOnWithSameDate : ContextBase
    {
        private DateTime reviewedOn;

        [SetUp]
        public void SetUp()
        {
            this.reviewedOn = 6.March(2018);
            this.Sut.SetLastReviewedDate(this.reviewedOn, "/employees/2");
            this.Sut.SetLastReviewedDate(this.reviewedOn, "/employees/2");
        }

        [Test]
        public void ShouldUpdateLastReviewedOnOnlyOnce()
        {
            this.Sut.LastReviewedOn.Should().Be(this.reviewedOn);
            this.Sut.Activities.Count.Should().Be(2);
            this.Sut.Activities.First(a => a is CreateRetailerDemListActivity).As<CreateRetailerDemListActivity>().RetailerId.Should().Be(2);
            this.Sut.Activities.First(a => a is UpdateLastReviewedOnActivity).As<UpdateLastReviewedOnActivity>()
                .LastReviewedOn.Should().Be(this.reviewedOn);
            this.Sut.Activities.First(a => a is UpdateLastReviewedOnActivity).As<UpdateLastReviewedOnActivity>().UpdatedByUri
                .Should().Be("/employees/2");
        }
    }
}
