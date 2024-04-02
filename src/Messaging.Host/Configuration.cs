namespace Linn.DemStock.Messaging.Host
{
    using Autofac;

    using Linn.Common.Messaging.RabbitMQ.Autofac;
    using Linn.DemStock.IoC;
    using Linn.DemStock.Messaging.Handlers;

    public static class Configuration
    {
        public static IContainer BuildContainer()
        {
            var builder = new ContainerBuilder();
            builder.RegisterModule<AmazonCredentialsModule>();
            builder.RegisterModule<AmazonSqsModule>();
            builder.RegisterModule<LoggingModule>();
            builder.RegisterModule<MessagingModule>();
            builder.RegisterModule<MessagingDatabaseModule>();
            builder.RegisterModule<PersistenceModule>();
            builder.RegisterModule<ServiceModule>();

            builder.RegisterReceiver("dem-stock.q", "dem-stock.dlx");

            builder.RegisterType<Listener>().AsSelf();
            builder.RegisterType<RetailerCreatedHandler>().AsSelf();
            builder.RegisterType<RetailerUpdatedHandler>().AsSelf();
            builder.RegisterType<InvoiceCreatedHandler>().AsSelf();
            builder.RegisterType<InvoiceAuditHandler>().AsSelf();

            return builder.Build();
        }
    }
}
