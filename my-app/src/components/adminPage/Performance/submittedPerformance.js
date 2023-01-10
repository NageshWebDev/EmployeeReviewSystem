import React, { useEffect, useState } from "react"

export function SubmittedPerformance() {

    const [submittedPerformanceReviews, setSubmittedPerformanceReviews] = useState([]);
    const [queArray, setQueArray] = useState([]);

    async function onClickHandler(data) {
        console.log(data);
        let queArray = [];

        const response = await fetch(`/admin/findPerformance`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ findPerformance: data })
        });
        const responseJSON = await response.json();
        console.log(typeof responseJSON.message)
        console.log(responseJSON.message)
        let values = Object.values(responseJSON.message);
        console.log(values)

        for (let i = 0; i < values.length; ++i) {
            if (i > 3) {
                queArray.push(values[i])
            }
        }

        if (queArray.length > 0) {
            setQueArray(queArray);
        }
    }


    useEffect(() => {
        console.log('Update Performance');
        async function allPerformance() {
            const response = await fetch("/admin/submittedPerformance");
            const responseJSON = await response.json();
            if (responseJSON.response === 'SUCCESS') {
                console.log(responseJSON.message)
                setSubmittedPerformanceReviews(responseJSON.message)
            }
        }
        allPerformance();
    }, []);
    return (
        <main className="d-flex flex-column p-5" style={{ "backgroundColor": "white", "borderRadius": "0.5rem", "boxShadow": "5px 5px 5px rgba(0,0,0,0.25)" }}>
            <h1 className="display-6 pb-3" style={{ "textAlign": "center", "borderBottom": "3px solid lightsteelblue" }}><i className="fa-solid fa-pen-to-square"></i> Submitted Performance Reviews</h1>
            <section className="d-flex flex-row flex-wrap justify-content-evenly">
                {
                    submittedPerformanceReviews.length === 0 &&
                    <h1 className="display-6"> <i className="fa-solid fa-thumbs-down" style={{ "color": "red" }}></i> No Reviews Submitted</h1>
                }
                {
                    submittedPerformanceReviews &&
                    submittedPerformanceReviews.map((item) => {
                        const array = Object.values(item);
                        return (
                            <div className="m-3 p-3" key={item._id} style={{ "backgroundColor": "#444", "borderRadius": "0.5rem", "boxShadow": "3px 3px 4px rgba(0,0,0,0.5)" }}>
                                <h1 className="display-6" style={{ "color": "white" }}>{item.formName}</h1>
                                <p style={{ "color": "white" }}><small><i>{item.empName}</i></small></p>
                                <button onClick={() => { onClickHandler(item.id) }} className="btn btn-warning w-100" type="button" data-bs-toggle="offcanvas" data-bs-target={`#offcanvasRight_${item._id}`} aria-controls="offcanvasRight"><i className="fa-solid fa-magnifying-glass-plus"></i> View</button>

                                <div className="offcanvas offcanvas-bottom" style={{ "height": "70vh" }} tabIndex="-1" id={`offcanvasRight_${item._id}`} aria-labelledby="offcanvasRightLabel">
                                    <div className="offcanvas-header">
                                        <h1 id="offcanvasRightLabel" className="display-6 w-100 pb-2" style={{ "textAlign": "center", "borderBottom": "3px solid lightsteelblue", "fontSize": "1.75rem" }}><i className="fa-solid fa-pen-to-square"></i> Submitted Performance</h1>
                                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body">
                                        {
                                            array.map((item, index) => {
                                                if (index > 0 && index < array.length - 5) {
                                                    return (
                                                        <div key={Math.random()*Math.random()} className="m-2" style={{"backgroundColor":"lightsteelblue"}}>
                                                            <p className="p-2 m-0" style={{ "textTransform": "capitalize", "paddingLeft": "50px" }} key={Math.random() + Math.random()}><span style={{"padding": "0 1rem", "fontWeight":"bold", "color":"black"}}>Q: </span> <strong>{queArray[index-1]} ?</strong></p>
                                                            <p className="p-2 m-0" style={{ "textTransform": "capitalize", "paddingLeft": "50px" }} key={Math.random() + Math.random()}><span style={{"padding": "0 1rem", "fontWeight":"bold", "color":"black"}}>R: </span> <i>{item}</i></p>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
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