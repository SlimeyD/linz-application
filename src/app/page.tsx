import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { WhyLinz } from '@/components/why-linz';
import Prototype from '@/components/prototype';
import AiApproach from '@/components/ai-approach';
import { Experience } from '@/components/experience';
import { Projects } from '@/components/projects';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative z-0">
        <section id="about">
          <Hero />
        </section>
        <section id="why-linz">
          <WhyLinz />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="prototype">
          <Prototype />
        </section>
        <section id="approach">
          <AiApproach />
        </section>
      </main>
      <section id="contact">
        <Footer />
      </section>
    </>
  );
}
