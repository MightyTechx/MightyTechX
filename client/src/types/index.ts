export interface Service {
  id: number
  number: string
  icon: string
  title: string
  description: string
  tags: string[]
}

export interface Product {
  id: number
  icon: string
  badge: string
  title: string
  description: string
  tags: string[]
}

export interface Stat {
  id: number
  icon: string
  target: number
  suffix: string
  label: string
}

export interface WhyItem {
  id: number
  icon: string
  title: string
  description: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}
