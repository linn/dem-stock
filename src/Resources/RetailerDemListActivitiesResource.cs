namespace Linn.DemStock.Resources
{
    using System.Collections.Generic;

    using Linn.Common.Resources;
    using Linn.DemStock.Domain.RetailerDemListActivities;

    public class RetailerDemListActivitiesResource : HypermediaResource
    {
        public IEnumerable<RetailerDemListActivityResource> Activities { get; set; }
    }
}
