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
                        <h2><b>Book Your Slot</b></h2>Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Cum aliquid animi fugiat modi impedit ratione ipsa odit reiciendis,
                        ipsam delectus nemo. Ducimus ullam voluptatum facilis non vitae veritatis porro laboriosam.</div>
                    <div className="col-4 pic"><img src={slot_book} alt="slot booking" /></div>
                </div>
                <div className="row row-0">
                    <div className="col-4 pic"><img src={child_vac} alt="child vaccination" /></div>
                    <div className="col-8 description child-vac"><h2><b>Schedule Child's Vaccination</b></h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Cum aliquid animi fugiat modi impedit ratione ipsa odit reiciendis,
                        ipsam delectus nemo. Ducimus ullam voluptatum facilis non vitae veritatis porro laboriosam</div>
                </div>
                <div className="row row-0">
                    <div className="col-8 description record"><h2><b>Keep Health Records</b></h2>Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Cum aliquid animi fugiat modi impedit ratione ipsa odit reiciendis,
                        ipsam delectus nemo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        ipsam delectus nemo. Ducimus ullam voluptatum facilis non vitae veritatis porro laboriosam.</div>
                    <div className="col-4 pic"><img src={health} alt="health records" /></div>
                </div>
            </div>
        </>
    );
};

export default Home;
