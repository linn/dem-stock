namespace Linn.DemStock.Messaging.Tests.RetailerUpdatedHandlerTests
{
    using System;
    using System.Text;

    using FluentAssertions;

    using Linn.Common.Messaging.RabbitMQ.Unicast;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources.External;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenRetailerUpdated : ContextBase
    {
        private bool result;

        private RetailerResource resource;

        private RetailerDemList retailerDemList;

        [SetUp]
        public void SetUp()
        {
            this.resource = new RetailerResource
                               {
                                   Id = 123,
                                   Name = "Retailer Name",
                                   DateClosed = DateTime.UtcNow
                               };
            this.retailerDemList = new RetailerDemList(123, string.Empty);
            this.RetailerDemListRepository.GetByRetailerId(123).Returns(this.retailerDemList);

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
        public void ShouldLookUpRetailer()
        {
            this.RetailerDemListRepository.Received(1).GetByRetailerId(123);
        }

        [Test]
        public void ShouldCommitTransaction()
        {
            this.TransactionManager.Received(1).Commit();
        }

        [Test]
        public void ShouldUpdateList()
        {
            this.retailerDemList.IsForOpenRetailer.Should().BeFalse();
        }

        [Test]
        public void ShouldReturnTrue()
        {
            this.result.Should().BeTrue();
        }
    }
}