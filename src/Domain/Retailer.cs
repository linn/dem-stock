namespace Linn.DemStock.Domain
{
    using System;
    using System.Collections.Generic;

    public class Retailer : Entity
    {
        public string RetailerUri { get; set; }

        public DateTime? LastReviewedOn { get; set; }

        public IList<RootProduct> RootProducts { get; private set; } = new List<RootProduct>();

        public void AddRootProduct(string rootProductUri)
        {
            this.RootProducts.Add(new RootProduct(rootProductUri));
        }
    }
}
