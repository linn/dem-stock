namespace Linn.DemStock.Domain
{
    using System;

    public class RootProduct : Entity
    {
        public RootProduct(string rootProductUri, int quantity = 1)
        {
            this.RootProductUri = rootProductUri;
            this.Quantity = quantity;
            this.UpdatedOn = DateTime.UtcNow;
        }

        private RootProduct()
        {
            // ef
        }

        public string RootProductUri { get; set; }

        public int Quantity { get; private set; }

        public DateTime UpdatedOn { get; set; }

        public void SetQuantity(int quantity)
        {
            this.Quantity = quantity;
            if (this.Quantity < 0)
            {
                this.Quantity = 0;
            }

            this.UpdatedOn = DateTime.UtcNow;
        }
    }
}
