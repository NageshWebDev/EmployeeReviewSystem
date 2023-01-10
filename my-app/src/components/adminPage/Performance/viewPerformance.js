import React, { useEffect, useState } from "react"

export function ViewPerformance() {

    const [performanceQues, setPerformanceQues] = useState([])

    useEffect(() => {
        console.log('View Performance');
        async function allPerformance() {
            const response = await fetch("/admin/allPerformance");
            const responseJSON = await response.json();
            if (responseJSON.response === 'SUCCESS') {
                setPerformanceQues(responseJSON.message)
            }
        }
        allPerformance();
    }, []);
    return (
        <main className="d-flex flex-column p-5" style={{ "backgroundColor": "white", "borderRadius": "0.5rem", "boxShadow": "5px 5px 5px rgba(0,0,0,0.25)" }}>
            <h1 className="display-6 pb-3" style={{ "textAlign": "center", "borderBottom": "3px solid lightsteelblue" }}><i className="fa-solid fa-pen-to-square"></i> View Performance Reviews</h1>
            <section className="d-flex flex-row flex-wrap justify-content-evenly">
                {
                    performanceQues &&
                    performanceQues.map((item) => {
                        const array = Object.values(item);
                        return (
                            <div className="m-3 p-3" key={item._id} style={{ "backgroundColor": "#444", "borderRadius": "0.5rem", "boxShadow": "3px 3px 4px rgba(0,0,0,0.5)" }}>
                                <h1 className="display-6" style={{ "color": "white" }}>{item.formName}</h1>
                                <p style={{ "color": "white" }}><small><i>{item.date}</i></small></p>
                                <button className="btn btn-primary w-100" type="button" data-bs-toggle="offcanvas" data-bs-target={`#offcanvasRight_${item._id}`} aria-controls="offcanvasRight"><i className="fa-solid fa-eye"></i> View</button>

                                <div className="offcanvas offcanvas-bottom" style={{"height":"50vh"}} tabIndex="-1" id={`offcanvasRight_${item._id}`} aria-labelledby="offcanvasRightLabel">
                                    <div className="offcanvas-header">
                                        <h1 id="offcanvasRightLabel" className="display-6 w-100 pb-2" style={{ "textAlign": "center", "borderBottom": "3px solid lightsteelblue", "fontSize":"1.75rem" }}><i className="fa-solid fa-pen-to-square"></i> View Performance Reviews</h1>
                                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body">
                                        {
                                            array.map((item, index) => {
                                                if (index > 3) {
                                                    return (<p style={{ "textTransform": "capitalize", "paddingLeft":"50px"}} key={Math.random() + Math.random()}>Q{index - 3} {item} ?</p>)
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