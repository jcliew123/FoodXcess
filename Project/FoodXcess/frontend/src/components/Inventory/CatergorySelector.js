import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const CatergorySelector = ({category, setCategory}) => {
  return <>
    <Grid item>
        <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select label='Category' value={category} fullWidth onChange={(e)=> setCategory(e.target.value)}>
                <MenuItem value=''>None</MenuItem>
                <MenuItem value='Fruits'>Fruits</MenuItem>
                <MenuItem value='Vegetables'>Vegetables</MenuItem>
                <MenuItem value='Meat'>Meat</MenuItem>
                <MenuItem value='Seafood'>Seafood</MenuItem>
                <MenuItem value='Cold cuts'>Cold cuts</MenuItem>
                <MenuItem value='Dairy'>Dairy</MenuItem>
                <MenuItem value='Bread'>Bread</MenuItem>
                <MenuItem value='Cake & biscuits'>Cake & biscuits</MenuItem>
                <MenuItem value='Alcoholic beverages'>Alcoholic beverages</MenuItem>
                <MenuItem value='Beverages'>Beverages</MenuItem>
                <MenuItem value='Coffee & tea'>Coffee & tea</MenuItem>
                <MenuItem value='Snacks'>Snacks</MenuItem>
                <MenuItem value='Condiments & dips'>Condiments & dips</MenuItem>
                <MenuItem value='Dry goods'>Dry goods</MenuItem>
                <MenuItem value='Nuts & seeds'>Nuts & seeds</MenuItem>
                <MenuItem value='Canned food'>Canned food</MenuItem>
                <MenuItem value='Cereals'>Cereals</MenuItem>
                <MenuItem value='Leftovers'>Leftovers</MenuItem>
                <MenuItem value='Easy meals'>Easy meals</MenuItem>
                <MenuItem value='Baking goods'>Baking goods</MenuItem>
                <MenuItem value='Other goods'>Other goods</MenuItem>                            
            </Select>
        </FormControl>
    </Grid>
  </>;
};

export default CatergorySelector;
