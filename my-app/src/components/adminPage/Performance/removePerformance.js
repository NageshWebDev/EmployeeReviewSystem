import React, { useEffect, useState } from "react"

export function RemovePerformance() {

    const [performanceQues, setPerformanceQues] = useState([]);

    async function onRemoveHandler(removePerformanceID) {
        const response = await fetch("/admin/removePerformance",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ removePerformanceID })
            }
        );
        const responseJSON = await response.json();
        if (responseJSON.response === 'SUCCESS') {
            setPerformanceQues(responseJSON.message)
        }
    }

    useEffect(() => {
        console.log('Remove Performance');
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
            <h1 className="display-6 pb-3" style={{ "textAlign": "center", "borderBottom": "3px solid lightsteelblue" }}><i className="fa-solid fa-pen-to-square"></i> Remove Performance Reviews</h1>
            <section className="d-flex flex-row flex-wrap justify-content-evenly">
                {
                    performanceQues &&
                    performanceQues.map((item) => {
                        return (
                            <div className="m-3 p-3" key={item._id} style={{ "backgroundColor": "#444", "borderRadius": "0.5rem", "boxShadow": "3px 3px 4px rgba(0,0,0,0.5)" }}>
                                <h1 className="display-6" style={{ "color": "white" }}>{item.formName}</h1>
                                <p style={{ "color": "white" }}><small><i>{item.date}</i></small></p>
                                <button onClick={() => { onRemoveHandler(item._id) }} className="btn btn-danger w-100" type="button" ><i className="fa-solid fa-trash"></i> Remove</button>
                            </div>
                        )
                    })
                }
            </section>
        </main>
    )
}