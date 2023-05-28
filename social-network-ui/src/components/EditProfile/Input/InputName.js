import React from 'react';
import {TextField} from "@mui/material";
import PropTypes from "prop-types";


export function InputName ({ ...props }) {
    return (
        <TextField {...props} label={props.label}/>
    )
}

InputName.propTypes = {
    label: PropTypes.string.isRequired,
}