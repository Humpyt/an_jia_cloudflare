"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-switcher"

interface Property {
  id: string
  title: string
  slug: string
  featured_image: string | null
  images: string[]
  price: string
  bedrooms: string
  bathrooms: string
  square_footage: string
  is_featured: boolean
  isPremium: boolean
  location: string
  paymentTerms: string
  neighborhoods: Array<{
    id: number
    name: string
    slug: string
  }>
  property_types: Array<{
    id: number
    name: string
    slug: string
  }>
  price_ranges: Array<{
    id: number
    name: string
    slug: string
  }>
  excerpt: string
}

export function FeaturedProperties() {
  const { translate } = useLanguage()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/anjia/v1/featured-properties`)
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        // Mark all featured properties as premium
        const propertiesWithPremium = data.map(property => ({
          ...property,
          isPremium: true
        }))
        setProperties(propertiesWithPremium)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load properties')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProperties()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Properties</h2>
            <p className="text-neutral-500">Discover our selection of premium properties in Kampala</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Properties</h2>
            <p className="text-neutral-500">Discover our selection of premium properties in Kampala</p>
          </div>
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error}</div>
        </div>
      </section>
    )
  }

  if (properties.length === 0) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Properties</h2>
            <p className="text-neutral-500">Discover our selection of premium properties in Kampala</p>
          </div>
          <div className="text-center text-gray-500 py-8">{translate("no_featured_properties")}</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Properties</h2>
          <p className="text-neutral-500">Discover our selection of premium properties in Kampala</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {properties.map((property) => (
            <Card key={property.id} className="group overflow-hidden border rounded-lg shadow-sm hover:shadow-md">
              <div className="relative aspect-[4/3]">
                <Link href={`/properties/${property.id}`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={property.featured_image || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full shadow-sm"
                  onClick={() => toggleFavorite(property.id)}
                >
                  <Heart className={`h-5 w-5 ${favorites.includes(property.id) ? "fill-rose-500 text-rose-500" : ""}`} />
                  <span className="sr-only">Add to favorites</span>
                </Button>
                {property.isPremium && (
                  <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600 text-white border-0 px-3 py-1 rounded-sm font-medium">
                    Premium
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <Link href={`/properties/${property.id}`} className="hover:underline">
                  <h3 className="font-medium text-base line-clamp-1">{property.title}</h3>
                </Link>
                <p className="text-sm text-neutral-500 mt-1">{property.location}</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span>
                    {property.bedrooms} {parseInt(property.bedrooms) === 1 ? "Bedroom" : "Bedrooms"}
                  </span>
                  <span>•</span>
                  <span>
                    {property.bathrooms} {parseFloat(property.bathrooms) === 1 ? "Bathroom" : "Bathrooms"}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">${property.price}</span>
                  {property.paymentTerms && (
                    <span className="text-neutral-500 text-sm"> /{property.paymentTerms.toLowerCase()}</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Link href="/properties">
              View All Properties
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
