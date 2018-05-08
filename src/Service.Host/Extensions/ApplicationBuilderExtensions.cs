namespace Linn.DemStock.Service.Host.Extensions
{
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Nancy.Security;

    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseBearerTokenAuthentication(this IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                if (context.Request.Headers.ContainsKey("Authorization"))
                {
                    await context.AuthenticateAsync(JwtBearerDefaults.AuthenticationScheme);

                    if (context.User.IsAuthenticated())
                    {
                        await next();
                    }
                }
                else
                {
                    await next();
                }
            });

            return app;
        }
    }
}