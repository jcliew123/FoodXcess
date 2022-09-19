import React from 'react';
import { Paper, Grid, Typography, IconButton } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';

const Ingredient = ({name, onClick}) => {
  return (
    <Paper elevation={3} style={{flexGrow: 1, height: 50, width: 100,padding: 5, paddingLeft: 10, paddingRight: 0,borderRadius: 10, marginTop: 10}}>
        <Grid container direction='row' justifyContent='space-between' alignItems='center' >
            <Typography variant='body2' >{name}</Typography>
            <IconButton onClick={onClick} size={10}>
                <FaTimes size={15}/>
            </IconButton>
        </Grid>
    </Paper>
  )
}

export default Ingredient