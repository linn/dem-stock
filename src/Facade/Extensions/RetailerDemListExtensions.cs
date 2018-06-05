namespace Linn.DemStock.Facade.Extensions
{
    using System;

    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Models;
    using Linn.DemStock.Resources.External;

    public static class RetailerDemListExtensions
    {
        public static RetailerDemListModel ToModel(
            this RetailerDemList domain,
            RetailerResource retailer,
            SalesRegionResource salesRegion)
        {
            return new RetailerDemListModel
                       {
                           RetailerId = domain.RetailerId,
                           RetailerName = retailer?.Name,
                           LastReviewed =
                               domain.LastReviewedOn.HasValue
                                   ? DateTime.SpecifyKind(domain.LastReviewedOn.Value, DateTimeKind.Utc).ToString("d")
                                   : null,
                           SalesRegion = salesRegion?.Name
                       };
        }
    }
}
