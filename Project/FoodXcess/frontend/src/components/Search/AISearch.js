import React, {useState, useRef} from 'react'
import { Grid, Button, CircularProgress, Paper, Typography } from '@material-ui/core';
import {HeroContent, HeroTextWrapper, HeroTitle, HeroTitleText, HeroSubtitle, HeroDesc, HeroButton } from '../Hero/HeroElements'
import { SearchContainer, SubmitButton, WhiteBackground } from './SearchElements';
import { useHistory } from 'react-router-dom';

const AISearch = () => {
    const history = useHistory()

    const fileInput = useRef(null)
    const [selected, setSelected] = useState(null)
    const [loading, setLoading] = useState(false)

    const renderLoading = () => {
        return(
            <WhiteBackground>
                <div style={{position: 'fixed', left: '50%', top: '50%'}}>
                    <CircularProgress />
                    <Typography />
                </div>
            </WhiteBackground>
        )
    }

    const handleSelect = (event) => {
        setSelected(event.target.files[0])
    }

    const handleSubmit = () => {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const fd = new FormData();
        fd.append('image', selected, selected.name)
        const requestOptions = {
            method: 'POST',
            headers: {"X-CSRFToken": csrftoken},
            body: fd,
        }
        setLoading(true);

        fetch('/api/upload/', requestOptions).then(response => {
            if(response.ok){
                setLoading(false);
                return response.json();
            }else{
                console.log(response);
            }
        }).then(() => history.push('/search-confirmation'))
    }
    
    return (
        <SearchContainer>
            {loading && renderLoading()}
            <HeroContent>
                <HeroTextWrapper>
                    <HeroTitle>
                        <HeroTitleText>Recipe Search with Machine Learning</HeroTitleText>
                    </HeroTitle>
                    <HeroSubtitle>Only works with fruits</HeroSubtitle>
                    <HeroDesc>
                        Search for recipes with an image of the ingredients
                    </HeroDesc>
                    <input type='file' onChange={handleSelect} ref={fileInput} style={{display: 'none'}}></input>
                    <HeroButton onClick={() => fileInput.current.click()} disabled={loading}>{selected? 'Image Selected': 'Upload Image'}</HeroButton>
                    {selected? <SubmitButton onClick={handleSubmit} disabled={loading}> Submit </SubmitButton>: <></>}                  
                </HeroTextWrapper>
            </HeroContent>
        </SearchContainer>
    )
}

export default AISearch