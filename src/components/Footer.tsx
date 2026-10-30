import { Link } from 'react-router-dom'
import { Building2, Mail, MapPin, Phone, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react'
import { EMAIL, PHONE, cities, offices } from '../lib/data'

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-surface/40">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-[#8a6a33]">
                <Building2 size={20} className="text-[#0a1410]" />
              </span>
              <span className="font-display text-lg font-extrabold">
                Pak Property <span className="gold-text">Point</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Pakistan ki bharosemand property consultancy. Verified listings, honest advice and
              complete legal support — from the first site visit to the final registry.
            </p>
            <p className="font-urdu mt-4 text-sm text-primary-soft/70" dir="rtl">
              زمین سے گھر تک، ہر قدم پر آپ کے ساتھ۔
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-lg hairline bg-background/60 text-muted transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {[
                ['/properties', 'All Properties'],
                ['/properties?purpose=sale', 'For Sale'],
                ['/properties?purpose=rent', 'For Rent'],
                ['/services', 'Our Services'],
                ['/about', 'About Us'],
                ['/contact', 'Get in Touch'],
              ].map(([to, label]) => (
                <li key={label}>
                  <Link to={to} className="transition hover:text-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow">Cities</h4>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {cities.map((c) => (
                <li key={c.name}>
                  <Link
                    to={`/properties?city=${c.name}`}
                    className="flex items-center justify-between gap-4 transition hover:text-primary"
                  >
                    {c.name} <span className="text-xs text-muted/60">{c.listings}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow">Offices</h4>
            <ul className="mt-5 space-y-4 text-sm text-muted">
              {offices.map((o) => (
                <li key={o.city} className="flex gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-primary/70" />
                  <span>
                    <span className="block text-foreground/90">{o.city}</span>
                    {o.address}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-2 text-sm">
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2 text-foreground/90 hover:text-primary">
                <Phone size={14} className="text-primary/70" /> {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-foreground/90 hover:text-primary">
                <Mail size={14} className="text-primary/70" /> {EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pak Property Point. All rights reserved.</p>
          <p className="flex flex-wrap gap-4">
            <span>Registered with PSX Realty Council</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
