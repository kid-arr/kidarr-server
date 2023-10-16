import React from 'react';
import ChildSelectList from './child-select-list';

import AddChildComponent from './add-child-component';

const ChildrenFilter = async () => {
  return (
    <div className="flex flex-row space-x-2 justify-center items-center">
      <span>Child</span>
      <ChildSelectList />
      <AddChildComponent />
    </div>
  );
};

export default ChildrenFilter;
