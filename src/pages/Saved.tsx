import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import PropertyCard3D from '../components/PropertyCard3D'
import Reveal from '../components/Reveal'
import { useFavorites } from '../lib/favorites'
import { useContent } from '../lib/use-content'

export default function Saved() {
  const { properties } = useContent()
  const { ids } = useFavorites()
  const list = properties.filter((p) => ids.includes(p.id))

  return (
    <div className="mx-auto max-w-7xl px-5 pt-32 lg:px-8 lg:pt-40">
      <Reveal>
        <span className="eyebrow">Your shortlist</span>
        <h1 className="title-xl mt-4 text-5xl sm:text-6xl">
          Saved <span className="gold-text">properties</span>
        </h1>
        <p className="font-urdu mt-3 text-lg text-primary-soft/80" dir="rtl">
          آپ کی پسندیدہ پراپرٹیز
        </p>
      </Reveal>

      {list.length === 0 ? (
        <div className="mt-14 rounded-3xl bg-surface p-16 text-center hairline">
          <Heart size={38} className="mx-auto text-primary/60" />
          <h2 className="mt-5 font-display text-2xl font-bold">Abhi tak kuch save nahi kiya</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Kisi bhi listing par dil ka nishan dabayein — woh yahan mehfooz ho jaayegi, aap ke
            browser mein.
          </p>
          <Link
            to="/properties"
            className="mt-8 inline-block rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-[#0a1410] transition hover:bg-primary-soft"
          >
            Explore listings
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <PropertyCard3D p={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
