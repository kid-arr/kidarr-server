import React from 'react';
import ChildrenFilter from '@/components/children/children-filter';
import dynamic from 'next/dynamic';
import ChildModel from '@/lib/models/child';

type DashboardPageProps = {
  kids: ChildModel[];
}
const DashboardPage: React.FC<DashboardPageProps> = ({ kids }) => {
  //this needs to be a dynamic import
  //otherwise it causes window not found errors
  const Map = dynamic(() => import('@/components/maps/main-map'), {
    ssr: false,
  });

  return (
    <div>
      <div className="z-10">
        <ChildrenFilter kids={kids} />
      </div>
      <div className="z-0 mt-4">
        <Map />
      </div>
    </div>
  );
};

export default DashboardPage;
