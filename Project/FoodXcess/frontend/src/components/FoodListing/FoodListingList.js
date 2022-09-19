import React, { useEffect, useState } from 'react'
import FL from './FL';
import { Grid, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const FoodListingList = ({user}) => {
    const history = useHistory()

    const [foodlistings, setFL] = useState([]);

    useEffect(() => getFoodListingList(), []);

    const getFoodListingList = () => {
        fetch('/api/foodlist/', {method: "GET"}).then((response) => response.json()).then((data) => setFL(data));
    }

    const renderFL= () => {
        return foodlistings.map((fl) => (
            <Grid item>
                <FL code={fl.code} title={fl.title} description={fl.description} best_before={fl.best_before}/>
            </Grid>
        ));
    }

    return <>
        <Grid container justifyContent='center' style={{padding: 20}}>
            {user?<Button onClick={() => history.push("/create-foodlist")} >Create a food listing</Button>:<></>}
        </Grid>
        <Grid container style={{padding: 20}} justifyContent='space-around' spacing={3}>
            {(foodlistings.length>0? renderFL(): <h1>No Available Food Listing</h1>)}
        </Grid>
    </>;
}

export default FoodListingList
