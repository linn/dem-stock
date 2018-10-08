namespace Linn.DemStock.IoC
{
    using Amazon;
    using Amazon.KeyManagementService;
    using Amazon.Runtime;
    using Amazon.S3;

    using Autofac;

    using Linn.Common.Configuration;

    public class AmazonCredentialsModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterInstance(FallbackCredentialsFactory.GetCredentials())
                .As<AWSCredentials>()
                .SingleInstance();

            builder.Register(c => RegionEndpoint.GetBySystemName(AwsCredentialsConfiguration.Region))
                .As<RegionEndpoint>()
                .SingleInstance();

            builder.Register(c => new AmazonS3Client(RegionEndpoint.GetBySystemName(AwsCredentialsConfiguration.Region)))
                .As<IAmazonS3>()
                .SingleInstance();

            builder.Register(c => new AmazonKeyManagementServiceClient(new AmazonKeyManagementServiceConfig { RegionEndpoint = RegionEndpoint.GetBySystemName(AwsCredentialsConfiguration.Region) }))
                .As<IAmazonKeyManagementService>()
                .SingleInstance();
        }
    }
}