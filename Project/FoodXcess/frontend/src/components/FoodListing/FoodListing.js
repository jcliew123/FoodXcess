import React, {useState, useCallback, useEffect} from 'react'
import ReactDOM from 'react-dom';
import { Button, Typography, ButtonBase, Divider } from '@material-ui/core';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useHistory, useParams } from 'react-router-dom';
import { BackButtonContainer, CreateFLContainer, DescText } from './FoodListingElements';
import { Img } from '../Search/SearchElements';
import moment from 'moment';

const FoodListing = () => {
    const params = useParams()
    const history = useHistory()

    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [best, setBest] = useState(null)
    const [created, setCreated] = useState(null)
    const [modified, setModified] = useState(null)
    const [owner, setOwner] = useState(false)

    const getFoodListingDataAPI = useCallback(async () => {
        fetch("/api/foodlist/"+params.code+'/').then((response) => {
            if(response.ok){
                return response.json();
            }else{
                history.push("/allfoodlist")
            }
        }).then((data) => {
            ReactDOM.unstable_batchedUpdates(() => {
                setTitle(data.title)
                setDesc(data.description)
                setBest(data.best_before)
                setCreated(data.created)
                setModified(data.modified)
                setOwner(data.owner)
            });
            console.log(data.description)            
        });
      }, [])

    useEffect(() => {
        getFoodListingDataAPI()
    }, []);

    function editFoodListingDetails() {
        history.push("/edit-foodlist/"+params.code+'/')
    }

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

    function deleteFoodListing() {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        fetch("/api/foodlist/"+params.code, {method: "DELETE", headers:{"X-CSRFToken": csrftoken}}).then((response) => {
            if(response.status == 204){
                alert("Deleted Succesfully");
                history.push("/allfoodlist");
            }
            
        })
    }

    const renderOwnerButtons = () => (<>
        <Button style={{fontSize: '1rem', marginRight: 20, marginLeft: 20}} onClick={editFoodListingDetails}>Edit</Button>
        <Button style={{fontSize: '1rem'}} onClick={deleteFoodListing}>Delete</Button>
    </>)

    return (
        <>
            <BackButtonContainer>
                <Button style={{fontSize: '1rem'}} onClick={() => history.push("/allfoodlist")}><MdKeyboardArrowLeft/>Back</Button>
            </BackButtonContainer>

            <CreateFLContainer>
            <ButtonBase style={{width: 300, height: 250}}>
                <Img alt={title} src=''/>
            </ButtonBase>
                <div style={{textAlign: 'left', width: '50%'}}>
                    <Typography variant='h5' gutterBottom style={{color: '#22443d'}}>{title}</Typography>
                    <Divider style={{marginBottom: 10, marginTop: 10}}/>
                    {/* <Typography variant='subtitle1' paragraph={true}>{desc}</Typography> */}
                    <DescText variant='standard' multiline rows={4} value={desc} disabled={true} style={{width: '100%', marginBottom: 20}}/>
                    <Typography variant='subtitle1'>Expiry Date: {best? best: "No Expiry Date"}</Typography>
                    <Divider style={{marginBottom: 10, marginTop: 10}}/>
                    <Typography variant='subtitle2'>Created: {moment(created).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Typography>
                    <Divider style={{marginBottom: 10, marginTop: 10}}/>
                    <Typography variant='subtitle2'>Modified: {moment(modified).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Typography>
                </div>

                <div style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 30}}>
                    <Button style={{fontSize: '1rem'}} onClick={saveFoodListing}>Save</Button>
                    {owner?renderOwnerButtons():<></>}
                </div>
            </CreateFLContainer>
        </>
    )
}

export default FoodListing
