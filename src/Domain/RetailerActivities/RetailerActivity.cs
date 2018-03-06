namespace Linn.DemStock.Domain.RetailerActivities
{
    using Linn.DemStock.Domain;

    public abstract class RetailerActivity : Activity
    {
        protected RetailerActivity(string updatedByUri) : base(updatedByUri)
        {
        }

        protected RetailerActivity()
        {
        }
    }
}