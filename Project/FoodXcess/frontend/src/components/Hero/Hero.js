import React from 'react'
import { HeroContainer, HeroContent, HeroTextWrapper, HeroTitle, HeroTitleText, HeroSubtitle, HeroDesc, HeroBtnWrapper, HeroButton } from './HeroElements'

const Hero = () => {
    return (
        <>
            <HeroContainer>
                <HeroContent>
                    <HeroTextWrapper>
                        <HeroTitle>
                            <HeroTitleText>Reducing food wastage with AI</HeroTitleText>
                        </HeroTitle>
                        <HeroSubtitle>A small act for a huge impact</HeroSubtitle>
                        <HeroDesc>
                            Reducing food wastage by discovering alternative ways to handle ingredients surplus
                        </HeroDesc>
                        <HeroBtnWrapper href="/sign-up/">
                            <HeroButton> Get Started </HeroButton>
                        </HeroBtnWrapper>
                    </HeroTextWrapper>
                </HeroContent>
            </HeroContainer>
        </>
    )
}

export default Hero
