namespace Linn.DemStock.Service.Host
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.DependencyInjection;

    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Linn.DemStock.Service.Host.Extensions;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authentication.OpenIdConnect;
    using Microsoft.AspNetCore.Http;
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

            services.AddAuthentication
                (options =>
                {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                })
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
                {
                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

                    options.CallbackPath = new PathString("/retailers/dem-stock/signin-oidc");

                    options.Scope.Add("email associations");

                    options.Authority = "https://www-sys.linn.co.uk/auth/";

                    options.RequireHttpsMetadata = false;

                    options.ClientId = "app";
                    options.Events.OnTokenValidated = context =>
                    {
                        //context.HttpContext.User = context.Principal;

                        return Task.CompletedTask;
                    };
                    options.SaveTokens = true;
                    options.ResponseType = "id_token token";
                })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    options.RequireHttpsMetadata = false;

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = async context =>
                        {
                            var accessToken = context.Request.GetAccessToken();

                            var userClaims = await UserInfoHelper.GetUserClaimsAsync(accessToken);

                            context.Principal.AddIdentity(new ClaimsIdentity(userClaims));

                            context.HttpContext.User = context.Principal;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            context.Response.StatusCode = 403;

                            return Task.CompletedTask;
                        }
                    };

                    options.Authority = "https://www-sys.linn.co.uk/auth/";
                    options.SaveToken = true;
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

            app.UseBearerTokenAuthentication();

            app.UseOwin(x => x.UseNancy(config =>
            {
                config.PassThroughWhenStatusCodesAre(HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden);
            }));

            app.Use((context, next) => context.ChallengeAsync(OpenIdConnectDefaults.AuthenticationScheme));
        }
    }
}
