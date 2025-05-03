"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Building, Home, Landmark, Hotel, Store } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useLanguage } from "@/components/language-switcher"
import { useToast } from "@/components/ui/use-toast"

// Define categories with icons and labels
const categoryButtons = [
  {
    id: "apartment",
    name: "apartment",
    icon: Building,
    count: 12 // This would ideally come from an API call
  },
  {
    id: "house",
    name: "house",
    icon: Home,
    count: 8
  },
  {
    id: "land",
    name: "land",
    icon: Landmark,
    count: 5
  },
  {
    id: "hotel",
    name: "hotel",
    icon: Hotel,
    count: 3
  },
  {
    id: "commercial",
    name: "commercial",
    icon: Store,
    count: 6
  }
]

export function PropertyCategories() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const { translate } = useLanguage()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Set active category based on URL parameters on load
  useEffect(() => {
    const propertyType = searchParams.get('propertyType')
    if (propertyType) {
      setActiveCategory(propertyType)
    }
  }, [searchParams])

  // Handle category selection with router instead of direct window.location change
  const handleCategorySelect = async (categoryId) => {
    if (categoryId === activeCategory) return

    setIsLoading(true)
    try {
      setActiveCategory(categoryId)

      // Create a new URLSearchParams object from the current URL
      const params = new URLSearchParams(searchParams.toString())

      if (categoryId === "all") {
        params.delete('propertyType')
      } else {
        params.set('propertyType', categoryId)
      }

      // Navigate to properties page with the category filter
      router.push(`/properties?${params.toString()}`)

      // Show success toast
      toast({
        title: translate("category_selected"),
        description: translate("showing_properties_in_category", { category: translate(categoryId === "all" ? "all" : categoryId) }),
        duration: 2000
      })
    } catch (error) {
      console.error("Category selection error:", error)
      toast({
        title: translate("selection_error"),
        description: translate("please_try_again"),
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-10 bg-neutral-50">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8 text-center">Browse By Category</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 cursor-pointer",
                activeCategory === "all"
                  ? "bg-rose-500 text-white shadow-md"
                  : "bg-white border border-neutral-200 hover:border-rose-300 hover:bg-rose-50 shadow-sm",
                isLoading && "opacity-70 pointer-events-none"
              )}
              onClick={() => handleCategorySelect("all")}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-opacity-20 mb-3">
                {isLoading && activeCategory === "all" ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : activeCategory === "all" ? (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                )}
              </div>
              <span className={cn(
                "font-medium",
                activeCategory === "all" ? "text-white" : "text-neutral-800"
              )}>{translate("all")}</span>
              <span className="text-xs mt-1 opacity-70">
                {categoryButtons.reduce((total, cat) => total + cat.count, 0)}
              </span>
            </div>

            {categoryButtons.map((category) => (
              <div
                key={category.id}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 cursor-pointer",
                  activeCategory === category.id
                    ? "bg-rose-500 text-white shadow-md"
                    : "bg-white border border-neutral-200 hover:border-rose-300 hover:bg-rose-50 shadow-sm",
                  isLoading && "opacity-70 pointer-events-none"
                )}
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-full mb-3",
                  activeCategory === category.id ? "bg-white bg-opacity-20" : "bg-rose-50"
                )}>
                  {isLoading && activeCategory === category.id ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <category.icon className={cn(
                      "h-6 w-6",
                      activeCategory === category.id ? "text-white" : "text-rose-500"
                    )} />
                  )}
                </div>
                <span className={cn(
                  "font-medium capitalize",
                  activeCategory === category.id ? "text-white" : "text-neutral-800"
                )}>{translate(category.name)}</span>
                <span className="text-xs mt-1 opacity-70">{category.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
