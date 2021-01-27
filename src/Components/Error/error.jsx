import React from "react";
import "../../index.css";

const Error = ({ touched, message }) => {
    if (!touched) {
        return (
            <div>&nbsp;</div>
        )
    }
    if (message) {
        return (<div className='has-error'>{message}</div>)
    }
    return (<></>)
}
export default Error