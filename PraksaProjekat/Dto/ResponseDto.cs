namespace PraksaProjekat.Dto
{
    public class ResponseDto
    {
        public string Token { get; set; }
        public KorisnikDto KorisnikDto { get; set; }
        public string Result { get; set; }

        public ResponseDto()
        {
            Token = "";
            KorisnikDto = null;
            Result = "";
        }

        public ResponseDto(string result)
        {
            Token = "";
            KorisnikDto = null;
            Result = result;
        }

        public ResponseDto(string token, KorisnikDto korisnikDto, string result)
        {
            Token = token;
            KorisnikDto = korisnikDto;
            Result = result;
        }
    }
}
