import React, { useState } from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';
import { SearchTextField} from './SearchElements';
import data from './Data';
import { useHistory } from 'react-router-dom';

const SearchBar = ({val}) => {
    const [search, setSearch] = useState(val);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        let query = encodeURIComponent(search.trim())
        history.push(`/search/${query}`);
    }

    return <>
        <Grid container justifyContent='center' alignItems='center'>
            <form onSubmit={handleSubmit}>
                <Grid item>
                    <SearchTextField variant="outlined" InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <FaSearch />
                        </InputAdornment>
                    )
                    }}
                    placeholder='search'
                    style = {{width: 350}}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                </Grid>
            </form>
        </Grid>
    </>
};

SearchBar.defaultProps = {
  val: '',
};

export default SearchBar;
