using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Linn.DemStock.Persistence.Migrations
{
    public partial class retailerdemlist : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RetailerDemLists",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    LastReviewedOn = table.Column<DateTime>(nullable: true),
                    RetailerUri = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailerDemLists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RetailerDemListActivity",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ActivityType = table.Column<string>(nullable: false),
                    ChangedOn = table.Column<DateTime>(nullable: false),
                    RetailerDemListId = table.Column<int>(nullable: true),
                    UpdatedByUri = table.Column<string>(nullable: true),
                    LastReviewedOn = table.Column<DateTime>(nullable: true),
                    Quantity = table.Column<int>(nullable: true),
                    RootProductUri = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetailerDemListActivity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RetailerDemListActivity_RetailerDemLists_RetailerDemListId",
                        column: x => x.RetailerDemListId,
                        principalTable: "RetailerDemLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RootProduct",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Quantity = table.Column<int>(nullable: false),
                    RetailerDemListId = table.Column<int>(nullable: true),
                    RootProductUri = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RootProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RootProduct_RetailerDemLists_RetailerDemListId",
                        column: x => x.RetailerDemListId,
                        principalTable: "RetailerDemLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RetailerDemListActivity_RetailerDemListId",
                table: "RetailerDemListActivity",
                column: "RetailerDemListId");

            migrationBuilder.CreateIndex(
                name: "IX_RootProduct_RetailerDemListId",
                table: "RootProduct",
                column: "RetailerDemListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RetailerDemListActivity");

            migrationBuilder.DropTable(
                name: "RootProduct");

            migrationBuilder.DropTable(
                name: "RetailerDemLists");
        }
    }
}
