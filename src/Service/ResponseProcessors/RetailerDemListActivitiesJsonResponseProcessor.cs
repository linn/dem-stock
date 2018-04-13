namespace Linn.DemStock.Service.ResponseProcessors
{
    using System.Collections.Generic;

    using Linn.Common.Facade;
    using Linn.Common.Nancy.Facade;
    using Linn.DemStock.Domain.RetailerDemListActivities;

    public class RetailerDemListActivitiesJsonResponseProcessor : JsonResponseProcessor<IEnumerable<RetailerDemListActivity>>
    {
        public RetailerDemListActivitiesJsonResponseProcessor(IResourceBuilder<IEnumerable<RetailerDemListActivity>> resourceBuilder)
            : base(resourceBuilder, "retailer-dem-list-activities", 1)
        {
        }
    }
}