namespace Linn.DemStock.Facade.Services
{
    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Repositories;

    public class DemStockService : IDemStockService
    {
        private readonly IRetailerDemListRepository retailerDemListRepository;

        public DemStockService(IRetailerDemListRepository retailerDemListRepository)
        {
            this.retailerDemListRepository = retailerDemListRepository;
        }

        public IResult<RetailerDemList> GetRetailerDemList(string retailerUri)
        {
            var retailerDemList = this.retailerDemListRepository.GetByRetailerUri(retailerUri);
            if (retailerDemList == null)
            {
                return new NotFoundResult<RetailerDemList>();
            }

            return new SuccessResult<RetailerDemList>(retailerDemList);
        }

        public IResult<RootProduct> SetRetailerListRootProduct(int retailerDemListId, string rootProductUri, int quantity)
        {
            throw new System.NotImplementedException();
        }
    }
}