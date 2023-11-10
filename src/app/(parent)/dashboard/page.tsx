import React from 'react'
import MainMap from '@/components/maps/main-map'
import ChildrenFilter from '@/components/children/children-filter'

const DashboardPage = async () => {
  return (
    <div>
      <div className="z-10">
        <ChildrenFilter />
      </div>
      <div>This is the dashboard</div>
      <div className="z-0">
        <MainMap />
      </div>
    </div>
  )
}

export default DashboardPage
