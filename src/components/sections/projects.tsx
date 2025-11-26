import Image from 'next/image';
import SectionHeader from './section-header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    id: 'project-astu',
    title: 'ASTU Exam App',
    description: 'A mobile application designed to help students prepare for university entrance exams with practice tests, study materials, and performance analytics.',
    features: 'Real-time scoring, question bank, progress tracking.',
    impact: 'Improved student preparedness and exam scores.',
    tags: ['Mobile App', 'Flutter', 'Firebase'],
  },
  {
    id: 'project-store',
    title: 'Store Management System',
    description: 'A comprehensive web-based platform for retail owners to manage inventory, sales, and customer data efficiently.',
    features: 'Inventory tracking, sales analytics, CRM.',
    impact: 'Streamlined store operations and increased profitability.',
    tags: ['Web App', 'Next.js', 'Firestore'],
  },
  {
    id: 'project-portfolio',
    title: 'Portfolio Websites',
    description: 'Stunning, responsive portfolio websites for creatives and professionals to showcase their work and attract clients.',
    features: 'Dynamic galleries, contact forms, SEO optimization.',
    impact: 'Enhanced online presence and client acquisition.',
    tags: ['Web Design', 'Next.js', 'Figma'],
  },
  {
    id: 'project-graphics',
    title: 'Graphic Design Projects',
    description: 'A collection of branding and graphic design work, including logos, marketing materials, and social media campaigns for various clients.',
    features: 'Brand identity, digital illustration, print design.',
    impact: 'Elevated brand perception and marketing effectiveness.',
    tags: ['Branding', 'Adobe Suite', 'Figma'],
  },
  {
    id: 'project-utility',
    title: 'Mobile Utility Tools',
    description: 'A suite of lightweight and practical utility apps for everyday tasks, focusing on simplicity and user experience.',
    features: 'Task managers, note-taking, system cleaners.',
    impact: 'Increased user productivity on mobile devices.',
    tags: ['Mobile App', 'Dart', 'Utility'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Our Projects"
          subtitle="A glimpse into the innovative solutions we've successfully delivered."
        />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.id);
            return (
              <Card key={project.title} className="flex flex-col overflow-hidden group">
                {projectImage && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={projectImage.imageUrl}
                      alt={projectImage.description}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={projectImage.imageHint}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <p className="mt-2 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Features:</span> {project.features}</p>
                  <p className="mt-2 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Impact:</span> {project.impact}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
