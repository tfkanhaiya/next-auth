"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a singleton client to prevent multiple instances
let supabaseInstance: ReturnType<typeof createClient> | null = null

const getSupabase = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: "supabase-auth",
      },
    })
  }
  return supabaseInstance
}

type UserRole = "user" | "admin"

type User = {
  id: string
  email: string
  role: UserRole
}

type AuthContextType = {
  user: User | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  makeAdmin: (userId: string) => Promise<{ error: any }>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = getSupabase()

  // Function to fetch user role from the database
  const fetchUserRole = async (userId: string): Promise<UserRole> => {
    try {
      const { data, error } = await supabase.from("user_roles").select("role").eq("id", userId).single()

      if (error) {
        console.error("Error fetching user role:", error)
        return "user"
      }

      return (data?.role || "user") as UserRole
    } catch (error) {
      console.error("Error in fetchUserRole:", error)
      return "user"
    }
  }

  // Function to refresh user data
  const refreshUser = async () => {
    try {
      setLoading(true)
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        const role = await fetchUserRole(session.user.id)

        setUser({
          id: session.user.id,
          email: session.user.email || "",
          role: role,
        })
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Error refreshing user:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        await refreshUser()
      } catch (error) {
        console.error("Error checking session:", error)
        setUser(null)
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)

      if (session) {
        const role = await fetchUserRole(session.user.id)

        setUser({
          id: session.user.id,
          email: session.user.email || "",
          role: role,
        })
      } else {
        setUser(null)
      }

      setLoading(false)
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        console.error("Sign in error:", error)
        return { error }
      }

      if (data.user) {
        const role = await fetchUserRole(data.user.id)

        setUser({
          id: data.user.id,
          email: data.user.email || "",
          role: role,
        })
      }

      return { error: null }
    } catch (error: any) {
      console.error("Error in signIn:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      return { error }
    } catch (error: any) {
      console.error("Error in signUp:", error)
      return { error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/login")
  }

  // Function to make a user an admin
  const makeAdmin = async (userId: string) => {
    try {
      const { error } = await supabase.from("user_roles").update({ role: "admin" }).eq("id", userId)

      return { error }
    } catch (error: any) {
      console.error("Error in makeAdmin:", error)
      return { error }
    }
  }

  const value = {
    user,
    loading,
    isAdmin: user?.role === "admin",
    signIn,
    signUp,
    signOut,
    makeAdmin,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
