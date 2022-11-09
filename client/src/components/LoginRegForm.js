import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Flex } from "@chakra-ui/react"
import axios from "axios"
import "../styles/LogReg.css"

const LoginForm = (props) => {
    let navigate = useNavigate()
    //set up state for the form
    const [formLoginData, setLoginFormData] = useState({
        email: "",
        password: "",
    })
    const [loginError, setLoginError] = useState(null)
    const [loginSuccess, setLoginSuccess] = useState(null)
    const [loginRedirect, setLoginRedirect] = useState(false)
    const [formRegisterData, setRegisterFormData] = useState({
        status: "user",
        password: "",
        confirmPassword: "",
        email: "",
        tempUser: props.user_id,
        opinions: [],
    })

    //track changes in the form
    const handleLoginChange = (e) => {
        if (props.type === "login") {
            setLoginFormData({
                ...formLoginData,
                [e.target.name]: e.target.value,
            })
        } else {
            setRegisterFormData({
                ...formRegisterData,
                [e.target.name]: e.target.value,
            })
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        axios
            .post("http://localhost:8000/api/users/login", formLoginData, {
                withCredentials: true,
                credentials: "include",
            })
            .then((res) => {
                setLoginError(null)
                setLoginSuccess(res.data.message)
                setLoginRedirect(true)
            })
            .catch((err) => {
                console.log(err)
                setLoginError(err.response.data.errorMessage)
                setLoginSuccess(null)
            })
    }
    const handleRegister = (e) => {
        e.preventDefault()
        axios
            .post(
                "http://localhost:8000/api/users/register",
                formRegisterData,
                {
                    withCredentials: true,
                    credentials: "include",
                }
            )
            .then((res) => {
                setLoginSuccess(res.data.message)
                setLoginError(null)
                setLoginRedirect(true)
            })
            .catch((err) => {
                setLoginError(err.response.data.message)
                setLoginSuccess(null)
            })
    }

    if (props.user.status === "verified") {
        return (
            <Flex>
                <p>You're already Logged in silly!</p>
                <a href="/dashboard">Dashboad</a>
                <a href="/logout">Logout</a>
            </Flex>
        )
    } else {
        return (
            <form
                className="log-reg-form"
                onSubmit={(e) =>
                    props.type === "login" ? handleLogin(e) : handleRegister(e)
                }
            >
                {props.type === "login" ? (
                    <>
                        <div>
                            <label htmlFor="username">Email: </label>
                            <input
                                type="text"
                                name="email"
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleLoginChange}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label htmlFor="firstName">First Name: </label>
                            <input
                                type="text"
                                name="firstName"
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name: </label>
                            <input
                                type="text"
                                name="lastName"
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Confirm Password: </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                onChange={handleLoginChange}
                            />
                        </div>
                    </>
                )}
                {loginError && <p className="error">{loginError}</p>}
                {loginSuccess && <p className="success">{loginSuccess}</p>}
                <button type="submit">
                    {props.type === "login" ? "login" : "register"}
                </button>
            </form>
        )
    }
}

export default LoginForm
