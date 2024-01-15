import KorisnikDto from "./KorisnikDto";

export default class ResponseDto{
    constructor(data){
        this.token = data.token;
        this.korisnikDto = new KorisnikDto(data.korisnikDto);
        this.result = data.result;
    }
}