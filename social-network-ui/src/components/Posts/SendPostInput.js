import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { HomeScreen } from "../../pages/HomeScreen";


export const SendPostInput = ({ field, form, ...props }) => {
    return (
        <TextField
            inputProps={{
                maxLength: 280,
            }}
            {...field}
            {...props}
            type={"text"}
            variant="standard"
            multiline
            helperText={form.errors[field.name] && form.touched[field.name] ? form.errors[field.name] : ""}
        />
    );
};

SendPostInput.propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    type: PropTypes.string,
};