namespace Linn.DemStock.Facade.ResourceBuilders
{
    using System.Collections.Generic;
    using System.Linq;

    using Linn.Common.Facade;
    using Linn.Common.Resources;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources;

    public class RetailerResourceBuilder : IResourceBuilder<Retailer>
    {
        public RetailerResource Build(Retailer retailer)
        {
            return new RetailerResource
                       {
                           LastReviewedOn = retailer.LastReviewedOn?.ToString("o"),
                           RetailerUri = retailer.RetailerUri,
                           Links = this.BuildLinks(retailer).ToArray()
                       };
        }

        object IResourceBuilder<Retailer>.Build(Retailer retailer) => this.Build(retailer);

        public string GetLocation(Retailer retailer) => $"/sales/dem-stock/retailers/{retailer.Id}";

        private IEnumerable<LinkResource> BuildLinks(Retailer retailer)
        {
            yield return new LinkResource("self", this.GetLocation(retailer));
        }
    }
}