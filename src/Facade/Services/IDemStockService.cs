namespace Linn.DemStock.Facade.Services
{
    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    public interface IDemStockService
    {
        IResult<RetailerDemList> GetRetailerDemList(string retailerUri);

        IResult<RootProduct> SetRetailerListRootProduct(int retailerDemListId, string rootProductUri, int quantity);
    }
}
