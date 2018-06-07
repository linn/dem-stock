namespace Linn.DemStock.Proxy.Tests.RetailerProxyTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading;

    using FluentAssertions;

    using Linn.Common.Proxy;
    using Linn.Common.Serialization.Json;
    using Linn.DemStock.Resources.External;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRetailers : ContextBase
    {
        private RestResponse<string> response;

        private IEnumerable<RetailerResource> results;

        [SetUp]
        public void SetUp()
        {
            var json = new JsonSerializer();
            var resources = new RetailerResources { Retailers = new[] { new RetailerResource(), new RetailerResource() } };
            this.response = new RestResponse<string> { StatusCode = HttpStatusCode.OK, Value = json.Serialize(resources) };

            this.RestClient.Get(
                    Arg.Any<CancellationToken>(),
                    Arg.Is<Uri>(u => u.ToString().Contains($"/retailers")),
                    Arg.Any<IDictionary<string, string>>(),
                    Arg.Any<IDictionary<string, string[]>>())
                .Returns(this.response);

            this.results = this.Sut.GetRetailers();
        }

        [Test]
        public void ShouldReturnRetailers()
        {
            this.results.Count().Should().Be(2);
        }
    }
}