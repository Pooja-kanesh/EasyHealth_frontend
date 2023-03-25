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
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setSubmitted(false);
    }

    const handleContact = (e) => {
        setContact(e.target.value)
        setSubmitted(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes("@" || !contact)) {
            setError(true);
            setErrMsg('* Please enter all the fields correctly*')
        } else {
            try {

                const data = { email, contact }
                const user = await axios.post("http://localhost:8000/login", data)
                // console.log(data, user)

                localStorage.setItem('Authorization', user.data.token)
                // console.log(localStorage)

                setEmail('')
                setContact('')
                setErrMsg('')
                setError(false)
                setSubmitted(true)
                navigate('/user')

            } catch (e) {
                setError(true)
                setErrMsg('*User Already Exists*')
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

