'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const ChildSelectList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user-children'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/child`,
        {
          withCredentials: true,
        }
      );
      return data as ChildModel[];
    },
  });
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose child" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="____all____">(All Children)</SelectItem>
          {data?.map((r) => (
            <SelectItem
              key={r.name}
              value={r.name.toLowerCase()}
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
