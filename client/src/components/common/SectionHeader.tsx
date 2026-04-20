import { useReveal } from '../../hooks/useReveal'

interface Props {
  tag: string
  title: React.ReactNode
  description?: string
}

export default function SectionHeader({ tag, title, description }: Props) {
  const ref = useReveal(0)

  return (
    <div className="section-header reveal" ref={ref}>
      <span className="section-tag">{tag}</span>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </div>
  )
}
