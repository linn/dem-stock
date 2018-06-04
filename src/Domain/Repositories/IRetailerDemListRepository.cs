namespace Linn.DemStock.Domain.Repositories
{
    using System.Collections.Generic;

    public interface IRetailerDemListRepository
    {
        RetailerDemList GetByRetailerId(int retailerId);

        void Add(RetailerDemList retailerDemList);

        IEnumerable<RetailerDemList> GetRetailerDemLists(bool openRetailersOnly = true);
    }
}
