<h1 align="center">🥭 Mangoo Juice — Alphanso Mango</h1>

<p align="center">
  <em>A cinematic, scroll-driven product experience for the world's finest cold-pressed mango juice.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
</p>

<p align="center">
  <a href="https://github.com/NikulGoyani369/mangoo-juice">
    <img src="https://img.shields.io/github/stars/NikulGoyani369/mangoo-juice?style=social" />
  </a>
  &nbsp;
  <a href="https://github.com/NikulGoyani369/mangoo-juice/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
  </a>
</p>

---

## ✨ Overview

**Mangoo Juice** is a premium, Apple-inspired product showcase built with pure HTML, CSS, and JavaScript. It features a **200-frame cinematic scroll animation** that plays as you scroll down the page — just like the iPhone product pages — combined with a rich set of interactive UI features.

Designed for **Raw Pressery's Alphanso Mango** cold-pressed juice, every pixel of this site was crafted to communicate luxury, purity, and freshness.

---

## 🎬 Features

| Feature | Description |
|---|---|
| 🎞️ **Cinematic Scroll Animation** | 200 HD frames play in sync with the user's scroll, creating a smooth, Apple-style product reveal |
| 🌙 **Dark / Light Mode** | Full theme switching via CSS custom properties — the entire page, canvas, and vignette adapt instantly |
| 🛒 **Cart System** | Add bottles to cart with a live badge counter in the navigation |
| ➕➖ **Quantity Stepper** | Choose how many bottles to add before committing to cart |
| 🍊 **Toast Notifications** | Premium spring-animated popup confirms when items are added to cart |
| ⭐ **Star Rating** | Interactive 5-star rating widget with custom label feedback messages |
| 🎵 **Energetic Soundtrack** | Toggle an upbeat background music track via the Sound button in the nav |
| 🖱️ **Magnetic Fluid Cursor** | A custom LERP-animated cursor that expands and magnetically attracts nearby elements |
| 📢 **Drifting Marquee** | Infinite scrolling product claims banner above the footer |
| ⚡ **8K Film Grain Overlay** | SVG-based noise filter adds a premium cinematic texture to the entire page |
| 💾 **Persistent Dark Mode** | User's theme preference is saved to `localStorage` and restored on next visit |

---

## 🗂️ Project Structure

```
mangoo-juice/
│
├── index.html            # Main HTML — structure, CSS, and layout
├── main.js               # All JavaScript logic (9 modules)
├── main.test.js          # Jest test suite (27 tests, 7 suites)
├── jest.config.js        # Jest configuration (jsdom environment)
├── package.json          # Project metadata & npm scripts
│
├── ezgif-frame-001.jpg   # ┐
├── ezgif-frame-002.jpg   # │  200-frame cinematic scroll sequence
├── ...                   # │  (JPG image frames, played on scroll)
├── ezgif-frame-200.jpg   # ┘
│
├── mango_bg.png          # Background mango image asset
├── mango_bottle.png      # Product bottle image
├── mango_leaf.png        # Decorative mango leaf
├── mango_slice.png       # Mango slice image
│
└── .gitignore            # Excludes node_modules, logs, temp files
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox, Safari)
- [Node.js](https://nodejs.org/) ≥ 16 (only needed for running tests)

### Run Locally

Simply open `index.html` in your browser:

```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

> ℹ️ For the cinematic scroll animation to work, all 200 `ezgif-frame-*.jpg` files must be in the same directory as `index.html`.

---

## 🧪 Running Tests

This project uses **Jest** with `jest-environment-jsdom` for browser-like DOM testing.

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npm test
```

### Test Suites

| Suite | Tests | What it covers |
|---|---|---|
| Core DOM Presence | 4 | Cursor, loader, canvas, magnetic elements |
| Audio Toggle | 3 | Icon state, class switching on play/pause |
| Quantity Stepper | 4 | Increment, decrement, floor at 1 |
| Cart System | 4 | Badge visibility, count accumulation |
| Toast Notification | 3 | Show on add, message content |
| Star Rating | 4 | Activation, label updates |
| Dark Mode Toggle | 5 | Class toggle, localStorage persistence |

**Total: 27 tests — all passing ✅**

---

## 🎨 Design System

### Color Tokens (CSS Custom Properties)

```css
:root {
    --color-bg:        #fdfcf9;   /* Warm cream background    */
    --color-text:      #1a0f05;   /* Rich dark brown text     */
    --color-btn-bg:    #1a0f05;   /* CTA button background    */
    --color-nav-bg:    rgba(253,252,249,0.90); /* Frosted nav */
}

body.dark-mode {
    --color-bg:        #0d0905;   /* Deep dark background     */
    --color-text:      #fdfcf9;   /* Cream text               */
    --color-btn-bg:    #fdf5ec;   /* Inverted CTA button      */
    --color-nav-bg:    rgba(13,9,5,0.95); /* Dark frosted nav  */
}
```

### Typography

- **Display / Hero**: Playfair Display (Serif) — italic, heavy weight
- **Body / UI**: Inter (Sans-serif) — clean, modern

---

## 🧠 Architecture

The JavaScript is organized into **9 self-contained modules** inside `main.js`:

```
1. Magnetic Fluid Cursor   — LERP-animated custom cursor with magnetic attraction
2. Energetic Soundtrack    — HTML Audio toggle with play/pause state
3. Loader & Sequencer      — Image preloader with % progress + scroll-driven frame renderer
4. Cart System             — Item count state + badge DOM updates
5. Toast Notification      — Spring-physics popup with auto-dismiss timer
6. Quantity Stepper        — Min-clamped integer counter
7. Add to Cart             — Wires cart + toast + quantity together
8. Star Rating             — 5-star interactive widget with label messages
9. Dark Mode Toggle        — CSS variable switcher with localStorage persistence
```

---

## 📸 Screenshots

> Scroll through the experience — it's best seen live!

| Light Mode | Dark Mode |
|---|---|
| Warm cream cinematic theme | Deep dark immersive theme |

---

## 👤 Author

**Nikul Goyani**

- GitHub: [@NikulGoyani369](https://github.com/NikulGoyani369)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and share.

---

<p align="center">
  Made with ♥ by Nikul Goyani &nbsp;·&nbsp; Powered by pure HTML, CSS & JavaScript
</p>
