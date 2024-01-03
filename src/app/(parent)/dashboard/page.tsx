import React from 'react';
import { api } from '@/trpc/server';
import ChildrenFilter from '@/components/children/children-filter';
import dynamic from 'next/dynamic';
import ChildModel from '@/lib/models/child';

const Dashboard = async () => {
  const kids = await api.child.mine.query();
  const Map = dynamic(() => import('@/components/maps/main-map'), {
    ssr: false,
  });
  return <div>
    <div className="z-10">
      <ChildrenFilter kids={kids} />
    </div>
    <div className="z-0 mt-4">
      <Map kids={kids} />
    </div>
  </div>;
};

export default Dashboard;
