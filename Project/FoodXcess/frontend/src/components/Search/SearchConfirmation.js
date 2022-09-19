import React, {useState} from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { FaAngleRight, FaPlus } from 'react-icons/fa';

import Ingredient from './Ingredient';
import { CreateFLInput } from '../FoodListing/FoodListingElements';
import { useHistory } from 'react-router-dom';

const SearchConfirmation = () => {
    const history = useHistory()
    const [newIng, setNewIng] = useState('');
    const [results, setResults] = useState(['Apple', 'Banana']);

    const renderResult = () => {
        return(
            results.map((result, index) => {
                return(
                <Grid item>
                    <Ingredient name={result} onClick={() => deleteIng(result)}/>
                </Grid>)
            })
        )
    }

    const deleteIng = (result) => {
        const arr = results.filter((item) => item !== result);
        setResults(arr);
    }

    const onAdd = () => {
        setResults((prev) => [...prev, newIng]);
        setNewIng('');
    }

    const onSumbit = () => {
        let out = ''
        results.map((result) => {
            out += result+' ';
        })
        let query = encodeURIComponent(out.substring(0, out.length-1))

        history.push(`/search/${query}`);
    }

    return (
        <Grid container justifyContent='center' alignItems='center' style={{padding: 50}}>
            <Grid item container direction='column' justifyContent='center' alignItems='center'>
                <Grid item>
                    <Typography variant='h5' >
                        Ingredients from your image
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='caption' >
                        Edit the ingredients in case there's any mistake
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container direction='column' justifyContent='center' alignItems='center' style={{marginTop: 30}}>
                {results && renderResult()}
            </Grid>
            <Grid item container justifyContent='space-evenly'>
                <Grid item>
                    <CreateFLInput variant="filled" value={newIng} onChange={(e) => setNewIng(e.target.value)} style={{width: 200, height: 30}} placeholder='Ingredient'/>
                    <Button style={{padding: 10, marginTop: 10, marginLeft: 10}} onClick={onAdd}>Add<FaPlus size={20} style={{marginLeft: 5}}/></Button>
                </Grid>
                <Grid item>
                    <Button style={{marginTop: 20, padding: 10}} onClick={onSumbit}>Submit<FaAngleRight size={20} style={{marginLeft: 5}}/></Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SearchConfirmation