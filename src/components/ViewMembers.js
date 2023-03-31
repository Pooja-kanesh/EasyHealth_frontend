import axios from "axios"
import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

// import ViewDetails from "./ViewDetails.js"
import edit from '../images/edit.png'
import "./ViewMembers.css"

// const _ = require('lodash');

const ViewMembers = function (props) {
    const [arr, setArr] = useState([]);
    const [detailArr, setDetailArr] = useState([]);

    const [user, setUser] = useState('')
    const [dob, setDob] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bgroup, setBgrp] = useState('')
    const [mainDisease, setMainDisease] = useState('')
    // const [report, setReport] = useState([])

    async function getResultsAndUpdateState() {
        try {
            const results = await getResults(props.members);
            setArr(results);
            // update the state with the results array

        } catch (error) {
            console.error(error); // handle errors
        }
    }

    async function getResults(arr) {
        const results = [];
        for (let i = 0; i < arr.length; i++) {
            const result = await sendRequest(arr[i]);
            results.push({ ...arr[i], name: result.name });
        }
        return results;
    }

    async function sendRequest(element) {
        const response = await axios.get(`http://localhost:8000/user/${element.member}`);
        return response.data;
    }

    async function getDetails() {
        const details = await fetchData(props.members)
        // console.log(details)
        setDetailArr(details)
    }

    const fetchData = async (dataArray) => {
        const promises = dataArray.map((data) => axios.get(`http://localhost:8000/user/getDetails/${data.member}`));
        const results = await Promise.all(promises);

        const dataObjects = results.map((result) => result.data || {});
        return dataObjects;
    }

    useEffect(() => {
        getResultsAndUpdateState()
        // eslint-disable-next-line
    }, [arr])

    useEffect(() => {
        getDetails()
        // eslint-disable-next-line
    }, [detailArr])

    const clickHandler = (user, i) => {
        // console.log(user)
        setUser(user.member)
        document.getElementById(`details-${i}`).classList.toggle('collapse')
    }

    const handleEdit = (i) => {
        document.getElementById(`d-form-${i}`).removeAttribute('disabled')
        setUser(arr[i].member)
    }

    const handleDob = (i, e) => {
        setDob(e.target.value)
        // setSubmitted(false);
    }
    const handleHeight = (i, e) => {
        setHeight(e.target.value)
        console.log(i)
        // setSubmitted(false);
    }
    const handleWeight = (i, e) => {
        setWeight(e.target.value)
        // setSubmitted(false);
    }
    const handleBgrp = (i, e) => {
        setBgrp(e.target.value)
        // setSubmitted(false);
    }
    const handleMainDisease = (i, e) => {
        setMainDisease(e.target.value)
        // setSubmitted(false);
    }
    // const handleReport = (e) => {
    //     setReport(e.target.value)
    //     // setSubmitted(false);
    // }

    const handleSubmit = async (i, e) => {
        e.preventDefault()

        const data = { dob, height, weight, bloodGroup: bgroup, majorIllness: mainDisease, user: user }
        const details = await axios.post("http://localhost:8000/user/addDetails", data)

        document.getElementById(`dob-${i}`).value = ''
        document.getElementById(`h-${i}`).value = ''
        document.getElementById(`w-${i}`).value = ''
        document.getElementById(`b-${i}`).value = ''
        document.getElementById(`d-${i}`).value = ''
        document.getElementById(`d-form-${i}`).setAttribute('disabled')
        console.log(data)
        getDetails()
    }

    return (<>
        {arr.map((item, i) => {
            // console.log(item)
            return (<>
                <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.relation}</td>
                    <td>
                        <button className="btn btn-outline-success"
                            onClick={() => clickHandler(item, i)}>
                            Details
                        </button>
                    </td>
                </tr>
                <tr className="collapse" id={`details-${i}`}>
                    <td colSpan='4'>
                        <table className="table mb-0">
                            <thead>
                                <tr>
                                    <th>Patient's Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr scope="row">
                                    <td>
                                        <div className='detail-block'>
                                            <form className="detail-form" id={`d-form-${i}`}>
                                                <div>
                                                    <label className="label">Date Of Birth</label>
                                                    <input type="text"
                                                        className="input form-control"
                                                        id={`dob-${i}`}
                                                        // placeholder={`${detailArr[i].dob ? detailArr[i].dob : ''}`}
                                                        onChange={(e) => { handleDob(i, e) }}
                                                        placeholder={`${detailArr[i].dob ? detailArr[i].dob : 'Enter Dob'}`}
                                                    ></input>
                                                </div>
                                                <div>
                                                    <label className="label">{`Height (in cm)`}</label>
                                                    <input type="text"
                                                        className="input form-control"
                                                        id={`h-${i}`}
                                                        // placeholder={`${detailArr[i].height ? detailArr[i].height : ''}`}
                                                        onChange={(e) => { handleHeight(i, e) }}
                                                        placeholder={`${detailArr[i].height ? detailArr[i].height : 'Enter Height'}`}
                                                    ></input>
                                                </div>
                                                <div>
                                                    <label className="label">{`Weight (in kg)`}</label>
                                                    <input type="text"
                                                        className="input form-control"
                                                        id={`w-${i}`}
                                                        // placeholder={`${detailArr[i].weight ? detailArr[i].weight : ''}`}
                                                        onChange={(e) => { handleWeight(i, e) }}
                                                        placeholder={`${detailArr[i].weight ? detailArr[i].weight : 'Enter Weight'}`}
                                                    ></input>
                                                </div>
                                                <div>
                                                    <label className="label">Blood Group</label>
                                                    <input type="text"
                                                        className="input form-control"
                                                        id={`b-${i}`}
                                                        // placeholder={`${detailArr[i].bloodGroup ? detailArr[i].bloodGroup : ''}`}
                                                        onChange={(e) => { handleBgrp(i, e) }}
                                                        placeholder={`${detailArr[i].bloodGroup ? detailArr[i].bloodGroup : 'Enter Blood group'}`}
                                                    ></input>
                                                </div>
                                                <div>
                                                    <label className="label">{`Disease (if any)`}</label>
                                                    <input type="text"
                                                        className="input form-control"
                                                        id={`d-${i}`}
                                                        placeholder={`${detailArr[i].majorIllness ? detailArr[i].majorIllness : 'Enter Major Disease'}`}
                                                        onChange={(e) => { handleMainDisease(i, e) }}>
                                                    </input>
                                                </div>
                                                <div>
                                                    <label className="label">Medical Reports</label>
                                                    <input type="file"
                                                        className="input form-control"
                                                    ></input>
                                                </div>
                                                <div>
                                                    <button
                                                        className="btn btn-dark" id={`submit-btn-${i}`}
                                                        type="submit"
                                                        onClick={(e) => { handleSubmit(i, e) }}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                            <div className="icon" id={`edit-btn-${i}`} onClick={() => { handleEdit(i) }}><img src={edit} alt='edit' /></div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </>
            )
        }
        )}
    </>
    )
}

export default ViewMembers
