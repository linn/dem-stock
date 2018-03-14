namespace Linn.DemStock.Facade.Services
{
    using System;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    public interface IDemStockService
    {
        IResult<RetailerDemList> GetRetailerDemList(int retailerId);

        IResult<RootProduct> SetRetailerListRootProduct(int retailerId, string rootProductUri, int quantity);

        IResult<RetailerDemList> UpdateRetailerDemListDetails(int retailerId, DateTime? lastReviewedOn);
    }
}
