import { useEffect, useState } from "react";
import axios from "axios";
import search from "../images/search.png"
import close from "../images/close.png"

// const MAPBOX_API_URL = 'https://api.mapbox.com';
// const MAPBOX_ACCESS_TOKEN = 'your-access-token';

const Centers = function () {
    const [states, setStates] = useState([])
    const [stateName, setStateName] = useState('')
    const [districts, setDistricts] = useState([])
    const [districtName, setDistrictName] = useState('')
    const [vaccines, setVaccines] = useState([])
    const [vaccineName, setVaccineName] = useState('')
    const [centers, setCenters] = useState([])
    // const [bookBtn, setBookBtn] = useState('Book Slot')
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('Authorization')}`;

    async function getState() {
        const data = await axios.get("http://localhost:8000/states")
        setStates(data.data.states)
    }
    useEffect(() => {
        getState()
    }, [])

    async function getDistrict() {
        const data = await axios.get("http://localhost:8000/districts")
        setDistricts(data.data.districts)
    }
    useEffect(() => {
        getDistrict()
    }, [])

    async function getVaccine() {
        const data = await axios.get("http://localhost:8000/vaccines")
        console.log(data.data)
        setVaccines(data.data)
    }
    // useEffect(() => {
    //     getVaccine()
    // }, [])

    const handleState = (e) => {
        getState()
    }
    const handleStateName = (e) => {
        setStateName(e.target.value)
    }
    const handleDistrict = (e) => {
        getDistrict()
    }
    const handleDistrictName = (e) => {
        setDistrictName(e.target.value)
    }
    const handleVaccine = (e) => {
        getVaccine()
    }
    const handleVaccineName = (e) => {
        setVaccineName(e.target.value)
    }

    const searchHospitals = async (state, district) => {
        const query = `${district}, ${state}, India`;
        try {
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/hospital%20clinic%20$${encodeURIComponent(query)}.json?limit=10&types=poi&access_token=pk.eyJ1IjoiY2hpYmktaW4tYS1ib3giLCJhIjoiY2xmcjN6YjJzMDR1NTNwcDJqNzZ5bHkyMCJ9.Gp92JgndGaAI8iLBDzZWDQ`);
            const { features } = response.data;
            const hospitals = features.filter(feature => feature.properties.category.includes('hospital'))
                .map(feature => ({
                    name: feature.text,
                    address: feature.place_name,
                    coordinates: feature.center
                }));
            setCenters(hospitals)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        searchHospitals()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        document.getElementById('selectState').value = 'selected'
        setStateName('')
        document.getElementById('selectDistrict').value = 'selected'
        setDistrictName('')
        document.getElementById('selectVaccine').value = 'selected'
        // setVaccineName('')

        searchHospitals(stateName, districtName)
        document.getElementById('centers').classList.remove('hidden')
        // console.log(stateName, districtName)
    }

    const sendInfo = async (center, vaccine) => {
        const data = await axios.post("http://localhost:8000/booking", { center, vaccine })
    }

    const booked = (i) => {
        const bookSlot = document.getElementById(`book-slot-${i}`)
        bookSlot.classList.remove('btn-outline-primary')
        bookSlot.classList.add('btn-success')
        bookSlot.setAttribute('disabled', '')

        sendInfo(centers[i], vaccineName)
    }

    const handleClose = () => {
        document.getElementById('centers').classList.add('hidden')
    }

    const renderCenters = (centers) => {
        // console.log(centers)
        if (centers === []) return (
            <div className="card">No centers found at this location</div>
        )
        return (
            centers.map((center, i) => {
                return (<div className="card center-card" key={i}>
                    <p>{center.name}</p>
                    <p>{center.address}</p>
                    <button className="btn btn-outline-primary book-slot" id={`book-slot-${i}`} onClick={() => { booked(i) }}>
                        Book Slot</button>
                </div>)
            })
        )
    }

    return (<>
        <div className="search-bar"><h2>Search Medical Centers Near You !</h2>
            <h4>And book an appointment with ease</h4>
            <>
                <form className="d-flex" role="search">
                    <select className="form-select" id="selectState"
                        onClick={handleState}
                        onChange={handleStateName}
                    >
                        <option value='selected'>Select State</option>
                        {states.map((state) => <option key={state.state_id} value={state.state_name}>{state.state_name}</option>)}
                    </select>
                    <select className="form-select" id="selectDistrict"
                        onClick={handleDistrict}
                        onChange={handleDistrictName}
                    >
                        <option value='selected'>Select District</option>
                        {districts.map((district) => <option key={district.district_id} value={district.district_name}>{district.district_name}</option>)}
                    </select>
                    <select className="form-select" id="selectVaccine"
                        onClick={handleVaccine}
                        onChange={handleVaccineName}
                    >
                        <option value='selected'>Select Vaccine</option>
                        {vaccines.map((vaccine) => <option key={vaccine.id} value={vaccine.name}>{vaccine.name}</option>)}
                    </select>
                    <button className="btn search-btn" type="submit" onClick={handleSubmit}><img className="search-icon" src={search} alt="search" /></button>
                </form>
            </>
        </div>
        <div className="center-list hidden" id="centers">
            <div className="center-list-head"><div>Available Centers</div>
                <div className="btn" onClick={handleClose}><img src={close} alt='close' /></div></div>
            {renderCenters(centers)}
        </div>
    </>)
}

export default Centers