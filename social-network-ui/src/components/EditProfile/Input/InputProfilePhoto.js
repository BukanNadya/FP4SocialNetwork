import React, {useRef, useState} from 'react';
import {SvgIcon, Button, Avatar} from "@mui/material";
import PropTypes from "prop-types";
import {imgStyle, svgAvatarStyle} from "../EditProfileStyles";


export function InputProfilePhoto ({onImageUpload, ...props }) {
    const inputFileRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleButtonClick = () => {
        inputFileRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(null)
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imageArrayBuffer = new Uint8Array(reader.result);
                const photoFileByteArray = Array.from(imageArrayBuffer);

                setSelectedFile({ file, photoFileByteArray });
                onImageUpload(photoFileByteArray);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div style={imgStyle}>
            <input {...props} type="file" accept="image/*" id="post-image-input" ref={inputFileRef} onChange={handleFileChange} style={{ display: "none" }}/>
                 <label htmlFor="post-image-input">
                     {selectedFile ?
                         <Avatar alt="Selected" src={URL.createObjectURL(selectedFile.file)} sx={{ bgcolor: "rgb(29, 155, 240)", width: "120px", height: "120px", marginTop: "-40%" }}/>
                         :
                         // <Avatar alt="" src={`data:image/png;base64,${props.image}`} sx={{ bgcolor: "rgb(29, 155, 240)", width: "120px", height: "120px", marginTop: "-40%" }}/>
                         <Avatar alt="" src={props.image} sx={{ bgcolor: "rgb(29, 155, 240)", width: "120px", height: "120px", marginTop: "-40%" }}/>
                     }
             <Button sx={svgAvatarStyle} onClick={() => {
                             handleButtonClick()
                         }}>
                <SvgIcon sx={{margin: "11px"}} width="30px" height="30px" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                    <path
                    d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
                    fill="#ffffff"/>
                </SvgIcon>
            </Button>
                 </label>
        </div>
    )
}

InputProfilePhoto.propTypes = {
    onImageUpload: PropTypes.func.isRequired,
    image: PropTypes.string,
};