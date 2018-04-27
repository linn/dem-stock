namespace Linn.DemStock.Proxy
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading;

    using Linn.Common.Proxy;
    using Linn.Common.Serialization.Json;
    using Linn.DemStock.Proxy.Exceptions;
    using Linn.DemStock.Resources.External;

    public class ProductsProxy : IProductsProxy
    {
        private readonly IRestClient restClient;

        private readonly string rootUri;

        public ProductsProxy(IRestClient restClient, string rootUri)
        {
            this.restClient = restClient;
            this.rootUri = rootUri;
        }

        public string GetRootProductUri(string salesPartUri)
        {
            if (!salesPartUri.Contains("sales-parts"))
            {
                return null;
            }

            var uri = new Uri($"{this.rootUri}{salesPartUri}", UriKind.RelativeOrAbsolute);
            var response = this.restClient.Get(
                CancellationToken.None,
                uri,
                new Dictionary<string, string>(),
                DefaultHeaders.JsonGetHeaders()).Result;

            if (response.StatusCode != HttpStatusCode.OK)
            {
                throw new ProxyException($"Error sales part details for {salesPartUri}.");
            }

            var json = new JsonSerializer();
            var salesPart = json.Deserialize<RetailerResource>(response.Value);

            return salesPart.Links.FirstOrDefault(l => l.Rel == "root-product")?.Href;
        }
    }
}
