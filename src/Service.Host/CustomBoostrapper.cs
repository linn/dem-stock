namespace Linn.DemStock.Service.Host
{
    using System;
    using System.Runtime.InteropServices.ComTypes;
    using System.Security.Claims;
    using System.Threading;
    using System.Threading.Tasks;

    using Autofac;

    using IdentityModel.Client;

    using Linn.Common.Logging;
    using Linn.DemStock.IoC;

    using Nancy;
    using Nancy.Authentication.Stateless;
    using Nancy.Bootstrapper;
    using Nancy.Bootstrappers.Autofac;
    using Nancy.Configuration;
    using Nancy.Conventions;

    public class CustomBoostrapper : AutofacNancyBootstrapper
    {
        public override void Configure(INancyEnvironment environment)
        {
            base.Configure(environment);

            environment.Tracing(enabled: false, displayErrorTraces: true);
        }

        protected override void ApplicationStartup(ILifetimeScope lifetimeScope, IPipelines pipelines)
        {
            base.ApplicationStartup(lifetimeScope, pipelines);

            var configuration = new StatelessAuthenticationConfiguration(ctx =>
                {
                    var accessToken = ctx.Request.Headers?.Authorization?.Replace("Bearer ", string.Empty, StringComparison.InvariantCultureIgnoreCase);

                    if (!string.IsNullOrEmpty(accessToken))
                    {
                        var response = DiscoveryClient.GetAsync("https://www-sys.linn.co.uk/auth/.well-known/openid-configuration").Result;
                        var userInfoClient = new UserInfoClient(response.UserInfoEndpoint);

                        var userInfoResponse = userInfoClient.GetAsync(accessToken, new CancellationToken()).Result;

                        return new ClaimsPrincipal(new ClaimsIdentity(userInfoResponse.Claims));
                    }

                    return null;
                });

            StatelessAuthentication.Enable(pipelines, configuration);

            pipelines.OnError += (ctx, ex) =>
            {
                Log(ex, lifetimeScope.Resolve<ILog>());
                return null;
            };
        }

        protected override void RequestStartup(ILifetimeScope lifetimeScope, IPipelines pipelines, NancyContext context)
        {
            base.RequestStartup(lifetimeScope, pipelines, context);

            pipelines.AfterRequest += ctx => ctx.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            pipelines.AfterRequest += ctx => ctx.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
            pipelines.AfterRequest += ctx => ctx.Response.Headers.Add("Access-Control-Allow-Headers", "Accept,Origin,Content-Type,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Allow-Methods");
            pipelines.AfterRequest += ctx => ctx.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            pipelines.AfterRequest += ctx => ctx.Response.Headers.Add("Access-Control-Expose-Headers", "Accept,Origin,Content-type");
        }

        private Task<Nancy.Response> Jam(NancyContext ctx, CancellationToken cancellationToken)
        {
            ctx.CurrentUser = new ClaimsPrincipal(new ClaimsIdentity(new[] { new Claim("test", "sandy") }));
            return Task.FromResult((Nancy.Response)null);
        }

        protected override void ConfigureConventions(NancyConventions conventions)
        {
            base.ConfigureConventions(conventions);

            conventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("retailers/dem-stock/assets", "client/assets"));
            conventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("retailers/dem-stock/build", "client/build"));
        }

        protected override void ConfigureApplicationContainer(ILifetimeScope existingContainer)
        {
            existingContainer.Update(
                builder =>
                {
                    builder.RegisterModule<AmazonCredentialsModule>();
                    builder.RegisterModule<AmazonSqsModule>();
                    builder.RegisterModule<LoggingModule>();
                    builder.RegisterModule<ResponsesModule>();
                });

            base.ConfigureApplicationContainer(existingContainer);
        }

        protected override void ConfigureRequestContainer(ILifetimeScope lifetimeScope, NancyContext context)
        {
            lifetimeScope.Update(
                builder =>
                {
                    builder.RegisterModule<ServiceModule>();
                    builder.RegisterModule<DatabaseModule>();
                    builder.RegisterModule<PersistenceModule>();
                });

            base.ConfigureRequestContainer(lifetimeScope, context);
        }

        private static void Log(Exception ex, ILog log)
        {
            if (ex is AggregateException exception)
            {
                foreach (var inner in exception.InnerExceptions)
                {
                    Log(inner, log);
                }
            }
            else
            {
                log.Error(ex.Message, ex);
            }
        }
    }
}