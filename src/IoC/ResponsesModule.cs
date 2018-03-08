namespace Linn.DemStock.IoC
{
    using Autofac;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Facade.ResourceBuilders;

    public class ResponsesModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // resource builders
            builder.RegisterType<RetailerDemListResourceBuilder>().As<IResourceBuilder<RetailerDemList>>();
            builder.RegisterType<RootProductResourceBuilder>().As<IResourceBuilder<RootProduct>>();
        }
    }
}
