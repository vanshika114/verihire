'use client';

import { useEffect } from 'react';
import { HeroSection } from '@/components/landing/hero-section';
import { ProblemSection } from '@/components/landing/problem-section';
import { SolutionSection } from '@/components/landing/solution-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { KeyFeaturesSection } from '@/components/landing/key-features-section';
import { ProductPreviewSection } from '@/components/landing/product-preview-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { FaqSection } from '@/components/landing/faq-section';
import { CtaSection } from '@/components/landing/cta-section';
import { TrustedBySection } from '@/components/landing/trusted-by-section';

export default function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const section = document.getElementById(hash);
    if (section) {
      window.requestAnimationFrame(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <TrustedBySection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <KeyFeaturesSection />
      <ProductPreviewSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
