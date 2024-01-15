using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PraksaProjekat.Dto;
using PraksaProjekat.Interfaces;

namespace PraksaProjekat.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class KorisnikController : ControllerBase
    {
        private readonly IKorisnikService _korisnikService;
        private readonly IEmailService _emailVerifyService;

        public KorisnikController(IKorisnikService korisnikService, IEmailService emailVerifyService)
        {
            _korisnikService = korisnikService;
            _emailVerifyService = emailVerifyService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            List<KorisnikDto> korisnici = await _korisnikService.GetAllKorisnik();
            return Ok(korisnici);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetKorisnikById(long id)
        {
            return Ok(await _korisnikService.GetKorisnikById(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateKorisnik([FromBody] KorisnikDto korisnik)
        {
            return Ok(await _korisnikService.AddKorisnik(korisnik));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ChangeKorisnik(long id, [FromBody] KorisnikDto korisnik)
        {
            KorisnikDto updatedKorisnik = await _korisnikService.UpdateKorisnik(id, korisnik);
            if (updatedKorisnik == null)
            {
                return BadRequest("Postoje neka prazna polja(mozda korisnik ne postoji)");
            }

            updatedKorisnik.Lozinka = korisnik.Lozinka;
            return Ok(updatedKorisnik);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKorisnik(long id)
        {
            await _korisnikService.DeleteKorisnik(id);
            return Ok($"Korisnik sa id = {id} je uspesno obrisan.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginKorisnikDto loginKorisnikDto)
        {
            ResponseDto responseDto = await _korisnikService.Login(loginKorisnikDto);
            if (responseDto.KorisnikDto == null)
            {
                return BadRequest(responseDto.Result);
            }

            responseDto.KorisnikDto.Lozinka = loginKorisnikDto.Lozinka;
            return Ok(responseDto);
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Registration([FromBody] KorisnikDto registerKorisnikDto)
        {
            ResponseDto responseDto = await _korisnikService.Registration(registerKorisnikDto);
            if (responseDto.KorisnikDto == null)
                return BadRequest(responseDto.Result);

            responseDto.KorisnikDto.Lozinka = registerKorisnikDto.Lozinka;
            return Ok(responseDto);
        }

    }
}
