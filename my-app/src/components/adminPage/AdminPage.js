import React, { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin"

export default function AdminPage() {

    const [adminName, setAdminName] = useState("Admin");
    const params = useParams();

    useEffect(() => {
        setAdminName(params.adminName)
    })

    return (
        <React.Fragment>
            <NavbarAdmin />
            <section className="my-3" style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
                <div className="card mb-3" style={{ "maxWidth": "540px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="https://s3-us-west-2.amazonaws.com/www.guilded.gg/TeamAvatar/92663fb4815adaddbdeba52d221028c6-Large.png?w=450&h=450" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title" style={{ "textTransform": "capitalize" }}>{adminName}</h5>
                                <p className="card-text">Warm wishes on Administrative Professionals Day to you. Our company is incomplete without you and you are an important part of our family.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-3" style={{ display: "flex", "flexFlow": "row wrap", justifyContent: "center"}}>
                <Outlet />
            </section>
        </React.Fragment>
    )
}