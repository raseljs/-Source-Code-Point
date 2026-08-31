 
# Source Code Point

Premium Next.js + TypeScript website for selling ready source-code products in Bangladesh.

## Features

- Laravel source code bundle offer
- 300+ WordPress landing page showcase
- 55+ Laravel website/project showcase
- Admin, reseller, and vendor panel demo cards
- bKash/Rocket manual payment order form
- Netlify Forms submission support
- Meta Pixel and Conversions API tracking support

## Local Run

```bash
npm install
npm run dev:next
```

Open:

```text
http://localhost:3000
```

## Netlify Deploy

Use these settings in Netlify:

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Base directory | blank |
| Build command | `npm run build:netlify` |
| Publish directory | `.next` |

## Order Submissions

Client orders will appear in:

```text
Netlify Dashboard > Site > Forms > source-code-order
```

## Payment Number

```text
bKash/Rocket: 01317768213
```

## Optional Meta Tracking Variables

```text
NEXT_PUBLIC_META_PIXEL_ID=
META_PIXEL_ID=
META_CAPI_ACCESS_TOKEN=
META_TEST_EVENT_CODE=
META_GRAPH_API_VERSION=v26.0
```
#
