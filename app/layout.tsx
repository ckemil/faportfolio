import type { Metadata } from "next";
import { Lato, Noto_Kufi_Arabic } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import Nav from "@/components/Nav";
import "../styles/tokens.css";
import "../styles/ds.css";
import "./globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-lato" });
const kufi = Noto_Kufi_Arabic({ subsets: ["arabic"], weight: ["700"], variable: "--font-kufi" });

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
    <html lang="en" className={`${lato.variable} ${kufi.variable}`}>
      <body>
        <MotionProvider>
          <Nav />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
