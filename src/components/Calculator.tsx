import { useMemo, useState } from 'react'
import { Calculator as CalcIcon } from 'lucide-react'
import { fmtPKR } from '../lib/data'

export default function Calculator({ initialPrice = 31500000 }: { initialPrice?: number }) {
  const [price, setPrice] = useState(initialPrice)
  const [downPct, setDownPct] = useState(30)
  const [years, setYears] = useState(3)
  const [rate, setRate] = useState(14)

  const { down, financed, monthly, total } = useMemo(() => {
    const d = (price * downPct) / 100
    const f = price - d
    const r = rate / 100 / 12
    const n = years * 12
    const m = r === 0 ? f / n : (f * r) / (1 - Math.pow(1 + r, -n))
    return { down: d, financed: f, monthly: m, total: d + m * n }
  }, [price, downPct, years, rate])

  const rows: [string, string, number][] = [
    ['Price', 'Property value', price],
    ['Down payment', `${downPct}% advance`, down],
    ['Financed', 'Balance amount', financed],
    ['Monthly', `${years * 12} installments`, monthly],
    ['Total outflow', 'Over full plan', total],
  ]

  const sliders: [string, number, number, number, number, (v: number) => void, string][] = [
    ['Property price', price, 2000000, 250000000, 500000, setPrice, `PKR ${fmtPKR(price)}`],
    ['Down payment', downPct, 10, 70, 5, setDownPct, `${downPct}%`],
    ['Plan duration', years, 1, 10, 1, setYears, `${years} year${years > 1 ? 's' : ''}`],
    ['Markup rate', rate, 6, 26, 0.5, setRate, `${rate}% p.a.`],
  ]

  return (
    <div className="grid gap-8 rounded-3xl glass p-6 sm:p-9 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div className="flex items-center gap-2 text-primary">
          <CalcIcon size={17} />
          <span className="eyebrow">Installment Planner</span>
        </div>
        <h3 className="title-xl mt-3 text-3xl">Apni qist khud calculate karein</h3>
        <p className="mt-3 text-sm text-muted">
          Slide karein aur dekhein ke down payment, duration aur markup rate aapki monthly
          installment par kya asar daalte hain.
        </p>

        <div className="mt-7 space-y-6">
          {sliders.map(([label, val, min, max, step, set, display]) => (
            <div key={label}>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted">{label}</span>
                <span className="font-display text-sm font-bold text-primary-soft">{display}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={val}
                onChange={(e) => set(Number(e.target.value))}
                className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-primary"
                style={{
                  background: `linear-gradient(90deg, #cfa864 ${((val - min) / (max - min)) * 100}%, #1c2b24 ${((val - min) / (max - min)) * 100}%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="scene-3d">
        <div
          className="rounded-2xl bg-surface-2/80 p-6 hairline"
          style={{ transform: 'rotateY(-7deg) rotateX(4deg)', transformStyle: 'preserve-3d' }}
        >
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted">Estimated monthly</div>
          <div className="mt-1 font-display text-4xl font-extrabold gold-text">
            PKR {fmtPKR(Math.round(monthly))}
          </div>
          <div className="mt-6 space-y-3">
            {rows.map(([k, sub, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-line/70 pb-2 last:border-0">
                <div>
                  <div className="text-sm text-foreground/90">{k}</div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-muted">{sub}</div>
                </div>
                <div className="font-display text-sm font-bold text-primary-soft">
                  {fmtPKR(Math.round(v))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[11px] leading-relaxed text-muted">
            Indicative figures only. Final schedule depends on the society or bank plan; our team
            will share the exact breakdown.
          </p>
        </div>
      </div>
    </div>
  )
}
