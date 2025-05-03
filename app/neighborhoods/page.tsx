import { Neighborhood } from "@/app/types/neighborhood"

// Direct component without external content
export default function NeighborhoodsPage() {
  // Real neighborhood data for Kampala
  const neighborhoods: Neighborhood[] = [
    {
      id: "nakasero",
      name: "Nakasero",
      description: "Upscale neighborhood in central Kampala",
      image: "/images/04/WhatsApp Image 2025-04-09 at 11.37.58 AM (2).jpeg",
      properties: 28,
      averagePrice: 1200,
      stats: {
        safetyRating: 4.8,
        nearbyAmenities: [
          { name: "Nakasero Market", type: "Shopping", distance: 0.5 },
          { name: "Sheraton Kampala Hotel", type: "Hotel", distance: 0.8 }
        ],
        transportation: [
          { type: "Boda Boda", description: "Available 24/7" },
          { type: "Taxi", description: "Easy to find" }
        ],
        schoolsFacilities: [
          { name: "Kampala International School", type: "International School" },
          { name: "Nakasero Hospital", type: "Medical Facility" }
        ]
      }
    },
    {
      id: "kololo",
      name: "Kololo",
      description: "Premier residential area with diplomatic presence",
      image: "/images/04/WhatsApp Image 2025-04-09 at 11.37.58 AM (1).jpeg",
      properties: 35,
      averagePrice: 1500,
      stats: {
        safetyRating: 4.9,
        nearbyAmenities: [
          { name: "Acacia Mall", type: "Shopping", distance: 1.2 },
          { name: "Golf Course", type: "Recreation", distance: 0.5 }
        ],
        transportation: [
          { type: "Boda Boda", description: "Available 24/7" },
          { type: "Taxi", description: "Easy to find" }
        ],
        schoolsFacilities: [
          { name: "Ambrosoli International School", type: "International School" },
          { name: "Case Hospital", type: "Medical Facility" }
        ]
      }
    },
    {
      id: "bugolobi",
      name: "Bugolobi",
      description: "Modern residential area with growing popularity",
      image: "/images/04/WhatsApp Image 2025-04-09 at 11.37.58 AM.jpeg",
      properties: 42,
      averagePrice: 950,
      stats: {
        safetyRating: 4.6,
        nearbyAmenities: [
          { name: "Village Mall", type: "Shopping", distance: 0.3 },
          { name: "Bugolobi Market", type: "Shopping", distance: 0.7 }
        ],
        transportation: [
          { type: "Boda Boda", description: "Available 24/7" },
          { type: "Taxi", description: "Regular routes" }
        ],
        schoolsFacilities: [
          { name: "Kampala Parents School", type: "Primary School" },
          { name: "International Hospital Kampala", type: "Medical Facility" }
        ]
      }
    },
    {
      id: "ntinda",
      name: "Ntinda",
      description: "Vibrant residential and commercial neighborhood",
      image: "/images/04/WhatsApp Image 2025-04-09 at 11.37.59 AM.jpeg",
      properties: 56,
      averagePrice: 850,
      stats: {
        safetyRating: 4.4,
        nearbyAmenities: [
          { name: "Ntinda Shopping Complex", type: "Shopping", distance: 0.2 },
          { name: "Kampala Northern Bypass", type: "Transportation", distance: 1.5 }
        ],
        transportation: [
          { type: "Boda Boda", description: "Available 24/7" },
          { type: "Matatu", description: "Frequent service" }
        ],
        schoolsFacilities: [
          { name: "St. Mary's College Kisubi", type: "Secondary School" },
          { name: "AAR Health Services", type: "Medical Facility" }
        ]
      }
    },
    {
      id: "muyenga",
      name: "Muyenga",
      description: "Hillside neighborhood with panoramic views",
      image: "/images/04/WhatsApp Image 2025-04-09 at 11.38.09 AM.jpeg",
      properties: 32,
      averagePrice: 1100,
      stats: {
        safetyRating: 4.7,
        nearbyAmenities: [
          { name: "Quality Shopping Village", type: "Shopping", distance: 0.9 },
          { name: "Tank Hill", type: "Landmark", distance: 0.4 }
        ],
        transportation: [
          { type: "Boda Boda", description: "Available 24/7" },
          { type: "Taxi", description: "Regular service" }
        ],
        schoolsFacilities: [
          { name: "Kampala International University", type: "University" },
          { name: "Muyenga Hospital", type: "Medical Facility" }
        ]
      }
    },
    {
      id: "naguru",
      name: "Naguru",
      description: "Developing area with new residential complexes",
      image: "/images/04/WhatsApp Image 2025-04-09 at 11.37.58 AM (2).jpeg",
      properties: 23,
      averagePrice: 920,
      stats: {
        safetyRating: 4.5,
        nearbyAmenities: [
          { name: "Metroplex Shopping Mall", type: "Shopping", distance: 1.0 },
          { name: "Naguru Hospital", type: "Medical", distance: 0.5 }
        ],
        transportation: [
          { type: "Boda Boda", description: "Available 24/7" },
          { type: "Taxi", description: "Regular routes" }
        ],
        schoolsFacilities: [
          { name: "Kampala High School", type: "Secondary School" },
          { name: "Naguru Referral Hospital", type: "Medical Facility" }
        ]
      }
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="An Jia You Xuan" className="h-10 w-auto" />
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="/properties" className="text-sm font-medium hover:text-rose-500 transition-colors">
              Properties
            </a>
            <a href="/neighborhoods" className="text-sm font-medium text-rose-500">
              Neighborhoods
            </a>
            <a href="/about" className="text-sm font-medium hover:text-rose-500 transition-colors">
              About
            </a>
          </div>
          <div className="flex items-center gap-4">
            {/* Removed list property and sign in buttons */}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-rose-50 py-10 md:py-16">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Discover Kampala's Neighborhoods
              </h1>
              <p className="mt-4 text-neutral-600">
                Explore the diverse neighborhoods of Kampala and find the perfect area for your next home.
              </p>
            </div>
          </div>
        </section>
        <section className="py-10">
          <div className="container">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {neighborhoods.map((neighborhood) => (
                <div key={neighborhood.id} className="overflow-hidden border-0 shadow-lg rounded-xl bg-white">
                  <div className="aspect-[16/9] relative">
                    <img
                      src={neighborhood.image || "/placeholder.svg"}
                      alt={neighborhood.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">{neighborhood.name}</h3>
                      <p className="text-sm text-white/80">{neighborhood.properties} properties</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-500">Average Price</span>
                      <span className="font-semibold">${neighborhood.averagePrice}/mo</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-neutral-500">Safety Rating</span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= neighborhood.stats.safetyRating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4">
                      {neighborhood.description}
                    </p>
                    <a 
                      href={`/neighborhoods/${neighborhood.id}`} 
                      className="block w-full py-2 px-4 bg-rose-500 hover:bg-rose-600 text-white text-center font-medium rounded-md transition-colors"
                    >
                      View Properties
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-10 bg-neutral-50">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Find Your Perfect Location</h2>
                <p className="mt-4 text-neutral-600">
                  Not sure which neighborhood suits you best? Our local experts can help you find the perfect location based on your preferences and budget.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center rounded-md bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600"
                  >
                    Contact an Expert
                  </a>
                  <a 
                    href="#" 
                    className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-50"
                  >
                    Compare Neighborhoods
                  </a>
                </div>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src="/images/04/WhatsApp Image 2025-04-09 at 11.37.58 AM (2).jpeg"
                  alt="Kampala skyline"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 md:py-16 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div className="max-w-xs">
              <div className="inline-block mb-4">
                <img src="/logo.png" alt="An Jia You Xuan" className="h-10 w-auto" />
              </div>
              <p className="text-sm text-neutral-600 mb-4">
                An Jia You Xuan is your trusted platform for finding the perfect rental property in Kampala, connecting
                tenants with quality homes and landlords with reliable tenants.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div>
                <h3 className="font-semibold mb-4">An Jia You Xuan</h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  <li>
                    <div className="cursor-not-allowed text-neutral-400">
                      About Us
                    </div>
                  </li>
                  <li>
                    <div className="cursor-not-allowed text-neutral-400">
                      How it Works
                    </div>
                  </li>
                  <li>
                    <div className="cursor-not-allowed text-neutral-400">
                      Careers
                    </div>
                  </li>
                  <li>
                    <div className="cursor-not-allowed text-neutral-400">
                      Press
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Discover</h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  <li>
                    <div className="cursor-not-allowed text-neutral-400">
                      Properties
                    </div>
                  </li>
                  <li>
                    <div className="cursor-not-allowed text-neutral-400">
                      Neighborhoods
                    </div>
                  </li>
                  <li>
                    <div className="cursor-not-allowed text-neutral-400">
                      Moving Guide
                    </div>
                  </li>
                  <li>
                    <div className="cursor-not-allowed text-neutral-400">
                      Kampala Living
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  <li>
                    <div className="cursor-not-allowed text-neutral-400">
                      Help Center
                    </div>
                  </li>
                  <li>
                    <div className="cursor-not-allowed text-neutral-400">
                      Safety Information
                    </div>
                  </li>
                  <li>
                    <div className="cursor-not-allowed text-neutral-400">
                      Contact Us
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">An Jia You Xuan</span>
            </div>
            <div className="text-sm text-neutral-500">© 2025 An Jia You Xuan. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
