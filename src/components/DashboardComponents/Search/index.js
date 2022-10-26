import * as React from 'react';
import "./styles.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
function Search({ handleChange, data }) {

  
  const top100Cryptos = data.map((item) => {
    return {
      label: item.name,
      id: item.id
    }
  })

  return (
    <div className="search-wrapper">
      <div className="search-input">
        <SearchRoundedIcon sx={{ color: "var(--grey)" }} />
            <Autocomplete
            
            disablePortal
            id="combo-box-demo"
            options={top100Cryptos}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Search Cryptos"  onChange={handleChange} InputLabelProps={{
              sx: {
                color: "var(--white)"
              }
            }} />}
            />
      </div>
    </div>
  );
}

export default Search;