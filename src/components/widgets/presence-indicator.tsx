'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useSocket } from '@/lib/services/realtime/socket-provider';
const PresenceIndicator = () => {
  const { isConnected } = useSocket();

  const [isOnline, setIsOnline] = React.useState(true);
  return (
    <span className='relative inline-flex'>
      <Button variant='ghost' size='icon'>
        <Icons.presence className='h-4 w-4' />
      </Button>
      {isConnected && (
        <span className='flex absolute h-2 w-2 top-1.5 right-1.5'>
          <span
            className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
          <span
            className='relative inline-flex rounded-full h-2 w-2 bg-green-500'></span>
        </span>)}
    </span>
  );
};

export default PresenceIndicator;
