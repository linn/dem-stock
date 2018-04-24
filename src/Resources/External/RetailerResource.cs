namespace Linn.DemStock.Resources.External
{
    using System;

    using Linn.Common.Resources;

    public class RetailerResource
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int? CatchmentRadius { get; set; }

        public string LadderLevel { get; set; }

        public bool CustomSpecialist { get; set; }

        public bool TurntableSpecialist { get; set; }

        public bool Series5Specialist { get; set; }

        public bool ShowOnWeb { get; set; }

        public bool AllowByAppointmentBookings { get; set; }

        public DateTime? DateClosed { get; set; }

        public string EmailAddress { get; set; }

        public string WebsiteUrl { get; set; }

        public string PhoneNumber { get; set; }

        public string FaxNumber { get; set; }

        public string WebDescription { get; set; }

        public LinkResource[] Links { get; set; }
    }
}
