﻿namespace Linn.DemStock.Service.Host.Modules
{
    using Nancy;

    public sealed class HealthCheckModule : NancyModule
    {
        public HealthCheckModule()
        {
            this.Get("/healthcheck", _ => 200);
        }
    }
}
