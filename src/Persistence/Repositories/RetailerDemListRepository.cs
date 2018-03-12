namespace Linn.DemStock.Persistence.Repositories
{
    using System.Linq;

    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Repositories;

    using Microsoft.EntityFrameworkCore;

    public class RetailerDemListRepository : IRetailerDemListRepository
    {
        private readonly ServiceDbContext serviceDbContext;

        public RetailerDemListRepository(ServiceDbContext serviceDbContext)
        {
            this.serviceDbContext = serviceDbContext;
        }

        public RetailerDemList GetByRetailerId(int retailerId)
        {
            return this.serviceDbContext.RetailerDemLists.Include(s => s.RootProducts)
                .SingleOrDefault(s => s.RetailerId == retailerId);
        }

        public void Add(RetailerDemList retailerDemList)
        {
            this.serviceDbContext.RetailerDemLists.Add(retailerDemList);
        }
    }
}