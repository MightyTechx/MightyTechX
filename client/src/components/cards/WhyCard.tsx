import { useReveal } from '../../hooks/useReveal'
import type { WhyItem } from '../../types'

interface Props {
  item: WhyItem
  delay?: number
}

export default function WhyCard({ item, delay = 0 }: Props) {
  const ref = useReveal(delay)

  return (
    <div className="why-card reveal" ref={ref}>
      <i className={item.icon} />
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </div>
  )
}
