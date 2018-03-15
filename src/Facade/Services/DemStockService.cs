namespace Linn.DemStock.Facade.Services
{
    using System;

    using Linn.Common.Facade;
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Repositories;

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
            int quantity)
        {
            var retailerDemList = this.retailerDemListRepository.GetByRetailerId(retailerId);
            if (retailerDemList == null)
            {
                return new NotFoundResult<RootProduct>();
            }

            var rootProduct = retailerDemList.SetRootProductQuantity(rootProductUri, null, quantity);

            this.transactionManager.Commit();
            return new SuccessResult<RootProduct>(rootProduct);
        }

        public IResult<RetailerDemList> UpdateRetailerDemListDetails(int retailerId, DateTime? lastReviewedOn)
        {
            var retailerDemList = this.retailerDemListRepository.GetByRetailerId(retailerId);
            if (retailerDemList == null)
            {
                return new NotFoundResult<RetailerDemList>();
            }

            retailerDemList.SetLastReviewedDate(lastReviewedOn, null);

            this.transactionManager.Commit();
            return new SuccessResult<RetailerDemList>(retailerDemList);
        }
    }
}