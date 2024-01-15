export default class KorisnikDto {
    constructor(data){
        
        this.id = data.id;
        this.korisnickoIme = data.korisnickoIme;
        this.email = data.email;
        this.lozinka = data.lozinka;
        this.ime = data.ime;
        this.prezime = data.prezime;
        this.datumRodjenja = data.datumRodjenja;
        this.adresa = data.adresa;
        this.tipKorisnika = data.tipKorisnika;
        this.slika = data.slika;
        this.statusVerifikacije = data.statusVerifikacije;
        this.cenaDostave = data.cenaDostave;        
    }
}