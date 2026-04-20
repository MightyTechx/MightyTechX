import { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'
import { useReveal } from '../../hooks/useReveal'
import type { Service } from '../../types'

interface Props {
  service: Service
  delay?: number
}

export default function ServiceCard({ service, delay = 0 }: Props) {
  const tiltRef = useRef<HTMLDivElement>(null)
  const revealRef = useReveal(delay)

  useEffect(() => {
    const el = tiltRef.current
    if (!el) return
    VanillaTilt.init(el, { max: 8, speed: 400, glare: true, 'max-glare': 0.08, scale: 1.02 })
    return () => {
      if ((el as HTMLElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt) {
        (el as HTMLElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt!.destroy()
      }
    }
  }, [])

  return (
    <div className="service-card reveal" ref={(el) => {
      (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      (revealRef as React.MutableRefObject<HTMLDivElement | null>).current = el
    }}>
      <div className="sc-number">{service.number}</div>
      <div className="sc-icon">
        <i className={service.icon} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className="sc-tags">
        {service.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="sc-arrow">
        <i className="fas fa-arrow-up-right" />
      </div>
    </div>
  )
}
