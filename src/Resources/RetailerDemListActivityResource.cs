namespace Linn.DemStock.Resources
{
    using System;

    using Linn.Common.Resources;

    public class RetailerDemListActivityResource : HypermediaResource
    {
        public string ActivityType { get; set; }

        public string UpdatedByUri { get; set; }

        public string ChangedOn { get; set; }        
    }
}
