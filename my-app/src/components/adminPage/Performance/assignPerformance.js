import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function AssignPerformance() {

    const [empRecord, setEmpRecord] = useState();
    const [allForm, setAllForm] = useState();
    const [error, setError] = useState({
        error: false,
        errMsg: ""
    });

    const params = useParams();
    const navigate = useNavigate();

    async function onSubmitHandler(e) {
        e.preventDefault();
        console.log("On submitting ...")

        const assignedTo = [];
        const assignedPerformance = e.target[0].value;

        for (let index = 1; index < (e.target.length - 1); ++index) {
            if (e.target[index].checked) {
                const empObj = {
                    assignedPerformance,
                    empId: e.target[index].id,
                    status: false
                }
                assignedTo.push(empObj)
            }
        }

        if (assignedPerformance !== "Open this select menu" && assignedTo.length > 0) {

            setError({ error: false, errMsg: "" })

            const formData = {
                id: "AssignedTo",
                assignedTo
            }

            console.log(formData);

            const response = await fetch('/admin/assignPerformance', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)

            });
            const responseJSON = await response.json();
            if (responseJSON.response === 'SUCCESS') {
                setTimeout(() => {
                    navigate(`/adminPage/${params.adminName}`)
                }, 5000)
                navigate(`/formSubmitted`)
            }
        } else if (assignedPerformance === "Open this select menu") {
            setError({ error: true, errMsg: "Select 'Performance Review' from Select Menu" })
        } else if (assignedTo.length === 0) {
            setError({ error: true, errMsg: "Assign 'Performance Review' to atleast one Employee" })
        }
    }

    useEffect(() => {
        (async () => {
            const response = await fetch('/admin/viewFormAndEmployee');
            const responseJSON = await response.json();
            if (responseJSON.response === "SUCCESS") {
                console.log(responseJSON.message);
                const empRecord = responseJSON.message.filter((item) => { return (item.uniqueID) })
                setEmpRecord(empRecord);
                const allForm = responseJSON.message.filter((item) => { return (item.id === 'PerformanceQuestions') })
                setAllForm(allForm);
                return;
            }
        })();
    }, [])

    if (allForm) {
        return (
            <form onSubmit={onSubmitHandler} className="p-3 mb-5" style={{ "backgroundColor": "white", "borderRadius": "0.5rem", "boxShadow": "2px 2px 3px rgba(0,0,0,0.25)" }}>
                <h1 className="display-6 my-5" style={{ "textAlign": "center" }}><i className="fa-solid fa-map-pin" style={{ "transform": "rotate(-45deg)" }}></i> Assign Performance Reviews</h1>
                <select className="form-select my-3" aria-label="Default select example" required>
                    <option defaultValue={"Open this select menu"}>Open this select menu</option>
                    {
                        allForm.map((item) => {
                            return (<option key={item._id} value={item._id} >{item.formName}</option>)
                        })
                    }
                </select>

                <div className="d-flex flex-row flex-wrap my-4" style={{ "backgroundColor": "aliceblue", "border": "1px solid rgba(0,0,0,0.1)", "textTransform":"capitalize" }}>
                    {
                        empRecord.map((item) => {
                            return (
                                <div key={item._id} className="form-check form-check-inline m-3">
                                    <input className="form-check-input" type="checkbox" id={`${item.uniqueID}`} />
                                    <label className="form-check-label" htmlFor={`${item.uniqueID}`}> {`${item.name}`} </label>
                                </div>
                            )
                        })
                    }
                </div>

                <p className="text-center mt-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </p>

                <p className="ps-1 m-0 text-center" style={{ "color": "red" }}>{error.errMsg}</p>

            </form>
        )
    }
    return;
}