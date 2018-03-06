namespace Linn.DemStock.Service.ResponseProcessors
{
    using Linn.Common.Facade;
    using Linn.Common.Nancy.Facade;
    using Linn.DemStock.Domain;

    public class RetailerJsonResponseProcessor : JsonResponseProcessor<Retailer>
    {
        public RetailerJsonResponseProcessor(IResourceBuilder<Retailer> resourceBuilder)
            : base(resourceBuilder, "retailer-dem-stock", 1)
        {
        }
    }
}