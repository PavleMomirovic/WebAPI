using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClanoviOrganizacija_Student_VolId",
                table: "ClanoviOrganizacija");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Student",
                table: "Student");

            migrationBuilder.RenameTable(
                name: "Student",
                newName: "Volonter");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Volonter",
                table: "Volonter",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ClanoviOrganizacija_Volonter_VolId",
                table: "ClanoviOrganizacija",
                column: "VolId",
                principalTable: "Volonter",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClanoviOrganizacija_Volonter_VolId",
                table: "ClanoviOrganizacija");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Volonter",
                table: "Volonter");

            migrationBuilder.RenameTable(
                name: "Volonter",
                newName: "Student");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Student",
                table: "Student",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ClanoviOrganizacija_Student_VolId",
                table: "ClanoviOrganizacija",
                column: "VolId",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
