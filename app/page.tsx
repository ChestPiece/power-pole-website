'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Cable, ChevronDown, Factory, FileText, Gauge, MapPin, Menu, MessageCircle, MoveRight, Phone, ShieldCheck, X, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { name: 'Electrical & Switchgear', short: 'ELECTRICAL', text: 'Cable management, glands, lugs, conduits, earthing products and electrical components.', image: '/product-components.png', icon: Zap },
  { name: 'Automation & Control', short: 'AUTOMATION', text: 'Sensors, contactors, MCBs, drives, connectors and automation components.', image: '/control-panel.png', icon: Gauge },
  { name: 'Hazardous Area', short: 'HAZARDOUS AREA', text: 'Industrial plugs, sockets, cable glands and explosion-protected equipment.', image: '/industrial-hero.png', icon: ShieldCheck },
  { name: 'Oil & Gas', short: 'OIL & GAS', text: 'Oil & gas equipment, lubricants, greases, coolants and related industrial supplies.', image: '/product-components.png', icon: Factory },
]

const brands = ['ABB', 'SIEMENS', 'EATON', 'HAWKE', 'CMP', 'RAYCHEM', 'APPLETON', 'AMPHENOL', 'COOPER CROUSE-HINDS', 'ATX']

const navSections = [
  { id: 'products', label: 'Products' },
  { id: 'industries', label: 'Industries' },
  { id: 'about', label: 'About' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const category = categories[activeCategory]
  const mainRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const categoryImageRef = useRef<HTMLImageElement>(null)
  const categoryTweenRef = useRef<gsap.core.Tween | null>(null)
  const categoryBarRef = useRef<HTMLSpanElement>(null)
  const categoryListRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    const nav = navRef.current

    mm.add(
      {
        desktop: '(min-width: 801px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop, reduceMotion } = context.conditions ?? {}

        ScrollTrigger.create({
          trigger: '.hero',
          start: 'bottom top+=82',
          onEnter: () => nav?.classList.add('is-scrolled'),
          onLeaveBack: () => nav?.classList.remove('is-scrolled'),
        })

        if (reduceMotion) {
          gsap.set('[data-gsap], .hero-line, .hero-copy, .hero-actions, .hero-footer, .site-nav, .scroll-cue, .image-panel, .reveal-heading', {
            clearProps: 'all',
          })
          return
        }

        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        intro
          .from('.site-nav', { y: -24, autoAlpha: 0, duration: 0.7 })
          .from('.hero-content .eyebrow', { y: 18, autoAlpha: 0, duration: 0.5 }, '-=0.25')
          .from('.hero-line', { yPercent: 110, duration: 0.8, stagger: 0.08 }, '-=0.2')
          .from('.hero-copy', { y: 20, autoAlpha: 0, duration: 0.55 }, '-=0.35')
          .from('.hero-actions', { y: 20, autoAlpha: 0, duration: 0.55 }, '-=0.35')
          .from('.hero-footer', { y: 16, autoAlpha: 0, duration: 0.5 }, '-=0.25')

        if (desktop) {
          gsap.to('.hero-image', {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
          })
        }

        const scrollCue = gsap.to('.scroll-cue svg', {
          y: 6,
          duration: 0.9,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        })
        ScrollTrigger.create({
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          onEnter: () => scrollCue.play(),
          onEnterBack: () => scrollCue.play(),
          onLeave: () => scrollCue.pause(0),
          onLeaveBack: () => scrollCue.pause(0),
        })

        gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
          const heading = section.querySelectorAll('.reveal-heading')
          if (heading.length) {
            gsap.from(heading, {
              y: 36,
              autoAlpha: 0,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 82%', once: true },
            })
          }
        })

        gsap.from('.image-panel', {
          clipPath: 'inset(12% 0 0 0)',
          autoAlpha: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.product-wall', start: 'top 75%', once: true },
        })

        gsap.from('.final-cta .reveal-heading', {
          y: 36,
          autoAlpha: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.final-cta', start: 'top 80%', once: true },
        })

        const brandTicker = gsap.to('.brand-track', {
          xPercent: -50,
          duration: 28,
          ease: 'none',
          repeat: -1,
        })
        const strip = document.querySelector('.brand-strip')
        const pauseTicker = () => brandTicker.pause()
        const resumeTicker = () => brandTicker.resume()
        strip?.addEventListener('pointerenter', pauseTicker)
        strip?.addEventListener('pointerleave', resumeTicker)

        const arrowLinks = gsap.utils.toArray<HTMLElement>('.button svg, .nav-cta svg, .text-link svg, .category-detail a svg')
        const arrowHandlers = arrowLinks.map((icon) => {
          const parent = icon.closest('a, button') as HTMLElement | null
          if (!parent) return null
          const nudge = gsap.quickTo(icon, 'x', { duration: 0.22, ease: 'power2.out' })
          const enter = () => nudge(4)
          const leave = () => nudge(0)
          parent.addEventListener('pointerenter', enter)
          parent.addEventListener('pointerleave', leave)
          parent.addEventListener('focus', enter)
          parent.addEventListener('blur', leave)
          return { parent, enter, leave }
        }).filter(Boolean) as Array<{ parent: HTMLElement; enter: () => void; leave: () => void }>

        navSections.forEach(({ id }) => {
          const el = document.getElementById(id)
          if (!el) return
          ScrollTrigger.create({
            trigger: el,
            start: 'top 45%',
            end: 'bottom 45%',
            onEnter: () => queueMicrotask(() => setActiveSection(id)),
            onEnterBack: () => queueMicrotask(() => setActiveSection(id)),
          })
        })

        return () => {
          arrowHandlers.forEach(({ parent, enter, leave }) => {
            parent.removeEventListener('pointerenter', enter)
            parent.removeEventListener('pointerleave', leave)
            parent.removeEventListener('focus', enter)
            parent.removeEventListener('blur', leave)
          })
          strip?.removeEventListener('pointerenter', pauseTicker)
          strip?.removeEventListener('pointerleave', resumeTicker)
        }
      },
    )

    return () => mm.revert()
  }, { scope: mainRef })

  useGSAP(() => {
    const img = categoryImageRef.current
    if (!img) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    categoryTweenRef.current?.kill()
    if (reduce) {
      gsap.set(img, { autoAlpha: 1, x: 0 })
      return
    }
    categoryTweenRef.current = gsap.fromTo(
      img,
      { autoAlpha: 0.35, x: 16 },
      { autoAlpha: 1, x: 0, duration: 0.55, ease: 'power3.out' },
    )
  }, { dependencies: [activeCategory], scope: mainRef })

  useEffect(() => {
    const list = categoryListRef.current
    const bar = categoryBarRef.current
    if (!list || !bar) return
    const active = list.querySelector('.category-row.active') as HTMLElement | null
    if (!active) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.to(bar, {
      y: active.offsetTop,
      height: active.offsetHeight,
      duration: reduce ? 0 : 0.35,
      ease: 'power2.out',
    })
  }, [activeCategory])

  useEffect(() => {
    const menu = mobileMenuRef.current
    if (!menu) return
    const links = menu.querySelectorAll('a')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (menuOpen) {
      menu.removeAttribute('hidden')
      gsap.set(menu, { display: 'flex', autoAlpha: 1 })
      if (reduce) {
        gsap.set(links, { autoAlpha: 1, y: 0 })
        return
      }
      gsap.fromTo(
        links,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' },
      )
      return
    }
    if (reduce) {
      gsap.set(menu, { autoAlpha: 0, display: 'none' })
      menu.setAttribute('hidden', '')
      return
    }
    gsap.to(links, {
      autoAlpha: 0,
      y: 12,
      duration: 0.2,
      stagger: 0.03,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(menu, { autoAlpha: 0, display: 'none' })
        menu.setAttribute('hidden', '')
      },
    })
  }, [menuOpen])

  const handleCloseMenu = () => setMenuOpen(false)

  return (
    <main ref={mainRef} className="site-shell overflow-x-hidden">
      <nav ref={navRef} className={`site-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Primary navigation">
        <a href="#top" className="wordmark" onClick={handleCloseMenu}>POWER<span>POLE</span></a>
        <div className="desktop-links">
          {navSections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? 'is-active' : undefined}
              aria-current={activeSection === id ? 'true' : undefined}
            >
              {label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="mailto:info@powerpole.ae?subject=RFQ%20Request">
          Request a quote <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={22} strokeWidth={1.75} aria-hidden="true" />}
        </button>
        <div ref={mobileMenuRef} id="mobile-menu" className="mobile-menu" hidden>
          {navSections.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={handleCloseMenu}>{label}</a>
          ))}
          <a href="https://wa.me/971525439164" onClick={handleCloseMenu}>
            WhatsApp sales <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-image" role="img" aria-label="Industrial electrical components arranged on a steel work surface" />
        <div className="hero-wash" />
        <div className="hero-content">
          <p className="eyebrow light"><span /> Abu Dhabi / UAE</p>
          <h1>
            <span className="hero-line-wrap"><span className="hero-line">Industrial equipment</span></span>
            <span className="hero-line-wrap"><span className="hero-line"><em>sourced with precision.</em></span></span>
          </h1>
          <p className="hero-copy">Electrical, automation, hazardous-area and oil &amp; gas equipment for industrial requirements.</p>
          <div className="hero-actions">
            <a href="mailto:info@powerpole.ae?subject=RFQ%20Request" className="button button-orange">
              Request a quote <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
            <a href="#products" className="button button-outline">
              Explore products <MoveRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-footer">
          <span>POWER POLE GENERAL TRADING</span>
          <span>SOLE PROPRIETORSHIP LLC</span>
          <span className="scroll-cue">Scroll to explore <ChevronDown size={18} strokeWidth={1.75} aria-hidden="true" /></span>
        </div>
      </section>

      <section id="products" className="section discovery reveal-section">
        <div className="section-intro reveal-heading">
          <p className="eyebrow"><span /> Product discovery</p>
          <h2>What are<br /><em>you sourcing?</em></h2>
          <p className="intro-copy">A focused supply range for the components, equipment and consumables that keep industrial environments moving.</p>
        </div>
        <div className="category-feature">
          <div className="category-visual">
            <img
              ref={categoryImageRef}
              data-gsap
              src={category.image}
              alt={`${category.name} equipment`}
              width={900}
              height={700}
            />
          </div>
          <div className="category-list" ref={categoryListRef}>
            <span className="category-bar" ref={categoryBarRef} aria-hidden="true" />
            {categories.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  type="button"
                  className={`category-row ${activeCategory === index ? 'active' : ''}`}
                  onMouseEnter={() => setActiveCategory(index)}
                  onFocus={() => setActiveCategory(index)}
                  onClick={() => setActiveCategory(index)}
                  aria-pressed={activeCategory === index}
                >
                  <span className="category-number">0{index + 1}</span>
                  <span className="category-name">{item.name}</span>
                  <span className="category-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                </button>
              )
            })}
            <div className="category-detail">
              <p>{category.text}</p>
              <a href="mailto:info@powerpole.ae?subject=Product%20Enquiry">
                Enquire about this range <MoveRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section product-wall reveal-section">
        <div className="wall-heading reveal-heading">
          <p className="eyebrow"><span /> Supply range</p>
          <h2>Industrial components.<br /><em>One source.</em></h2>
        </div>
        <div className="wall-grid">
          <div className="wall-tall image-panel">
            <img src="/product-components.png" alt="Cable glands and industrial connectors" width={700} height={900} />
            <span>01 / COMPONENTS</span>
          </div>
          <div className="wall-wide image-panel">
            <img src="/control-panel.png" alt="Industrial control cabinet components" width={900} height={500} />
            <span>02 / CONTROL</span>
          </div>
          <div className="wall-note">
            <strong>01—04</strong>
            <p>From cable entry and connection to control, protection and hazardous-area requirements.</p>
          </div>
          <div className="wall-small image-panel">
            <img src="/industrial-hero.png" alt="Electrical equipment detail" width={1100} height={500} />
            <span>03 / ELECTRICAL</span>
          </div>
        </div>
      </section>

      <section id="industries" className="section applications reveal-section">
        <div className="application-copy reveal-heading">
          <p className="eyebrow light"><span /> Application context</p>
          <h2>Equipment that fits<br /><em>the work.</em></h2>
          <p>Power Pole supports procurement across the industrial environments where dependable components and clear commercial response matter.</p>
          <a href="mailto:info@powerpole.ae?subject=Industrial%20Requirement" className="text-link">
            Discuss your requirement <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
        <div className="application-list">
          <div>
            <span>01</span>
            <strong>Oil &amp; Gas</strong>
            <small>Equipment, consumables and hazardous-area requirements.</small>
          </div>
          <div>
            <span>02</span>
            <strong>Industrial Facilities</strong>
            <small>Electrical and control components for operating environments.</small>
          </div>
          <div>
            <span>03</span>
            <strong>EPC &amp; Engineering</strong>
            <small>Specified products for project and procurement needs.</small>
          </div>
          <div>
            <span>04</span>
            <strong>Maintenance &amp; Operations</strong>
            <small>Replacement components and routine industrial supply.</small>
          </div>
        </div>
      </section>

      <section id="about" className="section credibility reveal-section">
        <div className="reveal-heading">
          <p className="eyebrow"><span /> A clear basis for supply</p>
          <h2>Built around<br /><em>industrial supply.</em></h2>
        </div>
        <div className="credibility-body">
          <p>Power Pole General Trading is an Abu Dhabi-based industrial trading and supply company providing electrical, automation, hazardous-area and oil &amp; gas-related equipment for industrial requirements.</p>
          <div className="facts">
            <div>
              <Cable size={18} strokeWidth={1.75} aria-hidden="true" />
              <strong>EST. 2023</strong>
              <span>Established</span>
            </div>
            <div>
              <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />
              <strong>MUSSAFAH</strong>
              <span>Abu Dhabi, UAE</span>
            </div>
            <div>
              <FileText size={18} strokeWidth={1.75} aria-hidden="true" />
              <strong>B2B SUPPLY</strong>
              <span>Industrial trading</span>
            </div>
          </div>
        </div>
      </section>

      <section className="brands reveal-section">
        <p className="eyebrow reveal-heading"><span /> Sourced brand references</p>
        <div className="brand-strip" aria-label="Sourced brand references">
          <div className="brand-track">
            {[...brands, ...brands].map((brand, index) => (
              <span key={`${brand}-${index}`}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-overlay" />
        <div className="final-content">
          <p className="eyebrow light reveal-heading"><span /> Start a commercial conversation</p>
          <h2 className="reveal-heading">Looking for a<br /><em>specific component?</em></h2>
          <p>Tell us what you need. We&apos;ll take it from there.</p>
          <div className="hero-actions">
            <a href="mailto:info@powerpole.ae?subject=RFQ%20Request" className="button button-orange">
              Request a quote <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
            <a href="https://wa.me/971525439164" className="button button-outline">
              WhatsApp sales <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <a href="#top" className="wordmark">POWER<span>POLE</span></a>
          <p>Industrial equipment supply<br />for demanding applications.</p>
        </div>
        <div className="footer-contact">
          <span>CONTACT</span>
          <a href="tel:+971551648895">
            <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
            +971 55 164 8895
          </a>
          <a href="https://wa.me/971525439164">
            <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
            +971 52 543 9164 / WhatsApp
          </a>
          <a href="tel:+97122450846">
            <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
            +971 2 245 0846
          </a>
        </div>
        <div className="footer-contact">
          <span>LOCATION</span>
          <p className="footer-location">
            <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>Mussafah, Sanaiya M-14<br />Plot 6, Office 6<br />Abu Dhabi, UAE</span>
          </p>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Power Pole General Trading</span>
          <span>Sole Proprietorship LLC</span>
        </div>
      </footer>
      <a className="mobile-rfq" href="mailto:info@powerpole.ae?subject=RFQ%20Request">
        Request a quote <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
      </a>
    </main>
  )
}
