import { createContext, useState } from "react";

export const viewAllEmpContext = createContext()


export default function AllEmpProvider(props) {
    const [viewAllRecord, setViewAllRecord] = useState(null);

    return (
        <viewAllEmpContext.Provider value={[viewAllRecord, setViewAllRecord]}>
            {props.children}
        </viewAllEmpContext.Provider>
    )
}