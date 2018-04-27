namespace Linn.DemStock.Messaging.Tests.InvoiceProcessingServiceTests
{
    using System.Collections.Generic;

    using FluentAssertions;

    using Linn.Common.Resources;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources.External;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenInvoiceHasNoDemLines : ContextBase
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
                                                            forDemonstration = false,
                                                            links = new List<LinkResource>
                                                                        {
                                                                            new LinkResource("productUri", "/products/sales-parts/123")
                                                                        }
                                                        },
                                                    new InvoiceLineResource
                                                        {
                                                            quantity = 1,
                                                            forDemonstration = false,
                                                            links = new List<LinkResource>
                                                                        {
                                                                            new LinkResource("productUri", "/products/sales-parts/456")
                                                                        }
                                                        }
                                                },
                                    links = new List<LinkResource>
                                                {
                                                    new LinkResource("sales-customer", "/sales/customers/808")
                                                }
            };
            this.retailerDemList = new RetailerDemList(444, null);
            this.RetailerProxy.GetRetailerId("/sales/customers/808").Returns(444);
            this.RetailerDemListRepository.GetByRetailerId(444).Returns(this.retailerDemList);
            this.ProductsProxy.GetRootProductUri("/products/sales-parts/123")
                .Returns("/products/root-products/888");
            this.ProductsProxy.GetRootProductUri("/products/sales-parts/456")
                .Returns("/products/root-products/999");

            this.Sut.CaptureDemRootProductsFromInvoice(this.resource);
        }

        [Test]
        public void ShouldNotCallRetailerProxy()
        {
            this.RetailerProxy.DidNotReceive().GetRetailerId(Arg.Any<string>());
        }

        [Test]
        public void ShouldNotCallRetailerDemListRepository()
        {
            this.RetailerDemListRepository.DidNotReceive().GetByRetailerId(Arg.Any<int>());
        }

        [Test]
        public void ShouldNotCallProductsProxy()
        {
            this.ProductsProxy.DidNotReceive().GetRootProductUri(Arg.Any<string>());
        }

        [Test]
        public void ShouldNotAddRootProductsToDemList()
        {
            this.retailerDemList.RootProducts.Count.Should().Be(0);
        }
    }
}