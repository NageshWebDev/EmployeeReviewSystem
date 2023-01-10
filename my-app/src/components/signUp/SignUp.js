import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <React.Fragment>
            <div>
                <button type="button" className="btn btn-primary m-3 p-3">
                    <Link to={"loginAs"} style={{ color: "white", textDecoration: "none", fontSize:"1.25rem" }}>Login</Link>
                </button>
                <Link to={"loginAsEmp"} className="m-3" style={{textAlign:"center", fontSize:"1.25rem"}}>Sign Up</Link>
            </div>
        </React.Fragment>
    )
} 