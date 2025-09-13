# Project Overview

**Haven** is a dynamic chart-building platform inspired by leading Business Intelligence (BI) tools. It enables users to interactively create, customize, and visualize charts—such as line, bar, pie, KPI, and more—directly within the app. The system features a flexible property manager for each chart type, real-time editing, and intuitive dashboards, making it ideal for analytics, reporting, and data-driven decision making.

## Key Features

- Frontend: React 18 SPA with TypeScript, Vite, TailwindCSS 3, Radix UI, and Lucide React icons.
- Backend: Express server, integrated with Vite for unified dev experience.
- SPA Routing: Powered by React Router 6; all routes are located in /client/pages/.
- Styling: Utility classes via TailwindCSS, theme customization in global.css, and pre-built UI components.
- Type Safety: Shared TypeScript interfaces for client/server communication.
- Testing: Vitest for unit and integration tests.
- Hot Reload: Both client and server code update instantly during development.
- API Endpoints: Defined and served via Express, prefixed with /api/.
- Production Ready: Includes Dockerfile and options for binary deployment.

## Chart Properties System

The project includes a robust, normalized chart property system:
- Consistent base properties for all visualizations.
- Type-specific properties for each chart type.
- Logical property grouping (base, typography, color, animation, etc.).
- Type safety with strict interfaces and property validation.
- Centralized property management with migration support from legacy systems.
- Dynamic property panels in the UI, showing only applicable properties.

## Example Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components
├── components/ui/        # UI component library
└── global.css            # Theme and styles

server/                   # Express API backend
├── index.ts              # Server setup
└── routes/               # API handlers

shared/                   # Shared TypeScript types
└── api.ts                # API interfaces
```

## Development

```bash
npm run dev        # Start dev server (client + server)
npm run build      # Production build
npm run start      # Start production server
npm run typecheck  # TypeScript validation
npm test           # Run Vitest tests
```

## Deployment

- Standard: npm run build + npm start
- Docker: Dockerfile included
- Binary: Self-contained executables for Linux, macOS, Windows
