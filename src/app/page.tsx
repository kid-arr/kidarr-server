import React from 'react'
import { signIn } from 'next-auth/react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">Track Your Children with Ease</h2>
          <p className="text-lg mt-4 text-muted-foreground">
            Parentgrine Falcon helps you keep an eye on your loved ones and
            ensure their safety.
          </p>
          <Link
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }),
              'mt-8'
            )}
            href="/signin"
          >
            <Icons.rocket className="mr-2 h-4 w-4" /> {"Let's go"}
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="bg-background py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold">
            Keep Your Children Safe Today!
          </h3>
          <p className="text-lg mt-4 text-muted-foreground">
            Download Parentgrine Falcon now and stay connected with your loved
            ones.
          </p>

          <Link
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'mt-8'
            )}
            href="/download"
          >
            <Icons.mobile className="mr-2 h-4 w-4" /> Download Now
          </Link>
        </div>
      </section>
      <footer className="bg-secondary-foreground text-secondary py-8 text-center">
        <p>
          An open source experiment from PodNoms - source code available{' '}
          <Link
            target="_blank"
            href="https://github.com/parentgrine"
          >
            here
          </Link>
        </p>
      </footer>
    </>
  )
}
