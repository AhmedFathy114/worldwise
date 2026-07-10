import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/Context";
import ReactCountryFlag from "react-country-flag";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const [lat,lng] = useUrlPosition();
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getLocation,
    } = useGeolocation();

    const { cities } = useCities();

    useEffect(
        function () {
            if (lat && lng) setMapPosition([lat, lng]);
        },
        [lat, lng],
    );

    useEffect(
        function () {
            if (geolocationPosition)
                setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        },
        [geolocationPosition],
    );

    return (
        <>
            <div className={styles.mapContainer}>
                {!geolocationPosition && <Button type="position" onClick={getLocation}>
                    {isLoadingPosition ? "Loading..." : "Use your position"}
                </Button>}
                <MapContainer
                    center={mapPosition}
                    zoom={6}
                    scrollWheelZoom={true}
                    className={styles.mapContainer}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />
                    {cities.map((city) => (
                        <Marker
                            position={[city.position.lat, city.position.lng]}
                            key={city.id}
                        >
                            <Popup>
                                <span>
                                    <ReactCountryFlag countryCode={city.emoji} svg />
                                </span>
                                <span>{city.cityName}</span>
                            </Popup>
                        </Marker>
                    ))}
                    <ChangeCenter position={mapPosition} />
                    <DetectClick />
                </MapContainer>
            </div>
        </>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
}

export default Map;
