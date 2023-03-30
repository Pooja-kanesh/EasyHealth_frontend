import React from "react"
import axios from "axios"
import { useState } from "react"
// import { Link } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import "./Register.css"
import Header from "./Header"
import { useNavigate } from "react-router-dom"

const Login = function (props) {
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [isCenter, setIsCenter] = useState(false)

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setSubmitted(false);
    }

    const handleContact = (e) => {
        setContact(e.target.value)
        setSubmitted(false);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        setSubmitted(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes("@" || !contact || !password)) {
            setError(true);
            setErrMsg('* Please enter all the fields correctly*')
        } else {
            try {

                const data = { email, contact, password }
                const user = await axios.post("http://localhost:8000/login", data)
                // console.log(data, user)

                localStorage.setItem('Authorization', user.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('Authorization')}`;
                // console.log(localStorage);

                setEmail('')
                setContact('')
                setPassword('')
                setErrMsg('')
                setError(false)
                setSubmitted(true)
                navigate('/user')

            } catch (e) {
                setError(true)
                setErrMsg('* Unable to Login. Please try again *')
                console.log(e)
            }
        }
    }

    const successMessage = () => {
        return (

            <p className="success"
                style={{
                    display: submitted ? "" : "none",
                    color: "green"
                }}>User successfully registered!!</p>

        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (

            <p className="error"
                style={{
                    display: error ? "" : "none",
                    color: "rgb(212, 2, 2)",
                }}>{errMsg}</p>

        );
    };

    const roleHandler = () => {
        if (isCenter) setIsCenter(false)
        else setIsCenter(true)
    }

    return (<>
        <Header isSubmitted={submitted} />
        <div className="form-page">
            <div className="register-form" >
                <div>
                    <h1>LOGIN</h1>
                </div>
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>
                <form className="form-style">
                    {/* Labels and inputs for form data */}

                    <div className="animate">
                        <label className="label">Email</label>
                        <input
                            onChange={handleEmail}
                            placeholder=" "
                            className="input form-control"
                            value={email}
                            type="email" />
                    </div>
                    <div className="animate">
                        <label className="label">Contact Number</label>
                        <input
                            onChange={handleContact}
                            placeholder=" "
                            className="input form-control"
                            value={contact}
                            type="tel" />
                    </div>
                    <div className="animate">
                        <label className="label">Password</label>
                        <input
                            onChange={handlePassword}
                            placeholder=" "
                            className="input form-control"
                            value={password}
                            type="password" />
                    </div>
                    <div className="role">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault" onClick={roleHandler}>
                            Login as Medical Center?
                        </label>
                    </div>
                    <div>
                        <button
                            onClick={handleSubmit}
                            className="btn btn-dark"
                            type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className="form-image"></div>
        </div>
    </>)
}

export default Login;

