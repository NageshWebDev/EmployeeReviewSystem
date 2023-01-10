import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SignUpAsEmp(props) {
    const [uniqueID, setuniqueID] = useState("")
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [passwordMismatch, setPasswordMismatch] = useState(false)
    const [faliure, setFaliure] = useState({ status: false, message: '' })
    const [empCreated, setEmpCreated] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const [param, setParams] = useState(false);


    async function onSubmitHandler(event) {
        event.preventDefault();
        console.log('form submitted');
        const formData = {
            uniqueID,
            name,
            password,
            admin: false
        }
        console.log(formData)
        const response = await fetch('/signup/Emp', {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const responseJSON = await response.json();
        console.log(responseJSON)
        if (responseJSON.response === "FALIURE") {
            setFaliure({ status: true, message: responseJSON.message })
        }
        else if (responseJSON.response === "SUCCESS") {
            setFaliure({ status: false, message: "" })
            setEmpCreated(true)
        }
    }

    useEffect(() => {
        if (password !== confirmPassword) {
            setPasswordMismatch(true);
        } else if (password === confirmPassword) {
            setPasswordMismatch(false)
        }
        setParams(params.adminName)
    }, [confirmPassword, password, params])

    return (
        <React.Fragment>
            <div className="card" style={{ 'width': '18rem',"boxShadow":"3px 3px 5px rgba(0,0,0,0.3)" }}>
                <i onClick={() => { navigate(`/adminPage/${param}`)}} className="fa-solid fa-circle-xmark fa-lg p-3" style={{ "cursor":"pointer","color": "crimson", "textAlign": "right" }}></i>
                <i className="fa-solid fa-user" style={{ "fontSize": "6rem", "textAlign": "center", "padding": "1rem 0" }}></i>
                <div className="card-body">
                    {
                        !empCreated &&
                        <form onSubmit={onSubmitHandler} className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label">Employee ID</label>
                                <input type="number" onChange={(e) => { setuniqueID(e.target.value) }} className="form-control" value={uniqueID} required />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Employee Name</label>
                                <input type="text" onChange={(e) => { setname(e.target.value) }} className="form-control" value={name} required />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Create Password</label>
                                <input type="password" onChange={(e) => { setpassword(e.target.value) }} className="form-control" value={password} required />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" onChange={(e) => { setconfirmPassword(e.target.value) }} className="form-control" value={confirmPassword} required />
                            </div>
                            {faliure.status && <small style={{ color: "crimson", textAlign: "center" }}>*{faliure.message}</small>}
                            {passwordMismatch && <small style={{ color: "crimson", textAlign: "center" }}>* Password Mismatch</small>}
                            <div className="col-12">
                                <button className="btn btn-primary" style={{ width: "100%" }} type="submit">Add Employee</button>
                            </div>
                        </form>
                    }
                    {
                        empCreated &&
                        <React.Fragment>
                            <p style={{ "textAlign": "center", "color": "#444", "backgroundColor": "yellowgreen", "padding": "0.25rem" }}>Employee Created</p>
                            <p> Employee ID : {uniqueID}</p>
                            <p> Employee Name : {name}</p>
                            <p> Employee Password : {password}</p>
                            <p onClick={() => { setEmpCreated(false); setuniqueID(""); setname(""); setpassword(""); setconfirmPassword(""); }} style={{ "cursor": "pointer", textAlign: "center", color: "blue", textDecoration: "underline" }}>Add New Employee</p>
                        </React.Fragment>
                    }

                </div>
            </div>
        </React.Fragment>
    )
}