import React from 'react';
import {Typography, Button, Paper, ButtonBase, Grid} from "@material-ui/core";
import { useHistory, withRouter } from 'react-router-dom';
import { Img } from '../Search/SearchElements';

// Card component to display the food listing in the food listing list page
const FL = ({code, title, description, best_before}) => {
  const history = useHistory()

  const saveFoodListing = () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch(`/api/save-foodlist/${code}/`, {method: 'POST', headers:{"X-CSRFToken": csrftoken}}).then((response) => {
      console.log(response);
      if(response.ok){
        return response.json();
      }else{
        history.push('/');
      }
    }).then((data) => alert(data['Message']))
  }

  return <Paper elevation={3} style={{padding: 20, width:300, height: 280, flexGrow:1}}>
    <Grid container spacing={2} >
      <Grid item justifyContent='center'>
        <ButtonBase style={{width: 128, height: 128}}>
          <Img alt={title} src=''/>
        </ButtonBase>
      </Grid>
      <Grid item direction='column' container style={{padding:7}}>
        <Grid item>
          <Typography gutterBottom variant="subtitle2" component="div">
            {title}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {description}
          </Typography>
          <Typography gutterBottom variant="body2">
            {best_before}
          </Typography>
        </Grid>
        <Grid item>
          <Button size="small" onClick={() => history.push('/foodlist/'+code)}>View</Button>
          <Button size="small" onClick={saveFoodListing}>Save</Button>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
};

export default withRouter(FL);
