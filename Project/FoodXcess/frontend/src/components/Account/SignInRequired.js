import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SubmissionButton } from '../FoodListing/FoodListingElements';
import { useHistory } from 'react-router-dom';

const SignInRequired = () => {
    const history = useHistory()

  return <>
    <Grid container justifyContent='center' alignItems='center'  direction='column' spacing={3} style={{display: 'flex', height: '80vh'}}>
        <Grid item>
            <Typography variant='h5'>Account required for this function</Typography>
        </Grid>
        <Grid item>
            <SubmissionButton onClick={() => history.push('/sign-in')} style={{width: 200}}>Sign In</SubmissionButton>
        </Grid>
        
    </Grid>
  </>
}

export default SignInRequired