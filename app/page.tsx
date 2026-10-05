'use client'

import { useState } from 'react'
import { ArrowUpRight, ChevronDown, Menu, MoveRight, X } from 'lucide-react'

const categories = [
  { name: 'Electrical & Switchgear', short: 'ELECTRICAL', text: 'Cable management, glands, lugs, conduits, earthing products and electrical components.', image: '/product-components.png' },
  { name: 'Automation & Control', short: 'AUTOMATION', text: 'Sensors, contactors, MCBs, drives, connectors and automation components.', image: '/control-panel.png' },
  { name: 'Hazardous Area', short: 'HAZARDOUS AREA', text: 'Industrial plugs, sockets, cable glands and explosion-protected equipment.', image: '/industrial-hero.png' },
  { name: 'Oil & Gas', short: 'OIL & GAS', text: 'Oil & gas equipment, lubricants, greases, coolants and related industrial supplies.', image: '/product-components.png' },
]

const brands = ['ABB', 'SIEMENS', 'EATON', 'HAWKE', 'CMP', 'RAYCHEM', 'APPLETON', 'AMPHENOL', 'COOPER CROUSE-HINDS', 'ATX']

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const category = categories[activeCategory]

  return (
    <main className="site-shell overflow-x-hidden">
      <nav className={`site-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Primary navigation">
        <a href="#top" className="wordmark" onClick={() => setMenuOpen(false)}>POWER<span>POLE</span></a>
        <div className="desktop-links"><a href="#products">Products</a><a href="#industries">Industries</a><a href="#about">About</a></div>
        <a className="nav-cta" href="mailto:info@powerpole.ae?subject=RFQ%20Request">Request a quote <ArrowUpRight size={15} /></a>
        <button className="menu-button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <div className="mobile-menu"><a href="#products" onClick={() => setMenuOpen(false)}>Products</a><a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="https://wa.me/971525439164">WhatsApp sales <ArrowUpRight size={16} /></a></div>}
      </nav>

      <section id="top" className="hero">
        <div className="hero-image" role="img" aria-label="Industrial electrical components arranged on a steel work surface" />
        <div className="hero-wash" />
        <div className="hero-gridline" />
        <div className="hero-content">
          <p className="eyebrow light"><span /> Abu Dhabi / UAE</p>
          <h1>Industrial equipment<br /><em>sourced with precision.</em></h1>
          <p className="hero-copy">Electrical, automation, hazardous-area and oil &amp; gas equipment for industrial requirements.</p>
          <div className="hero-actions"><a href="mailto:info@powerpole.ae?subject=RFQ%20Request" className="button button-orange">Request a quote <ArrowUpRight size={16} /></a><a href="#products" className="button button-outline">Explore products <MoveRight size={16} /></a></div>
        </div>
        <div className="hero-footer"><span>POWER POLE GENERAL TRADING</span><span>SOLE PROPRIETORSHIP LLC</span><span className="scroll-cue">Scroll to explore <ChevronDown size={16} /></span></div>
      </section>

      <section id="products" className="section discovery">
        <div className="section-intro"><p className="eyebrow"><span /> Product discovery</p><h2>What are<br /><em>you sourcing?</em></h2><p className="intro-copy">A focused supply range for the components, equipment and consumables that keep industrial environments moving.</p></div>
        <div className="category-feature"><div className="category-visual"><img src={category.image} alt={`${category.name} equipment`} /><div className="scan-line" /></div><div className="category-list">{categories.map((item, index) => <button key={item.name} className={`category-row ${activeCategory === index ? 'active' : ''}`} onMouseEnter={() => setActiveCategory(index)} onFocus={() => setActiveCategory(index)} onClick={() => setActiveCategory(index)}><span className="category-number">0{index + 1}</span><span className="category-name">{item.name}</span><ArrowUpRight size={18} /></button>)}<div className="category-detail"><p>{category.text}</p><a href="mailto:info@powerpole.ae?subject=Product%20Enquiry">Enquire about this range <MoveRight size={15} /></a></div></div></div>
      </section>

      <section className="section product-wall"><div className="wall-heading"><p className="eyebrow"><span /> Supply range</p><h2>Industrial components.<br /><em>One source.</em></h2></div><div className="wall-grid"><div className="wall-tall image-panel"><img src="/product-components.png" alt="Cable glands and industrial connectors" /><span>01 / COMPONENTS</span></div><div className="wall-wide image-panel"><img src="/control-panel.png" alt="Industrial control cabinet components" /><span>02 / CONTROL</span></div><div className="wall-note"><strong>01—04</strong><p>From cable entry and connection to control, protection and hazardous-area requirements.</p></div><div className="wall-small image-panel"><img src="/industrial-hero.png" alt="Electrical equipment detail" /><span>03 / ELECTRICAL</span></div></div></section>

      <section id="industries" className="section applications"><div className="application-copy"><p className="eyebrow light"><span /> Application context</p><h2>Equipment that fits<br /><em>the work.</em></h2><p>Power Pole supports procurement across the industrial environments where dependable components and clear commercial response matter.</p><a href="mailto:info@powerpole.ae?subject=Industrial%20Requirement" className="text-link">Discuss your requirement <ArrowUpRight size={16} /></a></div><div className="application-list"><div><span>01</span><strong>Oil &amp; Gas</strong><small>Equipment, consumables and hazardous-area requirements.</small></div><div><span>02</span><strong>Industrial Facilities</strong><small>Electrical and control components for operating environments.</small></div><div><span>03</span><strong>EPC &amp; Engineering</strong><small>Specified products for project and procurement needs.</small></div><div><span>04</span><strong>Maintenance &amp; Operations</strong><small>Replacement components and routine industrial supply.</small></div></div></section>

      <section id="about" className="section credibility"><div><p className="eyebrow"><span /> A clear basis for supply</p><h2>Built around<br /><em>industrial supply.</em></h2></div><div className="credibility-body"><p>Power Pole General Trading is an Abu Dhabi-based industrial trading and supply company providing electrical, automation, hazardous-area and oil &amp; gas-related equipment for industrial requirements.</p><div className="facts"><div><strong>EST. 2023</strong><span>Established</span></div><div><strong>MUSSAFAH</strong><span>Abu Dhabi, UAE</span></div><div><strong>B2B SUPPLY</strong><span>Industrial trading</span></div></div></div></section>

      <section className="brands"><p className="eyebrow"><span /> Sourced brand references</p><div className="brand-marquee">{brands.map(brand => <span key={brand}>{brand}</span>)}</div></section>

      <section className="final-cta"><div className="final-image" /><div className="final-overlay" /><div className="final-content"><p className="eyebrow light"><span /> Start a commercial conversation</p><h2>Looking for a<br /><em>specific component?</em></h2><p>Tell us what you need. We&apos;ll take it from there.</p><div className="hero-actions"><a href="mailto:info@powerpole.ae?subject=RFQ%20Request" className="button button-orange">Request a quote <ArrowUpRight size={16} /></a><a href="https://wa.me/971525439164" className="button button-outline">WhatsApp sales <ArrowUpRight size={16} /></a></div></div></section>

      <footer className="footer"><div><a href="#top" className="wordmark">POWER<span>POLE</span></a><p>Industrial equipment supply<br />for demanding applications.</p></div><div className="footer-contact"><span>CONTACT</span><a href="tel:+971551648895">+971 55 164 8895</a><a href="https://wa.me/971525439164">+971 52 543 9164 / WhatsApp</a><a href="tel:+97122450846">+971 2 245 0846</a></div><div className="footer-contact"><span>LOCATION</span><p>Mussafah, Sanaiya M-14<br />Plot 6, Office 6<br />Abu Dhabi, UAE</p></div><div className="footer-bottom"><span>© 2026 Power Pole General Trading</span><span>Sole Proprietorship LLC</span></div></footer>
      <a className="mobile-rfq" href="mailto:info@powerpole.ae?subject=RFQ%20Request">Request a quote <ArrowUpRight size={16} /></a>
    </main>
  )
}

