namespace Linn.DemStock.Service.ResponseProcessors
{
    using Linn.Common.Facade;
    using Linn.Common.Nancy.Facade;
    using Linn.DemStock.Domain;

    public class RootProductJsonResponseProcessor : JsonResponseProcessor<RootProduct>
    {
        public RootProductJsonResponseProcessor(IResourceBuilder<RootProduct> resourceBuilder)
            : base(resourceBuilder, "retailer-dem-list-product", 1)
        {
        }
    }
}