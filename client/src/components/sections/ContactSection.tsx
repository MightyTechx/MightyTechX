import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import SectionHeader from '../common/SectionHeader'
import RevealWrapper from '../common/RevealWrapper'
import { submitContact, resetContact } from '../../store/slices/contactSlice'
import type { RootState, AppDispatch } from '../../store'
import type { ContactFormData } from '../../types'

const SERVICE_OPTIONS = [
  { value: 'UI / UX Design',          icon: 'fas fa-bezier-curve' },
  { value: 'Motion & Animation',       icon: 'fas fa-film' },
  { value: 'Web Development',          icon: 'fas fa-code' },
  { value: 'Mobile App Development',   icon: 'fas fa-mobile-screen' },
  { value: 'Business Strategy',        icon: 'fas fa-chess-knight' },
  { value: 'HR Solutions',             icon: 'fas fa-users-gear' },
  { value: 'Product Development',      icon: 'fas fa-cubes' },
  { value: 'Other',                    icon: 'fas fa-ellipsis' },
]

function CustomSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  return (
    <div className={`custom-select${open ? ' open' : ''}`} ref={ref}>
      <div className="cs-trigger" onClick={() => setOpen(!open)}>
        <span className={`cs-value${value ? ' chosen' : ''}`}>
          {value || 'Select a service...'}
        </span>
        <i className="fas fa-chevron-down cs-arrow" />
      </div>
      <div className="cs-dropdown">
        {SERVICE_OPTIONS.map((opt) => (
          <div
            key={opt.value}
            className={`cs-option${value === opt.value ? ' active' : ''}`}
            onClick={() => { onChange(opt.value); setOpen(false) }}
          >
            <i className={opt.icon} />
            {opt.value}
          </div>
        ))}
      </div>
    </div>
  )
}

const EMPTY: ContactFormData = {
  name: '', email: '', phone: '', company: '', service: '', message: '',
}

export default function ContactSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { status, error } = useSelector((s: RootState) => s.contact)
  const [form, setForm] = useState<ContactFormData>(EMPTY)

  const set = (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(submitContact(form))
    setForm(EMPTY)
    setTimeout(() => dispatch(resetContact()), 4000)
  }

  return (
    <section id="contact" className="section contact-section">
      <Container>
        <SectionHeader
          tag="GET IN TOUCH"
          title={
            <span style={{ whiteSpace: 'nowrap' }}>
              Start a <span className="gradient-text">Conversation.</span>
            </span>
          }
          description="Drop us a message and our strategy team will reach out within 24 hours."
        />

        <div className="contact-grid contact-grid--solo">
          <RevealWrapper>
            <div className="form-glass-box">
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="input-field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={set('name')}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      placeholder="email@company.com"
                      value={form.email}
                      onChange={set('email')}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Mobile Number *</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={set('phone')}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Company / Country *</label>
                    <input
                      type="text"
                      placeholder="Company or Country"
                      value={form.company}
                      onChange={set('company')}
                      required
                    />
                  </div>
                  <div className="input-field full-width">
                    <label>Service Interested In</label>
                    <CustomSelect
                      value={form.service}
                      onChange={(v) => setForm((f) => ({ ...f, service: v }))}
                    />
                  </div>
                  <div className="input-field full-width">
                    <label>Your Message *</label>
                    <textarea
                      placeholder="Tell us about your project, idea, or challenge..."
                      rows={4}
                      value={form.message}
                      onChange={set('message')}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={status === 'loading'}
                  style={
                    status === 'success'
                      ? { background: '#4cff8f', color: '#000', boxShadow: '0 6px 24px rgba(76,255,143,0.5)' }
                      : undefined
                  }
                >
                  {status === 'loading' ? (
                    <CircularProgress size={18} sx={{ color: '#000' }} />
                  ) : status === 'success' ? (
                    <><i className="fas fa-check" /> <span>Message Sent!</span></>
                  ) : (
                    <><span>Send Message</span> <i className="fas fa-paper-plane" /></>
                  )}
                </button>

                {status === 'error' && error && (
                  <p style={{ color: '#ff6b6b', marginTop: 12, fontSize: 14, textAlign: 'center' }}>
                    {error}
                  </p>
                )}
              </form>
            </div>
          </RevealWrapper>
        </div>
      </Container>
    </section>
  )
}
