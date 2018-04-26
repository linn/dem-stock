namespace Linn.DemStock.Proxy.Tests.ProductsProxyTests
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Threading;

    using FluentAssertions;

    using Linn.Common.Proxy;
    using Linn.Common.Resources;
    using Linn.Common.Serialization.Json;
    using Linn.DemStock.Resources.External;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRootProductUri : ContextBase
    {
        private RestResponse<string> response;

        private string salesPartUri;

        [SetUp]
        public void SetUp()
        {
            var json = new JsonSerializer();
            var salesPartResource = new SalesPartResource
                                        {
                                            id = 123,
                                            name = "thing",
                                            description = "desc",
                                            links = new List<LinkResource>
                                                        {
                                                            new LinkResource("root-product", "/rp/12")
                                                        }
                                        };
            this.response = new RestResponse<string> { StatusCode = HttpStatusCode.OK, Value = json.Serialize(salesPartResource) };
            this.salesPartUri = "/products/sales-parts/555";

            this.RestClient.Get(
                    Arg.Any<CancellationToken>(),
                    Arg.Is<Uri>(u => u.ToString().Contains(this.salesPartUri)),
                    Arg.Any<IDictionary<string, string>>(),
                    Arg.Any<IDictionary<string, string[]>>())
                .Returns(this.response);

            this.RootProductUri = this.Sut.GetRootProductUri(this.salesPartUri);
        }

        [Test]
        public void ShouldReturnRootProductUri()
        {
            this.RootProductUri.Should().Be("/rp/12");
        }
    }
}