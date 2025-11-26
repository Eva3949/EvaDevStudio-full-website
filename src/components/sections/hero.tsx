import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <section id="home" className="relative h-[90vh] min-h-[700px] w-full pt-20">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
      <div className="container relative mx-auto flex h-full items-center px-4 md:px-6">
        <div className="max-w-3xl text-left">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Crafting Digital Excellence.
            <br />
            <span className="text-primary">Built on Innovation.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80 md:text-xl">
            Welcome to EvaDevStudio, where cutting-edge technology meets creative design. We specialize in mobile app development, web development, and stunning graphics design. Our portfolio, running on Firebase Studio AI + Next.js, is a testament to our commitment to speed, performance, and modern aesthetics.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button asChild size="lg">
              <Link href="#projects">Our Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
