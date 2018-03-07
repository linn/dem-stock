namespace Linn.DemStock.Domain.RetailerDemListActivities
{
    using System;

    public class UpdateLastReviewedOnActivity : RetailerDemListActivity
    {
        public UpdateLastReviewedOnActivity(string updatedByUri, DateTime lastReviewedOn) : base(updatedByUri)
        {
            this.LastReviewedOn = lastReviewedOn;
        }

        private UpdateLastReviewedOnActivity()
        {
            // ef
        }

        public DateTime LastReviewedOn { get; private set; }
    }
}