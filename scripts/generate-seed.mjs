import { build } from 'esbuild'
import { writeFileSync, mkdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const out = resolve('scripts/.data.mjs')
await build({
  entryPoints: [resolve('src/lib/data.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: out,
  logLevel: 'error',
})

const { properties, cities, testimonials, services, team, milestones, offices, WHATSAPP, PHONE, EMAIL } =
  await import(pathToFileURL(out).href)

mkdirSync(resolve('database'), { recursive: true })

const q = (v) => {
  if (v === null || v === undefined) return 'NULL'
  if (typeof v === 'number') return String(v)
  if (typeof v === 'boolean') return v ? '1' : '0'
  return `'${String(v).replace(/\\/g, '\\\\').replace(/'/g, "''")}'`
}
const j = (v) => q(JSON.stringify(v))

const rows = properties.map((p) =>
  [
    q(p.id),
    q(p.slug),
    q(p.title),
    q(p.titleUr),
    q(p.city),
    q(p.area),
    q(p.type),
    q(p.purpose),
    q(p.price),
    q(p.beds),
    q(p.baths),
    q(p.size),
    q(p.sqft),
    q(p.image),
    j(p.gallery),
    p.featured ? 1 : 0,
    p.verified ? 1 : 0,
    p.installments ? 1 : 0,
    q(p.badge ?? null),
    q(p.description),
    j(p.amenities),
    q(p.agent),
    q(p.agentPhone),
    q(p.posted),
    q(p.possession),
  ].join(', '),
)

const seed = `-- ============================================================
--  Seed data — generated from src/lib/data.ts
--  ${properties.length} properties, ${cities.length} cities, ${testimonials.length} testimonials,
--  ${services.length} services, ${team.length} team members, ${milestones.length} milestones, ${offices.length} offices
--  Regenerate with:  npm run db:seed
-- ============================================================

SET NAMES utf8mb4;

-- ---------- properties ----------
INSERT INTO properties
  (id, slug, title, title_ur, city, area, type, purpose, price, beds, baths, size_label, sqft, image, gallery, featured, verified, installments, badge, description, amenities, agent, agent_phone, posted_label, possession)
VALUES
${rows.map((r) => '  (' + r + ')').join(',\n')};

-- ---------- cities ----------
INSERT INTO cities (name, listings, image) VALUES
${cities.map((c) => `  (${q(c.name)}, ${q(c.listings)}, ${q(c.image)})`).join(',\n')};

-- ---------- testimonials ----------
INSERT INTO testimonials (name, role, text, stars) VALUES
${testimonials.map((t) => `  (${q(t.name)}, ${q(t.role)}, ${q(t.text)}, ${q(t.stars)})`).join(',\n')};

-- ---------- services ----------
INSERT INTO services (sort_order, title, title_ur, icon, blurb, points) VALUES
${services.map((s, i) => `  (${q(i)}, ${q(s.title)}, ${q(s.titleUr)}, ${q(s.icon)}, ${q(s.blurb)}, ${j(s.points)})`).join(',\n')};

-- ---------- team ----------
INSERT INTO team (sort_order, name, role, city, years, image) VALUES
${team.map((t, i) => `  (${q(i)}, ${q(t.name)}, ${q(t.role)}, ${q(t.city)}, ${q(t.years)}, ${q(t.image)})`).join(',\n')};

-- ---------- milestones ----------
INSERT INTO milestones (sort_order, year, text) VALUES
${milestones.map((m, i) => `  (${q(i)}, ${q(m.year)}, ${q(m.text)})`).join(',\n')};

-- ---------- offices ----------
INSERT INTO offices (sort_order, city, address, phone) VALUES
${offices.map((o, i) => `  (${q(i)}, ${q(o.city)}, ${q(o.address)}, ${q(o.phone)})`).join(',\n')};

-- ---------- site settings ----------
INSERT INTO site_settings (\`key\`, value) VALUES
  ('whatsapp', ${q(WHATSAPP)}),
  ('phone',    ${q(PHONE)}),
  ('email',    ${q(EMAIL)});
`

writeFileSync(resolve('database/seed.sql'), seed, 'utf8')
console.log(`database/seed.sql written — ${properties.length} properties`)
