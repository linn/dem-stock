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

    public class SalesRegionProxy : ISalesRegionProxy
    {
        private readonly IRestClient restClient;

        private readonly string rootUri;

        public SalesRegionProxy(IRestClient restClient, string rootUri)
        {
            this.restClient = restClient;
            this.rootUri = rootUri;
        }

        public IEnumerable<SalesRegionResource> GetSalesRegions()
        {
            var uri = new Uri($"{this.rootUri}/sales-regions", UriKind.RelativeOrAbsolute);
            var response = this.restClient.Get(
                CancellationToken.None,
                uri,
                new Dictionary<string, string>(),
                DefaultHeaders.JsonGetHeaders()).Result;

            if (response.StatusCode != HttpStatusCode.OK)
            {
                throw new ProxyException($"Error trying to get sales regions");
            }

            var json = new JsonSerializer();
            return json.Deserialize<IEnumerable<SalesRegionResource>>(response.Value);
        }
    }
}