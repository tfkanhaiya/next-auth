"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveBackground } from "@/components/interactive-background"

export default function DashboardPage() {
  const { user, loading, isAdmin, signOut, refreshUser } = useAuth()
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading && !user) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [user, loading, router])

  // Add an additional check to refresh user data if needed
  useEffect(() => {
    const refreshData = async () => {
      if (!loading && !user && !isRefreshing) {
        setIsRefreshing(true)
        await refreshUser()
        setIsRefreshing(false)
      }
    }

    refreshData()
  }, [loading, user, refreshUser, isRefreshing])

  if (loading || isRefreshing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>You need to be logged in to view this page.</p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            {isAdmin && (
              <Button variant="default" asChild>
                <Link href="/admin">Admin Panel</Link>
              </Button>
            )}
            <Button variant="outline" onClick={signOut}>
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Welcome</CardTitle>
              <CardDescription>You are logged in as {user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is a protected dashboard page that is only accessible after authentication.</p>
              {isAdmin && <p className="mt-2 text-green-600 font-semibold">You have admin privileges.</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Background</CardTitle>
              <CardDescription>Move your mouse to see the effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p>The background gradient responds to your mouse movements across the screen.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Authentication</CardTitle>
              <CardDescription>Built with Supabase</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This project uses Supabase for authentication with a completely custom UI.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
