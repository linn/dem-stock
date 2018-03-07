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

        public string RootProductUri { get; private set; }

        public int Quantity { get; private set; }
    }
}