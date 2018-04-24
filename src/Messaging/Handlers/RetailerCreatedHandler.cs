namespace Linn.DemStock.Messaging.Handlers
{
    using System.Text;

    using Linn.Common.Logging;
    using Linn.Common.Messaging.RabbitMQ;
    using Linn.Common.Messaging.RabbitMQ.Unicast;
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Resources.External;

    using Newtonsoft.Json;

    public class RetailerCreatedHandler
    {
        private readonly ITransactionManager transactionManager;

        private readonly ILog log;

        private readonly IRabbitTerminator rabbitTerminator;

        private readonly IRetailerDemListRepository retailerDemListRepository;

        public RetailerCreatedHandler(
            ITransactionManager transactionManager,
            ILog log,
            IRabbitTerminator rabbitTerminator,
            IRetailerDemListRepository retailerDemListRepository)
        {
            this.transactionManager = transactionManager;
            this.log = log;
            this.rabbitTerminator = rabbitTerminator;
            this.retailerDemListRepository = retailerDemListRepository;
        }

        public bool Execute(IReceivedMessage message)
        {
            var content = Encoding.UTF8.GetString(message.Body);
            var resource = JsonConvert.DeserializeObject<RetailerResource>(content);
            this.log.Info($"Creating dem list for retailer {resource.Id} {resource.Name}");

            var factory = new RetailerDemListCreator(this.retailerDemListRepository);
            factory.CreateRetailerDemList(resource.Id, "/employees/100");

            this.rabbitTerminator.Close();
            this.transactionManager.Commit();

            return true;
        }
    }
}