'use client';
import React, { useEffect, useMemo, useState } from 'react';
import ChildrenFilter from '@/components/children/children-filter';
import dynamic from 'next/dynamic';
import io from 'socket.io-client';

const DashboardPage = () => {

  //this needs to be a dynamic import
  //otherwise it causes window not found errors
  const Map = dynamic(() => import('@/components/maps/main-map'), { ssr: false });
  return (
    <div>
      <div className='z-10'>
        <ChildrenFilter />
      </div>
      <div className='z-0 mt-4'>
        <Map />
      </div>
    </div>
  );
};

export default DashboardPage;
