namespace Linn.DemStock.Domain
{
    using Linn.DemStock.Domain.RetailerDemListActivities;

    public interface IRetailerDemListActivityVisitor<out T>
    {
        T Visit(UpdateLastReviewedOnActivity activity);

        T Visit(UpdateRootProductActivity activity);

        T Visit(CreateRetailerDemListActivity activity);

        T Visit(UpdateIsOpenActivity activity);
    }
}