import { useCounter } from '../../hooks/useCounter'
import type { Stat } from '../../types'

interface Props {
  stat: Stat
}

export default function StatCard({ stat }: Props) {
  const { count, elRef } = useCounter(stat.target)

  return (
    <div className="stat-item">
      <i className={`${stat.icon} stat-icon`} />
      <div className="stat-value">
        <span className="stat-num" ref={elRef}>
          {count}
        </span>
        {stat.suffix && <span className="stat-plus">{stat.suffix}</span>}
      </div>
      <span className="stat-label">{stat.label}</span>
    </div>
  )
}
