"use client";
import React, { useEffect } from "react";
import ChildSelectList from "./child-select-list";

import { type Child } from "@/server/db/schema/children";

type ChildrenFilterProps = {
  children: Child[];
};
const ChildrenFilter: React.FC<ChildrenFilterProps> = ({ children }) => {
  useEffect(() => {
    console.log("ChildrenFilter: useEffect", children);
  }, [children]);
  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      <ChildSelectList children={children} />
    </div>
  );
};

export default ChildrenFilter;
