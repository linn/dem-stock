namespace Linn.DemStock.Proxy
{
    using System.Collections.Generic;

    using Linn.DemStock.Resources.External;

    public interface ISalesRegionProxy
    {
        IEnumerable<SalesRegionResource> GetSalesRegions();
    }
}
