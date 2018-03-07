namespace Linn.DemStock.Resources
{
    using Linn.Common.Resources;

    public class RetailerDemListResource : HypermediaResource
    {
        public string RetailerUri { get; set; }

        public string LastReviewedOn { get; set; }
    }
}
