using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Linn.DemStock.Persistence.Migrations
{
    public partial class retailerid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RetailerUri",
                table: "RetailerDemLists");

            migrationBuilder.AddColumn<int>(
                name: "RetailerId",
                table: "RetailerDemLists",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RetailerId",
                table: "RetailerDemLists");

            migrationBuilder.AddColumn<string>(
                name: "RetailerUri",
                table: "RetailerDemLists",
                nullable: true);
        }
    }
}
