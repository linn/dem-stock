namespace Linn.DemStock.IoC
{
    using Autofac;

    using Linn.Common.Configuration;
    using Linn.DemStock.Facade.Services;
    using Linn.DemStock.Proxy;

    public class ServiceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // services
            builder.RegisterType<DemStockService>().As<IDemStockService>();

            // proxies
            builder.RegisterType<RetailerProxy>().As<IRetailerProxy>().WithParameter("rootUri", ConfigurationManager.Configuration["PROXY_ROOT"]);
            builder.RegisterType<ProductsProxy>().As<IProductsProxy>().WithParameter("rootUri", ConfigurationManager.Configuration["PROXY_ROOT"]);

        }
    }
}