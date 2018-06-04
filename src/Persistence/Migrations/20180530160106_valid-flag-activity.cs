using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Linn.DemStock.Persistence.Migrations
{
    public partial class validflagactivity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsForOpenRetailer",
                table: "RetailerDemListActivity",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsForOpenRetailer",
                table: "RetailerDemListActivity");
        }
    }
}
