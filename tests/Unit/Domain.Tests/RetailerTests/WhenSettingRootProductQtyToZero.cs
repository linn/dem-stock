namespace Linn.DemStock.Domain.Tests.RetailerTests
{
    using System.Linq;

    using FluentAssertions;

    using Linn.DemStock.Domain.RetailerActivities;

    using NUnit.Framework;

    public class WhenSettingRootProductQtyToZero : ContextBase
    {
        private string rootProductUri;

        [SetUp]
        public void SetUp()
        {
            this.rootProductUri = "/root-products/200";
            this.Sut.RootProducts.Add(new RootProduct(this.rootProductUri, 3));
            this.Sut.SetRootProductQuantity(this.rootProductUri, "/employees/2", 0);
        }

        [Test]
        public void ShouldRemoveRootProduct()
        {
            this.Sut.RootProducts.Count.Should().Be(0);
            this.Sut.Activities.Count.Should().Be(1);
            this.Sut.Activities.First(a => a is UpdateRootProductActivity).As<UpdateRootProductActivity>().Quantity
                .Should().Be(0);
            this.Sut.Activities.First(a => a is UpdateRootProductActivity).As<UpdateRootProductActivity>().UpdatedByUri
                .Should().Be("/employees/2");
            this.Sut.Activities.First(a => a is UpdateRootProductActivity).As<UpdateRootProductActivity>().RootProductUri
                .Should().Be(this.rootProductUri);
        }
    }
}
