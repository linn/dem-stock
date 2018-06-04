namespace Linn.DemStock.Service.ResponseProcessors
{
    using System.Collections.Generic;

    using Linn.Common.Facade;
    using Linn.Common.Nancy.Facade;
    using Linn.DemStock.Domain;

    public class RetailerDemListsJsonResponseProcessor : JsonResponseProcessor<IEnumerable<RetailerDemList>>
    {
        public RetailerDemListsJsonResponseProcessor(IResourceBuilder<IEnumerable<RetailerDemList>> resourceBuilder)
            : base(resourceBuilder, "retailer-dem-lists", 1)
        {
        }
    }
}