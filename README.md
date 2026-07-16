# Oxivos Fashion Store

Frontend fashion store built for the Oxivos frontend developer project task.

## Live Features

- Home page with fashion storefront sections
- Products page with local product data
- Product category filters
- Price range filter
- New arrival filter
- Product search
- Product sorting by price and rating
- Product details page
- Size selection
- Add to cart from product cards and product details
- Cart quantity controls
- Cart total calculation
- Checkout modal with shipping form
- Toast notifications for cart and order actions
- Client-side routing with React Router
- Responsive layout for mobile, tablet, and desktop

## Pages

- `/` - Home
- `/products` - Products listing
- `/products/:productId` - Product details
- `/cart` - Cart

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS v4
- Context API
- React Toastify

## Data

All product and category data is stored locally:

- `public/products.json`
- `public/categories.json`

No backend, database, authentication, or API is used.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Deployment

The project is ready to deploy on Vercel. A `vercel.json` file is included so client-side routes work after refresh.
