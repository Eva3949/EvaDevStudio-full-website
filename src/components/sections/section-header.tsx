import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  title: string;
  subtitle: string;
  className?: string;
};

export default function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('mx-auto max-w-3xl text-center', className)}>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}
