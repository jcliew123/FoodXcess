import React, {useCallback, useEffect, useState} from 'react'
import DatePicker from "react-datepicker"
import { CreateFLContainer, CreateFLTextWrapper ,CreateFLTitle, CreateFLInput, BackButtonContainer, SubmissionButton} from './FoodListingElements'
import {Button} from "@material-ui/core"
import {MdKeyboardArrowLeft} from 'react-icons/md';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { useHistory, useParams } from 'react-router-dom';

const CreateFoodListing = ({mode}) => {
    let history = useHistory()
    const params = useParams()

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [bestBefore, setBestBefore] = useState(new Date());
    const [selected, setSelected] = useState(null);

    const getFoodListingDataAPI = () => {
        if(mode == "edit"){
            fetch("/api/foodlist/"+params.code+"/").then((response)=> response.json()).then((data) => {
                ReactDOM.unstable_batchedUpdates(() => {
                    setTitle(data.title)
                    setDesc(data.description)
                    setBestBefore(new Date(data.best_before))
                });
            })
        }
      }

    useEffect(() => {
        getFoodListingDataAPI()
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        // const fd = new FormData();
        // fd.append('image', selected, selected.name)
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json", "X-CSRFToken": csrftoken},
            body: JSON.stringify({
                title: title,
                description: desc,
                best_before: moment(bestBefore).format("YYYY-MM-DD"),
            }),
        }

        if(mode == "create") {
            fetch("/api/create-foodlist/", requestOptions).then((response) => response.json()).then((data)=> history.push("/foodlist/"+data.code));
            //fetch("/api/create-foodlist/", requestOptions).then((response) => response.json()).then((data)=> history.push("/own-foodlist/"));
        } else if(mode == "edit") {
            fetch("/api/foodlist/"+params.code+"/", requestOptions).then((response) => response.json()).then((data) => history.push("/foodlist/"+data.code));
            //fetch("/api/foodlist/"+params.code+"/", requestOptions).then((response) => response.json()).then((data) => history.push("/own-foodlist/"));
        }
    }

    const handleSelect = (event) => {
        setSelected(event.target.files[0])
    }

    return (
        <>
            <BackButtonContainer>
                <Button style={{fontSize: '1rem'}} onClick={() => history.goBack()}><MdKeyboardArrowLeft/><span/>Back</Button>
            </BackButtonContainer>
            
                <CreateFLContainer>
                        <CreateFLTextWrapper>
                            <CreateFLTitle>Title</CreateFLTitle>
                            <CreateFLInput variant="filled" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required/>
                        </CreateFLTextWrapper>

                        <CreateFLTextWrapper>
                            <CreateFLTitle>Description</CreateFLTitle>
                            <CreateFLInput variant="filled" multiline rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} fullWidth required/>
                        </CreateFLTextWrapper>

                        <CreateFLTextWrapper>
                            <CreateFLTitle>Best Before</CreateFLTitle>
                            <DatePicker type="date" dateFormat={'dd/MM/yyyy'} selected={bestBefore} minDate={new Date()} onChange={(e) => setBestBefore(e)} required/>
                        </CreateFLTextWrapper>
                        <CreateFLTextWrapper>
                            <CreateFLTitle>Image</CreateFLTitle>
                            <input type='file' onChange={handleSelect}></input>
                        </CreateFLTextWrapper>
                        <SubmissionButton onClick={handleSubmit}>{(mode=="create")? "Create": "Update"}</SubmissionButton>
                </CreateFLContainer>
            

        </>
    )
}

export default CreateFoodListing
