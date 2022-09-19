import React from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const LocationSelector = ({location, setLocation}) => {
  return <>
    <Grid item>
        <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select label='Location' value={location} onChange={(e)=> setLocation(e.target.value)} >
                <MenuItem value=''>None</MenuItem>
                <MenuItem value='Freezer'>freezer</MenuItem>
                <MenuItem value='Pantry'>pantry</MenuItem>
                <MenuItem value='Fridge'>fridge</MenuItem>
            </Select>
        </FormControl>
    </Grid>
  </>;
};

export default LocationSelector;
