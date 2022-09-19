import { Grid, Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddIngredient from './AddIngredient';
import Ingredient from './Ingredient';

const Inventory = () => {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);

  const retriveResult = () => {
    fetch('/api/inventory/').then((response) => response.json()).then((data)=> {
      setResults(data);
    })
  }

  useEffect(() => {
    retriveResult()
  }, [])

  const handleAdd = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const renderIngredients = (results) => {
    return results.map((result) => (
      <Grid item >
        <Ingredient
          id={result.id}
          name={result.name} 
          expiry_date={result.expiry_date}
          quantity={result.quantity}
          unit={result.unit}
          location={result.location}
          category={result.category}
          remaining={result.remaining}
        />
      </Grid>
    ))
  }

  return <>
    <Grid container style={{padding: 20}} justifyContent='space-around' spacing={2}>
      <Grid item style={{padding: 5}}>
        <Button onClick={handleAdd}>Add New Ingredient</Button>
        <AddIngredient open={open} handleClose={handleClose} mode='create'/>
      </Grid>
      <Grid item style={{padding: 30}} container justifyContent='center' spacing={2}>
        {(results.length>0? renderIngredients(results): <Typography variant='h2'>No Ingredients</Typography>)}
      </Grid>
    </Grid>
  </>;
};

export default Inventory;
