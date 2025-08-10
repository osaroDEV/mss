"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface GoogleAnalyticsProps {
  googleAnalyticsId?: string | null
  googleTagManagerId?: string | null
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export default function GoogleAnalytics({ googleAnalyticsId, googleTagManagerId }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Google Analytics (gtag.js)
    if (googleAnalyticsId) {
      const handleRouteChange = () => {
        if (window.gtag) {
          window.gtag("config", googleAnalyticsId, {
            page_path: pathname + searchParams.toString(),
          })
        }
      }

      // Load gtag.js script
      const scriptGA = document.createElement("script")
      scriptGA.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
      scriptGA.async = true
      document.head.appendChild(scriptGA)

      scriptGA.onload = () => {
        window.dataLayer = window.dataLayer || []
        function gtag(...args: any[]) {
          (window.dataLayer ??= []).push(args)
        }
        window.gtag = gtag
        gtag("js", new Date())
        handleRouteChange() // Initial page view
      }

      // Listen for route changes
      window.addEventListener("popstate", handleRouteChange)
      return () => {
        window.removeEventListener("popstate", handleRouteChange)
        document.head.removeChild(scriptGA) // Clean up script on unmount
      }
    }
  }, [googleAnalyticsId, pathname, searchParams])

  useEffect(() => {
    // Google Tag Manager (GTM)
    if (googleTagManagerId) {
      // Load GTM script (head part)
      const scriptGTMHead = document.createElement("script")
      scriptGTMHead.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${googleTagManagerId}');
      `
      document.head.appendChild(scriptGTMHead)

      // Add GTM noscript iframe (body part - for users with JS disabled)
      const noscriptGTM = document.createElement("noscript")
      const iframeGTM = document.createElement("iframe")
      iframeGTM.src = `https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`
      iframeGTM.height = "0"
      iframeGTM.width = "0"
      iframeGTM.style.display = "none"
      iframeGTM.style.visibility = "hidden"
      noscriptGTM.appendChild(iframeGTM)
      document.body.prepend(noscriptGTM) // Prepend to body to be as high as possible

      return () => {
        document.head.removeChild(scriptGTMHead)
        document.body.removeChild(noscriptGTM)
      }
    }
  }, [googleTagManagerId])

  return null // This component doesn't render anything visible
}
