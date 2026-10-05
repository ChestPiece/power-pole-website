import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms | Power Pole',
  description: 'Website terms for Power Pole General Trading Sole Proprietorship LLC.',
}

export default function TermsPage() {
  return (
    <main className="legal-page">
      <Link href="/" className="wordmark">POWER<span>POLE</span></Link>
      <h1>Website terms</h1>
      <p>Last updated: 5 October 2026</p>
      <p>
        This website is provided by Power Pole General Trading Sole Proprietorship LLC for information
        about industrial equipment supply from Abu Dhabi, UAE.
      </p>
      <p>
        Product references, brand names and availability shown on this site are indicative. Quotes,
        lead times, certifications and commercial terms are confirmed only in writing for each enquiry.
      </p>
      <p>
        Content on this site may change without notice. Third party brand names remain the property of
        their respective owners and appear as supply references only.
      </p>
      <p>
        For RFQ and trading discussions contact{' '}
        <a href="mailto:info@powerpole.ae">info@powerpole.ae</a> or WhatsApp sales listed on the home
        page.
      </p>
      <p>
        <Link href="/">Back to home</Link>
      </p>
    </main>
  )
}
