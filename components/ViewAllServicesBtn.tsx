"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"

export default function ViewAllServicesButton() {
  const pathname = usePathname()

  // Only show the button on the homepage
  if (pathname !== "/") {
    return null
  }

  return (
    <div className="text-center mt-12">
      <Link
        href="/services"
        className="bg-primary-800 hover:bg-primary-900 text-white px-8 py-3 rounded-md font-semibold inline-flex items-center transition-colors duration-200"
      >
        View All Services
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  )
}
