import React, { useState } from 'react';
import { Grid, Typography, InputLabel, InputAdornment, IconButton } from '@material-ui/core';
import { SearchTextField } from '../Search/SearchElements';
import { FaEnvelope, FaUser, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';
import { SubmissionButton } from '../FoodListing/FoodListingElements';
import { useHistory } from "react-router-dom";

const SignUp = () => {
  let history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])
  const [showPassword, setShowPassword] = useState(false)

  const passwordRequirement = (
  <ul>
    <li>Your password can't be too similar to your username.</li>
    <li>Your password must contain at least 8 characters.</li>
    <li>Your password can't be a commonly used password.</li>
    <li>Your password can't be entirely numeric.</li>
  </ul>)

  const errorMsg = () => {
    return <ul>
      {error.map(err => <li>{err}</li>)}
    </ul>
  }

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const handleSubmit = () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    const requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json", "X-CSRFToken": csrftoken},
      credentials: "include",
      // credentials: "same-origin",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      })
    }

    fetch("/accounts/sign-up/", requestOptions).then((response) => {
      if(response.ok){
        alert("Account Created.")
        return history.push('/sign-in')
      }else{
        return response.json()
      }
    }).then((data) => {
      data[0].map((message) => {
        setError(prev => [...prev, message])
      })
    })
  }

  return <>
    <Grid container justifyContent='center' alignItems='center'  direction='column' spacing={3} style={{display: 'flex', height: '80vh'}}>
      <Grid item>
        <Typography variant='h5'>Sign Up</Typography>
      </Grid>
      <Grid item>
        <InputLabel>Username</InputLabel>
        <SearchTextField variant="outlined" InputProps={{
          startAdornment: (
              <InputAdornment position="start">
                  <FaUser />
              </InputAdornment>
          )
          }}
          style = {{width: 350}}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Alphanumeric charaters only (letters, digits, and underscores)"
          required
        />
      </Grid>
      <Grid item>
        <InputLabel>Password</InputLabel>
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
            type = {showPassword?"text": "password"}
            style = {{width: 350}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            helperText={(error.length==0?passwordRequirement: errorMsg())}
            error={error.length>0}
        />
      </Grid>
      <Grid item>
        <SubmissionButton onClick={handleSubmit} style={{width: 200}}>Create account</SubmissionButton>
      </Grid>
    </Grid>
  </>
}

export default SignUp