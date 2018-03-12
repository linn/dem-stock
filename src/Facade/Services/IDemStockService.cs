namespace Linn.DemStock.Facade.Services
{
    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    public interface IDemStockService
    {
        IResult<RetailerDemList> GetRetailerDemList(string retailerDemListUri);

        IResult<RetailerDemList> GetRetailerDemListById(int retailerDemListId);

        IResult<RootProduct> SetRetailerListRootProduct(int retailerDemListId, string rootProductUri, int quantity);
    }
}
