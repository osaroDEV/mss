import { create } from 'zustand'

interface AppState {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  
  contactFormData: {
    name: string
    email: string
    phone: string
    subject: string
    message: string
  }
  setContactFormData: (data: Partial<AppState['contactFormData']>) => void
  resetContactForm: () => void
}

const initialContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
}

export const useStore = create<AppState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  
  contactFormData: initialContactForm,
  setContactFormData: (data) => set((state) => ({
    contactFormData: { ...state.contactFormData, ...data }
  })),
  resetContactForm: () => set({ contactFormData: initialContactForm }),
}))