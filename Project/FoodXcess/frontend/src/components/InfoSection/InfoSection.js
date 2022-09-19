import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { InfoSec, Container, InfoRow, InfoColumn, TextWrapper, Heading, Desc, Button, ImgWrapper, Img, ArrowForward, ArrowRight } from './InfoSectionElements'

const InfoSection = ({title, Description, buttonLabel, img, alt, start, link, light}) => {
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <>
            <InfoSec light={light}>
                <Container>
                    <InfoRow start={start}>
                        <InfoColumn>
                            <TextWrapper>
                                <Heading light={light}>{title}</Heading>
                                <Desc light={light}>{Description}</Desc>
                                <Link to={link} onMouseEnter={onHover} onMouseLeave={onHover}>
                                    <Button light={light}>{buttonLabel}{hover? <ArrowForward />: <ArrowRight />}</Button>
                                </Link>
                            </TextWrapper>
                        </InfoColumn>
                        <InfoColumn>
                            <ImgWrapper start={start}>
                                <Img src={img} alt={alt} />
                            </ImgWrapper>
                        </InfoColumn>
                    </InfoRow>
                </Container>
            </InfoSec>
            
        </>
    )
}

export default InfoSection
