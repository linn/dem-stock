namespace Linn.DemStock.Proxy.Tests.RetailerProxyTests
{
    using Linn.Common.Proxy;

    using NSubstitute;

    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected RetailerProxy Sut { get; private set; }

        protected int? RetailerId { get; set; }

        protected IRestClient RestClient { get; private set; }

        protected string ProxyRoot { get; private set; }

        [SetUp]
        public void EstablishContext()
        {
            this.ProxyRoot = "http://app.linn.co.uk";
            this.RestClient = Substitute.For<IRestClient>();
            this.Sut = new RetailerProxy(this.RestClient, this.ProxyRoot);
        }
    }
}
