import { useEffect, useState } from "react";
import {GoogleMap, useJsApiLoader, Marker} from "@react-google-maps/api"
import {io} from "socket.io-client"
import Navbar from "../components/Navbar"

// map container style
const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 65px)" // full height minus navbar
}

// centered on Kanpur
const kanpurCenter = {
  lat: 26.4499,
  lng: 80.3319
}

// dark theme map styles
const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#a855f7" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2d2d3d" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1a1a2e" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a0a1a" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#13131a" }] },
]

function Home() {
  const [vehicles, setVehicles] = useState([])

  // loading google maps with our api key
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  useEffect(() => {
    // connecting to deployed socket.io server
    const socket = io("https://safecomm-api.onrender.com/")

    // listening for vehicle location updates from backend
    socket.on("vehicleLocationUpdate", (data) => {
      setVehicles((prev) => {
        // updating the specific vehicle's location in state
        const exists = prev.find((v) => v.vehicleId === data.vehicleId)
        if (exists) {
          return prev.map((v) => v.vehicleId === data.vehicleId ? data : v)
        }
        return [...prev, data]
      })
    })

    // cleanup on component unmount
    return () => socket.disconnect()
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-purple-400 text-lg">Loading Map...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* google map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={kanpurCenter}
        zoom={13}
        options={{
          styles: darkMapStyles,
          disableDefaultUI: false,
          zoomControl: true,
        }}
      >
        {/* rendering a marker for each vehicle */}
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.vehicleId}
            position={{
              lat: vehicle.currentLocation.lat,
              lng: vehicle.currentLocation.lng
            }}
            title={`${vehicle.type.toUpperCase()} - ${vehicle.vehicleId}`}
          />
        ))}
      </GoogleMap>
    </div>
  )
}

export default Home