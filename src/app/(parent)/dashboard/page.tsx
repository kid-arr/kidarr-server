import React from 'react';
import { api } from '@/trpc/server';
import ChildrenFilter from '@/components/children/children-filter';
import dynamic from 'next/dynamic';
import { MapViewTypeSelector } from '@/components/maps/map-viewtype-selector';

const Dashboard = async () => {
  const kids = await api.child.mine.query();
  const Map = dynamic(() => import('@/components/maps/main-map'), {
    ssr: false,
  });
  return <div>
    <div className="flex flex-row justify-between">
      <ChildrenFilter kids={kids} />
      <MapViewTypeSelector />
    </div>
    <div className="mt-4">
      <Map kids={kids} />
    </div>
  </div>;
};

export default Dashboard;
