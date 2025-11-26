import { Target, Eye } from 'lucide-react';
import SectionHeader from './section-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    name: 'Our Mission',
    description: 'To empower users and businesses with high-quality, fast, scalable, and creative digital products.',
    icon: Target,
  },
  {
    name: 'Our Vision',
    description: 'To become a leading global tech studio known for innovation and design excellence.',
    icon: Eye,
  },
];

export default function MissionVision() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Who We Are"
          subtitle="Driving the future of digital experiences with passion and precision."
        />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.name} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="m-0">{feature.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-base leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
