import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export function AddPerformance() {

    console.log('Add Performance');
    const params = useParams();
    const navigate = useNavigate()
    const [numOfQue, setNumOfQue] = useState(1);
    const queArray = Array.apply(null, Array(numOfQue)).map(function (x, i) { return ++i; })

    useEffect(() => {
        if (numOfQue <= 0) {
            setNumOfQue(1)
        }
    }, [numOfQue, queArray])

    async function onSubmitHandler(e) {
        e.preventDefault();
        let formData = [];
        for (let i = 0; i <= numOfQue; ++i) {
            const question = e.target[i].value;
            formData.push(question)
        }
        console.log(formData)

        let obj = {};
        formData.forEach((elem, i) => {
            if (i === 0) {
                obj[`formName`] = elem;
            }else{
                obj[`Question_${i}`] = elem;
            }
        })
        console.log(obj);
        const date = new Date().toLocaleDateString();
        obj = { id: "PerformanceQuestions", date, ...obj} // adding id for PerQuestions
        const response = await fetch('/admin/addPerformance', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });
        const responseJSON = await response.json();
        if (responseJSON.response === "SUCCESS") {
            setTimeout(() => {
                navigate(`/adminPage/${params.adminName}`)
            }, 5000)
            navigate(`/formSubmitted`)
        }
    }

    return (
        <div className="row p-3 w-50" style={{ "borderRadius": "1rem", "backgroundColor": "white", "boxShadow": "5px 5px 5px rgba(0,0,0,0.25)", "minWidth": "300px" }}>
            <h1 className="display-6 mt-4 pb-3" style={{ "textAlign": "center", "borderBottom": "3px solid lightsteelblue" }}><i className="fa-solid fa-pen-to-square"></i> Add Performance Reviews</h1>

            <form onSubmit={onSubmitHandler}>
                <div className="row mb-3">
                    <label htmlFor="inputFormName" className="col-form-label">Form Name</label>
                    <input type="text" className="form-control" name="formName" id="inputFormName" required />
                </div>
                {
                    queArray.map((item) => {
                        return (
                            <div key={item} className="row mb-3">
                                <label className="col-form-label w-100 d-flex justify-content-between">Question {item}</label>
                                <input type="text" className="form-control" required />
                            </div>
                        )
                    })
                }
                <div className="d-flex justify-content-between">
                    <div>
                        <button type="button" onClick={() => { setNumOfQue((preVal) => { return (++preVal) }) }} style={{ "border": "none", "backgroundColor": "transparent", "color": "dodgerblue" }}><i className="fa-solid fa-circle-plus fa-2xl"></i></button>
                        <button type="button" onClick={() => { setNumOfQue((preVal) => { return (--preVal) }) }} style={{ "border": "none", "backgroundColor": "transparent", "color": "red" }}><i className="fa-solid fa-circle-minus fa-2xl"></i></button>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}