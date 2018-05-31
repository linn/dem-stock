namespace Linn.DemStock.Domain
{
    using Linn.DemStock.Domain.Exceptions;
    using Linn.DemStock.Domain.Repositories;

    public class RetailerDemListCreator
    {
        private readonly IRetailerDemListRepository retailerDemListRepository;

        public RetailerDemListCreator(IRetailerDemListRepository retailerDemListRepository)
        {
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

            var retailerDemList = new RetailerDemList(retailerId, createdBy);

            this.retailerDemListRepository.Add(retailerDemList);

            return retailerDemList;
        }
    }
}
