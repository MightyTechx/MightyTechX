import Container from '@mui/material/Container'
import RevealWrapper from '../common/RevealWrapper'
import ScrollIndicator from '../common/ScrollIndicator'

export default function AboutSection() {
  return (
    <section id="about" className="about-strip">
      <Container>
        <div className="about-grid">
          <RevealWrapper>
            <div className="about-text">
              <span className="section-tag">WHO WE ARE</span>
              <h2 className="section-title">
                We Are <span className="gradient-text">Mighty TechX</span>
              </h2>
              <p>
                A bold technology company born in Hyderabad, India, with a global
                mindset. We fuse design thinking, engineering precision, and
                strategic innovation to transform businesses of every scale — from
                ambitious startups to established enterprises.
              </p>
              <p>
                Our team believes technology should feel human, powerful, and
                inevitable. Every line of code, every pixel, every strategy is
                crafted with purpose.
              </p>
              <div className="about-tags">
                <span>Design-Led</span>
                <span>Tech-Driven</span>
                <span>Results-Focused</span>
                <span>Future-Ready</span>
              </div>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={150}>
            <div className="about-visual">
              <div className="visual-card">
                <i className="fas fa-rocket vc-icon" />
                <h3>Our Mission</h3>
                <p>
                  To democratize world-class technology for every business that
                  dares to dream bigger.
                </p>
              </div>
              <div className="visual-card accent-card">
                <i className="fas fa-eye vc-icon" />
                <h3>Our Vision</h3>
                <p>
                  A world where innovation is accessible, measurable, and
                  unstoppable — powered by Mighty TechX.
                </p>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </Container>
      <ScrollIndicator />
    </section>
  )
}
