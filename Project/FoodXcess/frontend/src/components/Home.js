import React from 'react'
import InfoSection from './InfoSection/InfoSection'
import { InfoOne, InfoTwo, InfoThree } from './InfoSection/Data'
import Hero from './Hero/Hero'

const Home = () => {
    return (
        <>
            <Hero />
            <InfoSection {...InfoOne} />
            <InfoSection {...InfoTwo} />
            <InfoSection {...InfoThree} />
            
        </>
    )
}

export default Home
