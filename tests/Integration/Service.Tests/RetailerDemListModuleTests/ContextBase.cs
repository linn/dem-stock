namespace Linn.DemStock.Service.Tests.RetailerDemListModuleTests
{
    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Facade;
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
                    with.Module<RetailerDemListModule>();
                    with.ResponseProcessor<RetailerDemListJsonResponseProcessor>();
                });

            this.Browser = new Browser(bootstrapper);
        }
    }
}