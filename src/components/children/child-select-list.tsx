'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type ChildModel from '@/lib/models/child';

type ChildSelectListProps = {
  kids: ChildModel[];
}
const ChildSelectList: React.FC<ChildSelectListProps> = ({ kids }) => {
  return (
    <Select defaultValue={'____all____'}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose child" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="____all____">(All Children)</SelectItem>
          {kids?.map((r) => (
            <SelectItem
              key={r.id}
              value={r.id}
            >
              {r.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ChildSelectList;
