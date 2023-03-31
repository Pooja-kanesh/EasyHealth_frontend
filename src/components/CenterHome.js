import Header from "./Header"
import patients from '../images/patient.png'
import vaccines from '../images/vaccine.png'
import './CenterHome.css'

const CenterHome = function () {
    return (<>
        <Header isSubmitted='true' />
        <div className="container-box px-4 text-center center-home">
            <div className="row row-0">
                <div className="col-8">
                    <h5>View/Update Vaccine Inventory</h5></div>
                <div className="col-4 pic"><img src={vaccines} alt="slot booking" /></div>
            </div>
            <div className="row row-0">
                <div className="col-4 pic"><img src={patients} alt="patient" /></div>
                <div className="col-8"><h5>View/Update Patient Records</h5></div>
            </div>
        </div>
    </>)
}

export default CenterHome