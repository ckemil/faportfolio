import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import About from "@/components/home/About";
import Stack from "@/components/home/Stack";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top" className="ds-stack">
      <Hero />
      <Projects />
      <About />
      <Stack />
      <Footer />
    </main>
  );
}
