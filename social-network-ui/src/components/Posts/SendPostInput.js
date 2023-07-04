import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";


export const SendPostInput = ({ field, form, ...props }) => {
    const darkMode = useSelector(state => state.userData.userMode.darkMode);
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
            sx={{
                "&& .MuiInput-root": {
                    color: darkMode ? "rgb(247, 249, 249)" : "#000000",
                },
                "&& .MuiInput-root:before": {
                    borderBottom: darkMode ? "2px solid rgb(247, 249, 249)" : "1px solid rgba(0, 0, 0, 0.42)",
                },

            }}
        />
    );
};

SendPostInput.propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    type: PropTypes.string,
};