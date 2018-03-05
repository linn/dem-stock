namespace Linn.DemStock.Service.Modules
{
    using Nancy;
    using Nancy.Responses;

    public sealed class HomeModule : NancyModule
    {
        public HomeModule()
        {
            this.Get("/", args => new RedirectResponse("/sales/dem-stock"));
            this.Get("/sales", args => new RedirectResponse("/sales/dem-stock"));
            this.Get("/sales/dem-stock", _ => this.GetApp());
        }

        private object GetApp()
        {
            return this.Negotiate.WithView("Index");
        }
    }
}