import type { Metadata } from "next";
import { Inter, Fraunces, DM_Mono, Space_Grotesk, Lato } from "next/font/google";
import "./globals.css";
import "../styles/tokens.css";
import "../styles/ds.css";
import "../styles/aptyread.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
// Only used inside the AptyRead case study (.apty-scope).
const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-lato" });

export const metadata: Metadata = {
  metadataBase: new URL("https://uixfathima.com"),
  title: "Fathima P",
  description:
    "I am an experienced Product Designer. Focused on UI Design, Mobile and Web Design, Interactive Prototypes, and more.",
  openGraph: {
    title: "Fathima P",
    description:
      "I am an experienced Product Designer. Focused on UI Design, Mobile and Web Design, Interactive Prototypes, and more.",
    url: "https://uixfathima.com",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${dmMono.variable} ${spaceGrotesk.variable} ${lato.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
