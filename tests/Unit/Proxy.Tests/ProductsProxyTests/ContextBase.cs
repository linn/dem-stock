namespace Linn.DemStock.Proxy.Tests.ProductsProxyTests
{
    using Linn.Common.Proxy;

    using NSubstitute;

    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected ProductsProxy Sut { get; private set; }

        protected string RootProductUri { get; set; }

        protected IRestClient RestClient { get; private set; }

        protected string ProxyRoot { get; private set; }

        [SetUp]
        public void EstablishContext()
        {
            this.ProxyRoot = "http://app.linn.co.uk";
            this.RestClient = Substitute.For<IRestClient>();
            this.Sut = new ProductsProxy(this.RestClient, this.ProxyRoot);
        }
    }
}
