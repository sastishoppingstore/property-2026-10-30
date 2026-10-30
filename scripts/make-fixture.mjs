import { build } from 'esbuild'
import { writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const out = resolve('scripts/.data.mjs')
await build({
  entryPoints: [resolve('src/lib/data.ts')],
  bundle: true, format: 'esm', platform: 'node', outfile: out, logLevel: 'error',
})
const { properties } = await import(pathToFileURL(out).href)

// Simulate exactly what MySQL returns for a row, using schema.sql column names.
const dbRow = (p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  title_ur: p.titleUr,
  city: p.city,
  area: p.area,
  type: p.type,
  purpose: p.purpose,
  price: p.price,
  beds: p.beds,
  baths: p.baths,
  size_label: p.size,
  sqft: p.sqft,
  image: p.image,
  gallery: JSON.stringify(p.gallery),
  featured: p.featured ? 1 : 0,
  verified: p.verified ? 1 : 0,
  installments: p.installments ? 1 : 0,
  badge: p.badge ?? null,
  description: p.description,
  amenities: JSON.stringify(p.amenities),
  agent: p.agent,
  agent_phone: p.agentPhone,
  posted_label: p.posted,
  possession: p.possession,
  sort_order: Number(p.id),
  is_active: 1,
})

writeFileSync(resolve('scripts/.rows.json'), JSON.stringify(properties.map(dbRow), null, 0), 'utf8')
writeFileSync(resolve('scripts/.expected.json'), JSON.stringify(properties, null, 0), 'utf8')
console.log(`wrote ${properties.length} simulated DB rows`)
