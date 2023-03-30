import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import slot_book from "../images/slot-booking.png";
import child_vac from "../images/child-vaccine.png";
import health from "../images/health-records.png"
import Header from "./Header.js"
import "./Home.css"
import { Link } from "react-router-dom";

const Home = function () {
    return (
        <>
            <Header />
            <section className="intro">
                <h1>EasyHealth</h1>
                <h3>A solution to keep you and your family healthy</h3>
                <h5>Where we strive to provide you with the latest information<br></br> and resources related to vaccines and healthcare management. </h5>
                <br></br>
                <Link to="/register" ><button className="btn btn-outline-light home-register">Register</button></Link>
                <h5>Access all the features now!</h5>
            </section>
            <div className="container-box">
                <div className="row row-0">
                    <div className="col-8 description book">
                        <h2><b>Book Your Slot</b></h2>To ease the process of identifying Vaccination Centres 
                        in your city, We have launched EasyHealth where you can check the
                         availability of vaccines such as BCG, Hepatitis B, Polio, MMR, RotaVirus etc. 
                         You can also see vaccine registration slots available for each type of vaccine 
                         In order to get vaccinated you will have to first register yourself to 
                         receive a specific dose of vaccine by doing a self registration.</div>
                    <div className="col-4 pic"><img src={slot_book} alt="slot booking" /></div>
                </div>
                <div className="row row-0">
                    <div className="col-4 pic"><img src={child_vac} alt="child vaccination" /></div>
                    <div className="col-8 description child-vac"><h2><b>Schedule Child's Vaccination</b></h2>
                    Vaccines are most effective when they are administered to children at the right age and with 
                    the recommended dosage as children are susceptible to certain diseases at certain ages.
                    Register your child's vaccine and get updates for dosage</div>
                </div>
                <div className="row row-0">
                    <div className="col-8 description record"><h2><b>Keep Health Records</b></h2>
                    Health record is a confidential compilation of pertinent facts of an individual's health history, 
                    including all past and present medical conditions, illnesses and treatments, with emphasis on the 
                    specific events affecting the patient during the current episode of care.
                    We provide health record for all our patients for smooth health tracking </div>
                    <div className="col-4 pic"><img src={health} alt="health records" /></div>
                </div>
            </div>
        </>
    );
};

export default Home;
