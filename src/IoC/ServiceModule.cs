namespace Linn.DemStock.IoC
{
    using Autofac;

    using Linn.DemStock.Facade.Services;

    public class ServiceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // services
            builder.RegisterType<DemStockService>().As<IDemStockService>();
        }
    }
}