import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store'
import { closeMobileMenu } from '../../store/slices/navSlice'

export default function MobileMenu() {
  const dispatch = useDispatch<AppDispatch>()
  const open = useSelector((s: RootState) => s.nav.mobileMenuOpen)

  const handleClick = () => dispatch(closeMobileMenu())

  return (
    <div className={`mobile-menu${open ? ' open' : ''}`} id="mobileMenu">
      <a href="#about"    className="mobile-link" onClick={handleClick}>About</a>
      <a href="#services" className="mobile-link" onClick={handleClick}>Services</a>
      <a href="#products" className="mobile-link" onClick={handleClick}>Products</a>
      <a href="#contact"  className="mobile-link" onClick={handleClick}>Contact</a>
    </div>
  )
}
