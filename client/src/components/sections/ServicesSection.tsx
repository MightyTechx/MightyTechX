import Container from '@mui/material/Container'
import SectionHeader from '../common/SectionHeader'
import ServiceCard from '../cards/ServiceCard'
import ScrollIndicator from '../common/ScrollIndicator'
import { services } from '../../data/services'

export default function ServicesSection() {
  return (
    <section id="services" className="section">
      <Container>
        <SectionHeader
          tag="CORE SERVICES"
          title={<>What We <span className="gradient-text">Craft</span></>}
          description="From concept to launch, we deliver end-to-end solutions that move markets and minds."
        />
        <div className="services-grid">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i * 80} />
          ))}
        </div>
      </Container>
      <ScrollIndicator />
    </section>
  )
}
