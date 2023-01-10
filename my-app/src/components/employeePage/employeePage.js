import React, { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom";
import NavbarEmployee from "./NavbarEmployee";

export function EmployeePage() {

    const [employeeName, setEmployeeName] = useState("Employee");
    const params = useParams();

    useEffect(() => {
        setEmployeeName(params.employeeName)
    },[params.employeeName])

    return (
        <React.Fragment>
            <NavbarEmployee />
            <section className="my-3" style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
                <div className="card mb-3" style={{ "maxWidth": "540px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="https://th.bing.com/th/id/OIP.URzU6C8rysALmTT6QFX2FQAAAA?pid=ImgDet&rs=1" className="img-fluid rounded-start p-2" alt="Employee" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title" style={{ "textTransform": "capitalize" }}>{employeeName}</h5>
                                <p className="card-text">Warm wishes on Administrative Professionals Day to you. Our company is incomplete without you and you are an important part of our family.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-3" style={{ display: "flex", "flexFlow": "row wrap", justifyContent: "center" }}>
                <Outlet />
            </section>
        </React.Fragment>
    )
}