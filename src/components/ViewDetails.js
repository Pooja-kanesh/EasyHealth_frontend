import axios from 'axios'
import { useEffect, useState } from 'react'
// import { useNavigate, redirect } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css"
import "./ViewDetails.css"
import Header from './Header'
import edit from '../images/edit.png'
import exit from '../images/close.png'


const ViewDetails = function (props) {
    // console.log(localStorage)
    const member = localStorage.getItem('member')
    const familyId = localStorage.getItem('familyId')

    // const navigate = useNavigate()
    const [details, setDetails] = useState({})
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bgroup, setBgrp] = useState('')
    const [mainDisease, setMainDisease] = useState('')
    const [report, setReport] = useState([])
    // const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        async function getDetails() {
            try {
                const user = await axios.get(`http://localhost:8000/user/${member}`)
                console.log(user)
                const details = await axios.get(`http://localhost:8000/user/getDetails/${member}`)
                console.log(user, details)

                setName(user.data.name)
                if (details.data) {
                    setDetails(details.data)
                    console.log(details.data)
                }

            } catch (e) {
                console.log(e)
            }
        } getDetails()
    }, [details])

    console.log(details)

    const handleDob = (e) => {
        setDob(e.target.value)
        // setSubmitted(false);
    }
    const handleHeight = (e) => {
        setHeight(e.target.value)
        // setSubmitted(false);
    }
    const handleWeight = (e) => {
        setWeight(e.target.value)
        // setSubmitted(false);
    }
    const handleBgrp = (e) => {
        setBgrp(e.target.value)
        // setSubmitted(false);
    }
    const handleMainDisease = (e) => {
        setMainDisease(e.target.value)
        // setSubmitted(false);
    }
    const handleReport = (e) => {
        setReport(e.target.value)
        // setSubmitted(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { dob, height, weight, bloodGroup: bgroup, majorIllness: mainDisease, user: member }
        const details = await axios.post("http://localhost:8000/user/addDetails", data)
        const submitBtn = document.getElementById('submit-btn')
        submitBtn.classList.add('hidden')
        console.log(details)
    }

    const exitHandler = () => {
        console.log("clicked exit")
        // redirect("/user");
    }

    const editHandler = () => {
        document.getElementById('submit-btn').classList.remove('hidden')
    }

    const h = "Height (in cm)"
    const w = "Weight (in kg)"
    const d = "Disease (if any)"
    return (<>
        <Header isSubmitted='true' />
        <div>
            <div>
                <p className="top-bar family"><b>FAMILY ID :</b> {familyId}</p>
                <p className="top-bar family"><b>MEMBER NAME :</b> {name}</p>
            </div>
            <div className='detail-block'>
                <form className="detail-form">
                    <div>
                        <label >Date Of Birth</label>
                        <input type="date" onChange={handleDob}
                            placeholder={dob}
                            className="input form-control"
                            value={dob} />
                    </div>
                    <div>
                        <label className="label">{h}</label>
                        <input type="text" onChange={handleHeight}
                            placeholder={height}
                            className="input form-control"
                            value={height} />
                    </div>
                    <div>
                        <label className="label">{w}</label>
                        <input type="tel" onChange={handleWeight}
                            placeholder={weight}
                            className="input form-control"
                            value={weight} />
                    </div>
                    <div>
                        <label className="label">Blood Group</label>
                        <input type="text" onChange={handleBgrp}
                            placeholder={bgroup}
                            className="input form-control"
                            value={bgroup} />
                    </div>
                    <div>
                        <label className="label">{d}</label>
                        <input type="text" onChange={handleMainDisease}
                            placeholder={mainDisease}
                            className="input form-control"
                            value={mainDisease} />
                    </div>
                    <div>
                        <label className="label">Medical Reports</label>
                        <input type="text" onChange={handleReport}
                            placeholder={report}
                            className="input form-control"
                            value={mainDisease} />
                    </div>
                    <div>
                        <button onClick={handleSubmit}
                            className="btn btn-dark hidden" id='submit-btn'
                            type="submit">
                            Submit
                        </button>
                    </div>
                </form>
                <div onClick={editHandler} className="icon" id="edit-btn"><img src={edit} alt='edit' /></div>
                <div onClick={exitHandler} className="icon"><img src={exit} alt='exit' /></div>
            </div>
        </div>
    </>)
}

export default ViewDetails

/*

<tr className="collapse table-secondary" id={`collapseId-${i}`}>
                        <td colSpan="4">
                            <table className="table mb-0 table-borderless">
                                <thead>
                                    <th scope="col">Patient Details</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan='4'><ViewDetails patient={user.member} /></td>
                                        <td>edit</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

*/