import React, { useState, useEffect } from 'react';
import { GoogleApiWrapper, Map, InfoWindow, Marker, ProvidedProps, Polyline, } from 'google-maps-react';
import Axios from 'axios';


interface Props extends ProvidedProps {

}

const RoutesMap: React.FC<Props> = ({ google }) => {
    const [search, setSearch] = useState<string>();

    const [coordinates, setCoordinates] = useState();

    useEffect(() => {
        Axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                key: process.env.REACT_APP_GOOGLE_API,
                address: search,
            }
        }).then(({ data }) => {
            setCoordinates(data.results.length ? data.results[0].geometry.location : null);
        });
    }, [search]);

    function handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
        setSearch(value);
    }
    // const triangleCoords = [
    //     { lat: 25.774, lng: -80.190 },
    //     { lat: 18.466, lng: -66.118 },
    //     { lat: 32.321, lng: -64.757 },
    //     { lat: 25.774, lng: -80.190 }
    // ];
    return (
        <div>
            <div>Search: <input type="text" value={search} onChange={handleChange} /> </div>
            <Map google={google} zoom={6.8} initialCenter={{ lat: 49, lng: 32 }}>
                {/* <Polyline
                    path={triangleCoords}
                    strokeColor="#0000FF"
                    strokeOpacity={.8}
                    strokeWeight={4}
                />
                {triangleCoords.map(p => <Marker onClick={() => alert('HUI')} position={p} />)} */}
                {coordinates && <Marker position={coordinates} />}


            </Map>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API!,
})(RoutesMap);
