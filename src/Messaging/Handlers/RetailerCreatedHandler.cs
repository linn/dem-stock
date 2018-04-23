namespace Linn.DemStock.Messaging.Handlers
{
    using System.Text;

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

        private readonly IRabbitTerminator rabbitTerminator;

        private readonly IRetailerDemListRepository retailerDemListRepository;

        public RetailerCreatedHandler(
            ITransactionManager transactionManager,
            IRabbitTerminator rabbitTerminator,
            IRetailerDemListRepository retailerDemListRepository)
        {
            this.transactionManager = transactionManager;
            this.rabbitTerminator = rabbitTerminator;
            this.retailerDemListRepository = retailerDemListRepository;
        }

        public bool Execute(IReceivedMessage message)
        {
            var content = Encoding.UTF8.GetString(message.Body);
            var resource = JsonConvert.DeserializeObject<RetailerResource>(content);

            var factory = new RetailerDemListCreator(this.retailerDemListRepository);

            factory.CreateRetailerDemList(resource.Id, "/employees/100");

            this.rabbitTerminator.Close();
            this.transactionManager.Commit();

            return true;
        }
    }
}