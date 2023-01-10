import React, { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { reviewsContext } from "../Provider/reviews";

export default function NavbarEmployee() {

    const navigate = useNavigate();
    const params = useParams();
    const [, setReviews] = useContext(reviewsContext);

    async function onClickHandler() {
        console.log("empReview")
        const response = await fetch('/employee/review');
        const responseJSON = await response.json();
        console.log(responseJSON)
        if (responseJSON.response === "SUCCESS") {
            setReviews(responseJSON.message)
            navigate(`/employeePage/${params.employeeName}/viewReviews`)
        }
    }

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="d-flex flex-row flex-wrap justify-content-between w-100">
                    <i className="fa-solid fa-user px-5 fs-1 my-3" onClick={() => { navigate(`/employeePage/${params.employeeName}`) }} style={{ "cursor": "pointer" }}></i>

                    <div className="navbar-nav ">
                        <button className="nav-link my-3" onClick={onClickHandler} style={{ "fontSize": "1.25rem", "padding": "0 1rem", "backgroundColor": "transparent", "border": "none" }}> <i className="fa-solid fa-ranking-star fa-lg"></i> View Performance Reviews List</button>
                    </div>
                    <a href="/" className="btn btn-outline-danger w-20 px-4 m-3"><i className="fa-solid fa-power-off"></i> <span className="px-2">{params.employeeName}</span></a>
                </div>

            </nav>
        </React.Fragment>
    )
}