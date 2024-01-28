import React from "react";
import ChildSelectList from "./child-select-list";

import { type CompleteChild } from "@/server/db/schema/children";

type ChildrenFilterProps = {
  kids: CompleteChild[];
};
const ChildrenFilter: React.FC<ChildrenFilterProps> = async ({ kids }) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      <ChildSelectList kids={kids} />
      {/* <AddChildComponent /> */}
    </div>
  );
};

export default ChildrenFilter;
