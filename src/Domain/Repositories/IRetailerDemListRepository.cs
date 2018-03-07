namespace Linn.DemStock.Domain.Repositories
{
    public interface IRetailerDemListRepository
    {
        RetailerDemList GetById(int id);

        RetailerDemList GetByRetailerUri(string retailerUri);

        void Add(RetailerDemList retailerDemList);
    }
}
