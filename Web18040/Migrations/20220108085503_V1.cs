using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web18040.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Galerije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivGalerije = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrojPozicija = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Galerije", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Tehnike",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivTehnike = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tehnike", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Umetnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UmenickoIme = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Umetnici", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Izlozbe",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivIzlozbe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatumOdrzavanja = table.Column<DateTime>(type: "datetime2", maxLength: 10, nullable: false),
                    GalerijeID = table.Column<int>(type: "int", nullable: true),
                    UmetniciID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Izlozbe", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Izlozbe_Galerije_GalerijeID",
                        column: x => x.GalerijeID,
                        principalTable: "Galerije",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Izlozbe_Umetnici_UmetniciID",
                        column: x => x.UmetniciID,
                        principalTable: "Umetnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Slike",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DatumKreiranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TehnikeID = table.Column<int>(type: "int", nullable: true),
                    IzlozbeID = table.Column<int>(type: "int", nullable: true),
                    UmetniciID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Slike", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Slike_Izlozbe_IzlozbeID",
                        column: x => x.IzlozbeID,
                        principalTable: "Izlozbe",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Slike_Tehnike_TehnikeID",
                        column: x => x.TehnikeID,
                        principalTable: "Tehnike",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Slike_Umetnici_UmetniciID",
                        column: x => x.UmetniciID,
                        principalTable: "Umetnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Izlozbe_GalerijeID",
                table: "Izlozbe",
                column: "GalerijeID");

            migrationBuilder.CreateIndex(
                name: "IX_Izlozbe_UmetniciID",
                table: "Izlozbe",
                column: "UmetniciID");

            migrationBuilder.CreateIndex(
                name: "IX_Slike_IzlozbeID",
                table: "Slike",
                column: "IzlozbeID");

            migrationBuilder.CreateIndex(
                name: "IX_Slike_TehnikeID",
                table: "Slike",
                column: "TehnikeID");

            migrationBuilder.CreateIndex(
                name: "IX_Slike_UmetniciID",
                table: "Slike",
                column: "UmetniciID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Slike");

            migrationBuilder.DropTable(
                name: "Izlozbe");

            migrationBuilder.DropTable(
                name: "Tehnike");

            migrationBuilder.DropTable(
                name: "Galerije");

            migrationBuilder.DropTable(
                name: "Umetnici");
        }
    }
}
