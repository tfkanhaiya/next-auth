"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveBackground } from "@/components/interactive-background"
import { Slider } from "@/components/ui/slider"

export default function InteractivePage() {
  const [speed, setSpeed] = useState(50)
  const [intensity, setIntensity] = useState(50)

  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Interactive Background Demo</h1>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Background</CardTitle>
              <CardDescription>
                Move your mouse or touch the screen to see the gradient follow your movements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Animation Speed</span>
                  <span>{speed}%</span>
                </div>
                <Slider value={[speed]} min={10} max={100} step={1} onValueChange={(value) => setSpeed(value[0])} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Effect Intensity</span>
                  <span>{intensity}%</span>
                </div>
                <Slider
                  value={[intensity]}
                  min={10}
                  max={100}
                  step={1}
                  onValueChange={(value) => setIntensity(value[0])}
                />
              </div>

              <p className="text-sm text-muted-foreground">
                This interactive background is implemented using CSS gradients and JavaScript to track mouse/touch
                position.
              </p>

              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link href="/login">Try Login</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/signup">Try Signup</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
