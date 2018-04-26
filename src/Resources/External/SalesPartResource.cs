namespace Linn.DemStock.Resources.External
{
    using System.Collections.Generic;

    using Linn.Common.Resources;

    public class SalesPartResource
    {
        public int id { get; set; }

        public string name { get; set; }

        public string description { get; set; }

        public IList<LinkResource> links { get; set; }
    }
}
