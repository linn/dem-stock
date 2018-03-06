namespace Linn.DemStock.Domain
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using Linn.DemStock.Domain.RetailerActivities;

    public class Retailer : ActivityEntity<RetailerActivity>
    {
        public string RetailerUri { get; set; }

        public DateTime? LastReviewedOn { get; set; }

        public IList<RootProduct> RootProducts { get; private set; } = new List<RootProduct>();

        public void IncrementRootProductQuantity(string rootProductUri, string updatedByUri, int quantity = 1)
        {
            var rootProduct = this.RootProducts.FirstOrDefault(r => r.RootProductUri.ToLower() == rootProductUri.ToLower());
            if (rootProduct == null)
            {
                rootProduct = new RootProduct(rootProductUri, quantity);
                this.RootProducts.Add(rootProduct);
            }
            else
            {
                rootProduct.SetQuantity(rootProduct.Quantity + quantity);
            }

            this.Activities.Add(new UpdateRootProductActivity(updatedByUri, rootProductUri, rootProduct.Quantity));
        }

        public void SetRootProductQuantity(string rootProductUri, string updatedByUri, int quantity)
        {
            throw new NotImplementedException();
        }
    }
}
