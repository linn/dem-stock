namespace Linn.DemStock.IoC
{
    using Amazon.SQS;
    using Autofac;

    using Linn.Common.Facade;
    using Linn.Common.Logging;
    using Linn.Common.Logging.AmazonSqs;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Facade;
    using Linn.DemStock.Facade.ResourceBuilders;

    public class ServiceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // services
            builder.RegisterType<DemStockService>().As<IDemStockService>();

            // resource builders
            builder.RegisterType<RetailerDemListResourceBuilder>().As<IResourceBuilder<RetailerDemList>>();
        }
    }
}