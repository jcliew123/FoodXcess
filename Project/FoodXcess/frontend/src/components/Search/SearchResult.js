import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { Grid } from '@material-ui/core';
import Recipe from './Recipe';
import { useParams } from 'react-router-dom';
import data from './Data'

const SearchResult = () => {
    const [results, setResults] = useState([]);
    const params = useParams();
    const search = decodeURIComponent(params.query);

    const retriveResult = () => {
        fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${params.query}&app_id=${data.app_id}&app_key=${data.app_key}&random=true`).then((response)=> {
            if(response.ok){
                return response.json();
            }else{
                alert(`No recipe relevant to ${params.query}`)
            }
        }).then((data) => {
            setResults(data.hits)
        })
    }

    useEffect(() => {
        retriveResult();
    }, [params]);

    return <>
        <Grid container justifyContent='center' alignItems='center' style={{padding: 20}}>
            <Grid item>
                <SearchBar val={search}/>
            </Grid>
            <Grid item style={{marginTop: 30, padding: 10}} container justifyContent='space-around'>
                {results.map((result) => (
                    <Grid item>
                        <Recipe 
                            title={result.recipe.label}
                            image={result.recipe.image}
                            calories={result.recipe.calories}
                            ingredients={result.recipe.ingredients}
                            link={result.recipe.url}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    </>
};

export default SearchResult;
