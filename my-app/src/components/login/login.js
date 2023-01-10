import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <React.Fragment>
            <div>
                <button type="button" className="btn btn-primary m-3 p-3 w-50">
                    <Link to={"loginAs"} style={{ color: "white", textDecoration: "none", fontSize:"1.25rem" }}> <i className="fa-solid fa-handshake"></i> &nbsp; Login</Link>
                </button>
            </div>
        </React.Fragment>
    )
} 