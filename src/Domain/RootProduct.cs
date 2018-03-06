namespace Linn.DemStock.Domain
{
    using System;

    public class RootProduct : Entity
    {
        public RootProduct(string rootProductUri)
        {
            this.RootProductUri = rootProductUri;
        }

        private RootProduct()
        {
            // ef
        }

        public string RootProductUri { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}
