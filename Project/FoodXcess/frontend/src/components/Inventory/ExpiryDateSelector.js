import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { FaPlus, FaCalendar } from 'react-icons/fa';
import DatePicker from "react-datepicker";

const ExpiryDateSelector = ({expiryDate, setExpiryDate, disable, add3Days, add1Week, add1Month, enableCustom}) => {
  return <>
    <Grid style={{marginTop: 5, marginBottom: 5}} container justifyContent='center'>
        <Grid item style={{marginBottom: 5}} justifyContent='center'>
            <DatePicker type="date" dateFormat={'dd/MM/yyyy'} selected={expiryDate} disabled={disable} minDate={new Date()}
            onChange={(date) => setExpiryDate(date)} placeholderText='No Expiry Date' isClearable/>
        </Grid>
        <Grid item direction='row'>
            <Button startIcon={<FaPlus/>} onClick={add3Days} size='small'> 3 days</Button>
            <Button startIcon={<FaPlus/>} onClick={add1Week} size='small'> 1 week</Button>
            <Button startIcon={<FaPlus/>} onClick={add1Month} size='small'> 1 month</Button>
            <Button startIcon={<FaCalendar/>} onClick={enableCustom} size='small'>Custom</Button>
        </Grid>
    </Grid>
  </>;
};

export default ExpiryDateSelector;
