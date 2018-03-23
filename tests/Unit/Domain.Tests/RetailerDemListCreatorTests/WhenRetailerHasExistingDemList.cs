namespace Linn.DemStock.Domain.Tests.RetailerDemListCreatorTests
{
    using System;

    using FluentAssertions;

    using Linn.DemStock.Domain.Exceptions;

    using NSubstitute;

    using NUnit.Framework;

    public class WhenRetailerHasExistingDemList : ContextBase
    {
        private int retailerId;

        private Action action;

        [SetUp]
        public void SetUp()
        {
            this.retailerId = 231;

            var existingDemList = new RetailerDemList(this.retailerId);

            this.DemListRepository.GetByRetailerId(this.retailerId).Returns(existingDemList);

            this.action = () => this.Sut.CreateRetailerDemList(this.retailerId, "employee/200");            
        }

        [Test]
        public void ShouldThrowException()
        {
            this.action.ShouldThrow<DuplicateRetailerDemListException>();
        }
    }
}
