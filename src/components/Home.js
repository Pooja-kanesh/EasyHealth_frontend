import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
// import { Link } from "react-router-dom";

import slot_book from "../images/slot-booking.png";
import child_vac from "../images/child-vaccine.png";
import health from "../images/health-records.png"
import Header from "./Header.js"
import "./Home.css"

const Home = function () {
    return (
        <>
            <Header></Header>
            <div className="container text-center">
                <div class="row row-0">
                    <div class="col-8 description book">
                        <h2>Book Your Slot</h2>Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Cum aliquid animi fugiat modi impedit ratione ipsa odit reiciendis,
                        ipsam delectus nemo. Ducimus ullam voluptatum facilis non vitae veritatis porro laboriosam.</div>
                    <div class="col-4 pic"><img src={slot_book} alt="slot booking" /></div>
                </div>
                <div class="row row-0">
                    <div class="col-4 pic"><img src={child_vac} alt="child vaccination" /></div>
                    <div class="col-8 description child-vac"><h2>Schedule Child's Vaccination</h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Cum aliquid animi fugiat modi impedit ratione ipsa odit reiciendis,
                        ipsam delectus nemo. Ducimus ullam voluptatum facilis non vitae veritatis porro laboriosam</div>
                </div>
                <div class="row row-0">
                    <div class="col-8 description record"><h2>Keep Health Records</h2>Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Cum aliquid animi fugiat modi impedit ratione ipsa odit reiciendis,
                        ipsam delectus nemo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        ipsam delectus nemo. Ducimus ullam voluptatum facilis non vitae veritatis porro laboriosam.</div>
                    <div class="col-4 pic"><img src={health} alt="health records" /></div>
                </div>
            </div>
        </>
    );
};

export default Home;
