"use client"

import type React from "react"

import { useState } from "react"
import { useStore } from "@/stores/useStore"
import { Send } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function ContactForm() {
  const { contactFormData, setContactFormData, resetContactForm } = useStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    resetContactForm()

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactFormData({ [e.target.name]: e.target.value })
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-green-600 mb-4">
          <Send className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
        <p className="text-green-600">We&apos;ll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-white mb-2 block">
          Your name*
        </Label>
        <input
          type="text"
          id="name"
          name="name"
          value={contactFormData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white text-gray-900 border-0 rounded-md focus:ring-2 focus:ring-orange-500 transition-colors"
          placeholder="Your full name"
        />
      </div>

      <div>
        <Label htmlFor="email" className="text-white mb-2 block">
          Your email*
        </Label>
        <input
          type="email"
          id="email"
          name="email"
          value={contactFormData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white text-gray-900 border-0 rounded-md focus:ring-2 focus:ring-orange-500 transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <Label htmlFor="phone" className="text-white mb-2 block">
          Your phone number*
        </Label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={contactFormData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white text-gray-900 border-0 rounded-md focus:ring-2 focus:ring-orange-500 transition-colors"
          placeholder="+44 (0) 20 1234 5678"
        />
      </div>

      <div>
        <Label htmlFor="subject" className="text-white mb-2 block">
          How can we help?*
        </Label>
        <select
          id="subject"
          name="subject"
          value={contactFormData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white text-gray-900 border-0 rounded-md focus:ring-2 focus:ring-orange-500 transition-colors font-sans"
        >
          <option value="">Enquiry type</option>
          <option value="personal">Personal Legal Advice</option>
          <option value="business">Business Legal Advice</option>
          <option value="property">Property Law</option>
          <option value="family">Family Law</option>
          <option value="immigration">Immigration Law</option>
          <option value="employment">Employment Matters</option>
          <option value="wills-probate">Wills and Probate</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <Label htmlFor="message" className="text-white mb-2 block">
          Message
        </Label>
        <textarea
          id="message"
          name="message"
          value={contactFormData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-white text-gray-900 border-0 rounded-md focus:ring-2 focus:ring-orange-500 transition-colors"
          placeholder="Please describe your legal matter or inquiry..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gold-600 hover:bg-gold-700 disabled:bg-gold-400 text-white font-semibold py-3 rounded-md transition-colors duration-200 flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Sending...
          </>
        ) : (
          <>
            Send
            <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </button>

      <div className="pt-4 border-t border-slate-600">
        <p className="text-xs text-slate-400 leading-relaxed">
          This data will only be used by Irwin Mitchell for processing your enquiry and will not be shared with any
          third parties. For more information about how we use your data, please see our{" "}
          <a href="#" className="text-slate-300 underline hover:text-white">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  )
}
