"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-switcher"

interface PropertyCardProps {
  property: any
  featured?: boolean
}

export function PropertyCard({ property, featured = false }: PropertyCardProps) {

  const { translate } = useLanguage()

  // Use the first image from the images array
  const imageUrl = property.images?.[0] || "/placeholder.svg"

  // Format price with thousand separator
  const formatPrice = (price: string, currency: string) => {
    const numericPrice = parseInt(price)
    if (currency === "UGX") {
      return `UGX ${numericPrice.toLocaleString()}`
    }
    return `$${numericPrice.toLocaleString()}`
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow will-change-transform">
      <div className="relative">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={property.title || "Property"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
        {property.isPremium && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white border-0">
            {featured ? "Premium" : "Premium"}
          </Badge>
        )}
        {property.propertyType && (
          <Badge className="absolute bottom-2 left-2 capitalize bg-white text-black">
            {property.propertyType}
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
            {property.bedrooms} {translate("bedroom")}{parseInt(property.bedrooms) !== 1 && 's'}
          </span>
          <span>•</span>
          <span>
            {property.bathrooms} {translate("bathroom")}{parseFloat(property.bathrooms) !== 1 && 's'}
          </span>
          {property.floor && (
            <>
              <span>•</span>
              <span>{property.floor} {translate('floor')}</span>
            </>
          )}
          {property.squareMeters && (
            <>
              <span>•</span>
              <span>{property.squareMeters} m²</span>
            </>
          )}
        </div>
        {/* Description Summary */}
        {property.descriptionSummary && (
          <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
            {property.descriptionSummary}
          </p>
        )}

        <div className="mt-3">
          <span className="font-semibold">{formatPrice(property.price, property.currency || 'USD')}</span>
          {property.paymentTerms && (
            <span className="text-neutral-500 text-sm"> /{property.paymentTerms.toLowerCase()}</span>
          )}
        </div>
        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity: string, index: number) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
