﻿namespace Linn.DemStock.Proxy
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

        public int? GetRetailerId(string salesCustomerUri)
        {
            var uri = new Uri($"{this.rootUri}/retailers?salesCustomer={salesCustomerUri}", UriKind.RelativeOrAbsolute);
            var response = this.restClient.Get(
                CancellationToken.None,
                uri,
                new Dictionary<string, string>(),
                DefaultHeaders.JsonGetHeaders()).Result;

            if (response.StatusCode != HttpStatusCode.OK)
            {
                throw new ProxyException($"Error trying to find retailer for sales customer {salesCustomerUri}.");
            }

            var json = new JsonSerializer();
            var retailers = json.Deserialize<RetailerResources>(response.Value);

            if (retailers.Retailers.Length > 0)
            {
                return retailers.Retailers[0].Id;
            }

            return null;
        }

        public IEnumerable<RetailerResource> GetRetailers()
        {
            var uri = new Uri($"{this.rootUri}/retailers", UriKind.RelativeOrAbsolute);
            var response = this.restClient.Get(
                CancellationToken.None,
                uri,
                new Dictionary<string, string>(),
                DefaultHeaders.JsonGetHeaders()).Result;

            if (response.StatusCode != HttpStatusCode.OK)
            {
                throw new ProxyException($"Error trying to get retailers");
            }

            var json = new JsonSerializer();
            var returnResource = json.Deserialize<RetailerResources>(response.Value);

            return returnResource.Retailers;
        }
    }
}
