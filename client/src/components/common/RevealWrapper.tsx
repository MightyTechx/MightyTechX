import { useReveal } from '../../hooks/useReveal'

interface Props {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function RevealWrapper({ children, delay = 0, className = '' }: Props) {
  const ref = useReveal(delay)

  return (
    <div className={`reveal ${className}`} ref={ref}>
      {children}
    </div>
  )
}
