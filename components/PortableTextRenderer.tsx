// components/PortableTextRenderer.tsx
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"

interface PortableTextRendererProps {
  content: any[] // Sanity Portable Text array
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <Image
          className="w-full h-auto rounded-lg my-4"
          src={urlFor(value).width(800).url() || "/placeholder.svg"}
          alt={value.alt || "Image"}
          width={800}
          height={450}
          sizes="(max-width: 768px) 100vw, 800px"
        />
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold my-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold my-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold my-4">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 md:text-lg leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
      return (
        <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </a>
      )
    },
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
}

export default function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content) {
    return null
  }
  return <PortableText value={content} components={components} />
}
