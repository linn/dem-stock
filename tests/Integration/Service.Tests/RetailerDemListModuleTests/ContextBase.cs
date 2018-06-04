namespace Linn.DemStock.Service.Tests.RetailerDemListModuleTests
{
    using System.Collections.Generic;
    using System.Security.Claims;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.RetailerDemListActivities;
    using Linn.DemStock.Facade.ResourceBuilders;
    using Linn.DemStock.Facade.Services;
    using Linn.DemStock.Service.Modules;
    using Linn.DemStock.Service.ResponseProcessors;

    using Nancy.Testing;

    using NSubstitute;

    using NUnit.Framework;

    public abstract class ContextBase : NancyContextBase
    {
        protected IDemStockService DemStockService { get; private set; }

        [SetUp]
        public void EstablishContext()
        {
            this.DemStockService = Substitute.For<IDemStockService>();

            var bootstrapper = new ConfigurableBootstrapper(
                with =>
                {
                    with.Dependency(this.DemStockService);
                    with.Dependency<IResourceBuilder<RetailerDemList>>(new RetailerDemListResourceBuilder());
                    with.Dependency<IResourceBuilder<IEnumerable<RetailerDemList>>>(new RetailerDemListsResourceBuilder());
                    with.Dependency<IResourceBuilder<RootProduct>>(new RootProductResourceBuilder());
                    with.Dependency<IResourceBuilder<IEnumerable<RetailerDemListActivity>>>(new RetailerDemListActivitiesResourceBuilder());
                    with.Module<RetailerDemListModule>();
                    with.ResponseProcessor<RetailerDemListJsonResponseProcessor>();
                    with.ResponseProcessor<RetailerDemListsJsonResponseProcessor>();
                    with.ResponseProcessor<RootProductJsonResponseProcessor>();
                    with.ResponseProcessor<RetailerDemListActivitiesJsonResponseProcessor>();

                    with.RequestStartup(
                        (container, pipelines, context) =>
                            {
                                var claims = new List<Claim>
                                                 {
                                                     new Claim(ClaimTypes.Role, "employee"),
                                                     new Claim(ClaimTypes.NameIdentifier, "test-user")
                                                 };

                                var user = new ClaimsIdentity(claims, "jwt");

                                context.CurrentUser = new System.Security.Claims.ClaimsPrincipal(user);
                            });
                });

            this.Browser = new Browser(bootstrapper);
        }
    }
}