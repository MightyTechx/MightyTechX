import Container from '@mui/material/Container'
import SectionHeader from '../common/SectionHeader'
import WhyCard from '../cards/WhyCard'
import ScrollIndicator from '../common/ScrollIndicator'
import { whyItems } from '../../data/why'

export default function WhySection() {
  return (
    <section className="why-section section">
      <Container>
        <SectionHeader
          tag="WHY MIGHTY TECHX"
          title={<>Built Different, <span className="gradient-text">By Design.</span></>}
        />
        <div className="why-grid">
          {whyItems.map((item, i) => (
            <WhyCard key={item.id} item={item} delay={i * 80} />
          ))}
        </div>
      </Container>
      <ScrollIndicator />
    </section>
  )
}
