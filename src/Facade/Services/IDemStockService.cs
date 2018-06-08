namespace Linn.DemStock.Facade.Services
{
    using System;
    using System.Collections.Generic;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Models;
    using Linn.DemStock.Domain.RetailerDemListActivities;

    public interface IDemStockService
    {
        IResult<RetailerDemList> GetRetailerDemList(int retailerId);

        IResult<RootProduct> SetRetailerListRootProduct(int retailerId, string rootProductUri, int quantity, string employeeUri);

        IResult<RetailerDemList> UpdateRetailerDemListDetails(int retailerId, DateTime? lastReviewedOn, string employeeUri);

        IResult<IEnumerable<RetailerDemListActivity>> GetRetailerDemListActivities(int retailerId);

        IResult<IEnumerable<RetailerDemList>> GetRetailerDemListsByLastReviewed();

        IResult<IEnumerable<RetailerDemListModel>> GetRetailerDemListModelsByLastReviewed();

        IResult<IEnumerable<RetailerDemList>> GetRetailerDemListsWithoutProduct(string productUri);

        IResult<IEnumerable<RetailerDemListModel>> GetRetailerDemListModelsWithoutProduct(string productUri);
    }
}
