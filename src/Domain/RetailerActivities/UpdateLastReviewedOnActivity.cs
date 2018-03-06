namespace Linn.DemStock.Domain.RetailerActivities
{
    using System;

    public class UpdateLastReviewedOnActivity : RetailerActivity
    {
        public UpdateLastReviewedOnActivity(string updatedByUri, DateTime lastReviewedOn) : base(updatedByUri)
        {
            this.LastReviewedOn = lastReviewedOn;
        }

        private UpdateLastReviewedOnActivity()
        {
            // ef
        }

        public DateTime LastReviewedOn { get; }
    }
}