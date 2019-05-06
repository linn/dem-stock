namespace Linn.DemStock.Service.ResponseProcessors
{
    using System.Collections.Generic;

    using Linn.Common.Nancy.Facade;
    using Linn.DemStock.Domain.Models;

    public class RootProductsOnDemCsvResponseProcessor : CsvResponseProcessor<IEnumerable<RootProductOnDemModel>>
    {
        public RootProductsOnDemCsvResponseProcessor() : base(null, "retailer-dem-lists", 1)
        {
        }
    }
}