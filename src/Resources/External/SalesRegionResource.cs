namespace Linn.DemStock.Resources.External
{
    using System;

    using Linn.Common.Resources;

    public class SalesRegionResource
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime? DateInvalid { get; set; }

        public LinkResource[] Links { get; set; }
    }
}
