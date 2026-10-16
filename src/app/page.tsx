import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
