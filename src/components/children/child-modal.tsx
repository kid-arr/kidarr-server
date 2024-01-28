"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ChildForm from "./child-form";
import { type Child } from "@/server/db/schema/children";
import { Icons } from "../icons";

export default function ChildModal({
  child,
  emptyState,
}: {
  child?: Child;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!child?.id;
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {emptyState ? (
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            New Child
          </Button>
        ) : (
          <Button
            variant={editing ? "default" : "default"}
            size={editing ? "sm" : "sm"}
          >
            {editing ? (
              <Icons.edit className="h-4 w-4" />
            ) : (
              <Icons.add className="h-4 w-4" />
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-5 pt-5">
          <DialogTitle>{editing ? "Edit" : "Create"} Child</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <ChildForm closeModal={closeModal} child={child} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
