namespace Linn.DemStock.Proxy.Tests.ProductsProxyTests
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Threading;

    using FluentAssertions;

    using Linn.Common.Proxy;
    using Linn.Common.Serialization.Json;
    using Linn.DemStock.Resources;
    using Linn.DemStock.Resources.RequestResources;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRootProducts : ContextBase
    {
        private RestResponse<IEnumerable<RootProductProxyResource>> response;

        private IEnumerable<RootProductProxyResource> rootProducts;

        [SetUp]
        public void SetUp()
        {
            var json = new JsonSerializer();
            var rootProductsResource = new List<RootProductProxyResource>
                                           {
                                               new RootProductProxyResource
                                                   {
                                                       Href = "rp/1"
                                                   },
                                               new RootProductProxyResource
                                                   {
                                                       Href = "rp/2"
                                                   }
                                           };
            this.response = new RestResponse<IEnumerable<RootProductProxyResource>>
                                {
                                    StatusCode = HttpStatusCode.OK,
                                    Value = rootProductsResource
                                };

            var rootProductUris = new[] { "rp/1", "rp/2" };

            this.RestClient.Post<IEnumerable<RootProductProxyResource>>(
                Arg.Any<CancellationToken>(),
                Arg.Any<Uri>(),
                Arg.Any<object>()).Returns(this.response);

            this.rootProducts = this.Sut.BatchGetRootProducts(rootProductUris);
        }

        [Test]
        public void ShouldReturnRootProducts()
        {
            this.rootProducts.Should().HaveCount(2);
            this.rootProducts.Should().Contain(rp => rp.Href == "rp/1");
            this.rootProducts.Should().Contain(rp => rp.Href == "rp/2");
        }
    }
}
