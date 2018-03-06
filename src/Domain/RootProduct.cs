namespace Linn.DemStock.Domain
{
    using System;

    public class RootProduct : Entity
    {
        public RootProduct(string rootProductUri, int quantity = 1)
        {
            this.RootProductUri = rootProductUri;
            this.Quantity = quantity;
        }

        private RootProduct()
        {
            // ef
        }

        public string RootProductUri { get; set; }

        public int Quantity { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}
