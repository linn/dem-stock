namespace Linn.DemStock.Resources.External
{
    using System.Collections.Generic;

    using Linn.Common.Resources;

    public class InvoiceLineResource
    {
        public InvoiceLineResource()
        {
            this.links = new List<LinkResource>();
        }

        public int number { get; set; }

        public int quantity { get; set; }

        public decimal baseTotal { get; set; }

        public decimal currencyTotal { get; set; }

        public decimal baseUnitPrice { get; set; }

        public decimal currencyUnitPrice { get; set; }

        public decimal listUnitPrice { get; set; }

        public decimal normalCurrencyTotal { get; set; }

        public decimal? normalBaseTotal { get; set; }

        public decimal vatTotal { get; set; }

        public decimal baseVatTotal { get; set; }

        public bool forDemonstration { get; set; }

        public bool specialPriced { get; set; }

        public string promotionCode { get; set; }

        public decimal unitCostPrice { get; set; }

        public bool sundrySale { get; set; }

        public IList<LinkResource> links { get; set; }
    }
}