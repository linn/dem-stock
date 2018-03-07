namespace Linn.DemStock.IoC
{
    using Autofac;

    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Persistence.Repositories;

    public class PersistenceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<RetailerDemListRepository>().As<IRetailerDemListRepository>();
        }
    }
}