import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Heart, Building2 } from 'lucide-react'
import { PHONE, WHATSAPP } from '../lib/data'
import { useFavorites } from '../lib/favorites'

const links = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { ids } = useFavorites()
  const loc = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [loc.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/85 backdrop-blur-xl border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-[#8a6a33] shadow-[0_10px_24px_-10px_rgba(207,168,100,0.9)] transition-transform duration-500 group-hover:rotate-[14deg]">
            <Building2 size={20} className="text-[#0a1410]" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[17px] font-extrabold tracking-tight">
              Pak Property <span className="gold-text">Point</span>
            </span>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-muted">Since 2009</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-foreground/75 hover:text-foreground'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            to="/saved"
            aria-label="Saved properties"
            className="relative grid h-10 w-10 place-items-center rounded-full hairline bg-surface/60 transition hover:border-primary/50"
          >
            <Heart size={16} className={ids.length ? 'fill-primary text-primary' : 'text-foreground/70'} />
            {ids.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-[#04130e]">
                {ids.length}
              </span>
            )}
          </Link>

          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Assalam o Alaikum! Mujhe property ke baare mein maloomat chahiye.')}`}
            target="_blank"
            rel="noreferrer"
            className="shine-btn hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-[#0a1410] transition hover:bg-primary-soft sm:inline-flex"
          >
            <Phone size={15} /> {PHONE}
          </a>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full hairline bg-surface/60 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`overflow-hidden border-t border-line bg-background/97 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-5 py-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `border-b border-line/60 py-3 font-display text-lg ${isActive ? 'text-primary' : 'text-foreground/85'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={`tel:${PHONE.replace(/\s/g, '')}`}
            className="mt-4 rounded-full bg-primary py-3 text-center font-bold text-[#0a1410]"
          >
            Call {PHONE}
          </a>
        </nav>
      </div>
    </header>
  )
}
