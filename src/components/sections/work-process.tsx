import SectionHeader from './section-header';
import { Lightbulb, LayoutTemplate, Code, FlaskConical, Rocket } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const processSteps = [
  {
    name: '1. Idea & Planning',
    description: 'We start by understanding your vision, defining goals, and creating a strategic roadmap for success.',
    icon: Lightbulb,
  },
  {
    name: '2. UI/UX Design',
    description: 'Our design team crafts intuitive and beautiful interfaces that provide an exceptional user experience.',
    icon: LayoutTemplate,
  },
  {
    name: '3. Development',
    description: 'Using agile methodologies, our developers write clean, efficient code to bring your designs to life.',
    icon: Code,
  },
  {
    name: '4. Testing',
    description: 'Rigorous testing ensures your product is bug-free, performant, and secure across all devices.',
    icon: FlaskConical,
  },
  {
    name: '5. Launch & Support',
    description: 'We handle the deployment process and provide ongoing support to ensure your product thrives.',
    icon: Rocket,
  },
];

export default function WorkProcess() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'work-process-bg');

  return (
    <section id="process" className="relative py-24 sm:py-32">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container relative mx-auto px-4 md:px-6">
        <SectionHeader
          title="Our Work Process"
          subtitle="A streamlined and transparent workflow designed for efficiency and quality."
        />
        <div className="relative mt-16 max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border/30 hidden sm:block"></div>
          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div
                key={step.name}
                className="relative flex items-start gap-6"
              >
                <div className="hidden sm:flex absolute top-1 -left-px -translate-x-1/2 bg-background p-1 rounded-full border">
                  <div className="h-3 w-3 bg-primary rounded-full"></div>
                </div>
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg w-fit h-fit mt-1 sm:ml-14">
                    <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-card-foreground">{step.name}</h3>
                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
