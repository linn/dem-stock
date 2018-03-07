namespace Linn.DemStock.Domain.RetailerDemListActivities
{
    public class UpdateRootProductActivity : RetailerDemListActivity
    {
        public UpdateRootProductActivity(string updatedByUri, string rootProductUri, int quantity) : base(updatedByUri)
        {
            this.RootProductUri = rootProductUri;
            this.Quantity = quantity;
        }

        private UpdateRootProductActivity()
        {
            // ef
        }

        public string RootProductUri { get; }

        public int Quantity { get; }
    }
}