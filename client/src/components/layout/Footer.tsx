import Container from '@mui/material/Container'

export default function Footer() {
  return (
    <footer>
      <Container>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-wordmark">
                <span className="logo-mighty">MIGHTY</span>
                <span className="logo-techx">
                  TECHX<sup className="logo-sep">✦</sup>
                </span>
              </div>
            </div>
            <p className="footer-tagline">Clear Vision. Infinite Growth.</p>
            <p className="footer-desc">
              Transforming ideas into extraordinary digital experiences. We build
              the future, one product at a time.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href="#" aria-label="X / Twitter"><i className="fab fa-x-twitter" /></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube" /></a>
            </div>
          </div>

          <div className="footer-links-col">
            <h5>Services</h5>
            <a href="#services">Business Strategy</a>
            <a href="#services">Cloud Services</a>
            <a href="#services">Web Development</a>
            <a href="#services">Mobile Apps</a>
            <a href="#services">UI / UX Design</a>
            <a href="#services">Motion &amp; Animation</a>
            <a href="#services">Microsoft Dynamics 365 F&O</a>
            <a href="#services">HR Solutions</a>
            <a href="#services">Helpdesk & Technical Support</a>
          </div>

          <div className="footer-links-col">
            <h5>Products</h5>
            <a href="#products">ServiceOps</a>
            <a href="#products">GoGaadi</a>
            <a href="#products">FarmiX</a>
            <a href="#products">PocketPay</a>
            <a href="#products">ClapX</a>
            <a href="#products">Illuminate</a>
          </div>

          <div className="footer-links-col">
            <h5>Contact</h5>
            <a href="mailto:hr@mightytechx.com">hr@mightytechx.com</a>
            <p className="footer-address">
              Villa 73, Baverly Slopes,<br />
              Jalapalli Village, Balapur Mandal,<br />
              Rangareddy Dist, Telangana 500005.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Mighty TechX — All Rights Reserved.</span>
          <span>Built with passion in Hyderabad, India 🇮🇳</span>
        </div>
      </Container>
    </footer>
  )
}
