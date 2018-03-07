namespace Linn.DemStock.Facade.Services
{
    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    public interface IDemStockService
    {
        IResult<RetailerDemList> GetRetailer(string retailerUri);
    }
}
