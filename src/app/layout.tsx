import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";
const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-body" });
export const metadata: Metadata = {
  title: { default: "Zaheer Seed Corporation | Seed Breeding, Processing and Distribution", template: "%s | Zaheer Seed Corporation" },
  description: "Crop seed breeding, processing and distribution from Kasur, Pakistan.",
};
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
