"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";
import ConnectDeviceDialog from "./connect-device-dialog";
import { type CompleteChild } from "@/server/db/schema/children";

type ChildrenListProps = {
  kids: CompleteChild[];
};
const ChildrenList: React.FC<ChildrenListProps> = ({ kids }) => {
  return (
    <Table>
      <TableCaption>Here are your children.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Last seen at</TableHead>
          <TableHead className="">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {kids?.map((kid) => (
          <TableRow key={kid.id}>
            <TableCell className="font-medium">{kid.name}</TableCell>
            <TableCell>Douglas</TableCell>
            <TableCell className="text-right">
              <div className="space-x-1">
                <ConnectDeviceDialog child={kid} />
                <Button>
                  <Icons.edit className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ChildrenList;
