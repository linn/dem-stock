namespace Linn.DemStock.Service.Host
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Linn.Common.Authentication.Host;
    using Linn.Common.Authentication.Host.Extensions;
    using Linn.Common.Configuration;

    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authentication.OpenIdConnect;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using Microsoft.IdentityModel.Tokens;

    using Nancy;
    using Nancy.Owin;

    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddLinnAuthentication2(
                options =>
                    {
                        options.Authority = ConfigurationManager.Configuration["AUTHORITY_URI"];
                        options.CallbackPath = new PathString("/retailers/dem-stock/signin-oidc");
                    });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();

//            app.UseBearerTokenAuthentication();

            app.UseOwin(x => x.UseNancy(config =>
            {
                config.PassThroughWhenStatusCodesAre(HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden);
            }));

            app.Use((context, next) => context.ChallengeAsync(OpenIdConnectDefaults.AuthenticationScheme));
        }
    }

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddLinnAuthentication2(this IServiceCollection services, Action<LinnAuthenticationOptions> optionsAction = null)
        {
            var linnOptions = new LinnAuthenticationOptions();

            optionsAction?.Invoke(linnOptions);

            services.AddAuthentication
                (options =>
                {
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                   //options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
               })
                //.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
                //{
                //    options.Cookie.Path = "projects";
                //})
                //.AddLinnOpenIdConnect2(linnOptions)
                .AddLinnJwtBearer2(linnOptions);

            return services;
        }
    }

    public static class AuthenticationBuilderExtensions
    {
        public static AuthenticationBuilder AddLinnOpenIdConnect2(this AuthenticationBuilder builder, LinnAuthenticationOptions opts = null)
        {
            var linnOptions = opts ?? new LinnAuthenticationOptions();

            builder.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
            {
                options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

                options.CallbackPath = linnOptions.CallbackPath;

                options.Scope.Add(linnOptions.Scope);

                options.Authority = linnOptions.Authority;

                options.RequireHttpsMetadata = false;

                options.ClientId = linnOptions.ClientId;

                options.SaveTokens = true;

                options.ResponseType = "id_token token";
            });

            return builder;
        }

        public static AuthenticationBuilder AddLinnJwtBearer2(this AuthenticationBuilder builder, LinnAuthenticationOptions opts = null)
        {
            var linnOptions = opts ?? new LinnAuthenticationOptions();

            builder.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.RequireHttpsMetadata = false;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = false
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = async context =>
                    {
                        var x = context;
                    },

                    OnTokenValidated = async context =>
                    {
                        var accessToken = context.Request.GetAccessToken();

                        var userClaims = await UserInfoHelper.GetUserClaimsAsync(accessToken);

                        context.Principal.AddIdentity(new ClaimsIdentity(userClaims));

                        context.HttpContext.User = context.Principal;
                    },
                    OnAuthenticationFailed = context =>
                    {
                        context.Response.StatusCode = 401;

                        return Task.CompletedTask;
                    }
                };

                options.Authority = linnOptions.Authority;

                options.SaveToken = true;
            });

            return builder;
        }
    }
}
