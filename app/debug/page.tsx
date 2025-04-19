"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DebugAuth } from "@/components/debug-auth"
import { InteractiveBackground } from "@/components/interactive-background"

export default function DebugPage() {
  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Debug Auth</h1>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <DebugAuth />
        </div>
      </div>
    </div>
  )
}
