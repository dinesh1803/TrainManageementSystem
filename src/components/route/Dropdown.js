import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox(props) {
  React.useEffect(()=>{
    console.log(props);
  })
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={props.data}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="StationName" />}
    />
  );
}

