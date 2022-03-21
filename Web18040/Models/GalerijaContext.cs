using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class GalerijaContext:DbContext
    {
        public DbSet<Slika> Slike { get; set; }
        public DbSet<Izlozba> Izlozbe { get; set; }
        public DbSet<Galerija> Galerije { get; set; }
        public DbSet<Umetnik> Umetnici { get; set; }
        public DbSet<Tehnika> Tehnike { get; set; }

        public GalerijaContext(DbContextOptions options) : base(options)
        {

        }
      
    }
}