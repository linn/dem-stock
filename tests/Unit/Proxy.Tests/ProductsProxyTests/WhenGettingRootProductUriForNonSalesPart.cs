namespace Linn.DemStock.Proxy.Tests.ProductsProxyTests
{
    using System;
    using System.Collections.Generic;
    using System.Threading;

    using FluentAssertions;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRootProductUriForNonSalesPart : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            this.RootProductUri = this.Sut.GetRootProductUri("/products/service-parts/123");
        }

        [Test]
        public void ShouldNotCallRestClient()
        {
            this.RestClient.DidNotReceive().Get(
                Arg.Any<CancellationToken>(),
                Arg.Any<Uri>(),
                Arg.Any<IDictionary<string, string>>(),
                Arg.Any<IDictionary<string, string[]>>());
        }

        [Test]
        public void ShouldReturnNull()
        {
            this.RootProductUri.Should().BeNull();
        }
    }
}