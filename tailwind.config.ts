import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#293275",
        secondary: "#2C9CDB",
        textgray: "#898989",
        disableGray: "#C1C1C1",
        borderColor: "#E2E2E2",
        textColor: "#363636",
        success: "#5CBD76",
      },
      border: {
        1: "1px",
        3: "3px",
      },
      screens:{
        '3xl': '1920px',
      }
    },
  },
  plugins: [],
} satisfies Config;
