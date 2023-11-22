import React, { useMemo } from 'react'
import ChildrenFilter from '@/components/children/children-filter'
import dynamic from 'next/dynamic'

const DashboardPage = async () => {

  const Map = dynamic(() => import('../../../components/maps/main-map'), { ssr: false })
  return (
    <div>
      <div className='z-10'>
        <ChildrenFilter />
      </div>
      <div>This is the dashboard</div>
      <div className='z-0'>
        <Map />
      </div>
    </div>
  )
}

export default DashboardPage
