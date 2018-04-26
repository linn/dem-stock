namespace Linn.DemStock.Resources.External
{
    using System.Collections.Generic;

    using Linn.Common.Resources;

    public class InvoiceResource
    {
        public InvoiceResource()
        {
            this.links = new List<LinkResource>();
            this.lines = new List<InvoiceLineResource>();
        }

        public int id { get; set; }

        public string raised { get; set; }

        public string ledgerMonthName { get; set; }

        public IList<InvoiceLineResource> lines { get; set; }

        public IList<LinkResource> links { get; set; }

        public decimal netTotal { get; set; }

        public decimal vatTotal { get; set; }

        public decimal documentTotal { get; set; }

        public decimal baseNetTotal { get; set; }

        public decimal baseVatTotal { get; set; }

        public bool sundrySale { get; set; }

        public int ledgerId { get; set; }
    }
}
