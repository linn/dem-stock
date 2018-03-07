namespace Linn.DemStock.Resources
{
    using System.Collections.Generic;

    using Linn.Common.Resources;
    using Linn.DemStock.Resources.RequestResources;

    public class RetailerDemListResource : HypermediaResource
    {
        public string RetailerUri { get; set; }

        public string LastReviewedOn { get; set; }

        public IEnumerable<RootProductResource> RootProducts { get; set; }
    }
}
