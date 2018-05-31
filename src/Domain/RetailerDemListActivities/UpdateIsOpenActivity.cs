namespace Linn.DemStock.Domain.RetailerDemListActivities
{
    public class UpdateIsOpenActivity : RetailerDemListActivity
    {
        public UpdateIsOpenActivity(string updatedByUri, bool isOpen) : base(updatedByUri)
        {
            this.IsForOpenRetailer = isOpen;
        }

        private UpdateIsOpenActivity()
        {
            // ef
        }

        public bool IsForOpenRetailer { get; private set; }

        public override T Accept<T>(IRetailerDemListActivityVisitor<T> visitor)
        {
            return visitor.Visit(this);
        }
    }
}