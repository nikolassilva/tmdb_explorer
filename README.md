# TMDB Explorer

## Application overview

Web app to **explore movies** using [The Movie Database (TMDB) API v3](https://developers.themoviedb.org/3). You can browse **popular movies**, **search by title**, open **details** (overview, genres, rating, etc.), keep a **favorites list** persisted in the browser (`localStorage`), and **filter the home page by genre** (collapsible side menu on mobile). The main list supports **infinite scroll** loading.

## Tech stack

| Area | Technology |
|------|------------|
| Runtime / tooling | [Node.js](https://nodejs.org/) (18+ recommended) |
| UI framework | [React 18](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Bundler / dev server | [Vite 5](https://vite.dev/) |
| Routing | [React Router DOM 6](https://reactrouter.com/) |
| Global state (favorites) | [Context API](https://react.dev/reference/react/createContext) + `useReducer` |
| HTTP client | [Axios](https://axios-http.com/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Code quality | [ESLint 9](https://eslint.org/) + [typescript-eslint](https://typescript-eslint.io/) |
| Testing | [Jest](https://jestjs.io/) + [ts-jest](https://kulshekhar.github.io/ts-jest/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |

## How to run the app

### Prerequisites

- **Node.js 18** or newer (matches the current project setup)
- A TMDB account and **API key** from [themoviedb.org](https://www.themoviedb.org/) (**Settings → API**)

### Install

From the repository root:

```bash
npm install
```

### Environment variable

1. Copy the example file:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set your TMDB key (Vite requires the `VITE_` prefix):

   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

   Do not commit `.env` (it is already listed in `.gitignore`).

### NPM scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Vite dev server (usually `http://localhost:5173`). |
| `npm run build` | Production build (`tsc` + output in `dist`). |
| `npm run preview` | Serves the `dist` folder locally after a build. |
| `npm run lint` | Runs ESLint on the project. |
| `npm test` | Runs the Jest unit test suite. |
| `npm run test:serial` | Same tests in a single process (`jest --runInBand`), handy on low-resource machines. |

### Development

```bash
npm run dev
```

Open the URL printed in the terminal. Without a valid `VITE_TMDB_API_KEY`, the UI shows a notice and TMDB requests will not work.

### Production (local build)

```bash
npm run build
npm run preview
```

To deploy elsewhere, host the `dist` folder as a static site and configure environment variables for your platform (the TMDB key may be needed at build time or runtime depending on how you inject env vars).
