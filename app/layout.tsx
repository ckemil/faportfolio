import type { Metadata } from "next";
import { Inter, Fraunces, DM_Mono, Space_Grotesk, Lato, Manrope, Caveat, Lalezar, Instrument_Serif, Raleway, Outfit } from "next/font/google";
import "./globals.css";
import "../styles/tokens.css";
import "../styles/ds.css";
import "../styles/aptyread.css";
import "../styles/aicompanion.css";
import "../styles/erp.css";
import "../styles/wid.css";
import "../styles/fpp.css";
import "../styles/kitaab.css";
import "../styles/playground.css";
import Loader, { loaderSkipScript } from "@/components/Loader";
import { SITE_URL } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Primary UI/display face for the site-wide design system.
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-manrope" });
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
// Home hero only: handwritten "my name is" and the chunky Arabic display name.
const caveat = Caveat({ subsets: ["latin"], weight: ["500"], variable: "--font-hand" });
// WID case study only: display serif + UI sans from its Figma file.
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument" });
const raleway = Raleway({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-raleway" });
// Outfit: the Financial Partner Platform specimen and the Doodle Dash game.
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-outfit" });
const lalezar = Lalezar({ subsets: ["arabic", "latin"], weight: "400", variable: "--font-display" });

const TITLE = "Fathima Ibrahim — UI/UX Designer in UAE | Product Designer";
const DESCRIPTION =
  "Fathima Ibrahim is a Senior UI/UX Designer in the UAE designing web and mobile products — fintech, enterprise ERP, AI and e-commerce. View UX case studies and design work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Fathima Ibrahim, UI/UX Designer UAE" },
  description: DESCRIPTION,
  keywords: [
    "UI/UX Designer UAE",
    "UI UX Designer Dubai",
    "UX Designer UAE",
    "Product Designer UAE",
    "Senior UI/UX Designer",
    "Mobile app designer UAE",
    "UX case studies",
    "Fathima Ibrahim",
  ],
  authors: [{ name: "Fathima Ibrahim", url: SITE_URL }],
  creator: "Fathima Ibrahim",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Fathima Ibrahim — UI/UX Designer",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_AE",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/** Structured data so search engines understand who the site is about and where she works. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Fathima Ibrahim",
      jobTitle: "Senior UI/UX Designer",
      description: DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/images/YgxBe7wgNd93XD54nNj4qVCKM.jpeg`,
      email: "mailto:fathimap02@gmail.com",
      address: { "@type": "PostalAddress", addressCountry: "AE" },
      areaServed: ["United Arab Emirates", "Middle East"],
      knowsAbout: ["UI design", "UX design", "Product design", "Design systems", "Interaction design", "Mobile app design", "UX research"],
      sameAs: ["https://www.linkedin.com/in/fathima98/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Fathima Ibrahim — UI/UX Designer in UAE",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${fraunces.variable} ${dmMono.variable} ${spaceGrotesk.variable} ${lato.variable} ${caveat.variable} ${lalezar.variable} ${instrument.variable} ${raleway.variable} ${outfit.variable}`}
      // browser extensions (e.g. QuillBot) add attributes to <html> before React hydrates
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: loaderSkipScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Loader />
        {children}
      </body>
    </html>
  );
}
