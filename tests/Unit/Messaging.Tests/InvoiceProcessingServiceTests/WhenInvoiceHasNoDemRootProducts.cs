﻿namespace Linn.DemStock.Messaging.Tests.InvoiceProcessingServiceTests
{
    using System.Collections.Generic;

    using FluentAssertions;

    using Linn.Common.Resources;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources.External;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenInvoiceHasNoDemRootProducts : ContextBase
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
                .Returns((string)null);
            this.ProductsProxy.GetRootProductUri("/products/sales-parts/456")
                .Returns((string)null);

            this.Sut.CaptureDemRootProductsFromInvoice(this.resource);
        }

        [Test]
        public void ShouldCallRetailerProxy()
        {
            this.RetailerProxy.Received().GetRetailerId(Arg.Any<string>());
        }

        [Test]
        public void ShouldCallRetailerDemListRepository()
        {
            this.RetailerDemListRepository.Received().GetByRetailerId(Arg.Any<int>());
        }

        [Test]
        public void ShouldCallProductsProxy()
        {
            this.ProductsProxy.Received().GetRootProductUri("/products/sales-parts/123");
            this.ProductsProxy.Received().GetRootProductUri("/products/sales-parts/456");
        }

        [Test]
        public void ShouldNotAddRootProductsToDemList()
        {
            this.retailerDemList.RootProducts.Count.Should().Be(0);
        }
    }
}