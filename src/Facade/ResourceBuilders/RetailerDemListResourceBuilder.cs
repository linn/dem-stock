namespace Linn.DemStock.Facade.ResourceBuilders
{
    using System.Collections.Generic;
    using System.Linq;

    using Linn.Common.Facade;
    using Linn.Common.Resources;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources;

    public class RetailerDemListResourceBuilder : IResourceBuilder<RetailerDemList>
    {
        public RetailerDemListResource Build(RetailerDemList retailerDemList)
        {
            return new RetailerDemListResource
                       {
                           LastReviewedOn = retailerDemList.LastReviewedOn?.ToString("o"),
                           RetailerUri = retailerDemList.RetailerUri,
                           Links = this.BuildLinks(retailerDemList).ToArray()
                       };
        }

        object IResourceBuilder<RetailerDemList>.Build(RetailerDemList retailerDemList) => this.Build(retailerDemList);

        public string GetLocation(RetailerDemList retailerDemList) => $"/sales/dem-stock/retailers/{retailerDemList.Id}";

        private IEnumerable<LinkResource> BuildLinks(RetailerDemList retailerDemList)
        {
            yield return new LinkResource("self", this.GetLocation(retailerDemList));
        }
    }
}