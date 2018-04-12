namespace Linn.DemStock.Domain.Exceptions
{
    using System;

    public class InvalidActivityException : Exception
    {
        public InvalidActivityException(string message)
            : base(message)
        {
        }

        public InvalidActivityException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
