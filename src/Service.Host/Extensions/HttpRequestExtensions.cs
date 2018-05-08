namespace Linn.DemStock.Service.Host.Extensions
{
    using System;
    using System.Linq;
    using Microsoft.AspNetCore.Http;

    public static class HttpRequestExtensions
    {
        public static string GetAccessToken(this HttpRequest request)
        {
            return request
                .Headers["Authorization"]
                .FirstOrDefault()?
                .Replace("Bearer ", string.Empty, StringComparison.InvariantCultureIgnoreCase);
        }
    }
}