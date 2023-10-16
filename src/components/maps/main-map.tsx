'use client'
import 'leaflet/dist/leaflet.css'
import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

const MainMap = () => {
  return (
    <div>
      <MapContainer
        className="map"
        center={[51.903614, -8.468399]}
        zoom={20}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
      </MapContainer>
    </div>
  )
}

export default MainMap
