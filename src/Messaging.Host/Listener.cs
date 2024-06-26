﻿namespace Linn.DemStock.Messaging.Host
{
    using System;
    using System.Threading;

    using Autofac;

    using Linn.Common.Logging;
    using Linn.Common.Messaging.RabbitMQ;
    using Linn.Common.Messaging.RabbitMQ.Unicast;
    using Linn.DemStock.Messaging.Handlers;

    public class Listener
    {
        private readonly IReceiver receiver;
        private readonly DedupingMessageConsumer consumer;
        private readonly ILog logger;

        public Listener(ILifetimeScope scope, ILog logger)
        {
            this.logger = logger;
            this.receiver = scope.Resolve<IReceiver>();
            this.consumer = new DedupingMessageConsumer(new MessageConsumer(this.receiver), this.receiver);

            this.logger.Info("Started dem stock listener");

            this.consumer.For("retailers.retailer.created")
                .OnConsumed(m =>
                    {
                        using (var handlerScope = scope.BeginLifetimeScope("messageHandler"))
                        {
                            var handler = handlerScope.Resolve<RetailerCreatedHandler>();
                            return handler.Execute(m);
                        }
                    })
                .OnRejected(this.LogRejection);

            this.consumer.For("retailers.retailer.updated")
                .OnConsumed(m =>
                    {
                        using (var handlerScope = scope.BeginLifetimeScope("messageHandler"))
                        {
                            var handler = handlerScope.Resolve<RetailerUpdatedHandler>();
                            return handler.Execute(m);
                        }
                    })
                .OnRejected(this.LogRejection);

            this.consumer.For("invoicing.invoice.created")
                .OnConsumed(m =>
                    {
                        using (var handlerScope = scope.BeginLifetimeScope("messageHandler"))
                        {
                            var handler = handlerScope.Resolve<InvoiceCreatedHandler>();
                            return handler.Execute(m);
                        }
                    })
                .OnRejected(this.LogRejection);

            this.consumer.For("invoicing.invoice.audited")
                .OnConsumed(m =>
                    {
                        using (var handlerScope = scope.BeginLifetimeScope("messageHandler"))
                        {
                            var handler = handlerScope.Resolve<InvoiceAuditHandler>();
                            return handler.Execute(m);
                        }
                    })
                .OnRejected(this.LogRejection);
        }

        public void Listen()
        {
            try
            {
                var message = this.receiver.Receive(5000);
                this.consumer.Consume(message);
            }
            catch (Exception e)
            {
                this.logger.Error("Exception thrown by message handler: " + e.Message, e);
                Thread.Sleep(1000);
            }
        }

        private void LogRejection(IReceivedMessage message)
        {
            Console.WriteLine($"The message with Id {message.MessageId} was rejected.");
            this.logger.Error($"The message with Id {message.MessageId} was rejected.");
        }
    }
}
