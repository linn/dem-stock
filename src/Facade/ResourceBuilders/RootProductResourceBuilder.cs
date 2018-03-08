namespace Linn.DemStock.Facade.ResourceBuilders
{
    using Linn.Common.Facade;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Resources;

    public class RootProductResourceBuilder : IResourceBuilder<RootProduct>
    {
        public RootProductResource Build(RootProduct rootProduct)
        {
            return new RootProductResource
                       {
                           RootProductUri = rootProduct.RootProductUri,
                           Quantity = rootProduct.Quantity,
                           UpdatedOn = rootProduct.UpdatedOn.ToString("o")
                       };
        }

        public string GetLocation(RootProduct model)
        {
            throw new System.NotImplementedException();
        }

        object IResourceBuilder<RootProduct>.Build(RootProduct rootProduct) => this.Build(rootProduct);
    }
}