import { useState } from 'react'
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Reveal from '../components/Reveal'
import { EMAIL, PHONE, WHATSAPP, offices } from '../lib/data'

const interests = ['Buy a property', 'Sell my property', 'Rent', 'Investment advice', 'Legal & transfer']

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [interest, setInterest] = useState(interests[0])

  return (
    <div className="mx-auto max-w-7xl px-5 pt-32 lg:px-8 lg:pt-40">
      <Reveal>
        <span className="eyebrow">Get in touch</span>
        <h1 className="title-xl mt-4 max-w-3xl text-5xl sm:text-6xl">
          Chalein, aap ki <span className="gold-text">property</span> ki baat karein.
        </h1>
        <p className="font-urdu mt-4 text-lg text-primary-soft/80" dir="rtl">
          ہم سے رابطہ کریں — مشورہ بالکل مفت ہے
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* form */}
        <Reveal>
          <div className="rounded-3xl glass p-7 sm:p-9">
            {sent ? (
              <div className="py-16 text-center">
                <CheckCircle2 size={44} className="mx-auto text-accent" />
                <h2 className="title-xl mt-5 text-3xl">Paighaam mil gaya!</h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                  Hamari team 24 working hours ke andar aap se rabta karegi. Urgent case ho to seedha
                  WhatsApp kar lein.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 rounded-full hairline px-6 py-3 text-sm font-semibold transition hover:border-primary/60 hover:text-primary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted">Full name</span>
                    <input
                      required
                      placeholder="Ahmed Raza"
                      className="mt-2 w-full rounded-xl bg-background/60 px-4 py-3 text-sm hairline outline-none placeholder:text-muted/60 focus:border-primary/60"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted">Mobile</span>
                    <input
                      required
                      type="tel"
                      placeholder="0300 1234567"
                      className="mt-2 w-full rounded-xl bg-background/60 px-4 py-3 text-sm hairline outline-none placeholder:text-muted/60 focus:border-primary/60"
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted">Email</span>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="mt-2 w-full rounded-xl bg-background/60 px-4 py-3 text-sm hairline outline-none placeholder:text-muted/60 focus:border-primary/60"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted">City</span>
                    <input
                      placeholder="Lahore"
                      className="mt-2 w-full rounded-xl bg-background/60 px-4 py-3 text-sm hairline outline-none placeholder:text-muted/60 focus:border-primary/60"
                    />
                  </label>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted">I am interested in</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {interests.map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setInterest(i)}
                        className={`rounded-full px-4 py-2 text-xs transition hairline ${
                          interest === i
                            ? 'border-primary bg-primary/15 text-primary'
                            : 'text-muted hover:text-foreground'
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted">Message</span>
                  <textarea
                    rows={5}
                    placeholder="Budget, preferred area aur zaroorat likhein..."
                    className="mt-2 w-full resize-none rounded-xl bg-background/60 px-4 py-3 text-sm hairline outline-none placeholder:text-muted/60 focus:border-primary/60"
                  />
                </label>

                <button
                  type="submit"
                  className="shine-btn w-full rounded-xl bg-primary py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#0a1410] transition hover:bg-primary-soft"
                >
                  Send message
                </button>
                <p className="text-center text-[11px] text-muted">
                  Aap ki maloomat mahfooz hai aur kisi teesray fard se share nahi ki jaati.
                </p>
              </form>
            )}
          </div>
        </Reveal>

        {/* side */}
        <div className="space-y-5">
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-surface p-7 hairline">
              <h3 className="font-display text-xl font-bold">Direct rabta</h3>
              <div className="mt-5 space-y-4 text-sm">
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex items-center gap-3 transition hover:text-primary">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/12 text-primary">
                    <Phone size={17} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">Call</span>
                    {PHONE}
                  </span>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 transition hover:text-accent"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/12 text-accent">
                    <MessageCircle size={17} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">WhatsApp</span>
                    Chat with a consultant
                  </span>
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 transition hover:text-primary">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/12 text-primary">
                    <Mail size={17} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">Email</span>
                    {EMAIL}
                  </span>
                </a>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-foreground/8 text-foreground/80">
                    <Clock size={17} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">Timings</span>
                    Mon–Sat, 10:00 AM – 8:00 PM
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {offices.map((o, i) => (
            <Reveal key={o.city} delay={0.15 + i * 0.07}>
              <div className="rounded-2xl bg-surface p-6 hairline">
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <div className="font-display font-bold">{o.city}</div>
                    <p className="mt-1 text-sm text-muted">{o.address}</p>
                    <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="mt-2 inline-block text-xs font-semibold text-primary">
                      {o.phone}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
