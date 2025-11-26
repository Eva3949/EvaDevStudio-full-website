import Image from 'next/image';
import SectionHeader from './section-header';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Founder() {
  const founderImage = PlaceHolderImages.find(p => p.id === 'founder');

  return (
    <section id="founder" className="py-24 sm:py-32 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Meet Our Founder"
          subtitle="The visionary leader behind EvaDevStudio's success."
        />
        <div className="mt-16">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div className="md:col-span-2">
                <CardContent className="p-8 md:p-12 flex flex-col justify-center h-full">
                  <h3 className="text-2xl font-bold font-headline">Samuel Tenkir</h3>
                  <p className="mt-1 text-primary font-medium">Founder &amp; CEO</p>
                  <p className="mt-6 text-base leading-7 text-muted-foreground">
                    Samuel Tenkir is a passionate technologist and creative thinker with extensive experience in mobile app development, web platforms, and graphics design. As the founder of EvaDevStudio, he leads a talented team with a focus on innovation, clean code, and uncompromising quality.
                  </p>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    His leadership style is rooted in a collaborative spirit, empowering his team to push creative boundaries and deliver products that not only meet but exceed client expectations. Samuel believes in building digital solutions that are both functional and beautiful, driving tangible results for businesses and delightful experiences for users.
                  </p>
                </CardContent>
              </div>
              <div className="md:col-span-1 md:order-first">
                {founderImage && (
                  <div className="relative h-full min-h-[300px] w-full">
                    <Image
                      src={founderImage.imageUrl}
                      alt={founderImage.description}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      data-ai-hint={founderImage.imageHint}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
