namespace Linn.DemStock.Resources
{
    using System;

    using Linn.Common.Resources;

    public class RootProductProxyResource : HypermediaResource
    {
        public string Href { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Type { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? PhasedOutOn { get; set; }

        public RootProductProxyResource[] Children { get; set; }

        public bool PhasedOut => this.PhasedOutOn.HasValue && this.PhasedOutOn <= DateTime.Today.AddDays(1);
    }
}
