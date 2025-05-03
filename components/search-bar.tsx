"use client"

import { useState, FormEvent, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, MapPin, Search, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-switcher"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { translate } = useLanguage()

  // Initialize state from URL parameters if they exist
  const [location, setLocation] = useState("")
  const [date, setDate] = useState<Date | undefined>()
  const [guests, setGuests] = useState(1)
  const [isSearching, setIsSearching] = useState(false)

  // Load search parameters from URL on component mount
  useEffect(() => {
    const locationParam = searchParams.get("location")
    const moveInDateParam = searchParams.get("moveInDate")
    const occupantsParam = searchParams.get("occupants")

    if (locationParam) {
      setLocation(locationParam)
    }

    if (moveInDateParam) {
      try {
        const parsedDate = new Date(moveInDateParam)
        if (!isNaN(parsedDate.getTime())) {
          setDate(parsedDate)
        }
      } catch (error) {
        console.error("Error parsing date:", error)
      }
    }

    if (occupantsParam) {
      const parsedOccupants = parseInt(occupantsParam)
      if (!isNaN(parsedOccupants) && parsedOccupants > 0) {
        setGuests(parsedOccupants)
      }
    }
  }, [searchParams])

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    try {
      // Build query parameters
      const params = new URLSearchParams()

      if (location) {
        params.append("location", location)
      }

      if (date) {
        params.append("moveInDate", format(date, "yyyy-MM-dd"))
      }

      if (guests > 1) {
        params.append("occupants", guests.toString())
      }

      // Navigate to properties page with search parameters
      router.push(`/properties?${params.toString()}`)

      // Show success toast
      toast({
        title: translate("search_started"),
        description: translate("redirecting_to_results"),
        duration: 2000
      })
    } catch (error) {
      console.error("Search error:", error)
      toast({
        title: translate("search_error"),
        description: translate("please_try_again"),
        variant: "destructive"
      })
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-full p-2 shadow-lg flex flex-col md:flex-row">
      <div className="relative flex-1 min-w-0">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-neutral-400" />
        </div>
        <Input
          type="text"
          placeholder="Where are you looking?"
          className="h-12 pl-10 pr-4 rounded-full border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="border-l border-neutral-200 hidden md:block" />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "h-12 px-4 text-left font-normal flex justify-start items-center gap-2 rounded-full hover:bg-neutral-100",
              !date && "text-neutral-500",
            )}
          >
            <CalendarIcon className="h-5 w-5 text-neutral-400" />
            {date ? format(date, "PPP") : <span>Move-in date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>

      <div className="border-l border-neutral-200 hidden md:block" />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="h-12 px-4 text-left font-normal flex justify-start items-center gap-2 rounded-full hover:bg-neutral-100"
          >
            <Users className="h-5 w-5 text-neutral-400" />
            <span>
              {guests} {guests === 1 ? "person" : "people"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="guests">Number of occupants</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  disabled={guests <= 1}
                >
                  <span>-</span>
                </Button>
                <span className="w-8 text-center">{guests}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setGuests(guests + 1)}
                >
                  <span>+</span>
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Button
        type="submit"
        className="h-12 px-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white ml-2"
        disabled={isSearching}
      >
        {isSearching ? (
          <>
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin md:mr-2" />
            <span className="hidden md:inline">{translate("searching")}</span>
          </>
        ) : (
          <>
            <Search className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline">{translate("search")}</span>
          </>
        )}
      </Button>
    </form>
  )
}
