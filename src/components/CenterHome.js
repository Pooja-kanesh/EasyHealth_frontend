import Header from "./Header"
import './CenterHome.css'

const CenterHome = function () {
    return (<>
        <Header isSubmitted='true' />
        <div className="container px-4 text-center center-home">

            <div className="card text-center">View/Update Vaccine Inventory</div>
            <div className="card text-center">View/Update Patient Records</div>
        </div></>)
}

export default CenterHome