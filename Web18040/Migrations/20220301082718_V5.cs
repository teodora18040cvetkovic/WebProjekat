using Microsoft.EntityFrameworkCore.Migrations;

namespace Web18040.Migrations
{
    public partial class V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BrojPozicija",
                table: "Galerije");

            migrationBuilder.AddColumn<int>(
                name: "Dimenzje",
                table: "Slike",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Galerije",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TipIzlozbe",
                table: "Galerije",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dimenzje",
                table: "Slike");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Galerije");

            migrationBuilder.DropColumn(
                name: "TipIzlozbe",
                table: "Galerije");

            migrationBuilder.AddColumn<int>(
                name: "BrojPozicija",
                table: "Galerije",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
