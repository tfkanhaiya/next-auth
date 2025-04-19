import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InteractiveBackground } from "@/components/interactive-background"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <InteractiveBackground />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Next.js Authentication</h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-prose">
          A custom authentication system with an interactive background gradient that responds to mouse movements.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/interactive">Interactive Background Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
