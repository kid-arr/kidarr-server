"use client";
import { type CompleteChild } from "@/server/db/schema/children";
import { api as trpc } from "@/trpc/react";
import ChildModal from "./child-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConnectDeviceDialog from "@/components/children/connect-device-dialog";

export default function ChildList({ children }: { children: CompleteChild[] }) {
  const { data: c } = trpc.children.getChildren.useQuery(undefined, {
    initialData: { children },
    refetchOnMount: false,
  });

  if (c.children.length === 0) {
    return <EmptyState />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Last seen at</TableHead>
          <TableHead className="">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {c.children?.map((kid) => <Child child={kid} key={kid.id} />)}
      </TableBody>
    </Table>
  );
}

const Child = ({ child }: { child: CompleteChild }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{child.name}</TableCell>
      <TableCell>Douglas</TableCell>
      <TableCell className="text-right">
        <div className="space-x-1">
          <ConnectDeviceDialog child={child} />
          <ChildModal child={child} />
        </div>
      </TableCell>
    </TableRow>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No children
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new child.
      </p>
      <div className="mt-6">
        <ChildModal emptyState={true} />
      </div>
    </div>
  );
};
