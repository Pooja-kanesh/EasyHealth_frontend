import { useState } from "react"
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"

import Header from "./Header";
import "./Register.css"

const Register = function (props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [isCenter, setIsCenter] = useState(false)


    const navigate = useNavigate();
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

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

        if (name === "" || !email.includes("@" || !contact || !password)) {
            setError(true);
            setErrMsg('* Please enter all the fields correctly* ')
        }
        else {
            try {
                let data = { name, email, contact, password }
                if (isCenter) {
                    data = { ...data, usertype: 'center' }
                }

                const user = await axios.post("http://localhost:8000/register", data)
                console.log(data, user)

                localStorage.setItem('Authorization', user.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('Authorization')}`;
                console.log(localStorage);

                setName('')
                setEmail('')
                setContact('')
                setPassword('')
                setErrMsg('')
                setError(false)
                setSubmitted(true)
                if (isCenter) navigate('/center')
                else navigate('/user')

            } catch (e) {
                setError(true)
                setErrMsg('*User Already Exists*')
                console.log(e)
            }
        }
    }

    const roleHandler = () => {
        if (isCenter) setIsCenter(false)
        else setIsCenter(true)
    }

    const successMessage = () => {
        return (

            <p className="success"
                style={{
                    display: submitted ? "" : "none",
                    color: "green"
                }}> User successfully registered!!</p>

        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <p className="error"
                style={{
                    display: error ? "" : "none",
                    color: "rgb(212, 2, 2)",
                }}>{errMsg}
            </p>

        );
    };


    return (<>
        <Header isSubmitted={submitted} />

        <div className="form-page">

            <div className="register-form" >
                <div>
                    <h1>REGISTER</h1>
                </div>
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>
                <form className="form-style">
                    {/* Labels and inputs for form data */}
                    <div className="animate">
                        <label className="label">Name</label>
                        <input
                            onChange={handleName}
                            placeholder=""
                            className="input form-control"
                            value={name}
                            type="text" />
                    </div>
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
                            Register as Medical Center?
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

export default Register
