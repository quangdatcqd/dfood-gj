import { React, useEffect } from 'react';
import L from "leaflet"
const MapMarker = (props) => {

    useEffect(() => {
        const locations = props.location.split("|");
        const customer = locations[0];
        const driver = locations[1] !== "undefined,undefined" ? locations[1] : locations[0];
        const restaurant = locations[2];
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
            // iconSize: [38, 95], // size of the icon
            // shadowSize: [50, 64], // size of the shadow
            // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            // shadowAnchor: [4, 62],  // the same for the shadow
            // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        var customerIcon = L.icon({
            iconUrl: 'customer.png',
            iconSize: [25, 40],
            shadowSize: [50, 64],
            iconAnchor: [10, 32],
            // iconSize: [38, 95], // size of the icon
            // shadowSize: [50, 64], // size of the shadow
            // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            // shadowAnchor: [4, 62],  // the same for the shadow
            // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        var restaurantIcon = L.icon({
            iconUrl: 'restaurant.png',
            iconSize: [25, 40],
            shadowSize: [50, 64],
            iconAnchor: [9, 34],
            // iconSize: [38, 95], // size of the icon
            // shadowSize: [50, 64], // size of the shadow
            // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            // shadowAnchor: [4, 62],  // the same for the shadow
            // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        // redIcon = new LeafIcon({ iconUrl: 'leaf-red.png' }),
        // orangeIcon = new LeafIcon({ iconUrl: 'leaf-orange.png' });
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        // var marker = L.marker([10.845822, 106.645824], { icon: driverIcon }).addTo(map);
        var marker = L.marker(driver.split(","), { icon: driverIcon }).addTo(map);
        var marker = L.marker(customer.split(","), { icon: customerIcon }).addTo(map);
        var marker = L.marker(restaurant.split(","), { icon: restaurantIcon }).addTo(map);



    }, []);
    return (

        <div id="map" style={
            { height: "500px" }
        }></div>
    );
}

export default MapMarker;
