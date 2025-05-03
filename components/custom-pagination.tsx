"use client"

import React, { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { useLanguage } from '@/components/language-switcher'

interface CustomPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function CustomPagination({ currentPage, totalPages, onPageChange }: CustomPaginationProps) {
  const { translate } = useLanguage()
  const [isNavigating, setIsNavigating] = useState(false)

  // Handle page change with loading state
  const handlePageChange = (page: number) => {
    if (isNavigating) return
    setIsNavigating(true)
    onPageChange(page)
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []

    // For small number of pages, show all
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
      return pageNumbers
    }

    // Always show first page
    pageNumbers.push(1)

    // Calculate range around current page
    let rangeStart = Math.max(2, currentPage - 1)
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1)

    // Adjust range to show more pages around current
    if (currentPage <= 3) {
      rangeEnd = Math.min(5, totalPages - 1)
    } else if (currentPage >= totalPages - 2) {
      rangeStart = Math.max(totalPages - 4, 2)
    }

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pageNumbers.push('ellipsis-start')
    }

    // Add page numbers in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pageNumbers.push('ellipsis-end')
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <Pagination className="my-8">
      <PaginationContent className={isNavigating ? "opacity-70 pointer-events-none" : ""}>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(currentPage - 1)
              }}
              aria-label={translate("previous_page")}
            />
          </PaginationItem>
        )}

        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <span className="flex h-9 w-9 items-center justify-center">...</span>
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage !== page) {
                    handlePageChange(page as number)
                  }
                }}
                aria-label={`${translate("page")} ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {isNavigating && currentPage !== page && page === (currentPage + 1 || currentPage - 1) ? (
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  page
                )}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(currentPage + 1)
              }}
              aria-label={translate("next_page")}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
