namespace Linn.DemStock.Facade.ResourceBuilders
{
    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Exceptions;
    using Linn.DemStock.Domain.RetailerDemListActivities;
    using Linn.DemStock.Resources;

    public class RetailerDemListActivityResourceBuilder : IResourceBuilder<Activity>
    {
        public RetailerDemListActivityResource Build(Activity activity)
        {
            switch (activity)
            {
                case UpdateRootProductActivity updateRootProductActivity:
                    return new UpdateRootProductActivityResource
                               {
                                   ActivityType = updateRootProductActivity.GetType().Name,
                                   UpdatedByUri = updateRootProductActivity.UpdatedByUri,
                                   ChangedOn = updateRootProductActivity.ChangedOn.ToString("o"),
                                   RootProductUri = updateRootProductActivity.RootProductUri,
                                   Quantity = updateRootProductActivity.Quantity
                               };
                case UpdateLastReviewedOnActivity updateLastReviewedOnActivity:
                    return new UpdateLastReviewedOnActivityResource
                               {
                                   ActivityType = updateLastReviewedOnActivity.GetType().Name,
                                   UpdatedByUri = updateLastReviewedOnActivity.UpdatedByUri,
                                   ChangedOn = updateLastReviewedOnActivity.ChangedOn.ToString("o"),
                                   LastReviewedOn = updateLastReviewedOnActivity.LastReviewedOn?.ToString("o")
                               };
                default:
                    throw new InvalidActivityException($"Invalid activity: {activity.GetType().Name} ");
            }
        }

        public string GetLocation(Activity model)
        {
            throw new System.NotImplementedException();
        }

        object IResourceBuilder<Activity>.Build(Activity activity) => this.Build(activity);
    }
}