import { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'
import { useReveal } from '../../hooks/useReveal'
import type { Product } from '../../types'

interface Props {
  product: Product
  delay?: number
}

export default function ProductCard({ product, delay = 0 }: Props) {
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
    <div
      className="product-card reveal"
      ref={(el) => {
        (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (revealRef as React.MutableRefObject<HTMLDivElement | null>).current = el
      }}
    >
      <div className="pc-glow" />
      <div className="pc-header">
        <div className="pc-icon">
          <i className={product.icon} />
        </div>
        <span className="pc-badge">{product.badge}</span>
      </div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <div className="pc-footer">
        {product.tags.map((tag) => (
          <span className="pc-tag" key={tag}>{tag}</span>
        ))}
        <div className="pc-arrow">
          <i className="fas fa-arrow-up-right" />
        </div>
      </div>
    </div>
  )
}
