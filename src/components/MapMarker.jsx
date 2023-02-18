import { React, useLayoutEffect } from 'react';
import L from "leaflet"
const MapMarker = (props) => {

    useLayoutEffect(() => {
        // Remove old markers before adding new ones
        try {

            const mapContainer = L.DomUtil.get('map');
            if (mapContainer != null) {
                mapContainer._leaflet_id = null;
            }
            const locations = props.location.split("|");
            const customer = locations[0];
            const restaurant = locations[1];
            const driver = locations[2] !== "undefined,undefined" ? locations[2] : locations[0];

            var map = L.map('map').setView(driver.split(","), 15);

            var LeafIcon = L.Icon.extend({
                options: {
                    iconSize: [70, 70],
                    shadowSize: [50, 64],
                    iconAnchor: [35, 45],
                    shadowAnchor: [4, 62],
                    popupAnchor: [-3, -76]
                }
            });

            var driverIcon = L.icon({
                iconUrl: 'driver.png',
                iconSize: [61, 61],
                shadowSize: [50, 64],
                iconAnchor: [30, 30],
            });

            var customerIcon = L.icon({
                iconUrl: 'customer.png',
                iconSize: [25, 40],
                shadowSize: [50, 64],
                iconAnchor: [10, 32],
            });

            var restaurantIcon = L.icon({
                iconUrl: 'restaurant.png',
                iconSize: [25, 40],
                shadowSize: [50, 64],
                iconAnchor: [9, 34],
            });

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            var driverMarker = L.marker(driver.split(","), { icon: driverIcon }).addTo(map);
            var customerMarker = L.marker(customer.split(","), { icon: customerIcon }).addTo(map);
            var restaurantMarker = L.marker(restaurant.split(","), { icon: restaurantIcon }).addTo(map);


            driverMarker.addTo(map);
            customerMarker.addTo(map);
            restaurantMarker.addTo(map);
        } catch (error) {
            console.log(error.message)
        }


    }, [props.location]);
    return (

        <div id="map" style={
            { height: "500px" }
        }></div>
    );
}

export default MapMarker;
