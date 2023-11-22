'use client'
import 'leaflet/dist/leaflet.css'
import React, { useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Socket, io } from 'socket.io-client'

const MainMap = () => {

  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    isMounted && (
      <div>
        <MapContainer
          className='map'
          center={[51.903614, -8.468399]}
          zoom={20}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          ></TileLayer>
        </MapContainer>
      </div>
    )
  )
}

export default MainMap
