namespace Linn.DemStock.IoC
{
    using System.Collections.Generic;

    using Autofac;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.RetailerDemListActivities;
    using Linn.DemStock.Facade.ResourceBuilders;

    public class ResponsesModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // resource builders
            builder.RegisterType<RetailerDemListResourceBuilder>().As<IResourceBuilder<RetailerDemList>>();
            builder.RegisterType<RootProductResourceBuilder>().As<IResourceBuilder<RootProduct>>();
            builder.RegisterType<RetailerDemListActivitiesResourceBuilder>().As<IResourceBuilder<IEnumerable<RetailerDemListActivity>>>();
        }
    }
}
