import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

import Header from "./Header";
import Centers from './Centers.js'
import ViewMembers from "./ViewMembers";
import "./ViewMembers.css"
import "./UserHome.css"
import { useNavigate } from "react-router-dom";

const UserHome = function () {
    const navigate = useNavigate()

    const [members, setMembers] = useState([])
    const [familyId, setFamilyId] = useState("")
    const [name, setName] = useState("");
    const [relation, setRelation] = useState("");
    const addMember = document.getElementById("add-member")
    const addBtn = document.getElementById("add-mem-btn")

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('Authorization')}`;

    async function getMembers() {
        try {
            const family = await axios.get("http://localhost:8000/user/members")
            const relations = family.data
            const memberArr = relations.members
            const famId = `FI${(relations._id).substring(relations._id.length - 10)}`
            localStorage.setItem('familyId', famId)

            setFamilyId(famId)
            setMembers(memberArr)
        } catch (e) {
            console.log(e)
        }
    }

    const handleAddMember = async () => {
        addBtn.classList.add("active-btn")
        addMember.classList.remove("collapse")
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleRelation = (e) => {
        setRelation(e.target.value);
    }

    const handleSubmit = async () => {
        const data = { name, relation }
        await axios.post("http://localhost:8000/user/addMember", data)

        addBtn.classList.remove("active-btn")
        addMember.classList.add("collapse")
        setName('')
        setRelation('')
        getMembers()
    }

    const handleDownload = () => {
        fetch('sample.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'SamplePDF.pdf';
                alink.click();
            })
        })
    }

    const handleVaccCard = () => {
        navigate('/')
    }

    useEffect(() => {
        getMembers()
    }, [members]);

    return (<>
        <Header isSubmitted='true' />
        <div className="home-section">
            <div className="container px-4 text-center user-extra">
                <div className="card" onClick={handleDownload}>Download Certificate</div>
                <div className="card" onClick={handleVaccCard}>View Vaccine Card</div>
                <div className="card">View Bookings</div>
            </div>
            <div className="homepage">
                <Centers />
                <div className="top-bar family"><b>Family ID :</b> {familyId}</div>
                <table className="table table-bordered align-middle">
                    <thead className="table-success">
                        <tr>
                            <th scope="col" className="index"></th>
                            <th scope="col">Member Name</th>
                            <th scope="col">Relation</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <ViewMembers members={members} familyId={familyId} />
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="4"><p onClick={handleAddMember} className="btn add-btn" id="add-mem-btn">Add member</p></th>
                        </tr>
                        <tr>
                            <td colSpan='4' className="collapse" id="add-member">
                                <form className="member-form">
                                    <div><label className="label">Name</label><input type='text' value={name} className="input form-control" onChange={handleName} /></div>
                                    <div><label className="label">Relation</label><input type='text' value={relation} className="input form-control" onChange={handleRelation} /></div>
                                </form>
                                <p className="btn btn-light sub-btn" onClick={handleSubmit}>Submit</p>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div></div >
    </>
    );

}

export default UserHome