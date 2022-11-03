import { Input, Flex, IconButton } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import Map from "./Map"
import Search from "./Search"
import "../styles/Hero.css"

const Hero = () => {
	const handleClick = () => {
		console.log("Search")
	}
	return (
		<div className="hero">
			<Map
				context="Hero"
				GoogleMap={GoogleMap}
				useLoadScript={useLoadScript}
			/>
			<Flex
				className="title"
				direction="column"
			>
				<h1>Happy Camper</h1>
				<p>Plan your next vacation the easy way!</p>
				<Search
					GoogleMap={GoogleMap}
					useLoadScript={useLoadScript}
				/>
				<div className="background">
					<img
						src="/bk-teal.svg"
						alt="background"
					/>
					<img
						src="/bk-orange.svg"
						alt="background"
					/>
					<img
						src="/bk-yellow.svg"
						alt="background"
					/>
				</div>
			</Flex>
		</div>
	)
}

export default Hero
