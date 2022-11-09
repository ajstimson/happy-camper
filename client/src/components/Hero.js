import { Input, Flex, IconButton } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import Map from "./Map"
import Search from "./Search"
import "../styles/Hero.css"

const Hero = (props) => {
    return (
        <div className="hero">
            <Map
                user={props.user}
                context="Hero"
                center={props.center}
                markers={props.markers}
            />
            <Flex className="title" direction="column">
                <h1>Happy Camper</h1>
                <p>Plan your next vacation the easy way!</p>
                <Search setCenter={props.setCenter} />
                <div className="background">
                    <img src="/bk-teal.svg" alt="background" />
                    <img src="/bk-orange.svg" alt="background" />
                    <img src="/bk-yellow.svg" alt="background" />
                </div>
            </Flex>
        </div>
    )
}

export default Hero
