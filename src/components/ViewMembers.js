import axios from "axios"
import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

// import ViewDetails from "./ViewDetails.js"
import edit from '../images/edit.png'
import "./ViewMembers.css"

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
        document.getElementById(`details-${i}`).classList.toggle('collapse')
    }

    const handleEdit = (i) => {
        setUser(arr[i].member)
    }

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
    // const handleReport = (e) => {
    //     setReport(e.target.value)
    //     // setSubmitted(false);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { dob, height, weight, bloodGroup: bgroup, majorIllness: mainDisease, user: user }
        const details = await axios.post("http://localhost:8000/user/addDetails", data)

        console.log(details)
        getDetails()
    }

    const h = "Height (in cm)"
    const w = "Weight (in kg)"
    const d = "Disease (if any)"
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
                                            <form className="detail-form">
                                                <div>
                                                    <label className="label">Date Of Birth</label>
                                                    <input type="date"
                                                        className="input form-control"
                                                        // placeholder={`${detailArr[i].dob ? detailArr[i].dob : ''}`}
                                                        onChange={handleDob}
                                                    // value={`${detailArr[i].dob ? detailArr[i].dob : ''}`}
                                                    ></input>
                                                </div>
                                                <div>
                                                    <label className="label">{h}</label>
                                                    <input type="text"
                                                        className="input form-control"
                                                        // placeholder={`${detailArr[i].height ? detailArr[i].height : ''}`}
                                                        onChange={handleHeight}
                                                    // value={`${detailArr[i].height ? detailArr[i].height : ''}`}
                                                    ></input>
                                                </div>
                                                <div>
                                                    <label className="label">{w}</label>
                                                    <input type="tel"
                                                        className="input form-control"
                                                        // placeholder={`${detailArr[i].weight ? detailArr[i].weight : ''}`}
                                                        onChange={handleWeight}
                                                    // value={`${detailArr[i].weight ? detailArr[i].weight : ''}`}
                                                    ></input>
                                                </div>
                                                <div>
                                                    <label className="label">Blood Group</label>
                                                    <input type="text"
                                                        className="input form-control"
                                                        // placeholder={`${detailArr[i].bloodGroup ? detailArr[i].bloodGroup : ''}`}
                                                        onChange={handleBgrp}
                                                    // value={`${detailArr[i].bloodGroup ? detailArr[i].bloodGroup : ''}`}
                                                    ></input>
                                                </div>
                                                <div>
                                                    <label className="label">{d}</label>
                                                    <input type="text"
                                                        className="input form-control"
                                                        // placeholder={`${detailArr[i].majorIllness ? detailArr[i].majorIllness : ''}`}
                                                        onChange={handleMainDisease}>
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
                                                        onClick={handleSubmit}>
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
