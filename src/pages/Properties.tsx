import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, Search, X } from 'lucide-react'
import PropertyCard3D from '../components/PropertyCard3D'
import Reveal from '../components/Reveal'
import { fmtPKR, type PropType, type Purpose } from '../lib/data'
import { useContent } from '../lib/use-content'

const allTypes: PropType[] = ['House', 'Apartment', 'Plot', 'Commercial', 'Farmhouse']
type Sort = 'new' | 'low' | 'high' | 'big'

export default function Properties() {
  const { properties, cities } = useContent()
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [city, setCity] = useState(params.get('city') ?? '')
  const [type, setType] = useState(params.get('type') ?? '')
  const [purpose, setPurpose] = useState<Purpose | ''>((params.get('purpose') as Purpose) ?? '')
  const [maxPrice, setMaxPrice] = useState(250000000)
  const [sort, setSort] = useState<Sort>('new')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const p = new URLSearchParams()
    if (q) p.set('q', q)
    if (city) p.set('city', city)
    if (type) p.set('type', type)
    if (purpose) p.set('purpose', purpose)
    setParams(p, { replace: true })
  }, [q, city, type, purpose, setParams])

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const list = properties.filter((p) => {
      if (city && p.city !== city) return false
      if (type && p.type !== type) return false
      if (purpose && p.purpose !== purpose) return false
      if (p.purpose === 'sale' && p.price > maxPrice) return false
      if (needle) {
        const hay = `${p.title} ${p.titleUr} ${p.area} ${p.city} ${p.type} ${p.description}`.toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
    const sorted = [...list]
    if (sort === 'low') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'high') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'big') sorted.sort((a, b) => b.sqft - a.sqft)
    return sorted
  }, [properties, q, city, type, purpose, maxPrice, sort])

  const reset = () => {
    setQ('')
    setCity('')
    setType('')
    setPurpose('')
    setMaxPrice(250000000)
    setSort('new')
  }

  const activeCount = [q, city, type, purpose].filter(Boolean).length

  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 pt-32 lg:px-8 lg:pt-40">
      <Reveal>
        <span className="eyebrow">{results.length} properties available</span>
        <h1 className="title-xl mt-4 text-5xl sm:text-6xl">
          Property <span className="gold-text">search</span>
        </h1>
        <p className="font-urdu mt-3 text-lg text-primary-soft/80" dir="rtl">
          اپنی پسند کی پراپرٹی تلاش کریں
        </p>
      </Reveal>

      {/* filter bar */}
      <div className="sticky top-20 z-30 mt-10 rounded-2xl glass p-4">
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex min-w-[14rem] flex-1 items-center gap-2 rounded-xl bg-background/60 px-3 py-2.5 hairline">
            <Search size={15} className="text-primary/80" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search area, society, city..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
            />
          </label>

          <div className="flex gap-1 rounded-xl bg-background/60 p-1 text-[11px] font-semibold uppercase tracking-[0.12em]">
            {([['', 'All'], ['sale', 'Buy'], ['rent', 'Rent']] as const).map(([v, label]) => (
              <button
                key={label}
                onClick={() => setPurpose(v as Purpose | '')}
                className={`rounded-lg px-3.5 py-2 transition ${
                  purpose === v ? 'bg-primary text-[#0a1410]' : 'text-muted hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-xl bg-background/60 px-3 py-2.5 text-sm hairline outline-none"
          >
            <option value="new" className="bg-surface">Newest first</option>
            <option value="low" className="bg-surface">Price: low to high</option>
            <option value="high" className="bg-surface">Price: high to low</option>
            <option value="big" className="bg-surface">Largest area</option>
          </select>

          <button
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl bg-background/60 px-4 py-2.5 text-sm hairline transition hover:border-primary/50"
          >
            <SlidersHorizontal size={15} /> Filters
            {activeCount > 0 && (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-[#0a1410]">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid gap-5 border-t border-line pt-4 md:grid-cols-3">
            <div>
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted">City</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {['', ...cities.map((c) => c.name)].map((c) => (
                  <button
                    key={c || 'all'}
                    onClick={() => setCity(c)}
                    className={`rounded-full px-3 py-1.5 text-xs transition hairline ${
                      city === c ? 'border-primary bg-primary/15 text-primary' : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {c || 'All cities'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted">Type</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {['', ...allTypes].map((t) => (
                  <button
                    key={t || 'all'}
                    onClick={() => setType(t)}
                    className={`rounded-full px-3 py-1.5 text-xs transition hairline ${
                      type === t ? 'border-primary bg-primary/15 text-primary' : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {t || 'All types'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted">Max budget (sale)</span>
                <span className="font-display text-sm font-bold text-primary-soft">PKR {fmtPKR(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={5000000}
                max={250000000}
                step={2500000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(90deg, #cfa864 ${((maxPrice - 5000000) / 245000000) * 100}%, #1c2b24 ${((maxPrice - 5000000) / 245000000) * 100}%)`,
                }}
              />
              <button
                onClick={reset}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted transition hover:text-primary"
              >
                <X size={13} /> Reset all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* results */}
      {results.length === 0 ? (
        <div className="mt-16 rounded-2xl bg-surface p-14 text-center hairline">
          <h3 className="font-display text-2xl font-bold">Koi listing nahi mili</h3>
          <p className="mt-2 text-sm text-muted">
            Filters thoray broad karein, ya hum se rabta karein — off-market options bhi mojood hain.
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-bold text-[#0a1410]"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 5) * 0.06}>
              <PropertyCard3D p={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
