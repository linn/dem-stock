namespace Linn.DemStock.Facade.ResourceBuilders
{
    using System;

    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.RetailerDemListActivities;
    using Linn.DemStock.Resources;

    public class ResourceBuildingRetailerDemListActivityVisitor : IRetailerDemListActivityVisitor<RetailerDemListActivityResource>
    {
        public RetailerDemListActivityResource Visit(UpdateLastReviewedOnActivity activity)
        {
            return new UpdateLastReviewedOnActivityResource
                       {
                           ActivityType = activity.GetType().Name,
                           UpdatedByUri = activity.UpdatedByUri,
                           ChangedOn = DateTime.SpecifyKind(activity.ChangedOn, DateTimeKind.Utc).ToString("o"),
                           LastReviewedOn = activity.LastReviewedOn.HasValue
                                                ? DateTime.SpecifyKind(activity.LastReviewedOn.Value, DateTimeKind.Utc).ToString("o")
                                                : activity.LastReviewedOn?.ToString("o")
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

        public RetailerDemListActivityResource Visit(UpdateIsOpenActivity activity)
        {
            return new UpdateIsOpenActivityResource
                       {
                           ActivityType = activity.GetType().Name,
                           UpdatedByUri = activity.UpdatedByUri,
                           ChangedOn = DateTime.SpecifyKind(activity.ChangedOn, DateTimeKind.Utc).ToString("o"),
                           IsForOpenRetailer = activity.IsForOpenRetailer
                       };
        }
    }
}