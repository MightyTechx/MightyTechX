import Container from '@mui/material/Container'
import StatCard from '../common/StatCard'
import ScrollIndicator from '../common/ScrollIndicator'
import { stats } from '../../data/stats'

export default function HeroSection() {
  return (
    <section className="hero" id="home">
      <Container>
        <div className="hero-inner">
          <div className="quote-box">
            <p className="quote-text">
              "Innovation is the ability to see change as an opportunity — not a threat."
            </p>
            <span className="quote-author">— Mighty TechX Philosophy</span>
          </div>

          <h1 className="hero-title">Elevating Your Digital Vision.</h1>

          <p className="hero-sub">
            We build digital products, experiences, and strategies that push
            boundaries and define the future of business.
          </p>

          <div className="hero-actions">
            <a href="#services" className="btn-ghost btn-explore">
              Explore Services
            </a>
            <a href="#products" className="btn-ghost btn-products">
              View Products
            </a>
          </div>

          <div className="stats-row">
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </Container>
      <ScrollIndicator />
    </section>
  )
}
