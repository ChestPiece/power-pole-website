import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="not-found-page">
      <a href="/" className="wordmark">POWER<span>POLE</span></a>
      <h1>
        <span className="hero-line-wrap"><span className="hero-line">Page not found.</span></span>
      </h1>
      <p>The page you asked for is not available. Return home to continue sourcing industrial equipment.</p>
      <div className="hero-actions">
        <Link href="/" className="button button-orange">
          Back to home <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
        </Link>
        <a href="mailto:info@powerpole.ae?subject=RFQ%20Request" className="button button-outline">
          Request a quote <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
    </main>
  )
}
