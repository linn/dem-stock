namespace Linn.DemStock.Domain.Repositories
{
    public interface IRetailerDemListRepository
    {
        RetailerDemList GetByRetailerId(int retailerId);

        void Add(RetailerDemList retailerDemList);
    }
}
