namespace Linn.DemStock.Service.Tests
{
    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Facade;
    using Linn.DemStock.Facade.ResourceBuilders;
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
                    with.Dependency<IResourceBuilder<Retailer>>(new RetailerResourceBuilder());
                    with.Module<RetailerModule>();
                    with.ResponseProcessor<RetailerJsonResponseProcessor>();
                });

            this.Browser = new Browser(bootstrapper);
        }
    }
}