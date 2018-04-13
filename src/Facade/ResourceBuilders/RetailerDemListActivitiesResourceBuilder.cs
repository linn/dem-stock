namespace Linn.DemStock.Facade.ResourceBuilders
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain.RetailerDemListActivities;
    using Linn.DemStock.Resources;

    public class RetailerDemListActivitiesResourceBuilder : IResourceBuilder<IEnumerable<RetailerDemListActivity>>
    {
        private readonly RetailerDemListActivityResourceBuilder retailerDemListActivityResourceBuilder = new RetailerDemListActivityResourceBuilder();

        public RetailerDemListActivitiesResource Build(IEnumerable<RetailerDemListActivity> activities)
        {
            return new RetailerDemListActivitiesResource
                       {
                           Activities = activities.Select(a => this.retailerDemListActivityResourceBuilder.Build(a))
                       };
        }

        object IResourceBuilder<IEnumerable<RetailerDemListActivity>>.Build(IEnumerable<RetailerDemListActivity> activities) => this.Build(activities);

        public string GetLocation(IEnumerable<RetailerDemListActivity> activities)
        {
            throw new NotImplementedException();
        }
    }
}