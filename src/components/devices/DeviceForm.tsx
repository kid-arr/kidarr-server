"use client";

import { Device, NewDeviceParams, insertDeviceParams } from "@/server/db/schema/devices";
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
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const DeviceForm = ({
  device,
  closeModal,
}: {
  device?: Device;
  closeModal?: () => void;
}) => {
  const { toast } = useToast();
  const { data: children } = trpc.children.getChildren.useQuery();
  const editing = !!device?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertDeviceParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertDeviceParams),
    defaultValues: device ?? {
      name: "",
     deviceId: "",
     childId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
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

    await utils.devices.getDevices.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast({
      title: 'Success',
      description: `Device ${action}d!`,
      variant: "default",
    });
  };

  const { mutate: createDevice, isLoading: isCreating } =
    trpc.devices.createDevice.useMutation({
      onSuccess: (res) => onSuccess("create"),
    });

  const { mutate: updateDevice, isLoading: isUpdating } =
    trpc.devices.updateDevice.useMutation({
      onSuccess: (res) => onSuccess("update"),
    });

  const { mutate: deleteDevice, isLoading: isDeleting } =
    trpc.devices.deleteDevice.useMutation({
      onSuccess: (res) => onSuccess("delete"),
    });

  const handleSubmit = (values: NewDeviceParams) => {
    if (editing) {
      updateDevice({ ...values, id: device.id });
    } else {
      createDevice(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (<FormItem>
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
          name="deviceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Device Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="childId"
          render={({ field }) => (<FormItem>
              <FormLabel>Child Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a child" />
                  </SelectTrigger>
                  <SelectContent>
                    {children?.children.map((child) => (
                      <SelectItem key={child.id} value={child.id.toString()}>
                        {child.id}  {/* TODO: Replace with a field from the child model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            onClick={() => deleteDevice({ id: device.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default DeviceForm;
