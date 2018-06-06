namespace Linn.DemStock.Service.ResponseProcessors
{
    using System.Collections.Generic;

    using Linn.Common.Nancy.Facade;
    using Linn.DemStock.Domain.Models;

    public class RetailerDemListsCsvResponseProcessor : CsvResponseProcessor<IEnumerable<RetailerDemListModel>>
    {
        public RetailerDemListsCsvResponseProcessor() : base(null, "retailer-dem-lists", 1)
        {
        }
    }
}