import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import "./navigation.css"


export const Navigation = (props) => {
  const history = useNavigate()

    const handleClick = () =>{
        signOut(auth).then(val=>{
            console.log(val,"val")
            history('/login')
        })
    }
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top" style={{ backgroundColor: '#333', color: '#fff' }}>
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <img src="img/app_icon.png" className="app_logo_icon" href="/home"/>
          <Link  className="navbar-brand page-scroll" to="/aboutus" style={{ color: '#ffffff' }}>
            Res-Q
          </Link>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        style={{color:'#ffffff'}}>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link className="page-scroll" to="/dashboard"style={{color:'#ffffff'}}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="page-scroll" to="/aboutus" style={{color:'#ffffff'}}>
                About
              </Link>
            </li>
            <li>
              <Link className="page-scroll" to="/contactus" style={{color:'#ffffff'}}>
                Contact
              </Link>
            </li>
            <li>
              <Link className="page-scroll" onClick={handleClick} style={{color:'#ffffff'}}>
                SignOut
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
