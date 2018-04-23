namespace Linn.DemStock.Messaging.Tests.RetailerCreatedHandlerTests
{
    using System.Text;

    using FluentAssertions;

    using Linn.Common.Messaging.RabbitMQ.Unicast;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources.External;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenRetailerCreated : ContextBase
    {
        private bool result;

        private RetailerResource resource;

        [SetUp]
        public void SetUp()
        {
            this.resource = new RetailerResource
                               {
                                   Id = 123,
                                   Name = "Retailer Name"
                               };

            var json = JsonConvert.SerializeObject(
                this.resource,
                new JsonSerializerSettings
                    {
                        ContractResolver = new CamelCasePropertyNamesContractResolver()
                    });

            var body = Encoding.UTF8.GetBytes(json);

            var message = Substitute.For<IReceivedMessage>();
            message.Body.Returns(body);
            this.result = this.Sut.Execute(message);
        }

        [Test]
        public void ShouldAddRetailerToRepository()
        {
            this.RetailerDemListRepository.Received(1).Add(Arg.Is<RetailerDemList>(d => d.RetailerId == this.resource.Id));
        }

        [Test]
        public void ShouldTerminateRabbitConnection()
        {
            this.RabbitTerminator.Received(1).Close();
        }

        [Test]
        public void ShouldCommitTransaction()
        {
            this.TransactionManager.Received(1).Commit();
        }

        [Test]
        public void ShouldReturnTrue()
        {
            this.result.Should().BeTrue();
        }
    }
}