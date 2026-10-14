import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Runner from "@/components/playground/Runner";

export const metadata: Metadata = {
  title: "Playground Jump — Learn Product Design by Playing",
  description:
    "Playground Jump is a free endless-runner browser game by UI/UX designer Fathima Ibrahim: jump between platforms, collect design elements and beat your high score.",
  alternates: { canonical: "/playground" },
};

export default function PlaygroundPage() {
  return (
    <main id="top" className="pj-page">
      <Nav />
      <div className="pj">
        <section className="pj-panel pj-play">
          <Runner />
        </section>
        <p className="pj-foot">Jump between playground platforms, collect design elements and beat your high score.</p>
      </div>
    </main>
  );
}
