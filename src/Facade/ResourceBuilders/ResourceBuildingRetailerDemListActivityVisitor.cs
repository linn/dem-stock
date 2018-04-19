namespace Linn.DemStock.Facade.ResourceBuilders
{
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
                           ChangedOn = activity.ChangedOn.ToString("o"),
                           LastReviewedOn = activity.LastReviewedOn?.ToString("o")
                       };
        }

        public RetailerDemListActivityResource Visit(UpdateRootProductActivity activity)
        {
            return new UpdateRootProductActivityResource
                       {
                           ActivityType = activity.GetType().Name,
                           UpdatedByUri = activity.UpdatedByUri,
                           ChangedOn = activity.ChangedOn.ToString("o"),
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
                           ChangedOn = activity.ChangedOn.ToString("o"),
                           RetailerId = activity.RetailerId
                       };
        }
    }
}