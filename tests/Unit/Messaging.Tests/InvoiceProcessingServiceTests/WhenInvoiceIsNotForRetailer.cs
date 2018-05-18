namespace Linn.DemStock.Messaging.Tests.InvoiceProcessingServiceTests
{
    using System.Collections.Generic;

    using FluentAssertions;

    using Linn.Common.Resources;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources.External;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenInvoiceIsNotForRetailer : ContextBase
    {
        private InvoiceResource resource;

        private RetailerDemList retailerDemList;

        [SetUp]
        public void SetUp()
        {
            this.resource = new InvoiceResource
                                {
                                    id = 123,
                                    lines = new List<InvoiceLineResource>
                                                {
                                                    new InvoiceLineResource
                                                        {
                                                            quantity = 2,
                                                            forDemonstration = true,
                                                            links = new List<LinkResource>
                                                                        {
                                                                            new LinkResource("productUri", "/products/sales-parts/123"),
                                                                            new LinkResource("sales-customer", "/sales/customers/808")
                                                                        }
                                                        },
                                                    new InvoiceLineResource
                                                        {
                                                            quantity = 1,
                                                            forDemonstration = true,
                                                            links = new List<LinkResource>
                                                                        {
                                                                            new LinkResource("productUri", "/products/sales-parts/456"),
                                                                            new LinkResource("sales-customer", "/sales/customers/808")
                                                                        }
                                                        }
                                                }
            };
            this.retailerDemList = new RetailerDemList(444, null);
            this.RetailerProxy.GetRetailerId("/sales/customers/808").Returns((int?)null);

            this.Sut.CaptureDemRootProductsFromInvoice(this.resource);
        }

        [Test]
        public void ShouldCallRetailerProxy()
        {
            this.RetailerProxy.Received().GetRetailerId("/sales/customers/808");
        }

        [Test]
        public void ShouldNotCallRetailerDemListRepository()
        {
            this.RetailerDemListRepository.DidNotReceive().GetByRetailerId(Arg.Any<int>());
        }

        [Test]
        public void ShouldNotAddRootProductsToDemList()
        {
            this.retailerDemList.RootProducts.Count.Should().Be(0);
        }

        [Test]
        public void ShouldNotCommitChanges()
        {
            this.TransactionManager.DidNotReceive().Commit();
        }
    }
}