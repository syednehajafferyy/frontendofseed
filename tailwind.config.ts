import type { Config } from "tailwindcss";
export default { content: ["./src/**/*.{ts,tsx}"], theme: { extend: {
  colors: { forest: "#1F3D2B", olive: "#6B7340", paper: "#FAF7F0", sand: "#EAE2D0", soil: "#5A4A38", ink: "#25291F" },
  fontFamily: { display: ["var(--font-display)", "Georgia", "serif"], body: ["var(--font-body)", "system-ui", "sans-serif"] } } },
} satisfies Config;
