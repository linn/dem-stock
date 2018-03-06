namespace Linn.DemStock.Domain
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using Linn.DemStock.Domain.Exceptions;
    using Linn.DemStock.Domain.RetailerActivities;

    public class Retailer : ActivityEntity<RetailerActivity>
    {
        public Retailer(string retailerUri)
        {
            this.RetailerUri = retailerUri;
        }

        private Retailer()
        {
            // ef
        }

        public string RetailerUri { get; set; }

        public DateTime? LastReviewedOn { get; set; }

        public IList<RootProduct> RootProducts { get; private set; } = new List<RootProduct>();

        public void IncrementRootProductQuantity(string rootProductUri, string updatedByUri, int quantity = 1)
        {
            var rootProduct = this.RootProducts.FirstOrDefault(r => r.RootProductUri.ToLower() == rootProductUri.ToLower());
            this.UpdateRootProduct(rootProductUri, updatedByUri, rootProduct?.Quantity + quantity ?? quantity);
        }

        public void SetRootProductQuantity(string rootProductUri, string updatedByUri, int quantity)
        {
            if (quantity < 0)
            {
                throw new FewerThanZeroException($"You cannot set the root product qty to {quantity} as it is fewer than zero");
            }

            this.UpdateRootProduct(rootProductUri, updatedByUri, quantity);
        }

        public void SetLastReviewedDate(DateTime reviewedOn, string updatedByUri)
        {
            this.LastReviewedOn = reviewedOn;
            this.Activities.Add(new UpdateLastReviewedOnActivity(updatedByUri, reviewedOn));
        }

        private void UpdateRootProduct(string rootProductUri, string updatedByUri, int quantity)
        {
            var rootProduct = this.RootProducts.FirstOrDefault(r => r.RootProductUri.ToLower() == rootProductUri.ToLower());
            if (rootProduct == null)
            {
                rootProduct = new RootProduct(rootProductUri, quantity);
                this.RootProducts.Add(rootProduct);
            }
            else
            {
                rootProduct.SetQuantity(quantity);
            }

            if (rootProduct.Quantity == 0)
            {
                this.RootProducts.Remove(rootProduct);
            }

            this.Activities.Add(new UpdateRootProductActivity(updatedByUri, rootProductUri, rootProduct.Quantity));
        }
    }
}
