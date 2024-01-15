import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../Services/KorisnikService";
import { useEffect } from "react";
import jwt_decode from 'jwt-decode';

const Login = ({handleKorisnikInfo}) => {
    

    const[email, setEmail] = useState('');
    const[lozinka, setLozinka] = useState('');
    const[error, setError] = useState(false);
    
    const navigate = useNavigate();

   


    const setInputsToEmpty = () => {
        setEmail('');
        setLozinka(''); 
    }

    

    

    const redirectTo = (tipKorisnika) => {
        if(tipKorisnika === 'Administrator'){
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
    
        if(email.length === 0 || lozinka.length === 0){
            setError(true)
            return;
        }

        const data = await LoginUser(email, lozinka);
        if(data !== null){
            sessionStorage.setItem("isAuth", JSON.stringify(true));
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("korisnik", JSON.stringify(data.korisnikDto));
            const tipKorisnika = data.korisnikDto.tipKorisnika; // propertiji su mala slova
            handleKorisnikInfo(true); //prvo se postave podaci pa se re reneruje
            alert("Uspesno ste se logovali");
            redirectTo(tipKorisnika);
        }
        else{
            
            sessionStorage.setItem("isAuth", false);
            handleKorisnikInfo(false); //prvo se postave podaci pa se re reneruje
            setInputsToEmpty();
        }
    }

    return (
        <div className="card">
            <form className="ui form" onSubmit={handleSubmit}>
                <h2 className="ui center aligned header">Log in</h2>
                <div className="field">
                    <label>Email</label>
                    <input type="email"
                           value={email} 
                           name="email" 
                           placeholder="Email" 
                           onChange={(e) => setEmail(e.target.value)}/>
                    {error && email.length === 0 ? <div className="ui pointing red basic label">Morate uneti email</div> : null}
                </div>
                <div className="field">
                    <label>Lozinka</label>
                    <input type="password" 
                           value={lozinka}
                           name="lozinka" 
                           placeholder="Lozinka"
                           onChange={(e) => setLozinka(e.target.value)}/>
                    
                   {error && lozinka.length === 0 ? <div className="ui pointing red basic label">Morate uneti lozinku</div> : null} 
                </div>

                <div className="buttons-flex">
                    <button className="ui blue button" type="submit">Log in</button>
                    <div id="signInDiv"></div>
                </div>
                
                
                
               
                
                
            </form>
        </div>
    );
}

export default Login;