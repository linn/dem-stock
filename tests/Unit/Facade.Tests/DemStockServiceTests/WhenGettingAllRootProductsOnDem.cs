namespace Linn.DemStock.Facade.Tests.DemStockServiceTests
{
    using System.Collections.Generic;
    using System.Linq;

    using FluentAssertions;

    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.Models;
    using Linn.DemStock.Resources;
    using Linn.DemStock.Resources.External;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenGettingAllRootProductsOnDem : ContextBase
    {
        private IResult<IEnumerable<RootProductOnDemModel>> results;

        [SetUp]
        public void SetUp()
        {
            this.RetailerProxy.GetRetailers().Returns(
                new List<RetailerResource>
                    {
                        new RetailerResource { Id = 1, Name = "ret1" },
                        new RetailerResource { Id = 2, Name = "ret2" }
                    });

            this.DemListRepository.GetRetailerDemLists(true).Returns(
                new List<RetailerDemList>
                    {
                        new RetailerDemList(1, "/employee/200")
                            {
                                Id = 10,
                                RetailerId = 1,
                                RootProducts =
                                    {
                                        new RootProduct("/rp/1"),
                                        new RootProduct("/rp/2")
                                    }
                            },
                        new RetailerDemList(2, "/employee/200")
                            {
                                Id = 20,
                                RetailerId = 2,
                                RootProducts =
                                    {
                                        new RootProduct("/rp/2"),
                                        new RootProduct("/rp/3")
                                    }
                            }
                    });

            this.ProductsProxy.BatchGetRootProducts(Arg.Any<IEnumerable<string>>()).Returns(
                new List<RootProductProxyResource>
                    {
                        new RootProductProxyResource { Href = "/rp/1", Name = "prod 1" },
                        new RootProductProxyResource { Href = "/rp/2", Name = "prod 2" },
                        new RootProductProxyResource { Href = "/rp/3", Name = "prod 3" }
                    });

            this.results = this.Sut.GetAllRootProductsOnDem();
        }

        [Test]
        public void ShouldGetRetailerDemLists()
        {
            this.DemListRepository.Received().GetRetailerDemLists();
        }

        [Test]
        public void ShouldCallRetailersProxy()
        {
            this.RetailerProxy.Received().GetRetailers();
        }

        [Test]
        public void ShouldCallProductsProxy()
        {
            this.ProductsProxy.Received().BatchGetRootProducts(Arg.Any<IEnumerable<string>>());
        }

        [Test]
        public void ShouldReturnRootProductsOnDem()
        {
            this.results.Should().BeOfType<SuccessResult<IEnumerable<RootProductOnDemModel>>>();
            var dataResults = ((SuccessResult<IEnumerable<RootProductOnDemModel>>)this.results).Data.ToArray();
            dataResults.Length.Should().Be(4);
            dataResults.Should().Contain(r => r.RetailerName == "ret1");
            dataResults.Should().Contain(r => r.RetailerName == "ret2");
            dataResults.Should().Contain(r => r.RootProductName == "prod 1");
            dataResults.Should().Contain(r => r.RootProductName == "prod 2");
            dataResults.Should().Contain(r => r.RootProductName == "prod 3");
        }
    }
}
