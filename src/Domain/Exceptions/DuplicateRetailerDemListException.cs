namespace Linn.DemStock.Domain.Exceptions
{
    using System;

    public class DuplicateRetailerDemListException : Exception
    {
        public DuplicateRetailerDemListException(string message)
            : base(message)
        {
        }

        public DuplicateRetailerDemListException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
