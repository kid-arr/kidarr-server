"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Child } from "@/server/db/schema/children";

type ChildSelectListProps = {
  children: Child[];
};
const ChildSelectList: React.FC<ChildSelectListProps> = ({ children: kids }) => {
  return (
    <Select defaultValue={"____all____"}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose child" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="____all____">(All Children)</SelectItem>
          {kids?.map((r) => (
            <SelectItem key={r.id} value={r.id}>
              {r.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ChildSelectList;
