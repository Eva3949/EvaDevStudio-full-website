'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import SectionHeader from './section-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';
import { Loader2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const initialState = { success: false, message: '' };
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Oops!',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Get in Touch"
          subtitle="Have a project in mind? We'd love to hear from you. Let's create something amazing together."
        />
        <div className="mt-16 mx-auto max-w-xl">
          <Card>
            <CardContent className="p-8">
              <form ref={formRef} action={formAction} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="name" name="name" placeholder="Your Name" required className="pl-10" />
                </div>
                <div className="relative">
                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" name="email" type="email" placeholder="Your Email" required className="pl-10" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="phone" name="phone" type="tel" placeholder="Your Phone (Optional)" className="pl-10" />
                </div>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Textarea id="message" name="message" placeholder="Your Message" rows={6} required className="pl-10 pt-2" />
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
