﻿namespace Linn.DemStock.Facade.ResourceBuilders
{
    using System;

    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.RetailerDemListActivities;
    using Linn.DemStock.Resources;

    public class ResourceBuildingRetailerDemListActivityVisitor : IRetailerDemListActivityVisitor<RetailerDemListActivityResource>
    {
        public RetailerDemListActivityResource Visit(UpdateLastReviewedOnActivity activity)
        {
            if (activity.LastReviewedOn != null)
            {
                return new UpdateLastReviewedOnActivityResource
                           {
                               ActivityType = activity.GetType().Name,
                               UpdatedByUri = activity.UpdatedByUri,
                               ChangedOn = DateTime.SpecifyKind(activity.ChangedOn, DateTimeKind.Utc).ToString("o"),
                               LastReviewedOn = DateTime.SpecifyKind((DateTime)activity.LastReviewedOn, DateTimeKind.Utc).ToString("o"),
                           };
            }

            return new UpdateLastReviewedOnActivityResource
                       {
                           ActivityType = activity.GetType().Name,
                           UpdatedByUri = activity.UpdatedByUri,
                           ChangedOn = DateTime.SpecifyKind(activity.ChangedOn, DateTimeKind.Utc).ToString("o"),
                           LastReviewedOn = activity.LastReviewedOn?.ToString("o"),
                       };
        }

        public RetailerDemListActivityResource Visit(UpdateRootProductActivity activity)
        {
            return new UpdateRootProductActivityResource
                       {
                           ActivityType = activity.GetType().Name,
                           UpdatedByUri = activity.UpdatedByUri,
                           ChangedOn = DateTime.SpecifyKind(activity.ChangedOn, DateTimeKind.Utc).ToString("o"),
                           RootProductUri = activity.RootProductUri,
                           Quantity = activity.Quantity
                       };
        }

        public RetailerDemListActivityResource Visit(CreateRetailerDemListActivity activity)
        {
            return new CreateRetailerDemListActivityResource
                       {
                           ActivityType = activity.GetType().Name,
                           UpdatedByUri = activity.UpdatedByUri,
                           ChangedOn = DateTime.SpecifyKind(activity.ChangedOn, DateTimeKind.Utc).ToString("o"),
                           RetailerId = activity.RetailerId
                       };
        }
    }
}