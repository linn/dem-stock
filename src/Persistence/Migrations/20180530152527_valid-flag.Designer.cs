﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using System;

namespace Linn.DemStock.Persistence.Migrations
{
    [DbContext(typeof(ServiceDbContext))]
    [Migration("20180530152527_valid-flag")]
    partial class validflag
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125");

            modelBuilder.Entity("Linn.DemStock.Domain.RetailerDemList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsForOpenRetailer");

                    b.Property<DateTime?>("LastReviewedOn");

                    b.Property<int>("RetailerId");

                    b.HasKey("Id");

                    b.ToTable("RetailerDemLists");
                });

            modelBuilder.Entity("Linn.DemStock.Domain.RetailerDemListActivities.RetailerDemListActivity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ActivityType")
                        .IsRequired();

                    b.Property<DateTime>("ChangedOn");

                    b.Property<int?>("RetailerDemListId");

                    b.Property<string>("UpdatedByUri");

                    b.HasKey("Id");

                    b.HasIndex("RetailerDemListId");

                    b.ToTable("RetailerDemListActivity");

                    b.HasDiscriminator<string>("ActivityType").HasValue("RetailerDemListActivity");
                });

            modelBuilder.Entity("Linn.DemStock.Domain.RootProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Quantity");

                    b.Property<int?>("RetailerDemListId");

                    b.Property<string>("RootProductUri");

                    b.Property<DateTime>("UpdatedOn");

                    b.HasKey("Id");

                    b.HasIndex("RetailerDemListId");

                    b.ToTable("RootProduct");
                });

            modelBuilder.Entity("Linn.DemStock.Domain.RetailerDemListActivities.CreateRetailerDemListActivity", b =>
                {
                    b.HasBaseType("Linn.DemStock.Domain.RetailerDemListActivities.RetailerDemListActivity");

                    b.Property<int>("RetailerId");

                    b.ToTable("CreateRetailerDemListActivity");

                    b.HasDiscriminator().HasValue("create-dem-list");
                });

            modelBuilder.Entity("Linn.DemStock.Domain.RetailerDemListActivities.UpdateLastReviewedOnActivity", b =>
                {
                    b.HasBaseType("Linn.DemStock.Domain.RetailerDemListActivities.RetailerDemListActivity");

                    b.Property<DateTime?>("LastReviewedOn");

                    b.ToTable("UpdateLastReviewedOnActivity");

                    b.HasDiscriminator().HasValue("last-reviewed");
                });

            modelBuilder.Entity("Linn.DemStock.Domain.RetailerDemListActivities.UpdateRootProductActivity", b =>
                {
                    b.HasBaseType("Linn.DemStock.Domain.RetailerDemListActivities.RetailerDemListActivity");

                    b.Property<int>("Quantity");

                    b.Property<string>("RootProductUri");

                    b.ToTable("UpdateRootProductActivity");

                    b.HasDiscriminator().HasValue("update-root-product");
                });

            modelBuilder.Entity("Linn.DemStock.Domain.RetailerDemListActivities.RetailerDemListActivity", b =>
                {
                    b.HasOne("Linn.DemStock.Domain.RetailerDemList")
                        .WithMany("Activities")
                        .HasForeignKey("RetailerDemListId");
                });

            modelBuilder.Entity("Linn.DemStock.Domain.RootProduct", b =>
                {
                    b.HasOne("Linn.DemStock.Domain.RetailerDemList")
                        .WithMany("RootProducts")
                        .HasForeignKey("RetailerDemListId");
                });
#pragma warning restore 612, 618
        }
    }
}
