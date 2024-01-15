using PraksaProjekat.Dto;
using PraksaProjekat.Models;
namespace PraksaProjekat.Helpers
{
    public class KorisnikHelper
    {
        public static string HashPassword(string password)
        {
            return crypto.Security.ComputeHash(password, "aaa");
        }

        public static void UpdateKorisnikFields(Korisnik korisnik, KorisnikDto korisnikDto)
        {
            korisnik.KorisnickoIme = korisnikDto.KorisnickoIme;
            korisnik.Email = korisnikDto.Email;
            korisnik.Lozinka = HashPassword(korisnikDto.Lozinka);
            korisnik.Ime = korisnikDto.Ime;
            korisnik.Prezime = korisnikDto.Prezime;
            korisnik.DatumRodjenja = korisnikDto.DatumRodjenja;
            korisnik.Adresa = korisnikDto.Adresa;
           
        }

        public static bool IsKorisnikFieldsValid(KorisnikDto korisnikDto)
        {
            if (string.IsNullOrEmpty(korisnikDto.KorisnickoIme))
                return false;
            if (string.IsNullOrEmpty(korisnikDto.Email))
                return false;
            if (string.IsNullOrEmpty(korisnikDto.Lozinka))
                return false;
            if (string.IsNullOrEmpty(korisnikDto.Ime))
                return false;
            if (string.IsNullOrEmpty(korisnikDto.Prezime))
                return false;
            if (korisnikDto.DatumRodjenja > DateTime.Now) //ne moze da se rodi u buducnost \
                return false;
            if (string.IsNullOrEmpty(korisnikDto.Adresa))
                return false;
            

            return true;
        }
    }
}
