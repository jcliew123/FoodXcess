import React, { useState } from 'react';
import { Card, CardContent, CardActions, Grid, Typography, Button } from '@material-ui/core';
import AddIngredient from './AddIngredient';

const Ingredient = ({name, expiry_date, quantity, unit, location, category, id, remaining}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleEdit = () => {
    setOpen(true);
  }

  const handleDelete = () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('/api/ingredient/'+id+'/', {method:'DELETE', headers:{"X-CSRFToken": csrftoken}}).then((response) => {
      if(response.ok){
        alert("Ingredient consumed")
        window.location.reload(false);
      }
    })
  }

  const renderCategory = () => {
    switch(category){
      case 'Fruits':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/fruit.svg').default} alt={category}/>
      case 'Vegetables':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/vegetable.svg').default} alt={category}/>
      case 'Meat':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/meat.svg').default} alt={category}/>
      case 'Seafood':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/seafood.svg').default} alt={category}/>
      case 'Cold cuts':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/cold_cuts.svg').default} alt={category}/>
      case 'Dairy':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/dairy.svg').default} alt={category}/>
      case 'Bread':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/bread.svg').default} alt={category}/>
      case 'Cake & biscuits':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/biscuits.svg').default} alt={category}/>
      case 'Alcoholic beverages':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/alcohol.svg').default} alt={category}/>
      case 'Beverages':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/beverages.svg').default} alt={category}/>
      case 'Coffee & tea':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/tea.svg').default} alt={category}/>
      case 'Snacks':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/snacks.svg').default} alt={category}/>
      case 'Condiments & dips':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/condiments.svg').default} alt={category}/>
      case 'Dry goods':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/dry_goods.svg').default} alt={category}/>
      case 'Nuts & seeds':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/nuts.svg').default} alt={category}/>
      case 'Canned food':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/canned_food.svg').default} alt={category}/>
      case 'Cereals':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/cereals.svg').default} alt={category}/>
      case 'Leftovers':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/leftovers.svg').default} alt={category}/>
      case 'Easy meals':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/easy_meal.svg').default} alt={category}/>
      case 'Baking goods':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/baking_goods.svg').default} alt={category}/>
      case 'Other goods':
        return <img height={50} width={50} src={require('../../../../../FoodXcessNative/app/assets/other_goods.svg').default} alt={category}/>
      default:
        return <></>
    }
  }

  return <>
      <Card style={{width: 310, height:180, flexGrow:1}}>
        <CardContent>
            <Grid container direction='row'>
              <Grid item justifyContent="start" xs={8}>
                  <Typography variant='subtitle1' gutterBottom>
                    {name}
                  </Typography>
                  <Typography variant='subtitle2' gutterBottom>
                    {expiry_date? expiry_date: 'No expiry date'} 
                  </Typography>
                  <Typography variant='subtitle2' gutterBottom>
                    {quantity} {unit} 
                  </Typography>
              </Grid>
              <Grid item xs={4} container style={{height: 90}} direction='column' justifyContent='space-between'>
                <Grid item>
                  {location}
                </Grid>
                <Grid item>
                  <div style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                    {renderCategory()}
                  </div>
                </Grid>
              </Grid>
            </Grid>
            
        </CardContent>
        <CardActions style={{marginTop: 10}}>
          <Button onClick={handleDelete}>Consumed</Button>
          <Button onClick={handleEdit}>Edit</Button>
          <AddIngredient open={open} handleClose={handleClose} mode='edit' id={id}/>
        </CardActions>
      </Card>
  </>;
};

export default Ingredient;
