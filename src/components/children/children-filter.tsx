import React from 'react';
import ChildSelectList from './child-select-list';

import AddChildComponent from './add-child-component';
import type ChildModel from '@/lib/models/child';

type ChildrenFilterProps = {
  kids: ChildModel[];
}
const ChildrenFilter: React.FC<ChildrenFilterProps> = async ({ kids }) => {
  return (
    <div className="flex flex-row space-x-2 justify-center items-center">
      <ChildSelectList kids={kids} />
      <AddChildComponent />
    </div>
  );
};

export default ChildrenFilter;
