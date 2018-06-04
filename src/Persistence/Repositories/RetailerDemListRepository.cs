namespace Linn.DemStock.Persistence.Repositories
{
    using System.Collections.Generic;
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
                .Include(s => s.Activities)
                .SingleOrDefault(s => s.RetailerId == retailerId);
        }

        public void Add(RetailerDemList retailerDemList)
        {
            this.serviceDbContext.RetailerDemLists.Add(retailerDemList);
        }

        public IEnumerable<RetailerDemList> GetRetailerDemLists(bool openRetailersOnly = true)
        {
            var demLists = this.serviceDbContext.RetailerDemLists.AsEnumerable();
            if (openRetailersOnly)
            {
                demLists = demLists.Where(d => d.IsForOpenRetailer);
            }

            return demLists;
        }
    }
}