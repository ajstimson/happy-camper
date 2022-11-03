import { useState } from "react"
import { Button, Flex, IconButton } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import MainDrawer from "./Drawer"
import "../styles/Header.css"

const Header = (props) => {
	const [display, setDisplay] = useState(false)
	return (
		<Flex
			className={"header" + (props.page === "Home" && " hero")}
			zIndex="1"
		>
			{props.page !== "Home" && <h2>Happy Camper</h2>}
			<Button
				as="a"
				variant="ghost"
				aria-label="Home"
				my={5}
			>
				login
			</Button>
			<IconButton
				aria-label="open-menu"
				size="lg"
				mr={2}
				icon={<HamburgerIcon />}
				display={["flex", "flex"]}
				onClick={() => setDisplay("flex")}
			/>
			{display && (
				<MainDrawer
					open={display}
					onClose={() => setDisplay(false)}
					loggedin={props.loggedin}
				/>
			)}
		</Flex>
	)
}

export default Header
