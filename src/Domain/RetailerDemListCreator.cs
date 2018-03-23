namespace Linn.DemStock.Domain
{
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain.Exceptions;
    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Domain.RetailerDemListActivities;

    public class RetailerDemListCreator : ActivityEntity<RetailerDemListActivity>
    {
        private readonly ITransactionManager transactionManager;
        private readonly IRetailerDemListRepository retailerDemListRepository;

        public RetailerDemListCreator(
            ITransactionManager transactionManager,
            IRetailerDemListRepository retailerDemListRepository)
        {
            this.transactionManager = transactionManager;
            this.retailerDemListRepository = retailerDemListRepository;
        }

        private RetailerDemListCreator()
        {
            // ef
        }

        public RetailerDemList CreateRetailerDemList(int retailerId, string createdBy)
        {
            if (this.retailerDemListRepository.GetByRetailerId(retailerId) != null)
            {
                throw new DuplicateRetailerDemListException($"Retailer {retailerId} already has a Dem List");
            }

            var retailerDemList = new RetailerDemList(retailerId);

            this.Activities.Add(new CreateRetailerDemListActivity(createdBy));

            this.retailerDemListRepository.Add(retailerDemList);

            this.transactionManager.Commit();

            return retailerDemList;
        }
    }
}
