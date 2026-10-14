import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Radar from "@/components/Radar";
import HomeFooter from "@/components/HomeFooter";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      <Hero />
      <Projects />
      <About />
      <Stack />
      <Radar />
      <HomeFooter />
    </main>
  );
}
