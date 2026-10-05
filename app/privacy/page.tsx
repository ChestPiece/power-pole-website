import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy | Power Pole',
  description: 'Privacy policy for Power Pole General Trading Sole Proprietorship LLC.',
}

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <Link href="/" className="wordmark">POWER<span>POLE</span></Link>
      <h1>Privacy policy</h1>
      <p>Last updated: 5 October 2026</p>
      <p>
        Power Pole General Trading Sole Proprietorship LLC (&quot;Power Pole&quot;, &quot;we&quot;, &quot;us&quot;)
        processes limited business contact information when you request a quote or contact us by email,
        phone or WhatsApp.
      </p>
      <p>We typically collect:</p>
      <ul>
        <li>Name, company and role</li>
        <li>Email address and phone number</li>
        <li>Enquiry details such as part numbers, quantities and project context</li>
      </ul>
      <p>
        We use this information only to respond to commercial enquiries, prepare quotes and fulfil
        supply discussions. We do not sell personal data.
      </p>
      <p>
        Enquiries are handled from our Abu Dhabi office. Contact{' '}
        <a href="mailto:info@powerpole.ae">info@powerpole.ae</a> if you need a copy updated or removed
        from our active enquiry records where applicable.
      </p>
      <p>
        <Link href="/">Back to home</Link>
      </p>
    </main>
  )
}
