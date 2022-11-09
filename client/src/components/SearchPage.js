import { useState } from "react"
import axios from "axios"
import { Flex, Textarea, FormLabel, Button } from "@chakra-ui/react"
import ShowMoreText from "react-show-more-text"
import Map from "./Map"
import Search from "./Search"
import "../styles/SearchPage.css"

const SearchPage = (props) => {
    const handleComment = (e, id) => {
        const comment = e.target[0].value
        e.preventDefault()
        storeComment(comment, id)
    }

    const storeComment = (comment, id) => {
        //store comment in db
        axios
            .post("http://localhost:8000/api/users/comments", {
                user: props.user,
                facility: id,
                comment: comment,
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Flex>
            <div className="map-wrapper">
                <Map
                    user={props.user}
                    context="Hero"
                    center={props.center}
                    markers={props.markers}
                />
            </div>
            <Flex className="search-box" direction="column">
                <Search setCenter={props.setCenter} />
                <div className="results">
                    <h1>Results</h1>
                    {props.markers.map((marker, i) => {
                        return (
                            <div className="result" key={i}>
                                <p className="result-title">
                                    {marker.FacilityName}
                                </p>
                                <ShowMoreText
                                    /* Default options */
                                    lines={3}
                                    more="Show more"
                                    less="Show less"
                                    className="content-css"
                                    anchorClass="show-more-less-clickable"
                                    expanded={false}
                                    width={280}
                                    truncatedEndingComponent={"... "}
                                >
                                    <p>{marker.FacilityDescription}</p>
                                </ShowMoreText>
                                <form
                                    onSubmit={(e) =>
                                        handleComment(e, marker.FacilityID)
                                    }
                                >
                                    <FormLabel htmlFor="comment">
                                        Notes:
                                    </FormLabel>
                                    <Textarea
                                        id="comment"
                                        placeholder="Take some notes about your visit!"
                                        // onChange={(e) =>
                                        //     setValue(e.target.value)
                                        // }
                                    />
                                    <Button type="submit">Save</Button>
                                </form>
                            </div>
                        )
                    })}
                </div>
            </Flex>
        </Flex>
    )
}

export default SearchPage
