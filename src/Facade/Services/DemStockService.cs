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

        public IResult<RetailerDemList> GetRetailer(string retailerUri)
        {
            throw new System.NotImplementedException();
        }
    }
}