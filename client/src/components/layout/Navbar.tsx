import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store'
import { toggleMobileMenu, setScrolled } from '../../store/slices/navSlice'

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>()
  const { mobileMenuOpen, scrolled } = useSelector((s: RootState) => s.nav)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        dispatch(setScrolled(window.scrollY > 60))
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dispatch])

  return (
    <header>
      <nav
        className="nav-bar"
        style={{ paddingTop: scrolled ? '20px' : undefined }}
      >
        <div className="logo">
          <div className="logo-wordmark">
            <span className="logo-mighty">MIGHTY</span>
            <span className="logo-techx">
              TECHX<sup className="logo-sep">✦</sup>
            </span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </div>

        <div
          className={`hamburger${mobileMenuOpen ? ' active' : ''}`}
          id="hamburger"
          onClick={() => dispatch(toggleMobileMenu())}
          role="button"
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </div>
      </nav>
    </header>
  )
}
