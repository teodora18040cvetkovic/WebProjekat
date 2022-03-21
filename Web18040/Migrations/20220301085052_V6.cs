using Microsoft.EntityFrameworkCore.Migrations;

namespace Web18040.Migrations
{
    public partial class V6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Dimenzje",
                table: "Slike",
                newName: "Visina");

            migrationBuilder.AddColumn<int>(
                name: "Sirina",
                table: "Slike",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sirina",
                table: "Slike");

            migrationBuilder.RenameColumn(
                name: "Visina",
                table: "Slike",
                newName: "Dimenzje");
        }
    }
}
