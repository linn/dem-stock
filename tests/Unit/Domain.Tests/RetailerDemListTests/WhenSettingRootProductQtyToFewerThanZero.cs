namespace Linn.DemStock.Domain.Tests.RetailerDemListTests
{
    using System;

    using FluentAssertions;

    using Linn.DemStock.Domain.Exceptions;

    using NUnit.Framework;

    public class WhenSettingRootProductQtyToFewerThanZero : ContextBase
    {
        private string rootProductUri;

        private Action action;

        [SetUp]
        public void SetUp()
        {
            this.rootProductUri = "/root-products/200";
            this.Sut.RootProducts.Add(new RootProduct(this.rootProductUri, 3));
            this.action = () => this.Sut.SetRootProductQuantity(this.rootProductUri, "/employees/2", -3);
        }

        [Test]
        public void ShouldThrowException()
        {
            this.action.ShouldThrow<FewerThanZeroException>();
        }
    }
}
