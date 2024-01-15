using Microsoft.EntityFrameworkCore;
using PraksaProjekat.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace PraksaProjekat.Infrastructure
{
    public class AppDbContext : DbContext
    {

        public DbSet<Korisnik> Korisnici { get; set; }


        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //Kazemo mu da pronadje sve konfiguracije u Assembliju i da ih primeni nad bazom
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}
