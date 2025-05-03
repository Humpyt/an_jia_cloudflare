import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Footer } from "@/components/footer"
import { NavLinks } from "@/components/nav-links"
import { AuthButtons } from "@/components/auth-buttons"
import { PropertiesContent } from "@/components/properties-content"
// Import the WordPress properties action instead of the mock data one
import { getPropertiesWithFilters } from "@/app/actions/wordpress-properties"

export default async function PropertiesPage(props: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { searchParams } = props

  // Wait for searchParams to be ready
  const searchParamsReady = await Promise.resolve(searchParams)

  // Sanitize searchParams to only include the values we need
  const params = {
    page: searchParamsReady?.page?.toString(),
    location: searchParamsReady?.location?.toString(),
    minPrice: searchParamsReady?.minPrice?.toString(),
    maxPrice: searchParamsReady?.maxPrice?.toString(),
    bedrooms: searchParamsReady?.bedrooms?.toString(),
    bathrooms: searchParamsReady?.bathrooms?.toString(),
    propertyType: searchParamsReady?.propertyType?.toString(),
    moveInDate: searchParamsReady?.moveInDate?.toString(),
    occupants: searchParamsReady?.occupants?.toString(),
    amenities: searchParamsReady?.amenities
  }

  // Parse filters
  const page = params?.page ? Number.parseInt(params.page) : 1
  const limit = 12
  const offset = (page - 1) * limit

  const filters = {
    location: params?.location || undefined,
    minPrice: params?.minPrice ? Number.parseInt(params.minPrice) : undefined,
    maxPrice: params?.maxPrice ? Number.parseInt(params.maxPrice) : undefined,
    bedrooms: params?.bedrooms && params.bedrooms !== 'any' ? Number.parseInt(params.bedrooms) : undefined,
    bathrooms: params?.bathrooms && params.bathrooms !== 'any' ? Number.parseInt(params.bathrooms) : undefined,
    amenities: params?.amenities
      ? Array.isArray(params.amenities)
        ? params.amenities
        : [params.amenities]
      : undefined
  }

  // Fetch properties with filters
  let propertiesResult = {
    properties: [],
    pagination: {
      total: 0,
      totalPages: 0,
      currentPage: page,
      perPage: limit,
      offset: offset
    }
  };
  let error = null;

  try {
    console.log('Properties page: Fetching properties with filters');
    propertiesResult = await getPropertiesWithFilters({
      limit,
      offset,
      filters: {
        location: filters.location,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
        amenities: filters.amenities,
      },
    });
    console.log(`Properties page: Fetched ${propertiesResult.properties.length} properties. Total: ${propertiesResult.pagination.total}`);
  } catch (err: any) {
    console.error('Error in properties page:', err);
    error = err.message || 'Failed to fetch properties';
  }

  // Format data to match what PropertiesContent expects
  const propertiesData = {
    data: propertiesResult.properties || [],
    pagination: propertiesResult.pagination,
    error
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="An Jia You Xuan" width={150} height={50} priority className="h-10 w-auto" />
          </Link>
          <NavLinks />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <AuthButtons />
          </div>
        </div>
      </header>

      <PropertiesContent initialProperties={propertiesData} searchParams={params} />

      <Footer />
    </div>
  )
}
