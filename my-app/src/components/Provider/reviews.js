import { createContext, useState } from "react";

export const reviewsContext = createContext()


export default function AllReviewsProvider(props) {
    const [reviews, setReviews] = useState(null);

    return (
        <reviewsContext.Provider value={[reviews, setReviews]}>
            {props.children}
        </reviewsContext.Provider>
    )
}