import { useState, useEffect, useCallback, useRef } from "react"
import MapStyles from "./MapStyles"

const libraries = ["places"]

const center = {
	lat: 46.859757,
	lng: -121.653757,
}

const options = {
	styles: MapStyles,
	disableDefaultUI: true,
	zoomControl: true,
}

const Map = (props) => {
	const { markers, setMarkers } = useState([])
	const didMount = useRef(false)
	const { GoogleMap, useLoadScript } = props
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	})

	useEffect(() => {
		const getFacilities = async (setMarkers) => {
			try {
				const res = await fetch(
					`http://localhost:8000/api/facilities/${center.lat}/${center.lng}/50`
				)
				await res.json().then((data) => {
					setMarkers(data)
					console.log(data)
				})
			} catch (err) {
				console.error(err.message)
			}
		}
		getFacilities()
	}, [markers, setMarkers])

	const mapContainerStyle = {
		height: "100vh",
		width: props.context === "Hero" ? "78vw" : "50vw",
	}

	const mapRef = useRef()
	const onMapLoad = useCallback((map) => {
		mapRef.current = map
	}, [])

	//   const [markers, setMarkers] = useState([]);
	//   const [selected, setSelected] = useState(null);

	if (loadError) return "Error"
	if (!isLoaded) return "Loading..."

	return (
		<GoogleMap
			id="map"
			mapContainerStyle={mapContainerStyle}
			zoom={11}
			center={center}
			options={options}
			onLoad={onMapLoad}
			zIndex="0"
		></GoogleMap>
	)
}

export default Map
