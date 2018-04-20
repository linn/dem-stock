namespace Linn.DemStock.Domain.RetailerDemListActivities
{
    public class CreateRetailerDemListActivity : RetailerDemListActivity
    {
        public CreateRetailerDemListActivity(string updatedByUri, int retailerId) : base(updatedByUri)
        {
            this.RetailerId = retailerId;
        }

        private CreateRetailerDemListActivity()
        {
            // ef
        }

        public int RetailerId { get; private set; }

        public override T Accept<T>(IRetailerDemListActivityVisitor<T> visitor)
        {
            return visitor.Visit(this);
        }
    }
}