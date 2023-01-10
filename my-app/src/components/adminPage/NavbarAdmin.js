import React, { useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { viewAllEmpContext } from "../Provider/viewEmpProvider"

export default function NavbarAdmin() {

    const [, setViewAllRecord] = useContext(viewAllEmpContext);
    const navigate = useNavigate();

    const params = useParams();

    async function onClickEmployeeHandler(data) {
        const response = await fetch('/admin/viewEmp');
        const responseJSON = await response.json();
        const empRecord = responseJSON.message;
        setViewAllRecord(empRecord);
        switch (data.type) {
            case "onClickVE":
                console.log(data.type)
                navigate('viewEmp');
                break;

            case "onClickUE":
                console.log(data.type)
                navigate('updateEmp');
                break;

            case "onClickRE":
                console.log(data.type)
                navigate('removeEmp');
                break;

            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <i className="fa-solid fa-user-tie px-5 fs-1" onClick={() => { navigate(`/adminPage/${params.adminName}`) }} style={{ "cursor": "pointer" }}></i>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle px-3 fs-5" style={{ color: "black" }} href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Employee
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><Link to={"signupEmployee"} className="dropdown-item">Add Employee</Link></li>
                                    <li><button onClick={() => { onClickEmployeeHandler({ type: "onClickVE" }) }} type="button" className="dropdown-item" >View Employee</button></li>
                                    <li><button onClick={() => { onClickEmployeeHandler({ type: "onClickUE" }) }} type="button" className="dropdown-item" >Update Employee</button></li>
                                    <li><button onClick={() => { onClickEmployeeHandler({ type: "onClickRE" }) }} type="button" className="dropdown-item" >Remove Employee</button></li>
                                </ul>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle px-3 fs-5" style={{ color: "black" }} href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Performance Reviews
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><Link to={"addPerformance"} className="dropdown-item">Add Performance Reviews</Link></li>
                                    <li><Link to={"viewPerformance"} className="dropdown-item">View Performance Reviews</Link></li>
                                    <li><Link to={"updatePerformance"} className="dropdown-item">Submitted Performance Reviews</Link></li>
                                    <li><Link to={"removePerformance"} className="dropdown-item">Remove Performance Reviews</Link></li>
                                </ul>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                                <li className="p-0 fs-5"><Link to={"assignPerformance"} className="dropdown-item">Assign Performance Reviews</Link></li>
                        </ul>

                    </div>
                    <a href="/" className="btn btn-outline-danger w-20 px-4 mx-3"><i className="fa-solid fa-power-off"></i> <span className="px-2">{params.adminName}</span></a>
                </div>

            </nav>
        </React.Fragment>
    )
}