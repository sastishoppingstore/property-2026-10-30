# Deploy to StackCP — Pak Property Point

Site ab static React se **PHP + MySQL** par chalti hai, lekin frontend ka design,
slides, animations aur har component bilkul waise hi hain — sirf data source badla hai.

---

## How it works

```
Browser ──HTTP──> /api/properties.php ──PDO──> MySQL
   │
   └── pehle load pe data.ts (bundled) se paint hoti hai,
       phir API ka response aa kar replace kar deta hai
```

App **bundled data se start** hoti hai aur DB ka data aate hi swap karti hai. Iska matlab:

- Koi loading spinner nahi, koi layout shift nahi, koi animation restart nahi
- API down ya slow ho to site **bilkul normal** chalti hai bundled data par
- Pehla paint static build se byte-identical hai

---

## 1. Database hostname (REQUIRED — abhi galat hai)

`api/.config.php` mein abhi `sdb-k.hosting.stackcp.net` likha hai. **Yeh hostname
exist hi nahi karta** — StackCP ne domain `.net` se `.com` par migrate kar diya hai.

Panel se current hostname nikaalein:

> Manage Hosting → Options → Manage → Web Tools → **MySQL Databases** → **Server**

Jo value wahan likhi ho wahi `host` mein daalein. Shape aisa hota hai:
`mysql.gb.stackcp.com` ya `sdb-a.hosting.stackcp.com`.

`database` aur `username` ke liye yeh confirm kar lein — StackCP par username
aur database name aam tor par **ek hi** hote hain, aapka `proprty-313931189c` sahi lag raha hai.

### Password turant change karein

DB aur FTP dono ka password `Wafa@1122` hai, aur dono chat mein paste ho chuke hain.
Panel se dono **badal dein**, phir `.config.php` mein naya password daalein.

---

## 2. Tables import karein

Panel ke phpMyAdmin mein database `proprty-313931189c` kholein, **Import** tab, aur
yeh do files upload karein **is order mein**:

1. `database/schema.sql` — tables banata hai
2. `database/seed.sql` — 12 properties + cities, testimonials, services, team,
   milestones, offices, settings import karta hai (Urdu text samet)

`seed.sql` `src/lib/data.ts` se generate hua hai, isliye content bilkul wahi hai.

---

## 3. Files upload karein

`property-dist-upload.zip` ko `public_html` mein extract karein. Zip ke andar
contents root pe hain (koi extra folder nahi):

```
public_html/
├── .htaccess          ← SPA routing + caching (zaroori)
├── index.html
├── assets/
├── img/
└── api/
    ├── .config.php    ← credentials, web access blocked
    ├── .htaccess      ← config file ko block karta hai
    ├── properties.php
    ├── content.php
    ├── health.php
    ├── db.php
    └── bootstrap.php
```

### `.htaccess` zaroori hai

App `BrowserRouter` use karti hai. Bina `.htaccess` ke `/property/dha-phase-6-modern-villa-lahore`
jaise URL pe refresh karne se **404** aayega. Upload ke baad confirm kar lein ke
`.htaccess` hidden file ke taur par upload hua — kai FTP clients use chhupa dete hain.
Agar 404 aaye to `.htaccess` ko manually upload karein.

---

## 4. Verify karein

Browser mein kholein:

```
https://yourdomain.com/api/health.php
```

Har row **PASS** honi chahiye. Ye page batata hai exactly kya galat hai —
hostname, password, ya missing tables. Sab green hone ke baad **is file ko delete kar dein**.

Phir check karein:

```
https://yourdomain.com/api/properties.php
```

JSON aana chahiye jisme `"ok":true` aur 12 properties hon. Ab site DB par chal rahi hai.

---

## Troubleshooting

| Problem | Kaam |
|---|---|
| `health.php` → "Host not found" | Hostname purana hai. Panel se **Server** value copy karein. |
| "Access denied" | Password ya database name galat. `.config.php` check karein. |
| "Unknown database" | Sahi server par hain, DB name galat hai. |
| "MISSING: properties, cities..." | `schema.sql` phir `seed.sql` import karein. |
| `could not find driver` | `pdo_mysql` PHP extension nahi hai — panel se enable karein. |
| Site par 404 on refresh | `.htaccess` upload nahi hua. |
| `.config.php` download ho jaye | `.htaccess` missing hai; dotfile hone ke bawajood web se block hona chahiye. |
| Site par purana data dikh raha hai | Browser console mein `/api/properties.php` kholein — error batayega. |

---

## Content kaise change karein

Ab properties `data.ts` mein nahi, MySQL mein hain. Panel ke phpMyAdmin se rows
edit karein — site refresh par naya data dikha degi, **rebuild ki zarurat nahi**.

Nayi property add karne ke liye `properties` table mein row insert karein.
`gallery` aur `amenities` JSON columns hain, format:

```json
["Swimming Pool", "Home Theatre"]
```

`featured`, `verified`, `installments` ke liye `1` ya `0`. `badge` khali chhor dein
agar nahi chahiye. Naya URL banega `/property/<slug>`.

Jab tak `data.ts` fallback bundle mein hai, agar DB se koi row delete ho jaye to
wo property wapas static data se dikh sakti hai — bundle sirf tab use hota hai
jab API fail ho ya list khaali ho.

---

## Local development

```bash
npm run dev        # http://localhost:5173 — API fail hogi to static data chalega
npm run build      # production build
npm run lint
npm run db:seed    # data.ts se database/seed.sql regenerate karo
npm run db:parity  # verify: API output == data.ts (rendering guarantee)
```

`db:parity` yeh prove karta hai ke MySQL se aane wala data `data.ts` se bilkul
same hai — yaani DB wiring frontend ka rendering nahi badalti.
