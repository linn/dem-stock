namespace Linn.DemStock.Domain.Tests.RetailerTests
{
    using System.Linq;

    using FluentAssertions;

    using Linn.DemStock.Domain.RetailerActivities;

    using NUnit.Framework;

    public class WhenAddingNonExistentRootProduct : ContextBase
    {
        private string rootProductUri;

        [SetUp]
        public void SetUp()
        {
            this.rootProductUri = "/root-products/200";
            this.Sut.IncrementRootProductQuantity(this.rootProductUri, "/employees/2");
        }

        [Test]
        public void ShouldAddRootProductToList()
        {
            this.Sut.RootProducts.Count.Should().Be(1);
            this.Sut.RootProducts.Should().Contain(r => r.RootProductUri == this.rootProductUri && r.Quantity == 1);
            this.Sut.Activities.Count.Should().Be(1);
            this.Sut.Activities.First(a => a is UpdateRootProductActivity).As<UpdateRootProductActivity>().Quantity
                .Should().Be(1);
            this.Sut.Activities.First(a => a is UpdateRootProductActivity).As<UpdateRootProductActivity>().UpdatedByUri
                .Should().Be("/employees/2");
            this.Sut.Activities.First(a => a is UpdateRootProductActivity).As<UpdateRootProductActivity>().RootProductUri
                .Should().Be(this.rootProductUri);
        }
    }
}
