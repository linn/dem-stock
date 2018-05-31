namespace Linn.DemStock.Facade.ResourceBuilders
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources;

    public class RetailerDemListsResourceBuilder : IResourceBuilder<IEnumerable<RetailerDemList>>
    {
        private readonly RetailerDemListResourceBuilder retailerDemListResourceBuilder = new RetailerDemListResourceBuilder();

        public IEnumerable<RetailerDemListResource> Build(IEnumerable<RetailerDemList> retailerDemLists)
        {
            return retailerDemLists.Select(r => this.retailerDemListResourceBuilder.Build(r));
        }

        object IResourceBuilder<IEnumerable<RetailerDemList>>.Build(IEnumerable<RetailerDemList> retailerDemLists) => this.Build(retailerDemLists);

        public string GetLocation(IEnumerable<RetailerDemList> retailerDemLists) => throw new NotImplementedException();
    }
}