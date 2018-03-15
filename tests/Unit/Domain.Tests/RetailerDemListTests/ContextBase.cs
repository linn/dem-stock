namespace Linn.DemStock.Domain.Tests.RetailerDemListTests
{
    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected RetailerDemList Sut { get; private set; }

        protected RootProduct RootProductResult { get; set; }

        [SetUp]
        public void SetUpContext()
        {
            this.Sut = new RetailerDemList(2);
        }
    }
}
