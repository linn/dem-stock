﻿namespace Linn.DemStock.Service.Modules
{
    using Linn.DemStock.Facade.Services;
    using Linn.DemStock.Resources.RequestResources;

    using Nancy;
    using Nancy.ModelBinding;

    public sealed class RetailerDemListModule : NancyModule
    {
        private readonly IDemStockService demStockService;

        public RetailerDemListModule(IDemStockService demStockService)
        {
            this.demStockService = demStockService;
            this.Get("/retailers/{retailerId:int}/dem-stock", parameters => this.GetRetailerDemListById(parameters.retailerId));
            this.Put("/retailers/{retailerId:int}/dem-stock/products", parameters => this.SetRootProductQuantity(parameters.retailerId));
        }

        private object GetRetailerDemListById(int retailerId)
        {
            var retailerDemList = this.demStockService.GetRetailerDemList(retailerId);

            return this.Negotiate.WithModel(retailerDemList).WithView("Index");
        }

        private object SetRootProductQuantity(int retailerId)
        {
            var resource = this.Bind<SetRootProductRequestResource>();

            var rootProduct = this.demStockService.SetRetailerListRootProduct(
                retailerId,
                resource.RootProductUri,
                resource.Quantity);

            return this.Negotiate.WithModel(rootProduct);
        }
    }
}