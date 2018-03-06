﻿namespace Linn.DemStock.Facade
{
    using Linn.Common.Facade;
    using Linn.DemStock.Domain;

    public interface IDemStockService
    {
        IResult<Retailer> GetRetailer(string retailerUri);
    }
}
