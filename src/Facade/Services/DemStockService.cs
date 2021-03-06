﻿namespace Linn.DemStock.Facade.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using Linn.Common.Facade;
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Models;
    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Domain.RetailerDemListActivities;
    using Linn.DemStock.Facade.Extensions;
    using Linn.DemStock.Proxy;

    public class DemStockService : IDemStockService
    {
        private readonly ITransactionManager transactionManager;

        private readonly IRetailerDemListRepository retailerDemListRepository;

        private readonly IRetailerProxy retailerProxy;

        private readonly ISalesRegionProxy salesRegionProxy;

        private readonly IProductsProxy productsProxy;

        public DemStockService(
            ITransactionManager transactionManager,
            IRetailerDemListRepository retailerDemListRepository,
            IRetailerProxy retailerProxy,
            ISalesRegionProxy salesRegionProxy,
            IProductsProxy productsProxy)
        {
            this.transactionManager = transactionManager;
            this.retailerDemListRepository = retailerDemListRepository;
            this.retailerProxy = retailerProxy;
            this.salesRegionProxy = salesRegionProxy;
            this.productsProxy = productsProxy;
        }

        public IResult<RetailerDemList> GetRetailerDemList(int retailerId)
        {
            var retailerDemList = this.retailerDemListRepository.GetByRetailerId(retailerId);
            if (retailerDemList == null)
            {
                return new NotFoundResult<RetailerDemList>();
            }

            return new SuccessResult<RetailerDemList>(retailerDemList);
        }

        public IResult<RootProduct> SetRetailerListRootProduct(
            int retailerId,
            string rootProductUri,
            int quantity,
            string employeeUri)
        {
            var retailerDemList = this.retailerDemListRepository.GetByRetailerId(retailerId);
            if (retailerDemList == null)
            {
                return new NotFoundResult<RootProduct>();
            }

            var rootProduct = retailerDemList.SetRootProductQuantity(rootProductUri, employeeUri, quantity);

            this.transactionManager.Commit();
            return new SuccessResult<RootProduct>(rootProduct);
        }

        public IResult<RetailerDemList> UpdateRetailerDemListDetails(int retailerId, DateTime? lastReviewedOn, string employeeUri)
        {
            var retailerDemList = this.retailerDemListRepository.GetByRetailerId(retailerId);
            if (retailerDemList == null)
            {
                return new NotFoundResult<RetailerDemList>();
            }

            retailerDemList.SetLastReviewedDate(lastReviewedOn, employeeUri);

            this.transactionManager.Commit();
            return new SuccessResult<RetailerDemList>(retailerDemList);
        }

        public IResult<IEnumerable<RetailerDemListActivity>> GetRetailerDemListActivities(int retailerId)
        {
            var retailerDemList = this.retailerDemListRepository.GetByRetailerId(retailerId);
            if (retailerDemList == null)
            {
                return new NotFoundResult<IEnumerable<RetailerDemListActivity>>();
            }

            var activities = retailerDemList.Activities;

            return new SuccessResult<IEnumerable<RetailerDemListActivity>>(activities);
        }

        public IResult<IEnumerable<RetailerDemList>> GetRetailerDemListsByLastReviewed()
        {
            var retailerDemLists = this.retailerDemListRepository.GetRetailerDemLists();
            return new SuccessResult<IEnumerable<RetailerDemList>>(retailerDemLists.OrderBy(a => a.LastReviewedOn));
        }

        public IResult<IEnumerable<RetailerDemListModel>> GetRetailerDemListModelsByLastReviewed()
        {
            var retailerDemLists = this.retailerDemListRepository.GetRetailerDemLists();
            var models = this.ConvertToModels(retailerDemLists);

            return new SuccessResult<IEnumerable<RetailerDemListModel>>(
                models.OrderBy(a => a.LastReviewed).ThenBy(a => a.RetailerName));
        }

        public IResult<IEnumerable<RetailerDemList>> GetRetailerDemListsWithoutProduct(string productUri)
        {
            var retailerDemLists = this.retailerDemListRepository.GetRetailerDemLists();
            return new SuccessResult<IEnumerable<RetailerDemList>>(this.GetDemListsExludingProductUri(retailerDemLists, productUri));
        }

        public IResult<IEnumerable<RetailerDemListModel>> GetRetailerDemListModelsWithoutProduct(string productUri)
        {
            var retailerDemLists = this.retailerDemListRepository.GetRetailerDemLists();
            var models = this.ConvertToModels(this.GetDemListsExludingProductUri(retailerDemLists, productUri));

            return new SuccessResult<IEnumerable<RetailerDemListModel>>(
                models.OrderBy(a => a.LastReviewed).ThenBy(a => a.RetailerName));
        }

        public IResult<IEnumerable<RootProductOnDemModel>> GetAllRootProductsOnDem()
        {
            var retailers = this.retailerProxy.GetRetailers().ToList();
            var demLists = this.retailerDemListRepository.GetRetailerDemLists(true).ToArray();

            var rootProductUris = (from demList in demLists
                                   from rootProduct in demList.RootProducts
                                   select rootProduct.RootProductUri).ToList();

            var rootProductsResult = this.productsProxy.BatchGetRootProducts(rootProductUris.Distinct()).ToList();

            var rootProductsOnDem = (from demList in demLists
                           from rootProduct in demList.RootProducts
                           select new RootProductOnDemModel
                                      {
                                             Quantity = rootProduct.Quantity,
                                             RetailerId = demList.RetailerId,
                                             RetailerName = retailers.Find(r => r.Id == demList.RetailerId).Name,
                                             RootProductName = rootProductsResult.Find(rp => rp.Href == rootProduct.RootProductUri).Name,
                                             RootProductUri = rootProduct.RootProductUri,
                                             RootProductUpdatedOn = rootProduct.UpdatedOn.ToString("d")
                                         }).ToList();

            return new SuccessResult<IEnumerable<RootProductOnDemModel>>(rootProductsOnDem);
        }

        private IEnumerable<RetailerDemList> GetDemListsExludingProductUri(IEnumerable<RetailerDemList> retailerDemLists, string productUri)
        {
            return retailerDemLists.Where(r => !r.HasOnList(productUri));
        }

        private IEnumerable<RetailerDemListModel> ConvertToModels(IEnumerable<RetailerDemList> retailerDemLists)
        {
            var retailers = this.retailerProxy.GetRetailers().ToList();
            var salesRegions = this.salesRegionProxy.GetSalesRegions().ToList();

            var results = new List<RetailerDemListModel>();
            foreach (var retailerDemList in retailerDemLists)
            {
                var retailer = retailers.FirstOrDefault(r => r.Id == retailerDemList.RetailerId);
                var region = salesRegions.FirstOrDefault(
                    s => s.Links.First(l => l.Rel == "self").Href
                         == retailer?.Links.FirstOrDefault(rl => rl.Rel == "sales-region")?.Href);
                results.Add(retailerDemList.ToModel(retailer, region));
            }

            return results;
        }
    }
}