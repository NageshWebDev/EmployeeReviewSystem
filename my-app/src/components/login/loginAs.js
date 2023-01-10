import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginAs() {

    const navigate = useNavigate();

    function onClickBack(){
        navigate(-1)
    }

    return (
        <React.Fragment>
            <div>
                <button type="button" className="btn btn-primary m-3 p-3">
                    <Link to={"/loginAsAdmin"} style={{ color: "white", textDecoration: "none", fontSize:"1.25rem" }}><i className="fa-solid fa-user-tie"></i> Login As Admin</Link>
                </button>
                <button type="button" className="btn btn-primary m-3 p-3">
                    <Link to={"/loginAsEmployee"} style={{ color: "white", textDecoration: "none", fontSize:"1.25rem" }}><i className="fa-solid fa-user"></i> Login As Employee</Link>
                </button>
                
                <i onClick={onClickBack} className="fa-solid fa-arrow-left m-3" style={{ textAlign:"center", cursor:"pointer" }}> Back</i>
            </div>
        </React.Fragment>
    )
}