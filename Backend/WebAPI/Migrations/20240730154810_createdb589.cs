using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class createdb589 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Waiters",
                keyColumn: "WaiterId",
                keyValue: "0a4b1661-3a67-4bfd-ae6a-7e7076069464");

            migrationBuilder.DeleteData(
                table: "Waiters",
                keyColumn: "WaiterId",
                keyValue: "0ec6cec1-eb21-46bd-b90d-d1c706f53360");

            migrationBuilder.DeleteData(
                table: "Waiters",
                keyColumn: "WaiterId",
                keyValue: "4298c062-645c-462c-ab23-e37dca4e78af");

            migrationBuilder.DeleteData(
                table: "Waiters",
                keyColumn: "WaiterId",
                keyValue: "5f567336-fe8c-40b9-b54d-fc11952274ea");

            migrationBuilder.DeleteData(
                table: "Waiters",
                keyColumn: "WaiterId",
                keyValue: "61e7a0a1-dc47-4eab-a0f5-150225dad763");

            migrationBuilder.DeleteData(
                table: "Waiters",
                keyColumn: "WaiterId",
                keyValue: "7efa6aea-9d98-41f8-9fbc-99ebc17d656b");

            migrationBuilder.DeleteData(
                table: "Waiters",
                keyColumn: "WaiterId",
                keyValue: "b6cb56fe-34ea-4b75-b3ab-f9f8a3772e11");

            migrationBuilder.DeleteData(
                table: "Waiters",
                keyColumn: "WaiterId",
                keyValue: "b951d595-c5f5-411d-8507-ff7a3cc4c995");

            migrationBuilder.DeleteData(
                table: "Waiters",
                keyColumn: "WaiterId",
                keyValue: "f31b5993-34d2-4567-a2c8-d4d28fb16271");

            migrationBuilder.DeleteData(
                table: "Waiters",
                keyColumn: "WaiterId",
                keyValue: "fcf1d3f8-21d9-49d0-a6c8-afec41dfba31");

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    InvoiceId = table.Column<string>(type: "TEXT", nullable: false),
                    SessionId = table.Column<string>(type: "TEXT", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "TEXT", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    InvoiceStatus = table.Column<string>(type: "TEXT", nullable: false),
                    PaymentMethod = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.InvoiceId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.InsertData(
                table: "Waiters",
                columns: new[] { "WaiterId", "WaiterName" },
                values: new object[,]
                {
                    { "0a4b1661-3a67-4bfd-ae6a-7e7076069464", "Diego" },
                    { "0ec6cec1-eb21-46bd-b90d-d1c706f53360", "Lucía" },
                    { "4298c062-645c-462c-ab23-e37dca4e78af", "Carlos" },
                    { "5f567336-fe8c-40b9-b54d-fc11952274ea", "Elena" },
                    { "61e7a0a1-dc47-4eab-a0f5-150225dad763", "Laura" },
                    { "7efa6aea-9d98-41f8-9fbc-99ebc17d656b", "Andrés" },
                    { "b6cb56fe-34ea-4b75-b3ab-f9f8a3772e11", "María" },
                    { "b951d595-c5f5-411d-8507-ff7a3cc4c995", "Pablo" },
                    { "f31b5993-34d2-4567-a2c8-d4d28fb16271", "Javier" },
                    { "fcf1d3f8-21d9-49d0-a6c8-afec41dfba31", "Sofía" }
                });
        }
    }
}
