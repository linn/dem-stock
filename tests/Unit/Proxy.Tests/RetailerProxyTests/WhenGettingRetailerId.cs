namespace Linn.DemStock.Proxy.Tests.RetailerProxyTests
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Threading;

    using FluentAssertions;

    using Linn.Common.Proxy;
    using Linn.Common.Serialization.Json;
    using Linn.DemStock.Resources.External;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingRetailerId : ContextBase
    {
        private RestResponse<string> response;

        private string salesCustomerUri;

        [SetUp]
        public void SetUp()
        {
            var json = new JsonSerializer();
            var resource = new RetailerResource { Id = 123 };
            this.response = new RestResponse<string> { StatusCode = HttpStatusCode.OK, Value = json.Serialize(resource) };
            this.salesCustomerUri = "/sales/customers/808";

            this.RestClient.Get(
                    Arg.Any<CancellationToken>(),
                    Arg.Is<Uri>(u => u.ToString().Contains($"/retailers?salesCustomer={this.salesCustomerUri}")),
                    Arg.Any<IDictionary<string, string>>(),
                    Arg.Any<IDictionary<string, string[]>>())
                .Returns(this.response);

            this.RetailerId = this.Sut.GetRetailerId(this.salesCustomerUri);
        }

        [Test]
        public void ShouldReturnRetailerId()
        {
            this.RetailerId.Should().Be(123);
        }
    }
}