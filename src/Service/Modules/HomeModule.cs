namespace Linn.DemStock.Service.Modules
{
    using Linn.Common.Configuration;
    using Linn.DemStock.Service.Models;

    using Nancy;
    using Nancy.Responses;
    using Nancy.Security;

    public sealed class HomeModule : NancyModule
    {
        public HomeModule()
        {
            this.Get("/", args => new RedirectResponse("/retailers/dem-stock"));
            this.Get("/retailers/dem-stock", _ => this.GetApp());
            this.Get("/retailers/dem-stock/signin-oidc-client", _ => this.GetApp());

            this.Get("/retailers/dem-stock/signin-oidc-silent", _ => this.SilentRenew());

            this.RequiresAuthentication();
        }

        private object SilentRenew()
        {
            return this.Negotiate.WithView("silent-renew");
        }

        private object GetApp()
        {
            return this.Negotiate.WithModel(ApplicationSettings.Get()).WithView("Index");
        }
    }
}