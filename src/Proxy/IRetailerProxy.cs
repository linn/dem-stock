namespace Linn.DemStock.Proxy
{
    using System.Collections.Generic;

    using Linn.DemStock.Resources.External;

    public interface IRetailerProxy
    {
        int? GetRetailerId(string salesCustomerUri);

        IEnumerable<RetailerResource> GetRetailers();
    }
}
