import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reviewsContext } from "../Provider/reviews";

export default function ViewReviews() {
    const [reviews] = useContext(reviewsContext);
    const params = useParams();
    const navigate = useNavigate()
    const [empID, setEmpID] = useState();

    const [fillReviews, setfillReviews] = useState();
    const [checkReviews, setCheckReview] = useState({ status: false, message: "" });

    async function onSubmitHandler(e) {
        e.preventDefault();
        let array = [];
        let answer = [];
        let formObj = {};

        for (let index = 0; index < e.target.length - 1; ++index) {
            answer.push(e.target[index].value)
        }

        let form = fillReviews.filter(item => { return item._id === e.target.id })

        form.map((item) => {
            array = Object.values(item);
        })
        console.log(form)
        console.log(array)

  
        answer.forEach((elem, i) => {
            formObj[`Answer_${++i}`] = elem;
        })

        formObj = { ...formObj, id: array[0], empID, formId: "SubmittedReviews", empName: params.employeeName, formName: array[3] }
        console.log(formObj)

        const check = await fetch('/employee/checkReview', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObj)
        })
        const checkJSON = await check.json();
        if (checkJSON.response === "FALIURE") {
            console.log("check faliure")
            setCheckReview({ status: true, message: "It's looks like you have already submitted the form" })
        } else if (checkJSON.response === "SUCCESS") {
            console.log("check success")
            setCheckReview({ status: false, message: "" })
            const response = await fetch('/employee/submitReview', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj)
            })
            const responseJSON = await response.json();
            if (responseJSON.response === "SUCCESS") {
                setTimeout(() => {
                    navigate(`/employeePage/${params.employeeName}/viewReviews`)
                }, 5000)
                navigate(`/formSubmitted`)
            }

        }
    }

    useEffect(() => {
        let empID = null;
        let assignedReviews = [];

        (async () => {
            const response = await fetch('/employee/record', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            })
            const responseJSON = await response.json();
            if (responseJSON.response === "SUCCESS") {
                empID = responseJSON.message;

                if (reviews && empID) {
                    setEmpID(empID);
                    reviews.forEach((item) => {
                        item.assignedTo.forEach((item) => {
                            assignedReviews.push(item)
                        })
                    })
                    assignedReviews = assignedReviews.filter((item) => { return item.empId === empID })

                    const fetchPerformance = assignedReviews.map((item) => { return item.assignedPerformance })

                    const response = await fetch('/employee/fetchPerformance', {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(fetchPerformance)
                    });
                    const responseJSON = await response.json();
                    if (responseJSON.response === "SUCCESS") {
                        console.log(responseJSON.message);
                        setfillReviews(responseJSON.message);
                    }
                }
            }
        })();

    }, [reviews, params])

    return (
        <main className="d-flex flex-column p-5" style={{ "backgroundColor": "white", "borderRadius": "0.5rem", "boxShadow": "5px 5px 5px rgba(0,0,0,0.25)" }}>

            <h1 className="display-6 pb-3" style={{ "textAlign": "center", "borderBottom": "3px solid lightsteelblue" }}><i className="fa-solid fa-pen-to-square"></i> Review</h1>
            <section className="d-flex flex-row flex-wrap justify-content-evenly">
                {
                    !fillReviews &&
                    <h1 className="display-6"> <i className="fa-solid fa-hand-holding-heart" style={{ "color": "red" }}></i> No Reviews Assigned</h1>
                }
                {
                    fillReviews &&
                    fillReviews.map((item, index) => {
                        const array = Object.values(item);
                        return (
                            <div key={item._id} className="m-3 p-3" style={{ "backgroundColor": "#444", "borderRadius": "0.5rem", "boxShadow": "3px 3px 4px rgba(0,0,0,0.5)" }}>
                                <h1 className="display-6" style={{ "color": "white" }}>{item.formName}</h1>
                                <p style={{ "color": "white" }}><small><i>{item.date}</i></small></p>

                                <button onClick={() => { setCheckReview({ status: false, message: "" }) }} className="btn btn-warning w-100" type="button" data-bs-toggle="offcanvas" data-bs-target={`#offcanvasRight_${item._id}`} aria-controls="offcanvasRight"><i className="fa-solid fa-envelope"></i> open</button>

                                <div className="offcanvas offcanvas-bottom" style={{ "height": "75vh" }} tabIndex="-1" id={`offcanvasRight_${item._id}`} aria-labelledby="offcanvasRightLabel">
                                    <div className="offcanvas-header">
                                        {
                                            !checkReviews.status &&
                                            <h1 id="offcanvasRightLabel" className="display-6 w-100 pb-2" style={{ "textAlign": "center", "borderBottom": "3px solid lightsteelblue", "fontSize": "1.75rem" }}><i className="fa-solid fa-pen-to-square"></i> Review It ...</h1>
                                        }
                                        {
                                            checkReviews.status &&
                                            <h1 id="offcanvasRightLabel" className="display-6 w-100 pb-2" style={{ "textAlign": "center", "borderBottom": "3px solid lightsteelblue", "fontSize": "1.75rem", "color": "red" }}><i className="fa-solid fa-pen-to-square"></i> {checkReviews.message}</h1>
                                        }
                                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body">
                                        <form onSubmit={onSubmitHandler} id={item._id}>
                                            {
                                                array.map((item, index) => {
                                                    if (index > 3) {
                                                        return (
                                                            <div key={index + Math.random()} className="d-flex flex-column justify-content-between align-items-center p-2 my-1" style={{ "backgroundColor": "lightsteelblue", "boxShadow": "1px 1px 2px rgba(0,0,0,0.5)" }}>
                                                                <p style={{ "textTransform": "capitalize", "paddingLeft": "10px", "textAlign": "left", "width": "100%" }} key={Math.random() + Math.random()}><strong>Q{index - 3}</strong> {item} ?</p>
                                                                <div className="input-group mb-3">
                                                                    <input id={`inputText_${index}`} type="text" className="form-control" placeholder="Tpye Review Here" required />
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                            <p className="text-center mt-5">
                                                <input className="btn btn-primary" type="submit" value="Submit" />
                                            </p>
                                        </form>

                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </main>
    )
}