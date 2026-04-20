import './styles/globals.css'
import Loader from './components/common/Loader'
import PageWrapper from './components/layout/PageWrapper'
import Navbar from './components/layout/Navbar'
import MobileMenu from './components/layout/MobileMenu'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import ServicesSection from './components/sections/ServicesSection'
import ProductsSection from './components/sections/ProductsSection'
import WhySection from './components/sections/WhySection'
import ContactSection from './components/sections/ContactSection'

export default function App() {
  return (
    <PageWrapper>
      <Loader />
      <Navbar />
      <MobileMenu />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProductsSection />
        <WhySection />
        <ContactSection />
      </main>
      <Footer />
    </PageWrapper>
  )
}
