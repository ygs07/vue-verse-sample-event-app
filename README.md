# VueEvent Registration

A Sample premium, high-performance event registration platform built with **Vue 3**, **TypeScript**, and **Tailwind CSS v4**. This application demonstrates modern Vue patterns, including composables for state management, persistence via local storage, and a robust component-based architecture.

## Key Features

- **Modular UI Library**: Custom-built reusable components including `AppButton`, `AppModal`, `AppInput`, `AppProgress`, and `AppBackButton`.
- **Adaptive Registration**: Smart forms that toggle between Attendee and Speaker roles, with custom fields for talk details and social handles.
- **Persistence Engine**: Powered by `VueUse` to save form drafts in real-time, preventing data loss on accidental refreshes.
- **Authentication Layer**: A lightweight auth system that filters the event list to show only the events a user has registered for.
- **Business Logic**: Centralized state management via the `useVueEvents` composable, handling capacity tracking and asynchronous data fetching.
- **Premium Aesthetics**: Modern design system using the _Outfit_ font, Vue-signature emerald gradients, and smooth micro-animations.

## Technology Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first, zero-runtime)
- **Logic**: [VueUse](https://vueuse.org/) (useStorage for persistence)
- **Routing**: [Vue Router 5](https://router.vuejs.org/)
- **Tooling**: [Vite](https://vitejs.dev/) & [TypeScript](https://www.typescriptlang.org/)

## Project Structure

```text
src/
├── assets/          # Global styles & design tokens
├── components/      # UI & Feature components
│   └── UI/          # Reusable design system components
├── composables/     # Business logic & Auth state
├── data/            # Mock event data
├── router/          # Application routing
├── types/           # Strict TypeScript interfaces
└── views/           # Page-level components
```

## Getting Started

1.  **Clone & Install**

    ```sh
    npm install
    ```

2.  **Run Development Server**

    ```sh
    npm run dev
    ```

3.  **Build for Production**
    ```sh
    npm run build
    ```

## Validation & Logic

The app includes built-in validation for:

- Valid email formats (Regex).
- Duplicate registration prevention for the same event.
- Event capacity tracking (Max 20 attendees).
- Required speaker details (Talk topic & description).

---

Built with ❤️ using the simplicity and power of **Vue.js**.
