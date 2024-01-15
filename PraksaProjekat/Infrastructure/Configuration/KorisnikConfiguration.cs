using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using PraksaProjekat.Models;

namespace PraksaProjekat.Infrastructure.Configuration
{
    public class KorisnikConfiguration : IEntityTypeConfiguration<Korisnik>
    {
        public void Configure(EntityTypeBuilder<Korisnik> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.KorisnickoIme).HasMaxLength(50);
            builder.Property(x => x.Ime).HasMaxLength(30);
            builder.Property(x => x.Prezime).HasMaxLength(30);
            builder.HasIndex(x => x.Email).IsUnique();

        }
    }
}
