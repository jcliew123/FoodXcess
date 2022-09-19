import { Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FL from './FL';

const SavedFoodListing = () => {
    const history = useHistory();
    const [foodlistings, setFL] = useState([]);

    const getSavedFoodListing = () => {

        fetch("/api/saved-foodlist/").then((response) => {
            if(response.ok){
                return response.json();
            }else{
                history.push("/");
            }
        }).then((data) => setFL(data))
    }

    useEffect(() => getSavedFoodListing(), [])

    const renderFL= () => {
        return foodlistings.map((fl) => (
            <Grid item>
                <FL code={fl.code} title={fl.title} description={fl.description} best_before={fl.best_before}/>
            </Grid>
        ));
    }

  return <>
    <Grid container justifyContent='center' style={{padding: 20}}>
        <Typography variant='h4' gutterBottom>Saved Food Listing(s)</Typography> 
    </Grid>
    <Grid container justifyContent='center' style={{padding: 20}} spacing={3}>
        {(foodlistings.length>0? renderFL(): <h1>Empty</h1>)}
    </Grid>
  </>
}

export default SavedFoodListing