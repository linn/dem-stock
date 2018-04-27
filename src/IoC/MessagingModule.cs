namespace Linn.DemStock.IoC
{
    using Autofac;

    using Linn.Common.Messaging.RabbitMQ.Autofac;
    using Linn.DemStock.Messaging;

    public class MessagingModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterConnectionBuilder();
            builder.RegisterInfiniteRetryStrategy();
            builder.RegisterConnector();
            builder.RegisterConfiguration();

            builder.RegisterType<InvoiceProcessingService>().As<IInvoiceProcessingService>();
        }
    }
}
