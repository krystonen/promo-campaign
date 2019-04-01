import React from 'react';
import validator from "./validator";

export default function(props) {
    let validated = validator(props.input);
    if (validated.valid)  {
        return (<h2/>)
    } else {
        return (
            <h2>
                {validated.error}
            </h2>
        )
    }
}