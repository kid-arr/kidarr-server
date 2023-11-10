import { SiteHeader } from '@/components/header/site-header'
import React from 'react'

type DashboardLayoutProps = {
  children?: React.ReactNode
}
const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <SiteHeader />
      <div className="mx-6">{children}</div>
    </div>
  )
}
export default DashboardLayout
