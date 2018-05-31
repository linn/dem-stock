namespace Linn.DemStock.Messaging.Handlers
{
    using System.Text;

    using Linn.Common.Logging;
    using Linn.Common.Messaging.RabbitMQ.Unicast;
    using Linn.Common.Persistence;
    using Linn.DemStock.Domain.Repositories;
    using Linn.DemStock.Resources.External;

    using Newtonsoft.Json;

    public class RetailerUpdatedHandler
    {
        private readonly ITransactionManager transactionManager;

        private readonly ILog log;

        private readonly IRetailerDemListRepository retailerDemListRepository;

        public RetailerUpdatedHandler(
            ITransactionManager transactionManager,
            ILog log,
            IRetailerDemListRepository retailerDemListRepository)
        {
            this.transactionManager = transactionManager;
            this.log = log;
            this.retailerDemListRepository = retailerDemListRepository;
        }

        public bool Execute(IReceivedMessage message)
        {
            var content = Encoding.UTF8.GetString(message.Body);
            var resource = JsonConvert.DeserializeObject<RetailerResource>(content);
            this.log.Info($"Updating dem list for retailer {resource.Id} {resource.Name}");

            var list = this.retailerDemListRepository.GetByRetailerId(resource.Id);
            if (list != null)
            {
                list.SetIsForOpenRetailer(resource.DateClosed, "/employees/100");
                this.transactionManager.Commit();
            }

            return true;
        }
    }
}