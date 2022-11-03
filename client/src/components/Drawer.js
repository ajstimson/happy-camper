import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"

const MainDrawer = ({ open, onClose, loggedin }) => {
	return (
		<DrawerOverlay
			display={open ? "flex" : "none"}
			onClick={onClose}
		>
			<DrawerContent onClick={(e) => e.stopPropagation()}>
				<DrawerCloseButton />
				<DrawerBody>
					<Link to="/">Home</Link>
					<Link to="/about">About</Link>
					{loggedin && <Link to="/dashboard">Dashboard</Link>}
				</DrawerBody>
			</DrawerContent>
		</DrawerOverlay>
	)
}

export default MainDrawer
