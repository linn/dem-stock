namespace Linn.DemStock.Domain.Exceptions
{
    using System;

    public class FewerThanZeroException : Exception
    {
        public FewerThanZeroException(string message)
            : base(message)
        {
        }

        public FewerThanZeroException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
