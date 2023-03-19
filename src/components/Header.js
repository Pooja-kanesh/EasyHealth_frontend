import React from "react"
import logo from "../images/app-logo.png";

const Header = function () {
    return (<>
        <div className="home-nav">
            <div className="inner">
                <div><img className="home-logo" src={logo} alt="Logo" /></div>
                <div className="title">EasyHealth</div>
            </div>

            <button type="button" class="btn btn-outline-danger">Register</button>
            <button type="button" class="btn btn-outline-primary">Log In</button>

        </div>
    </>)
}

export default Header;
