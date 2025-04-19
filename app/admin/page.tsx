"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveBackground } from "@/components/interactive-background"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminPage() {
  const { user, loading, isAdmin, signOut, makeAdmin } = useAuth()
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (!loading && user && !isAdmin) {
      router.push("/dashboard")
    }
  }, [user, loading, isAdmin, router])

  const handleMakeAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setMessage(null)

    try {
      const { error } = await makeAdmin(userId)

      if (error) {
        setMessage({ type: "error", text: error.message || "Failed to make user an admin" })
        return
      }

      setMessage({ type: "success", text: "User has been made an admin successfully" })
      setUserId("")
    } catch (err) {
      setMessage({ type: "error", text: "An unexpected error occurred" })
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={signOut}>
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Admin Controls</CardTitle>
              <CardDescription>You have admin privileges</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">You are logged in as {user.email} with admin role.</p>
              <p>Use this panel to manage your application.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Make User an Admin</CardTitle>
              <CardDescription>Enter a user ID to grant admin privileges</CardDescription>
            </CardHeader>
            <CardContent>
              {message && (
                <Alert variant={message.type === "success" ? "default" : "destructive"} className="mb-4">
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleMakeAdmin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-id">User ID</Label>
                  <Input
                    id="user-id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter user UUID"
                    required
                  />
                </div>
                <Button type="submit" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Make Admin"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
