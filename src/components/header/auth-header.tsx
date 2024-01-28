import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/widgets/user-avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

const AuthHeader = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  return !session ? (
    <Link
      className={cn(buttonVariants({ variant: "default", size: "sm" }))}
      href="/signin"
    >
      <Icons.login className="mr-2 h-4 w-4" />
      Login
    </Link>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: session?.user?.name ?? null,
            image: session?.user?.image ?? null,
          }}
          className="h-6 w-6"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {session?.user?.name && (
              <p className="font-medium">{session?.user?.name}</p>
            )}
            {session?.user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {session?.user?.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={async (event) => {
            event.preventDefault();
            await signOut({
              callbackUrl: `${window.location.origin}`,
            });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthHeader;
