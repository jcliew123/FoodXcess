import styled from "styled-components";
import ImgBg from "../../../static/images/test.jpg"
import { Link } from "react-router-dom";

export const HeroContainer = styled.div`
    background-image: linear-gradient( to top right, rgba(11, 10, 10, 0.5), rgba(11, 10, 10, 0.4)), url(${ImgBg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 74vh;

    @media only screen and (max-width:1600px) {
        height: 85vh;
    }
`;

export const HeroContent = styled.section`
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #FFFEFE;

    @media only screen and (max-width:375px) {
        text-align: start;
        height: 80%;
    }
`;

export const HeroTextWrapper = styled.div`
    width: 50%;
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width:600px) {
        width: 80%;
    }

    @media only screen and (max-width:375px) {
        position: absolute;
        align-items: flex-start;
    }
`;

export const HeroTitle = styled.h1`
    font-size: clamp(1rem, 7vw, 3rem);
    font-weight: 900;
    letter-spacing: .5rem;
    line-height: 1.3;
`;

export const HeroTitleText = styled.span`
    display: block;
`;

export const HeroSubtitle = styled.h2`
    font-size: clamp(1rem, 1.5vw, 2rem);
    font-weight: 300;
    letter-spacing: 1rem;
    padding-top: 1rem;
`;

export const HeroDesc = styled.h3`
    font-size: clamp(1rem, 1.25vw, 1.5rem);
    font-weight: 400;
    padding: 2.5rem 2rem;

    @media only screen and (max-width:375px) {
        padding: 1.5rem 0;
    }
`;

export const HeroBtnWrapper = styled.a`
    text-decoration: none;
    outline: none;
    border: none;
`;

export const HeroButton = styled.button`
  border-radius: 15px;
  background: #e6c7cf;
  white-space: nowrap;
  padding: 18px 30px;
  color: #3a5331;
  font-size: 20px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    color: #3a5331;
    background-color: #fff;
    transform: translateY(-0.5rem) scale(1.02);
  }

  &:active{
    transform: translateY(0.5rem);
  }
  
  @media screen and (max-width: 375px) {
    width: 100%;
    padding: 12px 20px;
    font-size: 16px;
  }
`;