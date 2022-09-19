import styled from  'styled-components';
import {MdArrowForward, MdKeyboardArrowRight} from 'react-icons/md';

export const InfoSec = styled.div`
    color: #fff;
    padding: 120px 0;
    background: ${({light}) => (light? '#fff': '#22443d')};
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;
  height: 400px;

  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  margin: 0 -15px -15px -15px;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${({ start }) => (start ? 'row-reverse' : 'row')};
`;

export const InfoColumn = styled.div`
  margin-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 1;
  max-width: 50%;
  flex-basis: 50%;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
  
  @media screen and (max-width: 768px) {
    padding-bottom: 65px;
  }
`;

export const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({light}) => (light? '#22443d': '#e6c7cf')};
`;

export const Desc = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: #a9b3c1; 
`;

export const Button = styled.button`
  border-radius: 7px;
  background: ${({light}) => (light? '#22443d': '#e6c7cf')};
  white-space: nowrap;
  padding: 12px 64px;
  color: ${({light}) => (light? '#fff': '#3a5331')};
  font-size: 20px;
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    color: ${({light}) => (light? '#22443d': '')};
    background-color: #fff;
    border: ${({light}) => (light? '2px solid #22443d': 'none')};
  }
  
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const ImgWrapper = styled.div`
  max-width: 500px;
  display: flex;
  justify-content: ${({ start }) => (start ? 'flex-start' : 'flex-end')};
`;

export const Img = styled.img`
  padding-right: 0;
  border: 0;
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
  max-height: 500px;
`;

export const ArrowForward = styled(MdArrowForward)`
  margin-left: 8px;
  font-size: 20px;
  margin-bottom: -3px;
`

export const ArrowRight = styled(MdKeyboardArrowRight)`
  margin-left: 8px;
  font-size: 20px;
  margin-bottom: -3px;
`

