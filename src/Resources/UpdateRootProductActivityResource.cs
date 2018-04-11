namespace Linn.DemStock.Resources
{
    public class UpdateRootProductActivityResource : RetailerDemListActivityResource
    {
        public string RootProductUri { get; set; }

        public int? Quantity { get; set; }
    }
}
