# Client Deployment Engine

**What this is:** a reusable website template. One codebase, many clients. To launch a new client's site, you edit *one config file* — no touching components, no rebuilding layout, no rewriting logic.

Right now (Vintage Luxury Salon build) all client-specific content is scattered across multiple files as hardcoded strings — salon name, address, WhatsApp number, testimonials, service prices, brand colors. That means every new client currently requires editing 5+ files by hand and hunting for hardcoded values. This doc describes the fix: pull every client-specific value into a single `client.config.ts` file that the rest of the app reads from.

---

## Why this matters (for any Claude session reading this)

This repo is not a one-off salon website. It's the seed of a **template product**: paste a new client's business details (services, pricing, reviews, photos, contact info) into Claude, Claude fills in `client.config.ts`, swap the images folder, deploy. Same components, same layout, same booking/WhatsApp flow — new client, minutes not hours.

If you're a Claude session picking this repo up cold: check `src/client-config.ts` first. That file *is* the client. Everything else is reusable machinery.

---

## Architecture

### Single source of truth: `src/client-config.ts`

One typed object, `CLIENT_CONFIG`, exporting everything that changes between clients:

```ts
export const CLIENT_CONFIG = {
  business: {
    name: "Vintage Luxury Salon",
    tagline: "Quiet Luxury in Rani Bagh, Pitampura, Delhi",
    address: "Sant Nagar, Rani Bagh, Pitampura, Delhi",
    phone: "9899000879",
    whatsappNumber: "919899000879", // country code + number, no + or spaces
    openHours: "10:00 AM – 8:00 PM",
    googleRating: 4.8,
    reviewCount: 363,
  },
  theme: {
    primaryColor: "emerald",
    accentColor: "gold",
    // maps to existing Tailwind tokens — swap per client's brand
  },
  services: [ /* moved from SERVICES_CATALOG in data.ts */ ],
  testimonials: [ /* moved from TESTIMONIALS in data.ts */ ],
  gallery: [ /* image refs + captions */ ],
  seo: {
    title: "Vintage Luxury Salon | Rani Bagh, Pitampura",
    description: "...",
    ogImage: "/assets/og-image.jpg",
  },
} as const;
```

### Components consume config, never hardcode

Every place that currently has a hardcoded client fact gets swapped to read from `CLIENT_CONFIG` instead:

| File | Current hardcoded values | Becomes |
|---|---|---|
| `BookingForm.tsx` | `9899000879`, `919899000879`, "Sant Nagar, Rani Bagh..." | `CLIENT_CONFIG.business.phone` / `.whatsappNumber` / `.address` |
| `data.ts` | `SERVICES_CATALOG`, `TESTIMONIALS` arrays | `CLIENT_CONFIG.services` / `.testimonials` |
| Hero section | Business name, tagline, rating badge, review count | `CLIENT_CONFIG.business.*` |
| `index.html` / meta tags | Page title, description | `CLIENT_CONFIG.seo.*` |
| Footer / contact sections | Address, hours, phone | `CLIENT_CONFIG.business.*` |

Nothing else changes. Layout, animations, form logic, WhatsApp booking flow, AI consultation feature — all stay exactly as built.

### Images

Each client gets an `src/assets/clients/<client-slug>/` folder (gallery photos, hero image, logo). `client-config.ts` references paths into that folder. Swapping clients = swap the folder + update the config's image paths.

---

## Onboarding a new client — the actual workflow

1. Client agrees. Gaurav collects: business name, address, phone/WhatsApp, service list + prices, 3-5 real testimonials (real people, not celebrities), photos.
2. Paste all of that into a Claude chat with this repo open, using the prompt below.
3. Claude fills in `client.config.ts` with the new client's real data — nothing else in the codebase touches.
4. Drop the client's photos into `src/assets/clients/<slug>/`.
5. `npm install && npm run build` → deploy (Vercel).
6. Done. Total time: should be well under an hour once the refactor below is complete.

### Prompt to paste into a new Claude session for onboarding

> "This repo is a config-driven salon/business website template. Update `src/client-config.ts` with this new client's details: [paste name, address, phone, services+prices, testimonials, photo filenames]. Do not touch any other file unless a value literally isn't covered by the config schema."

---

## Refactor checklist (this evening's build)

- [ ] Create `src/client-config.ts` with the schema above
- [ ] Move `SERVICES_CATALOG` and `TESTIMONIALS` out of `data.ts` into `CLIENT_CONFIG`
- [ ] Replace hardcoded phone/WhatsApp/address in `BookingForm.tsx` with `CLIENT_CONFIG` references
- [ ] Replace hardcoded business name/tagline/rating in Hero component
- [ ] Replace `index.html` meta tags with values pulled from config at build time (or document as manual step if build-time injection isn't set up yet)
- [ ] Move real photos into `src/assets/clients/vintage-luxury-salon/`
- [ ] Verify `npm run build` still succeeds after the refactor
- [ ] Update root `README.md` to point here: "See `docs/client-deployment-engine.md` before making changes — this repo is a reusable template, not a single site."

---

## Known open items (not blocking, tracked separately)

- Gallery still mixes real salon photos with stock placeholders — labeling/replacement decision deferred (see conversation history, not yet resolved).
- No automated way yet to inject `client-config.ts` values into `index.html` meta tags at build time — currently would need manual edit per client until this is scripted.
