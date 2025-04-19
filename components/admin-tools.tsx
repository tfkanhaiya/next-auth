"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Create a Supabase client for server operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a singleton client
let supabaseInstance: ReturnType<typeof createClient> | null = null

const getSupabase = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

export function CreateAdminTool() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = getSupabase()

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      // 1. Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        setMessage({ type: "error", text: authError.message })
        return
      }

      if (!authData.user) {
        setMessage({ type: "error", text: "Failed to create user" })
        return
      }

      // 2. Set the user role to admin
      const { error: roleError } = await supabase
        .from("user_roles")
        .update({ role: "admin" })
        .eq("id", authData.user.id)

      if (roleError) {
        setMessage({ type: "error", text: `User created but failed to set admin role: ${roleError.message}` })
        return
      }

      setMessage({ type: "success", text: "Admin user created successfully! Check email for confirmation." })
      setEmail("")
      setPassword("")
    } catch (err) {
      console.error("Error creating admin:", err)
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Admin User</CardTitle>
        <CardDescription>Create a new user with admin privileges</CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <Alert variant={message.type === "success" ? "default" : "destructive"} className="mb-4">
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleCreateAdmin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Secure password"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Admin User"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
