import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Projects />
      <About />
      <Stack />
      <Footer />
    </main>
  );
}
