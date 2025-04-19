"use client"

import { useEffect, useRef, useState } from "react"

export function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()

      // Calculate position relative to the container (0-1)
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      setMousePosition({ x, y })
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !e.touches[0]) return

      const rect = containerRef.current.getBoundingClientRect()

      // Calculate position relative to the container (0-1)
      const x = (e.touches[0].clientX - rect.left) / rect.width
      const y = (e.touches[0].clientY - rect.top) / rect.height

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  // Calculate gradient position based on mouse position
  const gradientX = mousePosition.x * 100
  const gradientY = mousePosition.y * 100

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(79, 70, 229, 0.8) 0%, rgba(59, 130, 246, 0.6) 30%, rgba(147, 51, 234, 0.4) 60%, rgba(0, 0, 0, 0) 100%)`,
      }}
    />
  )
}
