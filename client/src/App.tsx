import { lazy, Suspense, useEffect } from 'react'
import './styles/globals.css'
import Loader from './components/common/Loader'
import PageWrapper from './components/layout/PageWrapper'
import Navbar from './components/layout/Navbar'
import MobileMenu from './components/layout/MobileMenu'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'

// Below-fold sections are lazy-loaded — not part of the initial JS bundle
const AboutSection    = lazy(() => import('./components/sections/AboutSection'))
const ServicesSection = lazy(() => import('./components/sections/ServicesSection'))
const ProductsSection = lazy(() => import('./components/sections/ProductsSection'))
const WhySection      = lazy(() => import('./components/sections/WhySection'))
const ContactSection  = lazy(() => import('./components/sections/ContactSection'))

const API = import.meta.env.VITE_API_URL ?? ''

export default function App() {
  useEffect(() => {
    fetch(`${API}/api/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referrer: document.referrer }),
    }).catch(() => {})
  }, [])

  return (
    <PageWrapper>
      <Loader />
      <Navbar />
      <MobileMenu />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <AboutSection />
          <ServicesSection />
          <ProductsSection />
          <WhySection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </PageWrapper>
  )
}
