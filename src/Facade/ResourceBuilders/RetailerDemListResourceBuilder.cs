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
        private readonly RootProductResourceBuilder rootProductResourceBuilder = new RootProductResourceBuilder();

        private readonly RetailerDemListActivityResourceBuilder retailerDemListActivityResourceBuilder = new RetailerDemListActivityResourceBuilder();

        public RetailerDemListResource Build(RetailerDemList retailerDemList)
        {
            return new RetailerDemListResource
                       {
                           LastReviewedOn = retailerDemList.LastReviewedOn?.ToString("o"),
                           RetailerId = retailerDemList.RetailerId,
                           RootProducts = retailerDemList.RootProducts.Select(r => this.rootProductResourceBuilder.Build(r)),
                           Activities = retailerDemList.Activities.Select(a => this.retailerDemListActivityResourceBuilder.Build(a)),
                           Links = this.BuildLinks(retailerDemList).ToArray()
                       };
        }

        object IResourceBuilder<RetailerDemList>.Build(RetailerDemList retailerDemList) => this.Build(retailerDemList);

        public string GetLocation(RetailerDemList retailerDemList) => $"/retailers/{retailerDemList.RetailerId}/dem-stock";

        private IEnumerable<LinkResource> BuildLinks(RetailerDemList retailerDemList)
        {
            yield return new LinkResource("self", this.GetLocation(retailerDemList));

            yield return new LinkResource("retailer", $"/retailers/{retailerDemList.RetailerId}");
        }
    }
}