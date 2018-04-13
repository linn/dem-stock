namespace Linn.DemStock.Facade.Services
{
    using System;
    using System.Collections.Generic;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.RetailerDemListActivities;

    public interface IDemStockService
    {
        IResult<RetailerDemList> GetRetailerDemList(int retailerId);

        IResult<RootProduct> SetRetailerListRootProduct(int retailerId, string rootProductUri, int quantity);

        IResult<RetailerDemList> UpdateRetailerDemListDetails(int retailerId, DateTime? lastReviewedOn);

        IResult<IEnumerable<RetailerDemListActivity>> GetRetailerDemListActivities(int retailerId);
    }
}
