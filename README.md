# 3D Developer Portfolio

A premium, high-performance personal portfolio website built with Next.js 14, featuring advanced 3D animations, interactive elements, and a modern "Apple-style" aesthetic.

## 🚀 Tech Stack

### Core Framework
- **[Next.js 14](https://nextjs.org/)** (App Router) - React framework for production.
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking for robustness.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for styling.

### 3D & Animations
- **[React Three Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js (used for the 3D background).
- **[React Three Drei](https://github.com/pmndrs/drei)** - Useful helpers for R3F (OrbitControls, Float, MeshDistortMaterial).
- **[Framer Motion](https://www.framer.com/motion/)** - Powerful animation library for React (used for scroll animations, transitions).
- **[GSAP](https://gsap.com/)** - Professional-grade animation library (used for complex sequences).

### UI Components & Icons
- **[Shadcn UI](https://ui.shadcn.com/)** - Reusable components built with Radix UI and Tailwind.
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons.
- **[React Icons](https://react-icons.github.io/react-icons/)** - Comprehensive icon library (Fa, Si).

### Utilities
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Perfect dark/light mode support.
- **[Lottie React](https://lottiereact.com/)** - Lightweight vector animations.

## ✨ Key Features

1.  **Advanced 3D Background**:
    -   Implemented using **React Three Fiber**.
    -   Features floating geometric shapes (Spheres, Boxes, Torus) with `MeshDistortMaterial` for organic morphing effects.
    -   **Theme-Aware**: Colors adapt automatically to Dark (Cool Blues/Purples) and Light (Vibrant Golds/Greens) modes.
    -   **Performance Optimized**: Uses `dpr` scaling and efficient rendering settings.

2.  **Hero Section**:
    -   **Typewriter Effect**: Dynamic text animation for the name.
    -   **3D Tilt Card**: Interactive "Developer Card" that responds to mouse movement.
    -   **Scroll Parallax**: Elements move at different speeds on scroll using Framer Motion.

3.  **Interactive Tech Stack**:
    -   **Floating Icons**: 3D orbiting animation for skill icons.
    -   **Tooltips**: Hover effects revealing skill categories.

4.  **Project Showcase**:
    -   **Glassmorphism Cards**: Premium frosted glass effect.
    -   **Hover Effects**: Image scaling and detail reveals.

5.  **Contact Form**:
    -   **Animated Success State**: Smooth transition upon submission.
    -   **Validation**: Built-in form handling.

6.  **Global Theme Support**:
    -   Seamless toggle between Light, Dark, and System preferences.
    -   Persists user choice across sessions.

## 📂 Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with ThemeProvider & Background3D
│   ├── page.tsx         # Main homepage composition
│   └── globals.css      # Global styles & Tailwind directives
├── components/
│   ├── Background3D.tsx # R3F 3D Scene implementation
│   ├── Hero.tsx         # Hero section with Typewriter & Parallax
│   ├── TechStack.tsx    # Skills section with floating icons
│   ├── Projects.tsx     # Project case studies
│   ├── Contact.tsx      # Contact form
│   ├── Navbar.tsx       # Sticky navigation
│   ├── theme-provider.tsx # Next-themes wrapper
│   └── ui/              # Shadcn UI components (Button, Card, etc.)
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind configuration
```

## 🛠️ Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) (or 3001 if 3000 is busy).

3.  **Build for Production**:
    > **Note**: Stop the dev server before building to avoid file locks on Windows.
    ```bash
    npm run build
    npm start
    ```

## 🎨 Customization

-   **Colors**: Edit `app/globals.css` CSS variables for theme colors.
-   **3D Shapes**: Modify `components/Background3D.tsx` to change shapes, colors, or animation speeds.
-   **Content**: Update `components/` files to change text, links, and images.
