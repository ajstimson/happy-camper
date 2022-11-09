import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Flex, IconButton } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

const Search = (props) => {
    const navigate = useNavigate()
    const [value, setValue] = useState("")
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

    const handleSearch = (e) => {
        e.preventDefault()
        axios
            .get(`http://localhost:8000/api/facilities/google/${value}`)
            .then((res) => {
                props.setCenter({
                    lat: res.data[0].geometry.location.lat,
                    lng: res.data[0].geometry.location.lng,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Flex className="search">
            <form onSubmit={(e) => handleSearch(e)}>
                <input
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="find your happy place..."
                />
                <IconButton
                    aria-label="search"
                    size="lg"
                    mr={2}
                    icon={<SearchIcon />}
                    display={["flex", "flex"]}
                    onClick={(e) => handleSearch(e)}
                />
            </form>
        </Flex>
    )
}

export default Search
