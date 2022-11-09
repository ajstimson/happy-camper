import { useState } from "react"
import {
    Button,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react"
import LoginForm from "./LoginRegForm"
import "../styles/Header.css"

const Header = (props) => {
    const [modalTitle, setModalTitle] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleClick = (e) => {
        e.preventDefault()
        if (e.target.name !== "logout") {
            onOpen()
            setModalTitle(e.target.name)
        } else {
            props.handleLogout()
        }
    }
    return (
        <Flex
            className={
                "header " +
                (props.page === "Home" ? "hero" : props.page.toLowerCase())
            }
            zIndex="1"
        >
            {props.page !== "Home" && <h2>Happy Camper</h2>}
            {!props.loggedin && (
                <Button as="a" name="Register" onClick={(e) => handleClick(e)}>
                    register
                </Button>
            )}
            {!props.loggedin ? (
                <Button as="a" name="login" onClick={(e) => handleClick(e)}>
                    login
                </Button>
            ) : (
                <Button as="a" name="logout" onClick={(e) => handleClick(e)}>
                    Logout
                </Button>
            )}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <LoginForm user={props.user} type={modalTitle} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default Header
