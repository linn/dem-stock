namespace Linn.DemStock.Proxy
{
    using System.Collections.Generic;

    using Linn.DemStock.Resources;

    public interface IProductsProxy
    {
        string GetRootProductUri(string salesPartUri);

        IEnumerable<RootProductProxyResource> BatchGetRootProducts(IEnumerable<string> rootProductUris);
    }
}
