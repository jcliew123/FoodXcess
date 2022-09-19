import { Grid, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import FL from './FL';

const OwnFoodListing = () => {
    const [foodlistings, setFL] = useState([]);

    const getOwnFoodListing = () => {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        fetch("/api/own-foodlist/", {headers: {"X-CSRFToken": csrftoken}}).then((response) => {
            if(response.ok){
                return response.json();
            }
        }).then((data) => setFL(data))
    }

    useEffect(getOwnFoodListing, [])

    const renderFL= () => {
        return foodlistings.map((fl) => (
            <Grid item>
                <FL code={fl.code} title={fl.title} description={fl.description} best_before={fl.best_before}/>
            </Grid>
        ));
    }

  return <>
    <Grid container justifyContent='center' style={{padding: 20}}>
        <Button onClick={() => history.push("/create-foodlist")} >Create a food listing</Button>
    </Grid>
    <Grid container justifyContent='center' style={{padding: 20}} spacing={3}>
        {(foodlistings.length>0? renderFL(): <h1>Empty</h1>)}
    </Grid>
  </>
}

export default OwnFoodListing