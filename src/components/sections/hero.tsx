
'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';

export default function Hero() {
  const heroImages = PlaceHolderImages.filter(p => p.id.startsWith('hero'));

  return (
    <section id="home" className="relative w-full pt-20">
       <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="absolute inset-0 w-full h-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                priority={index === 0}
                data-ai-hint={image.imageHint}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-1 gap-8 items-center min-h-[calc(90vh-5rem)] py-12 md:py-20">
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
      </div>
    </section>
  );
}
