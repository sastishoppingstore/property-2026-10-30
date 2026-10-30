import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BedDouble, Bath, Ruler, MapPin, Heart, BadgeCheck, ArrowUpRight } from 'lucide-react'
import { fmtPKR, type Property } from '../lib/data'
import { useFavorites } from '../lib/favorites'

export default function PropertyCard3D({ p }: { p: Property }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tf, setTf] = useState({ rx: 0, ry: 0, live: false })
  const { has, toggle } = useFavorites()
  const saved = has(p.id)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    setTf({ rx: (0.5 - py) * 12, ry: (px - 0.5) * 15, live: true })
  }

  const onLeave = () => setTf({ rx: 0, ry: 0, live: false })

  return (
    <div className="scene-3d group">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`tilt-card relative rounded-[22px] bg-surface hairline overflow-hidden ${tf.live ? 'is-live' : ''}`}
        style={{
          transform: `rotateX(${tf.rx}deg) rotateY(${tf.ry}deg) translateZ(0)`,
          boxShadow: tf.live
            ? '0 46px 70px -34px rgba(0,0,0,0.95), 0 0 0 1px rgba(207,168,100,0.28)'
            : '0 20px 40px -28px rgba(0,0,0,0.8)',
        }}
      >
        {/* image layer */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />

          {/* floating badges lifted in Z */}
          <div
            className="absolute left-4 top-4 flex flex-col items-start gap-2"
            style={{ transform: 'translateZ(58px)' }}
          >
            <span className="rounded-full bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-soft backdrop-blur ring-1 ring-primary/30">
              For {p.purpose === 'sale' ? 'Sale' : 'Rent'}
            </span>
            {p.badge && (
              <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0a1410]">
                {p.badge}
              </span>
            )}
          </div>

          <button
            aria-label={saved ? 'Remove from saved' : 'Save property'}
            onClick={(e) => {
              e.preventDefault()
              toggle(p.id)
            }}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/70 backdrop-blur ring-1 ring-line transition hover:ring-primary/60"
            style={{ transform: 'translateZ(58px)' }}
          >
            <Heart
              size={17}
              className={saved ? 'fill-primary text-primary' : 'text-foreground/70'}
            />
          </button>

          {/* price chip */}
          <div
            className="absolute bottom-3 left-4 rounded-xl bg-background/85 px-3.5 py-2 backdrop-blur ring-1 ring-primary/25"
            style={{ transform: 'translateZ(72px)' }}
          >
            <span className="block text-[9px] uppercase tracking-[0.2em] text-muted">PKR</span>
            <span className="font-display text-xl font-extrabold leading-none gold-text">
              {fmtPKR(p.price)}
              {p.purpose === 'rent' && <span className="text-xs text-muted"> /mo</span>}
            </span>
          </div>
        </div>

        {/* content layer */}
        <div className="relative p-5" style={{ transform: 'translateZ(34px)' }}>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-accent">
            <span>{p.type}</span>
            <span className="h-1 w-1 rounded-full bg-muted/60" />
            <span className="text-muted normal-case tracking-normal">{p.posted}</span>
            {p.verified && (
              <span className="ml-auto inline-flex items-center gap-1 text-primary">
                <BadgeCheck size={13} /> Verified
              </span>
            )}
          </div>

          <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-foreground">
            <Link to={`/property/${p.slug}`} className="hover:text-primary-soft transition-colors">
              {p.title}
            </Link>
          </h3>
          <p className="font-urdu mt-1 text-sm text-primary-soft/70" dir="rtl">
            {p.titleUr}
          </p>

          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
            <MapPin size={14} className="text-primary/70" />
            {p.area}, {p.city}
          </p>

          <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-sm text-foreground/80">
            {p.beds > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <BedDouble size={15} className="text-primary/70" /> {p.beds}
              </span>
            )}
            {p.baths > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Bath size={15} className="text-primary/70" /> {p.baths}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Ruler size={15} className="text-primary/70" /> {p.size}
            </span>
            <Link
              to={`/property/${p.slug}`}
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-transform hover:translate-x-0.5"
            >
              View <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="glare" />
      </div>
    </div>
  )
}
