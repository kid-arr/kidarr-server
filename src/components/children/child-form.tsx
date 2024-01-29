"use client";

import {
  type Child,
  type NewChildParams,
  insertChildParams,
} from "@/server/db/schema/children";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api as trpc } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { type z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const ChildForm = ({
  child,
  closeModal,
}: {
  child?: Child;
  closeModal?: () => void;
}) => {
  const { toast } = useToast();

  const editing = !!child?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertChildParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertChildParams),
    defaultValues: child ?? {
      name: "",
      email: "",
      avatar: "",
    },
  });

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast({
        title: `${action
          .slice(0, 1)
          .toUpperCase()
          .concat(action.slice(1))} Failed`,
        description: data.error,
        variant: "destructive",
      });
      return;
    }

    await utils.children.getChildren.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast({
      title: "Success",
      description: `Child ${action}d!`,
      variant: "default",
    });
  };

  const { mutate: createChild, isLoading: isCreating } =
    trpc.children.createChild.useMutation({
      onSuccess: (res) => onSuccess("create"),
    });

  const { mutate: updateChild, isLoading: isUpdating } =
    trpc.children.updateChild.useMutation({
      onSuccess: (res) => onSuccess("update"),
    });

  const { mutate: deleteChild, isLoading: isDeleting } =
    trpc.children.deleteChild.useMutation({
      onSuccess: (res) => onSuccess("delete"),
    });

  const handleSubmit = (values: NewChildParams) => {
    if (editing) {
      updateChild({ ...values, id: child.id });
    } else {
      createChild(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteChild({ id: child.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ChildForm;
