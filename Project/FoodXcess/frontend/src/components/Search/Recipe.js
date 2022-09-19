import { Button, Paper, Grid, ButtonBase, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Img } from './SearchElements';

const Recipe = ({link, title, image, calories, ingredients}) => {
    const [ingredient, setIngredient] = useState('')

    const getIngredients = async () => {
        let out = '';
        ingredients.map((ing) => out += ing.food+', ')

        setIngredient(out.substring(0, out.length-2)) 
    }

    useEffect(() => {
        getIngredients()
    }, [])


    return <>
        <Paper elevation={3} style={{padding: 5, width: 400, height:300 ,flexGrow: 1, marginTop: 20}} >
            <Grid container spacing={2} >
                <Grid item container justifyContent='center' style={{width: '100%'}}>
                    <ButtonBase style={{width: 128, height: 128}}>
                        <Img alt={title} src={image}/>
                    </ButtonBase>
                </Grid>
                <Grid item direction='column' container style={{padding:7}}>
                    <Grid item>
                        <Typography gutterBottom variant="subtitle2" component="div">
                            {title}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                            Calories(KCal): <b>{Math.floor(calories)}</b>
                        </Typography>
                        <div style={{overflow: "hidden", textOverflow: "ellipsis", height: 63, width: '100%'}}>
                            <Typography variant="body2" style={{wordWrap: "break-word"}}>
                                Ingredients: {ingredient}
                            </Typography>
                        </div> 
                    </Grid>
                    <Grid item>
                        <Button href={link}>View Full Recipe</Button>
                    </Grid>
                </Grid>
            </Grid>

        </Paper> 
    </>

};

export default Recipe;
