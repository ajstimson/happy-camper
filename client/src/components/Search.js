import { Input, Flex, IconButton } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete"
import useOnclickOutside from "react-cool-onclickoutside"

// const baseUrl = `https://recreation.gov/api/v1/facilities/`

// const setSearchURL = (params) => {
// 	let url = new URL(baseUrl)
// 	url.searchParams.set("limit", params.limit || 50)
// 	url.searchParams.set("offset", 0)
// 	url.searchParams.set("full", true)
// 	url.searchParams.set("activity", "CAMPING")
// 	url.searchParams.set("latitude", params.lat)
// 	url.searchParams.set("longitude", params.lng)
// 	url.searchParams.set("radius", params.radius || 20.0)
// 	url.searchParams.set("apikey", process.env.REACT_APP_RIDB_API_KEY)
// 	return url
// }

// Async fetch of camground-month JSON data from API
// const getCampgoundMonth = async () => {
// 	const params = {
// 		lat: 46.859757,
// 		lng: -121.653757,
// 		radius: 50.0,
// 	}
// 	const url = setSearchURL(params)
// 	console.log(url)
// 	const response = await fetch(url)
// 	const jsonBody = await response.json()
// 	console.log(jsonBody)
// }

const Search = (props) => {
	// getCampgoundMonth()
	const { GoogleMap, useLoadScript } = props
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			/* Define search scope here */
		},
		debounce: 300,
	})
	const ref = useOnclickOutside(() => {
		// When user clicks outside of the component, we can dismiss
		// the searched suggestions by calling this method
		clearSuggestions()
	})

	const handleInput = (e) => {
		// Update the keyword of the input element
		setValue(e.target.value)
	}

	const handleSelect =
		({ description }) =>
		() => {
			// When user selects a place, we can replace the keyword without request data from API
			// by setting the second parameter to "false"
			setValue(description, false)
			clearSuggestions()

			// Get latitude and longitude via utility functions
			getGeocode({ address: description }).then((results) => {
				const { lat, lng } = getLatLng(results[0])
				console.log("📍 Coordinates: ", { lat, lng })
			})
		}

	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion

			return (
				<li
					key={place_id}
					onClick={handleSelect(suggestion)}
				>
					<strong>{main_text}</strong> <small>{secondary_text}</small>
				</li>
			)
		})

	const handleClick = () => {
		console.log("Search")
	}

	return (
		<Flex
			className="search"
			ref={ref}
		>
			<input
				value={value}
				onChange={handleInput}
				disabled={!ready}
				placeholder="find your happy place..."
			/>
			<IconButton
				aria-label="search"
				size="lg"
				mr={2}
				icon={<SearchIcon />}
				display={["flex", "flex"]}
				onClick={() => handleClick()}
			/>
			{/* We can use the "status" to decide whether we should display the dropdown or not */}
			{status === "OK" && <ul>{renderSuggestions()}</ul>}
		</Flex>
	)
}

export default Search
