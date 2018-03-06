namespace Linn.DemStock.Domain.Tests.RetailerTests
{
    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected Retailer Sut { get; private set; }

        [SetUp]
        public void SetUpContext()
        {
            this.Sut = new Retailer("/retailers/2");
        }
    }
}
