import React from 'react';
import { SiteHeader } from '@/components/header/site-header';
import { SocketProvider } from '@/lib/services/realtime/socket-provider';

type DashboardLayoutProps = {
    children?: React.ReactNode
}
const AppLayout = async ({ children }: DashboardLayoutProps) => {
    return (
        <SocketProvider>
            <div className='flex min-h-screen flex-col space-y-6'>
                <SiteHeader />
                <div className='mx-6'>{children}</div>
            </div>
        </SocketProvider>
    );

};
export default AppLayout;
