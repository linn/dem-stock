namespace Linn.DemStock.Facade.Services
{
    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    public interface IDemStockService
    {
        IResult<RetailerDemList> GetRetailerDemList(int retailerId);

        IResult<RootProduct> SetRetailerListRootProduct(int retailerId, string rootProductUri, int quantity);
    }
}
