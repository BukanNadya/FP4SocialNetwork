import React, {useRef, useState} from 'react';
import {SvgIcon, Button } from "@mui/material";
import {BgPhotoStyle, PhotoStyle, svgStyle} from "../EditProfileStyles";
import PropTypes from "prop-types";


export function InputPhoto ({onImageUpload, ...props }) {
    const inputFileRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [background, setBackground] = useState(props.background);

    const handleButtonClick = () => {
        inputFileRef.current.click();
    };
    const handleDeleteClick = () => {
        setSelectedFile(null);
        setBackground(null)

    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(null)
        setBackground(null)
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imageArrayBuffer = new Uint8Array(reader.result);
                const photoFileByteArray = Array.from(imageArrayBuffer);

                setSelectedFile({file, photoFileByteArray});
                onImageUpload(photoFileByteArray);
            };

            reader.readAsArrayBuffer(file);
        }
    }

    return (
        <div style={BgPhotoStyle}>
            {selectedFile ?
                <img src={props.background ? URL.createObjectURL(selectedFile.file): `data:image/png;base64,${background}`} alt="Selected" style={PhotoStyle} />
                :
                false
            }
            {background ?
                <img src={`data:image/png;base64,${background}`} alt="" style={PhotoStyle} />
                :
                false
            }
            <input {...props} type="file" accept="image/*" id="post-image-input" ref={inputFileRef} onChange={handleFileChange} style={{ display: "none" }}/>
            <label htmlFor="post-image-input">
            <Button sx={svgStyle} onClick={() => {
                 handleButtonClick()
            }}>
                <SvgIcon sx={{margin: "11px"}} width="30px" height="30px" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
                        fill="#ffffff"/>
                </SvgIcon>
            </Button>
            </label>
            <Button sx={svgStyle} onClick={() => {
                handleDeleteClick()
            }}>
                <SvgIcon sx={{margin: "11px"}} width="30px" height="30px" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                          fill="#ffffff"/>
                </SvgIcon>
            </Button>
        </div>
    )
}
InputPhoto.propTypes = {
    onImageUpload: PropTypes.func.isRequired,
    background: PropTypes.string,
};