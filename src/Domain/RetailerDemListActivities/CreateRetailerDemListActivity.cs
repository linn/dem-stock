namespace Linn.DemStock.Domain.RetailerDemListActivities
{
    using System;

    public class CreateRetailerDemListActivity : RetailerDemListActivity
    {
        public CreateRetailerDemListActivity(string updatedByUri) : base(updatedByUri)
        {
        }

        private CreateRetailerDemListActivity()
        {
            // ef
        }
    }
}