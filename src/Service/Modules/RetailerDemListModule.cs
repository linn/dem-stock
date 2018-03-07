namespace Linn.DemStock.Service.Modules
{
    using Linn.DemStock.Facade;
    using Linn.DemStock.Resources.RequestResources;

    using Nancy;
    using Nancy.ModelBinding;

    public sealed class RetailerDemListModule : NancyModule
    {
        private readonly IDemStockService demStockService;

        public RetailerDemListModule(IDemStockService demStockService)
        {
            this.demStockService = demStockService;
            this.Get("/sales/dem-stock/retailers", _ => this.GetRetailer());
        }

        private object GetRetailer()
        {
            var resource = this.Bind<RetailerUriRequestResource>();

            var retailer = this.demStockService.GetRetailer(resource.RetailerUri);

            return this.Negotiate.WithModel(retailer);
        }
    }
}