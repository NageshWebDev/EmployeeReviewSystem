import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { viewAllEmpContext } from "../../Provider/viewEmpProvider"

export function ViewEmp() {
    const [viewAllRecord] = useContext(viewAllEmpContext)
    const params = useParams()
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
                            { item.admin && <p className="p-2 my-2 fw-bold" style={{ "textAlign":"center","textTransform": "capitalize", "borderBottom": "2px solid lightsteelblue", "color": "green" }}> Admin <i className="fa-solid fa-circle-check"></i></p>}
                            { !item.admin && <p className="p-2 my-2 fw-bold" style={{ "textAlign":"center","textTransform": "capitalize", "borderBottom": "2px solid lightsteelblue", "color": "red" }}> Admin <i className="fa-solid fa-circle-xmark"></i></p>}
                        </div>
                    )
                })
            }
        </React.Fragment >
    )
}