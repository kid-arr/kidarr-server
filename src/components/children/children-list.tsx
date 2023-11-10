'use client';
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Icons } from '../icons';
import ConnectDeviceDialog from './connect-device-dialog';
const ChildrenList = () => {
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
  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Error loading</div>;
  return (
    <Table>
      <TableCaption>Here are your children.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Last seen at</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((child) => (
          <TableRow key={child.id}>
            <TableCell className="font-medium">{child.name}</TableCell>
            <TableCell>Douglas</TableCell>
            <TableCell className="text-right">
              <ConnectDeviceDialog child={child} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ChildrenList;
