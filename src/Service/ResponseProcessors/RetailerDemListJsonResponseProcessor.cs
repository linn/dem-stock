namespace Linn.DemStock.Service.ResponseProcessors
{
    using Linn.Common.Facade;
    using Linn.Common.Nancy.Facade;
    using Linn.DemStock.Domain;

    public class RetailerDemListJsonResponseProcessor : JsonResponseProcessor<RetailerDemList>
    {
        public RetailerDemListJsonResponseProcessor(IResourceBuilder<RetailerDemList> resourceBuilder)
            : base(resourceBuilder, "retailer-dem-list", 1)
        {
        }
    }
}