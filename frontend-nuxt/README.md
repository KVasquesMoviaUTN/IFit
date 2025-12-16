# IFit Frontend (Nuxt 3)

This is the Nuxt 3 migration of the IFit frontend application.

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Features

- **Nuxt 3**: Server-Side Rendering (SSR) for better SEO.
- **Tailwind CSS**: Utility-first CSS framework.
- **Pinia**: State management.
- **Leaflet**: Maps integration (client-side only).
- **Chart.js**: Data visualization for admin statistics.
- **Google Analytics**: Integrated via GTM.

## Project Structure

- `pages/`: Application routes.
- `components/`: Reusable Vue components.
- `layouts/`: Page layouts (default).
- `stores/`: Pinia stores (auth, cart, params).
- `utils/`: Utility functions (analytics, stringUtils).
- `middleware/`: Route middleware (auth).
- `plugins/`: Nuxt plugins (logger).
- `plugins/`: Nuxt plugins (logger).
- `public/`: Static assets (favicon, robots.txt).

## Technical Architecture

This project is built with **Nuxt 3**, leveraging its powerful Server-Side Rendering (SSR) capabilities to ensure optimal SEO performance and fast initial load times.

### Key Technologies & Decisions

- **Nuxt 3 & Vue 3 (Composition API)**: Chosen for their modularity, type safety (TypeScript support), and performance. The Composition API allows for better logic reuse and organization compared to the Options API.
- **Pinia**: Selected as the state management solution over Vuex due to its simpler API, better TypeScript inference, and modular design. Stores are divided by domain (`auth`, `cart`, `params`) to maintain separation of concerns.
- **Tailwind CSS**: Utilized for rapid UI development and consistent styling. The utility-first approach reduces CSS bundle size and simplifies responsive design implementation.
- **Client-Side Hydration Strategy**: Components requiring browser-specific APIs (like `Leaflet` for maps or `Chart.js` for analytics) are wrapped in `<ClientOnly>` or loaded dynamically to prevent hydration mismatches during SSR.
- **Custom Analytics & Logging**: A custom logging plugin (`plugins/logger.client.ts`) intercepts global errors and tracks user actions, providing valuable insights into application usage and stability without relying solely on third-party services.
- **Security**: Route protection is implemented via middleware (`middleware/auth.ts`), ensuring that sensitive admin routes are accessible only to authorized users.

## Engineering Practices

- **Component-Driven Development**: The UI is decomposed into reusable, atomic components (`ProductCard`, `NavBar`) to promote consistency and maintainability.
- **Automated Testing**: Unit tests are implemented using **Vitest** and **Vue Test Utils** to ensure component reliability.
- **Code Quality**: The project adheres to strict linting and formatting rules to ensure code cleanliness and consistency across the team.


## Testing

Run unit tests with Vitest:

```bash
npm run test
```
