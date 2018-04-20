namespace Linn.DemStock.Domain.Tests.RetailerDemListTests
{
    using System.Linq;

    using FluentAssertions;

    using Linn.DemStock.Domain.RetailerDemListActivities;

    using NUnit.Framework;

    public class WhenSettingRootProductQtyToZero : ContextBase
    {
        private string rootProductUri;

        [SetUp]
        public void SetUp()
        {
            this.rootProductUri = "/root-products/200";
            this.Sut.RootProducts.Add(new RootProduct(this.rootProductUri, 3));
            this.RootProductResult = this.Sut.SetRootProductQuantity(this.rootProductUri, "/employees/2", 0);
        }

        [Test]
        public void ShouldReturnRootProduct()
        {
            this.RootProductResult.Quantity.Should().Be(0);
            this.RootProductResult.RootProductUri.Should().Be(this.rootProductUri);
        }

        [Test]
        public void ShouldRemoveRootProduct()
        {
            this.Sut.RootProducts.Count.Should().Be(0);
            this.Sut.Activities.Count.Should().Be(2);
            this.Sut.Activities.First(a => a is CreateRetailerDemListActivity).As<CreateRetailerDemListActivity>().RetailerId.Should().Be(2);
            this.Sut.Activities.First(a => a is UpdateRootProductActivity).As<UpdateRootProductActivity>().Quantity
                .Should().Be(0);
            this.Sut.Activities.First(a => a is UpdateRootProductActivity).As<UpdateRootProductActivity>().UpdatedByUri
                .Should().Be("/employees/2");
            this.Sut.Activities.First(a => a is UpdateRootProductActivity).As<UpdateRootProductActivity>().RootProductUri
                .Should().Be(this.rootProductUri);
        }
    }
}
