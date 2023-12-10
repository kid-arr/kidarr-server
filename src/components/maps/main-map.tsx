'use client'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import useHub from '@/lib/hooks/realtime/use-hub'
import { LocationUpdate } from '@/types/location-update'

const MainMap = () => {
  useHub('/loc', {
    onConnected: (hub) => {
      console.log('dashboard/page', 'hub_onConnected', hub)
      hub.on('LocationUpdate', (message: LocationUpdate) => {
        console.log('dashboard/page', 'hub_ReceiveMessage', message.childId, message.x, message.y)
      })
    },
    onDisconnected: () => {
      console.log('dashboard/page', 'hub_onDisconnected')
      console.log('dashboard/page', 'hub_onDisconnected')
    },
    onError: (error) => {
      console.log('dashboard/page', 'hub_onError', error)
    },
  })
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
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
