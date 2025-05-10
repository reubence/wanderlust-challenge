import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Mic } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Wanderlust Search</h1>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Travel Search</CardTitle>
            <CardDescription>Find your next adventure with our intelligent search</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="Search destinations..." />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">Try voice search or explore trending destinations</p>
            <Link href="/api/ping" className="text-sm text-blue-500 hover:underline">
              API Status
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
