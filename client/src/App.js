import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import axios from "axios"
import Header from "./components/Header"
import Hero from "./components/Hero"
import SearchPage from "./components/SearchPage"
import "./styles/App.css"

function App() {
    //This fixes missing cookie issue
    axios.defaults.withCredentials = true

    const [loggedin, setLoggedin] = useState(false)
    const [user, setUser] = useState({})

    const handleUser = () => {
        //TODO: check for cookie and use that if it exists
        axios
            .post("http://localhost:8000/api/users/checkUser", {
                withCredentials: true,
                credentials: "include",
            })
            .then((res) => {
                setUser(res.data)
            })
    }

    // if no cookie exists, create temp user
    useEffect(() => {
        handleUser()
    }, [])

    useEffect(() => {
        user && user.status !== "temp" ? setLoggedin(true) : setLoggedin(false)
    }, [user])

    const handleLogout = () => {
        axios
            .post("http://localhost:8000/api/users/logout", {
                withCredentials: true,
                credentials: "include",
            })
            .then((res) => {
                handleUser()
            })
    }

    const [center, setCenter] = useState({
        lat: 46.854611,
        lng: -121.484082,
    })

    const [markers, setMarkers] = useState([])

    useEffect(() => {
        // get facilities from database and set markers
        axios
            .get(
                `http://localhost:8000/api/facilities/${center.lat}/${center.lng}/50`,
                {
                    withCredentials: true,
                    // credentials: "include",
                }
            )
            .then((response) => {
                setMarkers(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [setMarkers, center])

    console.log("user", user)

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header
                                    page="Home"
                                    loggedin={loggedin}
                                    user={user}
                                    handleLogout={handleLogout}
                                />
                                <Hero
                                    user={user}
                                    center={center}
                                    markers={markers}
                                    setCenter={setCenter}
                                />
                            </>
                        }
                    />
                    <Route
                        path="/search"
                        element={
                            <>
                                <Header
                                    page="Search"
                                    loggedin={loggedin}
                                    handleLogout={handleLogout}
                                />
                                <SearchPage
                                    user={user}
                                    center={center}
                                    markers={markers}
                                    setCenter={setCenter}
                                />
                            </>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            user.status === "user" ? (
                                <>
                                    <Header
                                        page="Search"
                                        loggedin={loggedin}
                                        handleLogout={handleLogout}
                                    />
                                </>
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
