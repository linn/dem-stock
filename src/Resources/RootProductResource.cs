namespace Linn.DemStock.Resources
{
    using Linn.Common.Resources;

    public class RootProductResource : HypermediaResource
    {
        public string RootProductUri { get; set; }

        public int Quantity { get; set; }

        public string UpdatedOn { get; set; }
    }
}
