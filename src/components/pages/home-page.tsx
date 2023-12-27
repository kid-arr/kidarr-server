import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import React from "react";
import { Icons } from "../icons";
import { Button, buttonVariants } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

function HomePage() {
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">Track Your Children with Ease</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Parentgrine Falcon helps you keep an eye on your loved ones and
            ensure their safety.
          </p>
          <Link
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "mt-8",
            )}
            href="/signin"
          >
            <Icons.rocket className="w-4 h-4 mr-2" /> {"Let's go"}
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid grid-cols-1 gap-8 mx-auto md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Location Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Instantly know where your children are at all times with
                accurate GPS tracking.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Geofencing Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Receive notifications when your child enters or leaves
                designated safe zones.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Activity Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {
                  "View your child's activity history, including visited places and routes taken."
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold">
            Keep Your Children Safe Today!
          </h3>
          <p className="mt-4 text-lg text-muted-foreground">
            Download Parentgrine Falcon now and stay connected with your loved
            ones.
          </p>

          <Link
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-8",
            )}
            href="/download"
          >
            <Icons.mobile className="w-4 h-4 mr-2" /> Download Now
          </Link>
        </div>
      </section>
      <footer className="py-8 text-center bg-secondary-foreground text-secondary">
        <p>
          An open source experiment from PodNoms - source code available{" "}
          <Link target="_blank" href="https://github.com/parentgrine">
            here
          </Link>
        </p>
      </footer>
    </>
  );
}

export default HomePage;
