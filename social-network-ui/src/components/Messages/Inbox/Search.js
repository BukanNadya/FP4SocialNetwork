import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import { searchContainerStyle, searchInputStyle,
    searchInputContainerStyle, searchIconStyle,
} from "./SearchStyles";
  
export function Search() {
    return (
      <div style={searchContainerStyle}>
        <div style={searchInputContainerStyle}>
          <input type="text" placeholder="Search" style={searchInputStyle} />
          <SearchIcon style={searchIconStyle} />
        </div>
      </div>
    );
  }