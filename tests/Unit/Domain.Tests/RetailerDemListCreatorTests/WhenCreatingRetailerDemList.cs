namespace Linn.DemStock.Domain.Tests.RetailerDemListCreatorTests
{
    using System.Linq;

    using FluentAssertions;

    using Linn.DemStock.Domain.RetailerDemListActivities;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenCreatingRetailerDemList : ContextBase
    {
        private int retailerId;

        private RetailerDemList result;

        [SetUp]
        public void SetUp()
        {
            this.retailerId = 231;
            this.result = this.Sut.CreateRetailerDemList(this.retailerId, "employee/200");
        }

        [Test]
        public void ShouldGetRetailerList()
        {
            this.DemListRepository.Received().GetByRetailerId(this.retailerId);
        }

        [Test]
        public void ShouldAddRetailerDemList()
        {
            this.DemListRepository.Received().Add(Arg.Is<RetailerDemList>(r => r.RetailerId == this.retailerId));
        }

        [Test]
        public void ShouldReturnRetailerDemList()
        {
            this.result.RetailerId.Should().Be(this.retailerId);
            this.Sut.Activities.Count.Should().Be(1);
            this.Sut.Activities.First(a => a is CreateRetailerDemListActivity).As<CreateRetailerDemListActivity>()
                .UpdatedByUri.Should().Be("employee/200");
        }
    }
}
