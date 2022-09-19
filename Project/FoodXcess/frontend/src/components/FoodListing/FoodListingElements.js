import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

export const FLCont = styled.div`
  display: flex;
  align-items: right;
  float: right;
  padding: 10px;
  margin-right: 10px;

//   @media screen and (max-width: 978px) {
//     display: none;
//   }
`;

export const FLBtn = styled.button`
  border-radius: 7px; 
  background: #e6c7cf;
  padding: 10px 22px;
  color: #3a5331;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin: 10px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #3a5331;
  }
`

export const CreateFLContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 15px;
`

export const BackButtonContainer = styled.div`
	position: relative;
	justify-content: start;
	align-items: left;
	margin-left: 5rem;
	padding: 20px 20px;
`

export const CreateFLTextWrapper = styled.div`
	width: 50%;
	position: relative;
	text-align: left;
	padding: 10px; 
`


export const CreateFLTitle = styled.h1`
	color: #22443d;
	font-size: 2rem;
	letter-spacing: .5rem;
	padding: 10px;
	margin-bottom: 10px;
`

export const CreateFLDesc = styled.textarea`
  padding: 27px 12px 10px;
	width: 50%;
	margin: 0;
	border: 0;
	height: 1.1876em;
	display: block;
	box-sizing: content-box;
	background: #d7d7d7;
	border-radius: 5px;
`
export const CreateFLInput = withStyles({
	root: {
		'& .MuiFilledInput-underline:after': {
				borderBottomColor: '#22443d',
		},
	}
})(TextField)

export const SubmissionButton = styled.button`
	border-radius: 7px; 
	background: #e6c7cf;
	padding: 10px 22px;
	color: #3a5331;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	margin-top: 15px;
	width: 50%;

	&:hover {
		transition: all 0.2s ease-in-out;
		background: #fff;
		color: #3a5331;
	}
`

export const DescText = withStyles({
	root: {
		'& .MuiInputBase-input': {
			color: 'black',
		},
	}
})(TextField)