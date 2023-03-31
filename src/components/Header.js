import React from "react"
import { Link } from "react-router-dom";

import "./Header.css"
import logo from "../images/app-logo.png";
import axios from "axios";

const Header = function (props) {
    const logoutHandler = async () => {
        try {
            const user = await axios.post("http://localhost:8000/logout")
            localStorage.removeItem('Authorization')
            localStorage.removeItem('member')
            localStorage.removeItem('familyId')
            console.log(localStorage, user)
        } catch (e) {
            console.log(e)
        }
    }

    const buttons = () => {
        if (props.isSubmitted) {
            return (<><div></div>
                <Link onClick={logoutHandler} className="btn btn-primary logbtn" to="/">Log Out</Link></>)
        }
        return (<><Link className="btn btn-danger link-to" to="/register">Register</Link>
            <Link className="btn btn-primary logbtn" to="/login">Log In</Link>
        </>)
    }
    return (<>
        <div className="home-nav border">
            <div className="inner">
                <div><img className="home-logo" src={logo} alt="Logo" /></div>
                <div className="title">EasyHealth</div>
            </div>

            {buttons()}

        </div>
    </>)
}

export default Header;
