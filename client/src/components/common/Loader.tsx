import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store'
import { hideSplash } from '../../store/slices/splashSlice'

export default function Loader() {
  const dispatch = useDispatch<AppDispatch>()
  const visible = useSelector((s: RootState) => s.splash.visible)

  useEffect(() => {
    const timer = setTimeout(() => dispatch(hideSplash()), 3000)
    return () => clearTimeout(timer)
  }, [dispatch])

  return (
    <div className={`splash${visible ? '' : ' hidden'}`} id="splash">
      <div className="splash-bg" />
      <div className="splash-content">
        <div className="splash-wordmark">
          <span className="splash-mighty">MIGHTY</span>
          <span className="splash-techx">
            TECHX<sup className="splash-star">✦</sup>
          </span>
        </div>
        <div className="splash-bar">
          <div className="splash-progress" />
        </div>
        <p className="splash-tagline">Clear Vision. Infinite Growth.</p>
      </div>
    </div>
  )
}
