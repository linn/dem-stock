﻿namespace Linn.DemStock.Domain.Tests.RetailerDemListTests
{
    using System.Linq;

    using FluentAssertions;

    using Linn.DemStock.Domain.RetailerDemListActivities;

    using NUnit.Framework;

    public class WhenAddingNonExistentRootProduct : ContextBase
    {
        private string rootProductUri;

        [SetUp]
        public void SetUp()
        {
            this.rootProductUri = "/root-products/200";
            this.RootProductResult = this.Sut.IncrementRootProductQuantity(this.rootProductUri, "/employees/2");
        }

        [Test]
        public void ShouldReturnRootProduct()
        {
            this.RootProductResult.Quantity.Should().Be(1);
            this.RootProductResult.RootProductUri.Should().Be(this.rootProductUri);
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