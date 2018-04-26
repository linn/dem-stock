namespace Linn.DemStock.Messaging.Tests.InvoiceProcessingServiceTests
{
    using System.Collections.Generic;
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Resources;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources.External;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenInvoiceHasDemRootProducts : ContextBase
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
                                                        },
                                                    new InvoiceLineResource
                                                        {
                                                            quantity = 1,
                                                            forDemonstration = true,
                                                            links = new List<LinkResource>
                                                                        {
                                                                            new LinkResource("productUri", "/products/sales-parts/789")
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
            this.ProductsProxy.GetRootProductUri("/products/sales-parts/789")
                .Returns("/products/root-products/888");
            this.ProductsProxy.GetRootProductUri("/products/sales-parts/123")
                .Returns("/products/root-products/999");

            this.Sut.CaptureDemRootProductsFromInvoice(this.resource);
        }

        [Test]
        public void ShouldCallRetailerProxy()
        {
            this.RetailerProxy.Received().GetRetailerId("/sales/customers/808");
        }

        [Test]
        public void ShouldCallRetailerDemListRepository()
        {
            this.RetailerDemListRepository.Received().GetByRetailerId(444);
        }

        [Test]
        public void ShouldCallProductsProxy()
        {
            this.ProductsProxy.Received().GetRootProductUri("/products/sales-parts/789");
            this.ProductsProxy.Received().GetRootProductUri("/products/sales-parts/123");
            this.ProductsProxy.DidNotReceive().GetRootProductUri("/products/sales-parts/456");
        }

        [Test]
        public void ShouldAddRootProductsToDemList()
        {
            this.retailerDemList.RootProducts.Count.Should().Be(2);
            this.retailerDemList.RootProducts.First(a => a.RootProductUri == "/products/root-products/888").Quantity
                .Should().Be(1);
            this.retailerDemList.RootProducts.First(a => a.RootProductUri == "/products/root-products/999").Quantity
                .Should().Be(2);
        }

        [Test]
        public void ShouldCommitChanges()
        {
            this.TransactionManager.Received().Commit();
        }
    }
}