namespace Linn.DemStock.Service.Modules
{
    using Nancy;
    using Nancy.Responses;

    public sealed class HomeModule : NancyModule
    {
        public HomeModule()
        {
            this.Get("/", args => new RedirectResponse("/retailers/dem-stock"));
            this.Get("/retailers/dem-stock", _ => this.GetApp());
            this.Get("/retailers/dem-stock/signin-oidc", _ => this.GetApp());
            this.Get("/retailers/dem-stock/signin-oidc-silent", _ => this.GetApp());
        }

        private object GetApp()
        {
            return this.Negotiate.WithView("Index");
        }
    }
}