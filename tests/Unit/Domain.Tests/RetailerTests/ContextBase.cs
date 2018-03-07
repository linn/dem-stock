﻿namespace Linn.DemStock.Domain.Tests.RetailerTests
{
    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected RetailerDemList Sut { get; private set; }

        [SetUp]
        public void SetUpContext()
        {
            this.Sut = new RetailerDemList("/retailers/2");
        }
    }
}