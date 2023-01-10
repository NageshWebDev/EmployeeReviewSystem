import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAsAdmin() {
    const navigate = useNavigate();

    const [uniqueID, setuniqueID] = useState("")
    const [password, setpassword] = useState("")
    const [faliure,setFaliure] = useState({status: false, message: ''})

    function onClickBack(){
        navigate(-1)
    }

    async function onSubmitHandler(event){
        event.preventDefault();
        const formData = {
            uniqueID,
            password
        }
        const response = await fetch('/login/Admin',{
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type":"application/json"
            }
        })
        const responseJSON = await response.json();
        if (responseJSON.response === "FALIURE") {
            setFaliure({ status: true, message: responseJSON.message })
        }
        else if (responseJSON.response === "SUCCESS") {
            setFaliure({ status: false, message: "" })
            navigate(`/adminPage/${responseJSON.name}`)
        }
    }

    return (
        <React.Fragment>
            <div className="card" style={{ 'width': '18rem' }}>
                <i onClick={onClickBack} className="fa-solid fa-arrow-left" style={{ padding: "1rem", cursor:"pointer" }}> Back</i>
                <i className="fa-solid fa-user-tie" style={{ "fontSize": "6rem", textAlign: "center", padding: "1rem 0" }}></i>
                <div className="card-body">
                    <form onSubmit={onSubmitHandler} className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Admin ID</label>
                            <input type="number" className="form-control" min="100" onChange={(e)=>{ setuniqueID(e.target.value) }} value={uniqueID} required />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={(e)=>{ setpassword(e.target.value) }} value={password} required />
                        </div>
                        { faliure.status &&  <small style={{color: "crimson",textAlign:"center"}}>*{faliure.message}</small>}
                        <div className="col-12">
                            <button className="btn btn-primary" style={{ width: "100%" }} type="submit"> Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}