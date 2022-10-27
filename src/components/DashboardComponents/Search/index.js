import * as React from 'react';
import "./styles.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Link from '@mui/material/Link';

function Search({ handleChange, data }) {

  const [cryptoData, setCryptoData] = React.useState([])
  
  const top100Cryptos = data.map((item) => {
    return {
      label: item.name,
      link: `/coin?${item.id}`,
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
            getOptionLabel={(option) => option.label}
            onChange={(e, value) => window.location.href = value.link}
            sx={{ width: "100%", ".MuiOutlinedInput-notchedOutline": { border: "none" }, }}
            renderInput={(params) => <TextField {...params} label="Search Cryptos" onChange={handleChange} InputLabelProps={{
              sx: {
                ".MuiOutlinedInput-notchedOutline": { border: "none" },
                color: "var(--white)"
              }
            }} />}
            />
      </div>
    </div>
  );
}

export default Search