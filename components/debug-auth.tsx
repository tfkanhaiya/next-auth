"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DebugAuth() {
  const { user, loading, refreshUser } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshUser()
    setIsRefreshing(false)
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Auth Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Loading:</strong> {loading ? "True" : "False"}
          </p>
          <p>
            <strong>User:</strong> {user ? "Authenticated" : "Not authenticated"}
          </p>
          {user && (
            <>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
            </>
          )}
          <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" size="sm">
            {isRefreshing ? "Refreshing..." : "Refresh Auth State"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
