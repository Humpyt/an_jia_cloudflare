"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { PropertyCard } from "@/components/property-card"
import { useLanguage } from "@/components/language-switcher"
import { Property } from "@/lib/property-data"
import { PropertyCategories } from "@/components/property-categories"
import { CustomPagination } from "@/components/custom-pagination"

export function PropertiesContent({
  initialProperties,
  searchParams
}: {
  initialProperties: {
    data: Property[],
    pagination: {
      total: number,
      totalPages: number,
      currentPage: number,
      perPage: number,
      offset: number
    },
    error: null
  },
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { translate } = useLanguage()
  const [properties, setProperties] = useState(initialProperties.data || [])
  const [pagination, setPagination] = useState(initialProperties.pagination)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get current page from pagination or search params
  const currentPage = pagination.currentPage || parseInt(searchParams?.page?.toString() || '1')

  // Form state
  const [filters, setFilters] = useState({
    minPrice: searchParams?.minPrice?.toString() || '',
    maxPrice: searchParams?.maxPrice?.toString() || '',
    bedrooms: searchParams?.bedrooms?.toString() || 'any',
    bathrooms: searchParams?.bathrooms?.toString() || 'any',
    propertyType: searchParams?.propertyType?.toString() || 'any',
    location: searchParams?.location?.toString() || '',
    moveInDate: searchParams?.moveInDate?.toString() || '',
    occupants: searchParams?.occupants?.toString() || '',
    amenities: Array.isArray(searchParams?.amenities) ? searchParams.amenities :
      (searchParams?.amenities ? [searchParams.amenities.toString()] : [])
  })

  return (
    <main className="flex-1">
      <section className="relative py-20 text-white">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/03/WhatsApp Image 2025-04-09 at 11.36.26 AM.jpeg"
            alt="Kampala Properties"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight mb-4 md:text-4xl">
              {translate("all_properties")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {translate("discover_best_properties")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">{translate("filter_properties")}</h2>
                  <form className="space-y-6" onSubmit={async (e) => {
                    e.preventDefault()
                    setLoading(true)
                    setError(null)

                    try {
                      // Start with current query params to preserve other parameters
                      const queryParams = new URLSearchParams(window.location.search)

                      // Reset to page 1 when applying new filters
                      queryParams.set('page', '1')

                      // Update or remove filter parameters
                      if (filters.location) {
                        queryParams.set('location', filters.location)
                      } else {
                        queryParams.delete('location')
                      }

                      if (filters.minPrice) {
                        queryParams.set('minPrice', filters.minPrice)
                      } else {
                        queryParams.delete('minPrice')
                      }

                      if (filters.maxPrice) {
                        queryParams.set('maxPrice', filters.maxPrice)
                      } else {
                        queryParams.delete('maxPrice')
                      }

                      if (filters.bedrooms !== 'any') {
                        queryParams.set('bedrooms', filters.bedrooms)
                      } else {
                        queryParams.delete('bedrooms')
                      }

                      if (filters.bathrooms !== 'any') {
                        queryParams.set('bathrooms', filters.bathrooms)
                      } else {
                        queryParams.delete('bathrooms')
                      }

                      if (filters.propertyType !== 'any') {
                        queryParams.set('propertyType', filters.propertyType)
                      } else {
                        queryParams.delete('propertyType')
                      }

                      if (filters.moveInDate) {
                        queryParams.set('moveInDate', filters.moveInDate)
                      } else {
                        queryParams.delete('moveInDate')
                      }

                      if (filters.occupants) {
                        queryParams.set('occupants', filters.occupants)
                      } else {
                        queryParams.delete('occupants')
                      }

                      // Remove all existing amenities and add the selected ones
                      queryParams.delete('amenities')
                      if (filters.amenities.length > 0) {
                        filters.amenities.forEach(amenity =>
                          queryParams.append('amenities', amenity)
                        )
                      }

                      // Use window.location to update URL with filters
                      window.location.href = `${window.location.pathname}?${queryParams.toString()}`
                    } catch (err: any) {
                      setError(err.message || 'Failed to apply filters')
                    } finally {
                      setLoading(false)
                    }
                  }}>
                    <div className="space-y-4">
                      <Label>{translate("location")}</Label>
                      <Input
                        id="location"
                        type="text"
                        placeholder="Enter location"
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>{translate("price_range")}</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="min-price" className="text-sm">
                            {translate("min_price")}
                          </Label>
                          <Input
                            id="min-price"
                            type="number"
                            placeholder="0"
                            value={filters.minPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="max-price" className="text-sm">
                            {translate("max_price")}
                          </Label>
                          <Input
                            id="max-price"
                            type="number"
                            placeholder="5000"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>{translate("bedrooms")}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label>{translate("bathrooms")}</Label>
                      <Select
                        value={filters.bathrooms}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, bathrooms: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>



                    <div className="space-y-4">
                      <Label>{translate("property_type")}</Label>
                      <Select value={filters.propertyType} onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">{translate("any")}</SelectItem>
                          <SelectItem value="apartment">{translate("apartment")}</SelectItem>
                          <SelectItem value="house">{translate("house")}</SelectItem>
                          <SelectItem value="land">{translate("land")}</SelectItem>
                          <SelectItem value="commercial">{translate("commercial")}</SelectItem>
                          <SelectItem value="hotel">{translate("hotel")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label>{translate("select_amenities")}</Label>
                      <div className="space-y-2">
                        {['wifi', 'parking', 'security', 'furnished', 'garden', 'gym', 'pool'].map((amenity) => (
                          <div key={amenity} className="flex items-center">
                            <input
                              type="checkbox"
                              id={amenity}
                              checked={filters.amenities.includes(amenity)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilters(prev => ({
                                    ...prev,
                                    amenities: [...prev.amenities, amenity]
                                  }))
                                } else {
                                  setFilters(prev => ({
                                    ...prev,
                                    amenities: prev.amenities.filter(a => a !== amenity)
                                  }))
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor={amenity} className="ml-2 text-sm capitalize">
                              {amenity}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Applying...' : translate("apply_filters")}
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => {
                          // Reset the form state
                          setFilters({
                            minPrice: '',
                            maxPrice: '',
                            bedrooms: 'any',
                            bathrooms: 'any',
                            propertyType: 'any',
                            location: '',
                            moveInDate: '',
                            occupants: '',
                            amenities: []
                          })

                          // Preserve only non-filter parameters like language
                          const currentParams = new URLSearchParams(window.location.search)
                          const preservedParams = new URLSearchParams()

                          // List of parameters to preserve (not filter-related)
                          const preserveList = ['lang']

                          preserveList.forEach(param => {
                            if (currentParams.has(param)) {
                              preservedParams.set(param, currentParams.get(param)!)
                            }
                          })

                          // Navigate to the properties page with only preserved parameters
                          const queryString = preservedParams.toString()
                          window.location.href = window.location.pathname + (queryString ? `?${queryString}` : '')
                        }}
                        disabled={loading}
                      >
                        {loading ? translate("resetting") : translate("reset_filters")}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <PropertyCategories />

              <div className="flex justify-between items-center mt-6">
                <p className="text-muted-foreground">
                  {pagination.total} {pagination.total === 1 ? translate("property") : translate("properties")}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{translate("sort_by")}:</span>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Newest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{translate("newest")}</SelectItem>
                      <SelectItem value="price-asc">{translate("price_low_high")}</SelectItem>
                      <SelectItem value="price-desc">{translate("price_high_low")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-xl font-semibold mb-2">{translate("no_properties_found")}</h3>
                  <p className="text-muted-foreground">{translate("try_different_filters")}</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 content-visibility-auto mb-12">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}

              {pagination.totalPages > 1 && (
                <div className="flex justify-center mb-16">
                  <CustomPagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={(page) => {
                      // Create URL with new page parameter
                      const params = new URLSearchParams(window.location.search);
                      params.set('page', page.toString());
                      window.location.href = `${window.location.pathname}?${params.toString()}`;
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
