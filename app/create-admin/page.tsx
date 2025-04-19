"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CreateAdminTool } from "@/components/admin-tools"
import { InteractiveBackground } from "@/components/interactive-background"

export default function CreateAdminPage() {
  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Create Admin User</h1>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <div className="max-w-md mx-auto">
          <CreateAdminTool />
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              This page is for initial setup only. After creating an admin user, you should protect or remove this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
