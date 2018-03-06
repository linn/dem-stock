namespace Linn.DemStock.Domain
{
    using System.Collections.Generic;

    public abstract class ActivityEntity<T> : Entity where T : Activity
    {
        public IList<T> Activities { get; private set; } = new List<T>();
    }
}
