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
        secondary:"#2C9CDB",
        textgray:"#898989",
        success:"#5CBD76"
      },
      border:{
        "1":"1px",
        "2":"2px",
        "3":"3px",
        "4":"4px",
        "5":"5px",
        "6":"6px",
        "8":"8px",
        "10":"10px",
        "12":"12px",
        "16":"16px",
        "20":"20px",
        "24":"24px",
        "32":"32px",
        "40":"40px",
        "48":"48px",
        "56":"56px",
        "64":"64px",
        "72":"72px",
        "80":"80px",
        "96":"96px",
        "px":"1px",
        "0":"0px",
      }
    },
  },
  plugins: [],
} satisfies Config;
