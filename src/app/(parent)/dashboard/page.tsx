'use client'
import React, { useMemo } from 'react'
import ChildrenFilter from '@/components/children/children-filter'
import dynamic from 'next/dynamic'

const DashboardPage = () => {

  //this needs to be a dynamic import
  //otherwise it causes window not found errors
  const Map = dynamic(() => import('@/components/maps/main-map'), { ssr: false })
  return (
    <div>
      <div className='z-10'>
        <ChildrenFilter />
      </div>
      <h2 className='text-3xl font-bold tracking-tight'>
        This is the dashboard
      </h2>
      <div className='z-0'>
        <Map />
      </div>
    </div>
  )
}

export default DashboardPage
