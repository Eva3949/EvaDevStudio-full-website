import { Smartphone, Monitor, Palette } from 'lucide-react';
import SectionHeader from './section-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    name: 'Mobile Application Development',
    description: 'We build beautiful, high-performance native and cross-platform mobile apps for iOS and Android that deliver engaging user experiences. Our agile process ensures your app is scalable, secure, and ready to conquer the market.',
    icon: Smartphone,
  },
  {
    name: 'Web Development',
    description: 'Leveraging the power of Next.js and Firebase, we create lightning-fast, SEO-friendly, and scalable web applications. From e-commerce platforms to complex dashboards, we deliver robust solutions tailored to your business needs.',
    icon: Monitor,
  },
  {
    name: 'Graphics & Brand Design',
    description: 'Our creative team crafts compelling visual identities that tell your brand’s story. We offer a full suite of design services, including logos, branding, UI/UX design, and marketing materials that captivate and convert.',
    icon: Palette,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Our Services"
          subtitle="We deliver a comprehensive suite of digital services to bring your vision to life."
        />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <CardHeader>
                <div className="mb-4 bg-primary/10 p-3 rounded-lg w-fit">
                    <service.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
