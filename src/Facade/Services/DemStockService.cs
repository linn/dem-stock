namespace Linn.DemStock.Facade.Services
{
    using System;
    using System.Collections.Generic;

    using Linn.Common.Facade;
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Domain.RetailerDemListActivities;

    public class DemStockService : IDemStockService
    {
        private readonly ITransactionManager transactionManager;

        private readonly IRetailerDemListRepository retailerDemListRepository;

        public DemStockService(
            ITransactionManager transactionManager,
            IRetailerDemListRepository retailerDemListRepository)
        {
            this.transactionManager = transactionManager;
            this.retailerDemListRepository = retailerDemListRepository;
        }

        public IResult<RetailerDemList> GetRetailerDemList(int retailerId)
        {
            var retailerDemList = this.retailerDemListRepository.GetByRetailerId(retailerId);
            if (retailerDemList == null)
            {
                return new NotFoundResult<RetailerDemList>();
            }

            return new SuccessResult<RetailerDemList>(retailerDemList);
        }

        public IResult<RootProduct> SetRetailerListRootProduct(
            int retailerId,
            string rootProductUri,
            int quantity,
            string employeeUri)
        {
            var retailerDemList = this.retailerDemListRepository.GetByRetailerId(retailerId);
            if (retailerDemList == null)
            {
                return new NotFoundResult<RootProduct>();
            }

            var rootProduct = retailerDemList.SetRootProductQuantity(rootProductUri, employeeUri, quantity);

            this.transactionManager.Commit();
            return new SuccessResult<RootProduct>(rootProduct);
        }

        public IResult<RetailerDemList> UpdateRetailerDemListDetails(int retailerId, DateTime? lastReviewedOn, string employeeUri)
        {
            var retailerDemList = this.retailerDemListRepository.GetByRetailerId(retailerId);
            if (retailerDemList == null)
            {
                return new NotFoundResult<RetailerDemList>();
            }

            retailerDemList.SetLastReviewedDate(lastReviewedOn, employeeUri);

            this.transactionManager.Commit();
            return new SuccessResult<RetailerDemList>(retailerDemList);
        }

        public IResult<IEnumerable<RetailerDemListActivity>> GetRetailerDemListActivities(int retailerId)
        {
            var retailerDemList = this.retailerDemListRepository.GetByRetailerId(retailerId);
            if (retailerDemList == null)
            {
                return new NotFoundResult<IEnumerable<RetailerDemListActivity>>();
            }

            var activities = retailerDemList.Activities;

            return new SuccessResult<IEnumerable<RetailerDemListActivity>>(activities);
        }
    }
}