import SectionHeader from './section-header';
import { Card, CardContent } from '@/components/ui/card';

const technologies = [
    { name: "Next.js" },
    { name: "Firebase" },
    { name: "Flutter" },
    { name: "Dart" },
    { name: "TypeScript" },
    { name: "HTML/CSS/JS" },
    { name: "Adobe Suite" },
    { name: "Figma" },
    { name: "Genkit AI" },
    { name: "React" },
    { name: "Node.js" },
    { name: "Tailwind CSS" },
];

export default function Technologies() {
  return (
    <section id="tech" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Technologies We Use"
          subtitle="Leveraging the best tools and frameworks to build robust and modern applications."
        />
        <div className="mt-16">
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <Card key={tech.name} className="p-4 bg-card hover:bg-secondary transition-colors cursor-default">
                  <CardContent className="p-0">
                      <p className="text-base font-medium text-center">{tech.name}</p>
                  </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
