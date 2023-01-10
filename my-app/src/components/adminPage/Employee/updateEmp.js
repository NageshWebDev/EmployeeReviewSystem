import React, { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { viewAllEmpContext } from "../../Provider/viewEmpProvider"

export function UpdateEmp() {
    const [viewAllRecord, setViewAllRecord] = useContext(viewAllEmpContext)
    const params = useParams()

    const [uniqueID, setuniqueID] = useState("")
    const [previousId, setPreviousId] = useState("")
    const [name, setname] = useState("")
    const [adminStatus, setRadioBtn] = useState(null)
    const [,setParams] = useState(false);

    async function onSubmitHandler(event) {
        event.preventDefault();
        console.log('form submitted');
        const formData = {
            previousId,
            uniqueID,
            name,
            adminStatus,
        }
        console.log(formData)
        const response = await fetch('/admin/updateEmp', {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const responseJSON = await response.json();
        console.log(responseJSON)
        if (responseJSON.response === "FALIURE") {
        }
        else if (responseJSON.response === "SUCCESS") {
            setViewAllRecord(responseJSON.message);
        }
    }

    useEffect(() => {
        setParams(params.adminName)
    }, [params])

    return (
        < React.Fragment >
            {
                viewAllRecord &&
                viewAllRecord.filter((item) => { return (item.name !== params.adminName && item.uniqueID > 0) }).map((item) => {
                    return (
                        <div key={item._id} style={{
                            "backgroundColor": "whitesmoke",
                            "margin": "1rem",
                            "padding": "0.5rem 1rem",
                            "borderRadius": "0.5rem",
                            "boxShadow": "2px 2px 5px rgba(0,0,0,0.3)",
                            "width": "250px"
                        }}>
                            <img className="p-2" src="https://th.bing.com/th/id/R.b9d92b31a366ab3c61a32085f62f7de4?rik=F1p9rQXtEeQ2hQ&riu=http%3a%2f%2fwww.gravatar.com%2favatar%2fa91c4d70605d06dec45c250ccf4f04eb%3fs%3d500%26d%3drobohash%26r%3dg&ehk=R53j9rjVhX1QT30lohxMIDeTmZVq7ucaUZFO%2bjY9jQo%3d&risl=&pid=ImgRaw&r=0" alt="robot" height="200px" />
                            <p className="m-0 fw-bold">Employee ID</p>
                            <p className="ps-3" style={{ "textTransform": "capitalize", "borderBottom": "2px solid lightsteelblue" }}>{item.uniqueID}</p>
                            <p className="m-0 fw-bold">Employee Name</p>
                            <p className="ps-3" style={{ "textTransform": "capitalize", "borderBottom": "2px solid lightsteelblue" }}>{item.name}</p>
                            {item.admin && <p className="p-2 my-2 fw-bold" style={{ "textAlign": "center", "textTransform": "capitalize", "borderBottom": "2px solid lightsteelblue", "color": "green" }}> Admin <i className="fa-solid fa-circle-check"></i></p>}
                            {!item.admin && <p className="p-2 my-2 fw-bold" style={{ "textAlign": "center", "textTransform": "capitalize", "borderBottom": "2px solid lightsteelblue", "color": "red" }}> Admin <i className="fa-solid fa-circle-xmark"></i></p>}

                            <button className="btn btn-primary my-3 w-100" type="button" data-bs-toggle="offcanvas" data-bs-target={`#offcanvasRight${item._id}`} aria-controls="offcanvasRight">Update</button>

                            <div className="offcanvas offcanvas-end" tabIndex="-1" id={`offcanvasRight${item._id}`} aria-labelledby="offcanvasRightLabel">
                                <div className="offcanvas-header">
                                    <h5 id="offcanvasRightLabel" className="w-100 py-3" style={{ "textAlign": "center", "borderBottom": "5px solid slategray" }}><i className="fa-solid fa-file-signature fa-xl"></i> Update Employee Record</h5>
                                    <button type="button" onClick={()=>{ setuniqueID(""); setname("") }} className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    <form onSubmit={onSubmitHandler} className="row g-3">
                                        <div className="col-md-12">
                                            <label className="form-label">Employee ID</label>
                                            <input type="number" onChange={(e) => { setuniqueID(e.target.value); setPreviousId(item.uniqueID) }} className="form-control" value={uniqueID} placeholder={item.uniqueID} required />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label">Employee Name</label>
                                            <input type="text" onChange={(e) => { setname(e.target.value) }} className="form-control" value={name} placeholder={item.name} required />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label">Admin</label>
                                            <div className="form-check">
                                                <input onChange={()=>{setRadioBtn(true)}} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked={ item.admin ? true : false}/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    True
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input onChange={()=>{setRadioBtn(false)}} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  defaultChecked={ !item.admin ? true : false} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    False
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary" style={{ width: "100%" }} type="submit">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </React.Fragment >
    )
}