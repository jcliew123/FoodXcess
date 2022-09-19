import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const UnitSelector = ({unit, setUnit}) => {
  return <>
    <Grid item style={{marginLeft: 10, width: 120}}>
        <FormControl fullWidth>
            <InputLabel>Unit</InputLabel>
            <Select label='Unit' value={unit} onChange={(e)=> setUnit(e.target.value)}>
                <MenuItem value=''>None</MenuItem>
                <MenuItem value='bag(s)'>bag(s)</MenuItem>
                <MenuItem value='bottle(s)'>bottle(s)</MenuItem>
                <MenuItem value='bundles(s)'>bundles(s)</MenuItem>
                <MenuItem value='can(s)'>can(s)</MenuItem>
                <MenuItem value='cup(s)'>cup(s)</MenuItem>
                <MenuItem value='glass(es)'>glass(es)</MenuItem>
                <MenuItem value='jar(s)'>jar(s)</MenuItem>
                <MenuItem value='package(s)'>package(s)</MenuItem>
                <MenuItem value='piece(s)'>piece(s)</MenuItem>
                <MenuItem value='serving(s)'>serving(s)</MenuItem>
            </Select>
        </FormControl>
    </Grid>
  </>;
};

export default UnitSelector;
