namespace Linn.DemStock.Persistence
{
    using Linn.Common.Configuration;
    using Linn.DemStock.Domain;
    using Linn.DemStock.Domain.RetailerDemListActivities;

    using Microsoft.EntityFrameworkCore;

    public class ServiceDbContext : DbContext
    {
        public DbSet<RetailerDemList> RetailerDemLists { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<RetailerDemList>().Property(s => s.Id);
            builder.Entity<RetailerDemList>().HasMany(s => s.RootProducts);
            builder.Entity<RetailerDemList>().HasMany(s => s.Activities);

            builder.Entity<RootProduct>().Property(s => s.Id);

            builder.Entity<RetailerDemListActivity>().Property(s => s.Id);
            builder.Entity<RetailerDemListActivity>().HasDiscriminator<string>("ActivityType")
                .HasValue<UpdateLastReviewedOnActivity>("last-reviewed")
                .HasValue<UpdateRootProductActivity>("update-root-product")
                .HasValue<CreateRetailerDemListActivity>("create-dem-list")
                .HasValue<UpdateIsOpenActivity>("is-open");

            builder.Entity<UpdateLastReviewedOnActivity>().HasBaseType<RetailerDemListActivity>();
            builder.Entity<UpdateRootProductActivity>().HasBaseType<RetailerDemListActivity>();
            builder.Entity<CreateRetailerDemListActivity>().HasBaseType<RetailerDemListActivity>();
            builder.Entity<UpdateIsOpenActivity>().HasBaseType<RetailerDemListActivity>();

            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var host = ConfigurationManager.Configuration["DATABASE_HOST"];
            var databaseName = ConfigurationManager.Configuration["DATABASE_NAME"];
            var userId = ConfigurationManager.Configuration["DATABASE_USER_ID"];
            var password = ConfigurationManager.Configuration["DATABASE_PASSWORD"];

            optionsBuilder.UseNpgsql($"User ID={userId};Password={password};Host={host};Database={databaseName};Port=5432;Pooling=true;");

            base.OnConfiguring(optionsBuilder);
        }
    }
}
