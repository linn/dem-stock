namespace Linn.DemStock.Proxy
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Threading;

    using Linn.Common.Proxy;
    using Linn.Common.Serialization.Json;
    using Linn.DemStock.Proxy.Exceptions;
    using Linn.DemStock.Resources.External;

    public class RetailerProxy : IRetailerProxy
    {
        private readonly IRestClient restClient;

        private readonly string rootUri;

        public RetailerProxy(IRestClient restClient, string rootUri)
        {
            this.restClient = restClient;
            this.rootUri = rootUri;
        }

        public int GetRetailerId(string salesCustomerUri)
        {
            var uri = new Uri($"{this.rootUri}/retailers?salesCustomer={salesCustomerUri}", UriKind.RelativeOrAbsolute);
            var response = this.restClient.Get(
                CancellationToken.None,
                uri,
                new Dictionary<string, string>(),
                DefaultHeaders.JsonGetHeaders()).Result;

            if (response.StatusCode != HttpStatusCode.OK)
            {
                throw new ProxyException($"Error getting retailer for sales customer {salesCustomerUri}.");
            }

            var json = new JsonSerializer();
            var retailer = json.Deserialize<RetailerResource>(response.Value);

            return retailer.Id;
        }
    }
}
