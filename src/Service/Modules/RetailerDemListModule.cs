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
            this.Get("/sales/dem-stock/retailer-dem-lists", _ => this.GetRetailerDemList());
            this.Get("/sales/dem-stock/retailer-dem-lists/{retailerDemListId:int}", parameters => this.GetRetailerDemListById(parameters.retailerDemListId));
            this.Put("/sales/dem-stock/retailer-dem-lists/{retailerDemListId:int}/products", parameters => this.SetRootProductQuantity(parameters.retailerDemListId));
        }

        private object GetRetailerDemListById(int retailerDemListId)
        {
            var retailerDemList = this.demStockService.GetRetailerDemListById(retailerDemListId);

            return this.Negotiate.WithModel(retailerDemList).WithView("Index");
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

        private object GetRetailerDemList()
        {
            var resource = this.Bind<RetailerUriRequestResource>();

            var retailerDemList = this.demStockService.GetRetailerDemList(resource.RetailerUri);

            return this.Negotiate.WithModel(retailerDemList);
        }
    }
}