import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = ({isAuth, tipKorisnika, statusVerifikacije}) => {

    const active = (isActive) =>{
        if(isActive)
            return "item active"
        else
            return "item"
    }

    

    return (
        <div className="ui inverted blue secondary menu">
        {/*nelogovani i neregistrovani korisnici
        oni vide home, register i login. Posle cu dodavati za role, da li je korisnik ovakav ili onakav*/}
        {isAuth ? null : <NavLink className={({isActive}) => active(isActive)} to="/" >Home page</NavLink> }
        {isAuth ? null : <NavLink className={({isActive}) => active(isActive)} to="/login">Log in</NavLink> }
        {isAuth ? null : <NavLink className={({isActive}) => active(isActive)} to="/registration">Registration</NavLink> }
        
       
        {isAuth ? <NavLink className={({isActive}) => active(isActive)}  to="/">Logout</NavLink> : null}


    </div>
    )
}


export default NavBar;