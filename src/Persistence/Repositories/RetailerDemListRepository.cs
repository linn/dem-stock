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

        public RetailerDemList GetById(int id)
        {
            return this.serviceDbContext.RetailerDemLists.Include(s => s.RootProducts)
                .SingleOrDefault(s => s.Id == id);
        }

        public RetailerDemList GetByRetailerUri(string retailerUri)
        {
            return this.serviceDbContext.RetailerDemLists.Include(s => s.RootProducts)
                .SingleOrDefault(s => s.RetailerUri.ToLower() == retailerUri.ToLower());
        }

        public void Add(RetailerDemList retailerDemList)
        {
            this.serviceDbContext.RetailerDemLists.Add(retailerDemList);
        }
    }
}