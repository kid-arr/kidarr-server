"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { cn } from "@/lib/utils";
import { newChildSchema } from "@/lib/validations/child";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { DialogFooter } from "../ui/dialog";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type AddChildFormProps = React.HTMLAttributes<HTMLDivElement>;
type FormData = z.infer<typeof newChildSchema>;

const AddChildForm: React.FC<AddChildFormProps> = ({ className, ...props }) => {
  const router = useRouter();
  const [PIN, setPIN] = React.useState("");
  const utils = api.useUtils();
  const createChild = api.child.create.useMutation();

  // const queryClient = useQueryClient();
  // const { mutate: submitNewChild, isPending } = useMutation({
  //   mutationFn: async (name: string) =>
  //     await axios.post('/api/child/create', { name }),
  //   onSuccess: (e) => {
  //     console.log('add-child-form', 'onSuccess', e);
  //     toast({ description: 'Added new child' });
  //     queryClient.invalidateQueries({ queryKey: ['user-children'] });
  //     setPIN(e.data.pin);
  //   },
  //   onError: () => {
  //     toast({ description: 'Something went wrong', variant: 'destructive' });
  //   },
  // });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(newChildSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = createChild.mutate({ name: data.name });
      debugger;
      toast({ description: "Added new child" });
      await utils.child.invalidate();
      //queryClient.invalidateQueries({ queryKey: ['user-children'] });
      setPIN(result.data?.pin);
    } catch (err) {
      toast({ description: "Something went wrong", variant: "destructive" });
    }
  };

  if (PIN) {
    return (
      <>
        <DialogTitle>Successfully added child</DialogTitle>
        <div>
          {`Your child's PIN is ${PIN}`}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="ml-2"
            onClick={async () => {
              await navigator.clipboard.writeText(PIN).then(() => {
                toast({ description: "PIN copied to clipboard" });
              });
            }}
          >
            <Icons.copy className="h-3 w-3" />
          </Button>
        </div>
      </>
    );
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <DialogHeader>
        <DialogTitle>Add Child</DialogTitle>
        <DialogDescription>
          {
            "Enter your child's details below and press save, then use the displayed PIN to register their device."
          }
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="name"
              placeholder={"Child's name"}
              type="text"
              autoCapitalize="none"
              autoComplete="child-name"
              autoCorrect="off"
              disabled={createChild.isLoading}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </div>
        <div className="mt-5">
          <DialogFooter>
            <Button type="submit">
              <Icons.save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </DialogFooter>
        </div>
      </form>
    </div>
  );
};
export default AddChildForm;
