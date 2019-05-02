namespace Linn.DemStock.Service.Modules
{
    using System;

    using Linn.DemStock.Facade.Services;
    using Linn.DemStock.Resources.RequestResources;
    using Linn.DemStock.Service.Extensions;
    using Linn.DemStock.Service.Models;

    using Nancy;
    using Nancy.ModelBinding;
    using Nancy.Security;

    public sealed class RetailerDemListModule : NancyModule
    {
        private readonly IDemStockService demStockService;

        public RetailerDemListModule(IDemStockService demStockService)
        {
            this.demStockService = demStockService;
            this.Get("/retailers/{retailerId:int}/dem-stock", parameters => this.GetRetailerDemListById(parameters.retailerId));
            this.Get("/retailers/{retailerId:int}/dem-stock/activities", parameters => this.GetRetailerDemListActivitiesById(parameters.retailerId));
            this.Put("/retailers/{retailerId:int}/dem-stock/products", parameters => this.SetRootProductQuantity(parameters.retailerId));
            this.Put("/retailers/{retailerId:int}/dem-stock", parameters => this.SetLastReviewedDate(parameters.retailerId));
            this.Get("/retailers/dem-stock/last-reviewed", _ => this.GetRetailerDemListsByLastReviewed());
            this.Get("/retailers/dem-stock/last-reviewed/export", _ => this.GetRetailerDemListsByLastReviewedExport());
            this.Get("/retailers/dem-stock/lists-without-product", _ => this.GetRetailerDemListsExcludingProduct());
            this.Get("/retailers/dem-stock/lists-without-product/export", _ => this.GetRetailerDemListsExcludingProductExport());
            this.Get("/retailers/dem-stock/root-products/export", _ => this.GetAllRootProductsOnDemExport());
        }

        private object GetAllRootProductsOnDemExport()
        {
            var rootProductsOnDem = this.demStockService.GetAllRootProductsOnDem();
            return this.Negotiate
                .WithModel(rootProductsOnDem)
                .WithAllowedMediaRange("text/csv")
                .WithView("Index");
        }

        private object GetRetailerDemListsExcludingProductExport()
        {
            var resource = this.Bind<ProductUriResource>();
            var retailerDemListModels = this.demStockService.GetRetailerDemListModelsWithoutProduct(resource.ProductUri);
            return this.Negotiate
                .WithModel(retailerDemListModels)
                .WithAllowedMediaRange("text/csv")
                .WithView("Index");
        }

        private object GetRetailerDemListsExcludingProduct()
        {
            this.RequiresAuthentication();

            var resource = this.Bind<ProductUriResource>();
            var retailerDemLists = this.demStockService.GetRetailerDemListsWithoutProduct(resource.ProductUri);
            return this.Negotiate
                .WithModel(retailerDemLists)
                .WithMediaRangeModel("text/html", ApplicationSettings.Get)
                .WithView("Index");
        }

        private object GetRetailerDemListsByLastReviewedExport()
        {
            this.RequiresAuthentication();

            var retailerDemListModels = this.demStockService.GetRetailerDemListModelsByLastReviewed();
            return this.Negotiate
                .WithModel(retailerDemListModels)
                .WithAllowedMediaRange("text/csv")
                .WithView("Index");
        }

        private object GetRetailerDemListsByLastReviewed()
        {
            this.RequiresAuthentication();

            var retailerDemList = this.demStockService.GetRetailerDemListsByLastReviewed();

            return this.Negotiate
                .WithModel(retailerDemList)
                .WithMediaRangeModel("text/html", ApplicationSettings.Get)
                .WithView("Index");
        }

        private object SetLastReviewedDate(int retailerId)
        {
            this.RequiresAuthentication();

            var employeeUri = this.Context.CurrentUser.GetEmployeeUri();

            var resource = this.Bind<UpdateDateRequestResource>();

            var reviewedDate = string.IsNullOrEmpty(resource.UpdatedDate)
                                   ? (DateTime?)null
                                   : DateTime.Parse(resource.UpdatedDate);

            var retailerDemList = this.demStockService.UpdateRetailerDemListDetails(retailerId, reviewedDate, employeeUri);

            return this.Negotiate.WithModel(retailerDemList);
        }

        private object GetRetailerDemListById(int retailerId)
        {
            var retailerDemList = this.demStockService.GetRetailerDemList(retailerId);

            return this.Negotiate
                .WithModel(retailerDemList)
                .WithMediaRangeModel("text/html", ApplicationSettings.Get)
                .WithView("Index");
        }

        private object GetRetailerDemListActivitiesById(int retailerId)
        {
            this.RequiresAuthentication();

            var activities = this.demStockService.GetRetailerDemListActivities(retailerId);

            return this.Negotiate.WithModel(activities);
        }

        private object SetRootProductQuantity(int retailerId)
        {
            this.RequiresAuthentication();

            var employeeUri = this.Context.CurrentUser.GetEmployeeUri();

            var resource = this.Bind<SetRootProductRequestResource>();

            var rootProduct = this.demStockService.SetRetailerListRootProduct(
                retailerId,
                resource.RootProductUri,
                resource.Quantity,
                employeeUri);

            return this.Negotiate.WithModel(rootProduct);
        }
    }
}