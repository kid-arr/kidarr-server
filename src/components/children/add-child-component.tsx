"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "../icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddChildForm from "../forms/add-child-form";
const AddChildComponent = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"} size={"sm"}>
          <Icons.add className="mr-2 h-4 w-4" /> Add child
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <AddChildForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddChildComponent;
