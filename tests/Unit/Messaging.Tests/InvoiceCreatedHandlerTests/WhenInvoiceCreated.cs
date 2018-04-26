namespace Linn.DemStock.Messaging.Tests.InvoiceCreatedHandlerTests
{
    using System.Text;

    using FluentAssertions;

    using Linn.Common.Messaging.RabbitMQ.Unicast;
    using Linn.DemStock.Resources.External;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenInvoiceCreated : ContextBase
    {
        private bool result;

        private InvoiceResource resource;

        [SetUp]
        public void SetUp()
        {
            this.resource = new InvoiceResource
                               {
                                   id = 123
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
        public void ShouldCallService()
        {
            this.InvoiceProcessingService.Received().CaptureDemRootProductsFromInvoice(Arg.Is<InvoiceResource>(i => i.id == 123));
        }

        [Test]
        public void ShouldReturnTrue()
        {
            this.result.Should().BeTrue();
        }
    }
}