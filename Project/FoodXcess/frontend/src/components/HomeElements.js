import styled from "styled-components";
import img from "../../static/images/test.jpg";

export const HeroSection = styled.section`
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 700px;
    position: relative;
    z-index: 1;

    // background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img});
    // background: #fff
    // height: 700px;
    // background-position: center;
    // background-repeat: no-repeat;
    // background-size: cover;
    // position: relative;
    // z-index: 1;
`

export const TextWrapper = styled.div`
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
`
