'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const robotImage = PlaceHolderImages.find(p => p.id === 'robot-gif');

  return (
    <section id="home" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-in-out"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="max-w-3xl text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline text-white">
                Crafting Digital Excellence.
                <br />
                <span className="text-primary">Built on Innovation.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-neutral-300 md:text-xl">
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
            <div className="hidden md:flex justify-center items-center">
              {robotImage && (
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <Image
                    src={robotImage.imageUrl}
                    alt={robotImage.description}
                    fill
                    className="object-contain"
                    unoptimized // Important for GIFs
                    data-ai-hint={robotImage.imageHint}
                  />
                </div>
              )}
            </div>
        </div>
      </div>
    </section>
  );
}
