import { Link } from 'react-router-dom'
import { Award, HeartHandshake, ScrollText, Users } from 'lucide-react'
import Reveal, { SectionHeading } from '../components/Reveal'
import { milestones, team } from '../lib/data'

const stats = [
  { k: '17', v: 'Years in the market' },
  { k: '6,400+', v: 'Clients served' },
  { k: 'PKR 48 Arab', v: 'Transactions closed' },
  { k: '9', v: 'Cities covered' },
]

const values = [
  {
    icon: ScrollText,
    title: 'Documents pehle',
    text: 'Koi bhi file hum tab tak list nahi karte jab tak title, fard aur society dues clear na hon.',
  },
  {
    icon: HeartHandshake,
    title: 'Client, commission nahi',
    text: 'Agar deal aapke haq mein nahi hai, hum saaf kehte hain — chahe commission chali jaaye.',
  },
  {
    icon: Users,
    title: 'Ek hi rabta',
    text: 'Ek dedicated manager shuru se registry tak aapke saath rehta hai. Har baar naya banda nahi.',
  },
  {
    icon: Award,
    title: 'Market ka sach',
    text: 'Real transaction data par mabni pricing — hawa mein banaye gaye numbers nahi.',
  },
]

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-32 lg:px-8 lg:pt-40">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">Our story</span>
          <h1 className="title-xl mt-4 text-5xl sm:text-6xl">
            2009 se, <span className="gold-text">bharose</span> ka safar.
          </h1>
          <p className="font-urdu mt-4 text-lg text-primary-soft/80" dir="rtl">
            پاک پراپرٹی پوائنٹ — ایک چھوٹے دفتر سے نو شہروں تک
          </p>
          <p className="mt-6 leading-relaxed text-muted">
            Pak Property Point ka aghaaz Gulberg, Lahore ke ek chhote se daftar se hua — ek simple
            soch ke sath: property kharidna ya bechna khauf ka kaam na ho. Us waqt market mein sab se
            bara masla galat maloomat aur adhoore documents thay.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Aaj hum Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Gujranwala
            aur Gwadar mein kaam karte hain — apni in-house legal team, professional photography
            studio aur investment research desk ke sath. Har listing verified, har price justified.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/properties"
              className="shine-btn rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-[#0a1410] transition hover:bg-primary-soft"
            >
              Browse listings
            </Link>
            <Link
              to="/contact"
              className="rounded-full hairline px-7 py-3.5 text-sm font-bold transition hover:border-primary/60 hover:text-primary"
            >
              Meet the team
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="scene-3d">
            <div className="grid grid-cols-2 gap-4" style={{ transform: 'rotateY(-10deg) rotateX(5deg)', transformStyle: 'preserve-3d' }}>
              {['/img/p1.jpg', '/img/p7.jpg', '/img/p9.jpg', '/img/p3.jpg'].map((img, i) => (
                <div
                  key={img}
                  className="overflow-hidden rounded-2xl hairline"
                  style={{ transform: `translateZ(${i % 2 === 0 ? 40 : 0}px)` }}
                >
                  <img src={img} alt="" className="h-44 w-full object-cover sm:h-52" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* stats */}
      <div className="mt-20 grid gap-4 rounded-3xl glass p-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.v} delay={i * 0.08} className="text-center">
            <div className="font-display text-4xl font-extrabold gold-text">{s.k}</div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted">{s.v}</div>
          </Reveal>
        ))}
      </div>

      {/* values */}
      <section className="py-24">
        <SectionHeading
          eyebrow="Our values"
          title={<>Hamare chaar usool</>}
          urdu="جن باتوں پر ہم سمجھوتہ نہیں کرتے"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="flex h-full gap-5 rounded-2xl bg-surface p-7 hairline transition duration-500 hover:-translate-y-1 hover:border-primary/40">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent">
                  <v.icon size={21} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* timeline */}
      <section className="pb-24">
        <SectionHeading eyebrow="Milestones" title={<>Safar ke ahem parao</>} urdu="ہماری تاریخ" />
        <div className="relative mt-12 pl-8">
          <span className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary/70 via-primary/25 to-transparent" />
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.08}>
              <div className="relative pb-10">
                <span className="absolute -left-8 top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/15" />
                <div className="font-display text-2xl font-extrabold gold-text">{m.year}</div>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* team */}
      <section className="pb-24">
        <SectionHeading eyebrow="The people" title={<>Aap ki team</>} urdu="تجربہ کار مشیر" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="group overflow-hidden rounded-3xl bg-surface hairline transition duration-500 hover:-translate-y-2 hover:border-primary/40">
                <div className="h-52 overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  />
                </div>
                <div className="p-5">
                  <div className="font-display text-lg font-bold">{t.name}</div>
                  <div className="text-xs uppercase tracking-[0.14em] text-primary">{t.role}</div>
                  <div className="mt-2 text-xs text-muted">
                    {t.city} · {t.years} years experience
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
