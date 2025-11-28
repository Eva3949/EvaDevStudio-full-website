import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from './section-header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 'project-astu',
    title: 'ASTU Exam App',
    description: 'A mobile application designed to help students prepare for university entrance exams with practice tests, study materials, and performance analytics.',
    features: 'AI ASSISTANT and Exam solver , E-student portal , GPA Calculater , c++/python code runner and Each Exam Answer with Explantion',
    impact: 'Improved student preparedness and exam scores.',
    tags: ['Mobile App', 'Flutter', 'DART','SQL'],
    link: '#',
  },
  {
    id: 'project-store',
    title: 'Official ASTU Exam App Landing Page & APK Download Website',
    description: 'I developed the official, high-conversion landing page for the ASTU Exam mobile application. The websites primary goal was to clearly showcase the apps key features, visuals, and benefits, and provide a direct, secure link for users to download the Android APK file. I focused on responsive design, quick loading speed, and clear Call-to-Action (CTA) integration. ',
    features: 'Landing Page , APK Download Website',
    impact: 'Enhanced user engagement and conversion.',
    tags: ['Web Development', 'Next.js','App Dev'],
    link: 'http://astuexam.netlify.app/',
  },
  {
    id: 'project-portfolio',
    title: 'Portfolio Websites',
    description: 'Stunning, responsive portfolio websites for creatives and professionals to showcase their work and attract clients.',
    features: 'Dynamic galleries, contact forms, SEO optimization.',
    impact: 'Enhanced online presence and client acquisition.',
    tags: ['Web Design', 'Next.js', 'Figma'],
    link: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Our Projects"
          subtitle="A glimpse into the innovative solutions we've successfully delivered."
        />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.id);
            return (
              <Card key={project.title} className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
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
                <CardFooter className="flex-wrap justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                  </div>
                  <Button asChild size="sm" className="mt-4">
                    <Link href={project.link}>
                      View Site
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
