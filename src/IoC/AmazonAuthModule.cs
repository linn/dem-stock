namespace Linn.DemStock.IoC
{
    using Amazon;
    using Amazon.KeyManagementService;
    using Amazon.S3;

    using Autofac;

    public class AmazonAuthModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<AmazonS3Client>()
                .As<IAmazonS3>()
                .UsingConstructor(typeof(RegionEndpoint))
                .SingleInstance();

            builder.RegisterType<AmazonKeyManagementServiceClient>()
                .As<IAmazonKeyManagementService>()
                .UsingConstructor(typeof(RegionEndpoint))
                .SingleInstance();
        }
    }
}