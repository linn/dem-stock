namespace Linn.DemStock.Proxy.Tests.SalesRegionProxyTests
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

    public class WhenGettingSalesRegions : ContextBase
    {
        private RestResponse<string> response;

        private IEnumerable<SalesRegionResource> results;

        [SetUp]
        public void SetUp()
        {
            var json = new JsonSerializer();
            var resources = new List<SalesRegionResource> { new SalesRegionResource(), new SalesRegionResource() };
            this.response = new RestResponse<string> { StatusCode = HttpStatusCode.OK, Value = json.Serialize(resources) };

            this.RestClient.Get(
                    Arg.Any<CancellationToken>(),
                    Arg.Is<Uri>(u => u.ToString().Contains($"/sales-regions")),
                    Arg.Any<IDictionary<string, string>>(),
                    Arg.Any<IDictionary<string, string[]>>())
                .Returns(this.response);

            this.results = this.Sut.GetSalesRegions();
        }

        [Test]
        public void ShouldReturnRegions()
        {
            this.results.Count().Should().Be(2);
        }
    }
}