import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <section id="home" className="relative w-full pt-20">
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
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[calc(90vh-5rem)] py-12 md:py-20">
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
            <div className="hidden md:flex justify-center">
                <Image
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTdiNnZ0a3RncTU5ajJ1cjZ6bDBuYnVqcmN0NGE3djFvc2xnaG16YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/M9gbBd9hCsO5BAPZ8M/giphy.gif"
                    alt="Computer GIF"
                    width={500}
                    height={400}
                    className="rounded-lg shadow-2xl"
                    unoptimized
                />
            </div>
        </div>
      </div>
    </section>
  );
}