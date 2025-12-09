// tailwind.config.ts
import type { Config } from "tailwindcss";

const config = {
  // ... tu configuración actual ...
  theme: {
    extend: {
      fontFamily: {
        // Conectamos con las variables de Next.js
        sans: ["var(--font-opensans)", "sans-serif"],
        title: ["var(--font-montserrat)", "sans-serif"],
      },
      colors: {
        // Colores Oficiales Gob.mx
        gob: {
          red: "#9D2449",     // Guinda oficial
          gold: "#BC955C",    // Dorado
          grey: "#545454",    // Gris texto oscuro
          light: "#F5F5F5",   // Gris fondo claro
          green: "#13322B",   // Verde oscuro (headers/footers)
          link: "#007bff",    // Azul enlaces (estándar accesible)
        },
        // Mantenemos tus configuraciones de shadcn/ui...
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... resto de colores shadcn
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;