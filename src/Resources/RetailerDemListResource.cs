﻿namespace Linn.DemStock.Resources
{
    using System.Collections.Generic;

    using Linn.Common.Resources;

    public class RetailerDemListResource : HypermediaResource
    {
        public int RetailerId { get; set; }

        public string LastReviewedOn { get; set; }

        public IEnumerable<RootProductResource> RootProducts { get; set; }
    }
}
