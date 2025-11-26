import Hero from '@/components/sections/hero';
import MissionVision from '@/components/sections/mission-vision';
import Services from '@/components/sections/services';
import Projects from '@/components/sections/projects';
import Technologies from '@/components/sections/technologies';
import WorkProcess from '@/components/sections/work-process';
import Founder from '@/components/sections/founder';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <Hero />
      <MissionVision />
      <Services />
      <Projects />
      <Technologies />
      <WorkProcess />
      <Founder />
      <Contact />
    </>
  );
}
