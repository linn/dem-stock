namespace Linn.DemStock.IoC
{
    using Autofac;

    using Linn.Common.Persistence;
    using Linn.Common.Persistence.EntityFramework;
    using Linn.DemStock.Persistence;

    using Microsoft.EntityFrameworkCore;

    public class MessagingDatabaseModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<ServiceDbContext>().AsSelf().As<DbContext>().InstancePerMatchingLifetimeScope("messageHandler");
            builder.RegisterType<TransactionManager>().As<ITransactionManager>();
        }
    }
}