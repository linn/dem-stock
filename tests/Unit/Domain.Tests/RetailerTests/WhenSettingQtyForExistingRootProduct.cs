namespace Linn.DemStock.Domain.Tests.RetailerTests
{
    using System.Linq;

    using FluentAssertions;

    using Linn.DemStock.Domain.RetailerActivities;

    using NUnit.Framework;

    public class WhenSettingQtyForExistingRootProduct : ContextBase
    {
        private string rootProductUri;

        [SetUp]
        public void SetUp()
        {
            this.rootProductUri = "/root-products/200";
            this.Sut.RootProducts.Add(new RootProduct(this.rootProductUri, 10));
            this.Sut.SetRootProductQuantity(this.rootProductUri, "/employees/2", 5);
        }

        [Test]
        public void ShouldSetRootProductQuantity()
        {
            this.Sut.RootProducts.Count.Should().Be(1);
            this.Sut.RootProducts.Should().Contain(r => r.RootProductUri == this.rootProductUri && r.Quantity == 5);
            this.Sut.Activities.Count.Should().Be(1);
            this.Sut.Activities.First(a => a is UpdateRootProductActivity).As<UpdateRootProductActivity>().Quantity
                .Should().Be(5);
            this.Sut.Activities.First(a => a is UpdateRootProductActivity).As<UpdateRootProductActivity>().UpdatedByUri
                .Should().Be("/employees/2");
            this.Sut.Activities.First(a => a is UpdateRootProductActivity).As<UpdateRootProductActivity>().RootProductUri
                .Should().Be(this.rootProductUri);
        }
    }
}
