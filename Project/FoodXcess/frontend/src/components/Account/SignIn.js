import { Grid, Typography, InputAdornment, Divider, IconButton } from '@material-ui/core'
import React, { useState } from 'react';
import { SearchTextField } from '../Search/SearchElements';
import { FaUser, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';
import { SubmissionButton } from '../FoodListing/FoodListingElements';
import { useHistory } from 'react-router-dom';

const SignIn = () => {
    let history = useHistory()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const handleSumbit = () => {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json", "X-CSRFToken": csrftoken},
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }

        fetch("/accounts/sign-in/", requestOptions).then((response) =>{
            if(response.ok){
                return response.json()
            }else{
                throw ('Invalid username or password');
            }
        }).then((data) => {
            localStorage.setItem('username', data['username'])
            alert(data['Message'])
            history.go();
        }).catch((error) => {
            alert(error);
        })
    }


    return (
        <Grid container justifyContent='center' alignItems='center'  direction='column' spacing={3} style={{display: 'flex', height: '80vh'}}>
            <Grid item>
            <Typography variant='h5'>Sign In</Typography>
            </Grid>
            <Grid item>
                <SearchTextField variant="outlined" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FaUser />
                        </InputAdornment>
                    )
                    }}
                    placeholder='Username'
                    style = {{width: 350}}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Grid>
            <Grid item>
                <SearchTextField variant="outlined" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FaKey />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={toggleShowPassword} edge="end">
                                {showPassword?<FaEyeSlash/>: <FaEye/>}
                            </IconButton>
                        </InputAdornment>
                    )
                    }}
                    type={showPassword? 'text': 'password'}
                    placeholder='Password'
                    style = {{width: 350}}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Grid>
            <Grid item>
                <SubmissionButton onClick={handleSumbit} style={{width: 200}}>Sign In</SubmissionButton>
            </Grid>
            <Grid item>
                <Divider style={{width: 300}} />
            </Grid>
            <Grid item>
                <Typography variant='caption'>Don't have an account?<a href='/sign-up'>Create an account</a></Typography>
            </Grid>
        </Grid>        
    )
}

export default SignIn