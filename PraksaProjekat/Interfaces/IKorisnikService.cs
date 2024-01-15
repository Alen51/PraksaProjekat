using PraksaProjekat.Dto;

namespace PraksaProjekat.Interfaces
{
    public interface IKorisnikService
    {
        Task<KorisnikDto> AddKorisnik(KorisnikDto newKorisnikDto);
        Task<List<KorisnikDto>> GetAllKorisnik();
        Task<KorisnikDto> GetKorisnikById(long id);
        Task<KorisnikDto> UpdateKorisnik(long id, KorisnikDto updateKorisnikDto);
        Task DeleteKorisnik(long id);

        Task<ResponseDto> Login(LoginKorisnikDto loginKorisnikDto);
        Task<ResponseDto> Registration(KorisnikDto registerKorisnik);
    }
}
