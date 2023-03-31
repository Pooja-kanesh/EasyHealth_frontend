import axios from "axios";
import Header from "./Header";
import './Chart.css'

const Chart = function () {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('Authorization')}`;

    return (<>
        <Header isSubmitted="true" />
        <table className="table table-bordered border-dark align-middle caption-top vacc-chart">
            <caption><h4>Vaccination Chart</h4></caption>
            <thead className="table-primary">
                <tr>
                    <th scope="col" className="table-danger">Vaccine \ Age </th>
                    <th scope="col">Birth</th>
                    <th scope="col">6 week</th>
                    <th scope="col">10 week</th>
                    <th scope="col">14 week</th>
                    <th scope="col">18 week</th>
                    <th scope="col">6 month</th>
                    <th scope="col">9 month</th>
                    <th scope="col">12 month</th>
                    <th scope="col">15 month</th>
                    <th scope="col">18 month</th>
                    <th scope="col">2-3 yr</th>
                    <th scope="col">4-6 yr</th>
                    <th scope="col">11-12yr</th>
                    <th scope="col">13-18yr</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">BCG</th>
                    <td className="table-warning">BCG</td>
                    <td className="table-success" colSpan='10'>{`(catch-up)`}</td>
                    <td colSpan='3'></td>
                </tr>
                <tr>
                    <th scope="row">Hep B</th>
                    <td className="table-warning">Hep B1</td>
                    <td className="table-warning" colSpan='2'>Hep B2</td>
                    <td className="table-success" colSpan='2'>{`(catch-up)`}</td>
                    <td className="table-warning" colSpan='5'>Hep B3</td>
                    <td className="table-success" colSpan='4'>{`(catch-up)`}</td>
                </tr>
                <tr>
                    <th scope="row">Polio</th>
                    <td className="table-warning">OPV 0</td>
                    <td className="table-warning">IPV 1</td>
                    <td className="table-warning">IPV 2</td>
                    <td className="table-warning" colSpan='2'>IPV 3</td>
                    <td className="table-warning">OPV 1</td>
                    <td className="table-warning">OPV 2</td>
                    <td className="table-warning" colSpan='3'>IPV B1</td>
                    <td className="table-success" colSpan='2'>{`(catch-up)`}</td>
                    <td className="table-warning">OPV3</td>
                    <td ></td>

                </tr>
                <tr>
                    <th scope="row">DTP</th>
                    <td ></td>
                    <td className="table-warning">DTP 1</td>
                    <td className="table-warning">DTP 2</td>
                    <td className="table-warning">DTP 3</td>
                    <td className="table-success" colSpan='4'>{`(catch-up)`}</td>
                    <td className="table-warning" colSpan='2'>DTP B1</td>
                    <td className="table-success" colSpan='2'>{`(catch-up)`}</td>
                    <td className="table-warning">DTP B2</td>
                    <td ></td>
                </tr>
                <tr>
                    <th scope="row">PCV</th>
                    <td></td>
                    <td className="table-warning">PCV 1</td>
                    <td className="table-warning">PCV 2</td>
                    <td className="table-warning">PCV 3</td>
                    <td className="table-success" colSpan='3'>{`(catch-up)`}</td>
                    <td className="table-warning" colSpan='2'>PCV Booster</td>
                    <td className="table-success" colSpan='2'>{`(catch-up)`}</td>
                    <td colSpan='3'></td>
                </tr>
                <tr>
                    <th scope="row">Rotavirus</th>
                    <td></td>
                    <td className="table-warning">RV 1</td>
                    <td className="table-warning">RV 2</td>
                    <td className="table-warning">RV 3</td>
                    <td colSpan='10'></td>
                </tr>
                <tr>
                    <th scope="row">Measles</th>
                    <td colSpan='6'></td>
                    <td className="table-warning" colSpan='2'>Measles</td>
                    <td colSpan='6'></td>
                </tr>
                <tr>
                    <th scope="row">MMR</th>
                    <td colSpan='7'></td>
                    <td className="table-warning" colSpan='3'>MMR 1</td>
                    <td className="table-success">{`(catch-up)`}</td>
                    <td className="table-warning">MMR 2</td>
                    <td className="table-success" colSpan='2'>{`(catch-up)`}</td>
                </tr>
                <tr>
                    <th scope="row">Varicella</th>
                    <td colSpan='8'></td>
                    <td className="table-warning" colSpan='2'>VAR 1</td>
                    <td className="table-success">{`(catch-up)`}</td>
                    <td className="table-warning">VAR 2</td>
                    <td className="table-success" colSpan='2'>{`(catch-up)`}</td>
                </tr>
                <tr>
                    <th scope="row">Hep A</th>
                    <td colSpan='7'></td>
                    <td className="table-warning" colSpan='4'>Hep A1 & Hep A2</td>
                    <td className="table-success" colSpan='3'>{`(catch-up)`}</td>
                </tr>
                <tr>
                    <th scope="row">Typhoid</th>
                    <td colSpan='10'></td>
                    <td className="table-warning" >Typhoid</td>
                    <td className="table-success" colSpan='3'>{`(catch-up)`}</td>
                </tr>
                <tr>
                    <th scope="row">Influenza</th>
                    <td colSpan='5'></td>
                    <td className="table-warning" colSpan='9'>{`Influenza (yearly)`}</td>
                </tr>
                <tr>
                    <th scope="row">Cholera</th>
                    <td colSpan='9'></td>
                    <td className="table-warning" colSpan='5'>Cholera 1 & 2</td>
                </tr>
                <tr>
                    <th scope="row">JE</th>
                    <td colSpan='9'></td>
                    <td className="table-warning" colSpan='5'>Japanese Encephalitis</td>
                </tr>
                <tr>
                    <th scope="row">Meningococcal</th>
                    <td colSpan='10'></td>
                    <td className="table-warning" colSpan='4'>Meningococcal</td>
                </tr>
            </tbody>
        </table></>)
}

export default Chart;