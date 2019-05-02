namespace Linn.DemStock.Domain.Models
{
    public class RootProductOnDemModel
    {
        public string RootProductName { get; set; }

        public string RootProductUri { get; set; }

        public int Quantity { get; set; }

        public int RetailerId { get; set; }

        public string RetailerName { get; set; }

        public string RootProductUpdatedOn { get; set; }
    }
}
