namespace Linn.DemStock.Domain.RetailerDemListActivities
{
    using Linn.DemStock.Domain;

    public abstract class RetailerDemListActivity : Activity
    {
        protected RetailerDemListActivity(string updatedByUri) : base(updatedByUri)
        {
        }

        protected RetailerDemListActivity()
        {
        }

        public abstract T Accept<T>(IRetailerDemListActivityVisitor<T> visitor);
    }
}