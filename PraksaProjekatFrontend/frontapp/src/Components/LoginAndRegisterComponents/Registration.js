import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { RegisterUser } from "../../Services/KorisnikService";
import jwt_decode from 'jwt-decode';
//import UploadImage from "../Other Components/UploadImage";
//import imageUrl from "../../Picture/registerPic.png";

const Registration = ({handleKorisnikInfo}) => {
    const [korisnickoIme, setKorisnickoIme] = useState('');
    const [email, setEmail] = useState('');
    const [lozinka, setLozinka] = useState('');
    const [lozinka2, setLozinka2] = useState('');
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [datumRodjenja, setDatumRodjenja] = useState(null);
    const [tipKorisnika, setTipKorisnika] = useState('Kupac');
    const [adresa, setAdresa] = useState('')
    const [statusVerifikacije, setStatusVerifikacije] = useState('Prihvacen');
    const [cenaDostave, setCenaDostave] = useState(0);
    const [slika, setSlika] = useState('');

    const [googleUser, setGoogleUser] = useState({});
    const navigate = useNavigate();


    const[error, setError] = useState(false);


    
    
    const handleCallbackResponse = async (response) => {
        //console.log("Token: " + response.credential)
/*
        var userObject = jwt_decode(response.credential)
      
        const korisnickoIme = userObject.name;
        const email = userObject.email;
        const lozinka = userObject.email;
        const ime = userObject.given_name;
        const prezime = userObject.family_name;
        const datumRodjenja = new Date();
        const tipKorisnika = 'Kupac';
        const statusVerifikacije = 'Prihvacen';
        const cenaDostave = 0;
        const adresa = 'Trenutna adresa';
        const slika = userObject.picture

        const korisnikJSON = JSON.stringify({
            korisnickoIme,
            email,
            lozinka,
            ime,
            prezime,
            datumRodjenja,
            tipKorisnika,
            adresa,
            statusVerifikacije, 
            cenaDostave,
            slika});
        
        const data = await RegisterUser(korisnikJSON);
        if(data !== null){
            sessionStorage.setItem('isAuth', JSON.stringify(true));
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('korisnik', JSON.stringify(data.korisnikDto));
            handleKorisnikInfo(true); //prvo se postave podaci pa se re reneruje
            alert("Uspesno ste se registrovali");
            redirectTo('/profil');

        } else {
            setInputsToEmpty();
            sessionStorage.setItem('isAuth', JSON.stringify(false));
            handleKorisnikInfo(false);
        }*/
    }

    //verifikacija korisnika preko gmaila
    /*
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT,
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {theme: "outline", size:"medium"}
        )
    }, [])*/

    const setInputsToEmpty = () => {
        setKorisnickoIme('');
        setEmail('');
        setLozinka('');
        setLozinka2('');
        setIme('');
        setPrezime('');
        setDatumRodjenja('');
        setTipKorisnika('Kupac');
        setStatusVerifikacije('Prihvacen');
        setAdresa('');
        setCenaDostave('');
    }

    const redirectTo = (tipKorisnika) => {
        if(tipKorisnika === 'Admin'){
            navigate('/adminDashboard');
        }
        else if(tipKorisnika === 'Kupac'){
            navigate('/kupacDashboard');
        }
        else if(tipKorisnika === 'Prodavac'){
            navigate('/prodavacDashboard');
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
      
        //uraditi provere za lozinke, tj. da li se prva i druga poklapaju i da li su uneta stva polja

        if(korisnickoIme.length === 0 || email.length === 0 || lozinka.length === 0 || lozinka2.length === 0 
            || ime.length === 0 || prezime.length === 0 || datumRodjenja === null || adresa.length === 0 || lozinka !== lozinka2
            || (cenaDostave === 0 && tipKorisnika === 'Prodavac') ){
                setError(true);
                return;
            }


        if(lozinka === lozinka2){
            const korisnikJSON = JSON.stringify({
                korisnickoIme,
                email,
                lozinka,
                ime,
                prezime,
                datumRodjenja,
                tipKorisnika,
                adresa,
                statusVerifikacije, 
                cenaDostave,
                slika
            });


            const data = await RegisterUser(korisnikJSON);
            if(data !== null){
                sessionStorage.setItem('isAuth', JSON.stringify(true));
                sessionStorage.setItem('token', data.token)
                sessionStorage.setItem('korisnik', JSON.stringify(data.korisnikDto));
                handleKorisnikInfo(true); //prvo se postave podaci pa se re reneruje
                alert("Uspesno ste se registrovali");
                redirectTo('/profil');

            } else {
                setInputsToEmpty();
                sessionStorage.setItem('isAuth', JSON.stringify(false));
                handleKorisnikInfo(false);
                //<UploadImage slika={slika} setSlika={setSlika}></UploadImage> 
            }
        }
    }

    return (
      <div className="card">
            <form className="ui form" onSubmit={handleSubmit}>
            <h2 className="ui centered aligned header">Registration</h2>
                  
                {error && slika.length === 0 ? <div className="ui pointing red basic label">Morate odabrati sliku</div> : null}         
                <div className="field">
                    <label>Korisnicko ime</label>
                    <input  type="text" 
                            name="korisnickoIme"  
                            placeholder="Korisnicko ime"
                            value={korisnickoIme}
                            onChange={(e) => setKorisnickoIme(e.target.value)}
                            />
                    {error && korisnickoIme.length === 0 ? <div className="ui pointing red basic label">Morate uneti korisnickoIme</div> : null}
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="email"
                           name="email" 
                           placeholder="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    {error && email.length === 0 ? <div className="ui pointing red basic label">Morate uneti email</div> : null}
                </div>
                <div className="field">
                    <div className="two fields"> 
                        <div className="field">
                            <label>Lozinka</label>
                            <input  type="password" 
                                    name="lozinka" 
                                    placeholder="Lozinka"
                                    value={lozinka}
                                    onChange={(e) => setLozinka(e.target.value)}/>
                            {error && lozinka.length === 0 ? <div className="ui pointing red basic label">Morate uneti lozinku</div> : null}
                        </div>
                        <div className="field">
                            <label>Potvrdite lozinku</label>
                            <input  type="password" 
                                    name="lozinka2" 
                                    placeholder="Potvrdite lozinku"
                                    value={lozinka2}
                                    onChange={(e) => setLozinka2(e.target.value)}
                                    />
                            {error && lozinka2.length === 0 ? <div className="ui pointing red basic label">Morate potvrditi lozinku</div> : null}
                        </div>
                    </div>
                </div>
                    {error && lozinka !== lozinka2  ? 
                        <div className="field">
                            <div className="ui pointing red basic label">Lozinke se moraju poklapati</div>
                        </div>
                    : null}
                <div className="field">
                    <div className="two fields">
                        <div className="field">
                            <label>Ime</label>
                            <input  type="text"
                                    name="ime" 
                                    placeholder="Ime"
                                    value={ime}
                                    onChange={(e) => setIme(e.target.value)}
                                    />
                            {error && ime.length === 0 ? <div className="ui pointing red basic label">Morate uneti ime</div> : null}
                        </div>
                        <div className="field">
                            <label>Prezime</label>
                            <input  type="text" 
                                    name="prezime" 
                                    placeholder="Prezime"
                                    value={prezime}
                                    onChange={(e) => setPrezime(e.target.value)}
                                    />
                            {error && prezime.length === 0 ? <div className="ui pointing red basic label">Morate uneti prezime</div> : null}
                        </div>
                    </div>
                </div>
                <div className="fields">
                    <div className="six wide field">
                        <label>Datum Rodjenja</label>
                        <DatePicker 
                            showIcon
                            selected={datumRodjenja}
                            onChange={datum => setDatumRodjenja(datum)}
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown
                            scrollableMonthYearDropdown
                        />
                        {error && datumRodjenja === null ? <div className="ui pointing red basic label">Morate izabrati datum rodjenja</div> : null}
                    </div>
                    <div className="ten wide field">
                        <label>Tip korisnika</label>
                        <select value={tipKorisnika} className="ui fluid dropdown" onChange={(e) => setTipKorisnika(e.target.value)}>
                            <option value="Kupac">Kupac</option>
                            <option value="Prodavac">Prodavac</option>
                            <option value="Administrator">Administrator</option>
                        </select>
                    </div>
                </div>
                <div className="field">
                    <label>Adresa</label>
                    <input  type="text" 
                            name="adresa" 
                            placeholder="Adresa"
                            value={adresa}
                            onChange={(e) => setAdresa(e.target.value)}
                            />
                    {error && adresa.length === 0 ? <div className="ui pointing red basic label">Morate uneti adresu</div> : null}
                </div>
                {tipKorisnika === "Prodavac" ? 
                        <div className="field">
                            <label>Kao prodavac, potrebno je uneti cenu dostave</label>
                            <input  type="number" 
                                    name="cenaDostave" 
                                    placeholder="Cena dostave"
                                    value={cenaDostave}
                                    onChange={(e) => setCenaDostave(e.target.value)}
                                    />
                            {error && cenaDostave === "" ? <div className="ui pointing red basic label">Morate uneti cenu dostave</div> : null}
                        </div>
                            : null}
                        
                <div className="buttons-flex">
                    <button className="ui blue button" type="submit">Submit</button>
                    <div id="signInDiv"></div>
                </div>
                
                
               
            </form>
        </div>
    );
}

export default Registration;