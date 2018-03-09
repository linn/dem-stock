namespace Linn.DemStock.Service.Modules
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
            this.Get("/sales/dem-stock/retailer-dem-lists", _ => this.GetRetailer());
            this.Put("/sales/dem-stock/retailer-dem-lists/{retailerListId:int}/products", parameters => this.SetRootProductQuantity(parameters.retailerListId));
        }

        private object SetRootProductQuantity(int retailerListId)
        {
            var resource = this.Bind<SetRootProductRequestResource>();

            var rootProduct = this.demStockService.SetRetailerListRootProduct(
                retailerListId,
                resource.RootProductUri,
                resource.Quantity);

            return this.Negotiate.WithModel(rootProduct);
        }

        private object GetRetailer()
        {
            var resource = this.Bind<RetailerUriRequestResource>();

            var retailer = this.demStockService.GetRetailerDemList(resource.RetailerUri);

            return this.Negotiate.WithModel(retailer);
        }
    }
}