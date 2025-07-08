'use client'

import { useState } from 'react'
import { useStore } from '@/stores/useStore'
import { Send } from 'lucide-react'

export default function ContactForm() {
  const { contactFormData, setContactFormData, resetContactForm } = useStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={contactFormData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Your full name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactFormData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactFormData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="+44 (0) 20 1234 5678"
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={contactFormData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-sans"
          >
            <option value="">Select a subject</option>
            <option value="immigration-law">Immigration Law</option>
            <option value="business-migration">Business Migration</option>
            <option value="employment-matters">Employment Matters</option>
            <option value="family-law">Family Law</option>
            <option value="housing-landlord-tenenants">Housing Landlord and Tenants</option>
            <option value="wills-probate">Wills and Probate</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={contactFormData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="Please describe your legal matter or inquiry..."
        />
      </div>

      <div className="bg-neutral-50 rounded-lg p-4">
        <p className="text-sm text-neutral-600">
          By submitting this form, you agree that we may contact you regarding your inquiry. 
          All communications are confidential and subject to solicitor-client privilege.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gold-600 hover:bg-gold-700 disabled:bg-gold-400 text-white py-4 px-6 rounded-md font-semibold text-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </button>
    </form>
  )
}