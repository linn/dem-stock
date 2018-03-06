namespace Linn.DemStock.Domain.Tests.RootProductTests
{
    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected RootProduct Sut { get; private set; }

        [SetUp]
        public void SetUpContext()
        {
            this.Sut = new RootProduct("/root-products/200");
        }
    }
}
