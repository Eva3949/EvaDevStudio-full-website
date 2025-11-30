import Hero from '@/components/sections/hero';
import MissionVision from '@/components/sections/mission-vision';
import Services from '@/components/sections/services';
import Projects from '@/components/sections/projects';
import Technologies from '@/components/sections/technologies';
import WorkProcess from '@/components/sections/work-process';
import Founder from '@/components/sections/founder';
import AnimatedSection from '@/components/animated-section';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <Hero />
      <AnimatedSection>
        <MissionVision />
      </AnimatedSection>
      <AnimatedSection>
        <Services />
      </AnimatedSection>
      <AnimatedSection>
        <Projects />
      </AnimatedSection>
      <AnimatedSection>
        <Technologies />
      </AnimatedSection>
      <AnimatedSection>
        <WorkProcess />
      </AnimatedSection>
      <AnimatedSection>
        <Founder />
      </AnimatedSection>
      <AnimatedSection>
        <Contact />
      </AnimatedSection>
    </>
  );
}
