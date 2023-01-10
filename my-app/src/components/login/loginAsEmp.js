import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAsEmp() {
    const navigate = useNavigate();
    const [uniqueID, setuniqueID] = useState("")
    const [password, setpassword] = useState("")
    const [faliure, setFaliure] = useState({ status: false, message: '' })


    function onClickBack() {
        navigate(-1)
    }

    async function onSubmitHandler(event) {
        event.preventDefault();
        console.log('form submitted');
        const formData = {
            uniqueID,
            password
        }
        const response = await fetch('/login/Employee', {
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
            navigate(`/employeePage/${responseJSON.name}`)
        }
    }

    return (
        <React.Fragment>
            <div className="card" style={{ 'width': '18rem', "boxShadow": "3px 3px 5px rgba(0,0,0,0.3)" }}>
                <i onClick={onClickBack} className="fa-solid fa-arrow-left" style={{ padding: "1rem", cursor: "pointer" }}> Back</i>
                <i className="fa-solid fa-user" style={{ "fontSize": "6rem", textAlign: "center", padding: "1rem 0" }}></i>
                <div className="card-body">
                    <form onSubmit={onSubmitHandler} className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Employee ID</label>
                            <input type="number" onChange={(e) => { setuniqueID(e.target.value) }} className="form-control" value={uniqueID} required />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Password</label>
                            <input type="password" onChange={(e) => { setpassword(e.target.value) }} className="form-control" value={password} required />
                        </div>
                        {faliure.status && <small style={{ color: "crimson", textAlign: "center" }}>*{faliure.message}</small>}
                        <div className="col-12">
                            <button className="btn btn-primary" style={{ width: "100%" }} type="submit">Login</button>
                        </div>
                    </form>
                </div>
                <p style={{ textAlign: "center", margin: "0" }}>Don't have account</p>
                <p style={{ textAlign: "center", margin: "0 0 1rem" }}>No worries contact to Admin</p>
            </div>
        </React.Fragment>
    )
}