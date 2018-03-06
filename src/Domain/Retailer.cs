namespace Linn.DemStock.Domain
{
    using System;
    using System.Collections.Generic;

    using Linn.DemStock.Domain.RetailerActivities;

    public class Retailer : ActivityEntity<RetailerActivity>
    {
        public string RetailerUri { get; set; }

        public DateTime? LastReviewedOn { get; set; }

        public IList<RootProduct> RootProducts { get; private set; } = new List<RootProduct>();

        public void IncrementRootProductQuantity(string rootProductUri, string updatedByUri, int quantity = 1)
        {
            this.RootProducts.Add(new RootProduct(rootProductUri));
            this.Activities.Add(new UpdateRootProductActivity(updatedByUri, rootProductUri, quantity));
        }

        public void SetRootProductQuantity(string rootProductUri, string updatedByUri, int quantity)
        {
            throw new NotImplementedException();
        }
    }
}
