import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import {HeroButton} from '../Hero/HeroElements'
import ImgBg from '../../../static/images/fruits.jpg';

export const SearchBarContainer = styled.div`
    display: flex;
    margin-top: 20px;
    padding: 20px;
    height: 700px;
`

export const SearchTextField = withStyles({
    root: {
        '& .MuiInput-underline:after': {
            borderBottomColor: '#a2bfbd',
        },
        '& .MuiOutlinedInput-root': { 
            '&:hover fieldset': {
                borderColor: '#a2bfbd'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#a2bfbd'
            }
        }
    }
})(TextField)

export const Img = styled.img`
    margin: auto;
    display: block;
    max-width: 100%;
    max-height: 100%;
`

export const SearchContainer = styled.div`
    background-image: linear-gradient( to top right, rgba(11, 10, 10, 0.5), rgba(11, 10, 10, 0.4)), url(${ImgBg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
`;

export const SubmitButton = styled(HeroButton)`
    margin-top: 20px;
`;

export const WhiteBackground = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
`