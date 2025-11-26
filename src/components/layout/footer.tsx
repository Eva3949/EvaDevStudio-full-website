import Link from 'next/link';
import { Code, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">EvaDevStudio</span>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EvaDevStudio. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
