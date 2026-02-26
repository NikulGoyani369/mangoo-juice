<h1 align="center">🥭 Mangoo Juice — Alphonso Mango</h1>

<p align="center">
  <em>An Awwwards-worthy, cinematic product experience for the world's finest cold-pressed mango juice.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" />
</p>

<p align="center">
  <a href="https://github.com/NikulGoyani369/mangoo-juice">
    <img src="https://img.shields.io/github/stars/NikulGoyani369/mangoo-juice?style=social" />
  </a>
  &nbsp;
  <a href="https://github.com/NikulGoyani369/mangoo-juice/actions/workflows/deploy.yml">
    <img src="https://github.com/NikulGoyani369/mangoo-juice/actions/workflows/deploy.yml/badge.svg" />
  </a>
  &nbsp;
  <a href="https://github.com/NikulGoyani369/mangoo-juice/actions/workflows/browser-tests.yml">
    <img src="https://github.com/NikulGoyani369/mangoo-juice/actions/workflows/browser-tests.yml/badge.svg" />
  </a>
</p>

---

## ✨ Overview

**Mangoo Juice** is a premium, Apple-inspired e-commerce SPA built with **React**, **TypeScript**, and **Framer Motion**. It features a stunning **200-frame cinematic scroll animation** powered by HTML5 Canvas that plays in sync with the user's scroll. 

Originally built in vanilla HTML/JS, it has now been fully architected into a scalable React application featuring global state, end-to-end browser testing, full SEO capabilities, a persistent cart, and geolocation-based pricing.

[**View Live Demo**](https://nikulgoyani369.github.io/mangoo-juice/)

---

## 🎬 Elite Features

| Feature | Description |
|---|---|
| 🎞️ **Cinematic Scroll** | Highly-optimized 200 HD frame Canvas sequence tied directly to scroll progress |
| 🪄 **Page Transitions** | Bespoke cinematic cubic-bezier route transitions powered by Framer Motion |
| 🌍 **Geo-Pricing** | Uses `ipapi` to detect user region and dynamically localize checkout pricing (₹, $, £, €) |
| 🌙 **Seamless Dark Mode** | Context-aware dark/light modes managed globally, instantly adapting UI shadows and colors |
| ⚡ **Offline PWA** | Web App Manifest and Service Workers (via `vite-plugin-pwa`) cache assets for instant/offline loading |
| 🛒 **Persistent Cart** | Integrated cart logic backed deeply by `localStorage` to never lose an order |
| 🔍 **Interactive 3D Modal** | "Brutalist" interactive nutrition label flip card utilizing spring-physics |
| 📱 **Sticky Mobile Buy Bar** | Framer Motion-powered glassmorphic bar that appears contextually for instant checkout |
| 📧 **Formspree Checkout** | Fully functional and validated checkout process mapping directly to email ingestion |
| 🎯 **Insane SEO** | Granular Page-level `Helmet` tags, OpenGraph Cards, and explicit `JSON-LD` Product Schema schemas |

---

## 🗂️ Project Structure

```bash
mangoo-juice/
├── src/
│   ├── components/      # Modular React Components (Nav, Modal, Cursor)
│   ├── hooks/           # Custom State logic (useCart, useDarkMode)
│   ├── pages/           # High-level Views (HomePage, StoryPage)
│   ├── constants/       # Global configuration and Tailwind theme config
│   ├── tests/           # Vitest Unit and Hook tests
│   ├── App.tsx          # Application Root and Framer Motion router
│   └── main.tsx         # React DOM Entry and Helmet Provider
├── e2e/                 # Playwright UI browser tests
├── public/              # Static Assets and 200 Cinematic JPG Frames
├── .github/workflows/   # CI/CD pipelines (GitHub Pages + E2E Tests)
└── tailwind.config.js   # Custom font, styling, and dark mode configs
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ 
- `npm`

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NikulGoyani369/mangoo-juice.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vite Dev Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to view the application.

---

## 🧪 Testing

This robust project runs on dual testing frameworks spanning from component unit tests up to fully headed Chromium instances.

### Unit Tests (Vitest & React Testing Library)
Run extremely fast suite of DOM and Hook unit tests verifying cart logic, geolocation math, and component mounting:
```bash
npm run test
```

### End-To-End Browser Tests (Playwright)
Run the headless browser UI interactions traversing pages, filling out forms, checking dark mode localStorage, and completing Checkouts:
```bash
npm run test:e2e
```

---

## 🎨 Tech Stack Breakdown

- **Core:** React 18
- **Language:** TypeScript 5
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **Head/SEO:** React Helmet Async
- **Testing:** Playwright & Vitest
- **Routing:** React Router DOM

---

## 👤 Author

**Nikul Goyani**

- GitHub: [@NikulGoyani369](https://github.com/NikulGoyani369)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and share.

---

<p align="center">
  Made with ♥ by Nikul Goyani &nbsp;·&nbsp; Powered by React and Framer Motion
</p>
