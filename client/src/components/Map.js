import { useState, useEffect, useCallback, useRef } from "react";
import { Marker, InfoBox } from "@react-google-maps/api";
import { Flex, CloseButton, Icon, Button } from "@chakra-ui/react";
import { RiThumbUpLine, RiThumbDownLine } from "react-icons/ri";
import axios from "axios";
import MapStyles from "./MapStyles";
import "../styles/Map.css";

// const libraries = ["places"]

const center = {
  lat: 46.854611,
  lng: -121.484082,
};
const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = (props) => {
  const { GoogleMap, useLoadScript } = props;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [status, setStatus] = useState([]);
  const [showInfoWindow, setShowInfoWindow] = useState({
    show: false,
    id: null,
  });

  useEffect(() => {
    // get facilities from database and set markers
    axios
      .get(
        `http://localhost:8000/api/facilities/${center.lat}/${center.lng}/50`
      )
      .then((response) => {
        setMarkers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setMarkers]);

  const mapContainerStyle = {
    height: "100vh",
    width: props.context === "Hero" ? "78vw" : "50vw",
  };

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleClick = () => {
    setShowInfoWindow({ show: false, id: null });
  };

  const handleLike = (liked, id) => {
    // update user's liked facilities
    axios
      .put(`http://localhost:8000/api/user_meta/liked/${id}/${liked}`)
      .then((response) => {
        setStatus(...status, { id: id, liked: liked });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  console.log(status);
  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      options={options}
      onLoad={onMapLoad}
      zIndex="0"
    >
      {markers &&
        markers.map((marker, i) => (
          <div key={marker.FacilityID}>
            <Marker
              key={marker.FacilityID}
              position={{
                lat: marker.FacilityLatitude,
                lng: marker.FacilityLongitude,
              }}
              name={marker.FacilityName}
              icon={{
                url: "/marker.svg",
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => {
                setShowInfoWindow({ show: true, id: marker.FacilityID });
              }}
            />
            <InfoBox
              key={i}
              position={{
                lat: marker.FacilityLatitude,
                lng: marker.FacilityLongitude,
              }}
              visible={
                showInfoWindow.id === marker.FacilityID && showInfoWindow.show
              }
            >
              <>
                <div className="inner-infobox">
                  <Flex justify="space-between">
                    <h3>
                      <span>{marker.FacilityName}</span>
                    </h3>
                    <Flex>
                      <Button
                        className="like-button"
                        onClick={(e) => handleLike(false, marker.FacilityID)}
                      >
                        <Icon as={RiThumbDownLine} />
                      </Button>
                      <Button
                        className="like-button"
                        onClick={(e) => handleLike(true, marker.FacilityID)}
                      >
                        <Icon as={RiThumbUpLine} />
                      </Button>
                    </Flex>
                    <CloseButton onClick={() => handleClick()} />
                  </Flex>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: marker.FacilityDescription,
                    }}
                  />
                </div>
              </>
            </InfoBox>
          </div>
        ))}
    </GoogleMap>
  );
};

export default Map;
