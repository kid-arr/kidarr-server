"use client";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/header/theme-toggle";
import { useSession } from "next-auth/react";
import AuthHeader from "@/components/header/auth-header";
import PresenceIndicator from "@/components/widgets/presence-indicator";

export function SiteHeader() {
  const { data: session, status } = useSession();
  return (
    <header className="sticky inset-x-0 top-0 z-50  backdrop-blur-sm duration-300 animate-in slide-in-from-top-1">
      <div className="flex border-b border-accent bg-background/80 py-2">
        <div className="container flex items-center justify-between gap-6">
          <MainNav items={siteConfig.mainNav} />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.gitHub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.twitter className="h-5 w-5 fill-current" />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>
              <ThemeToggle />
              <PresenceIndicator />
              <AuthHeader />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
