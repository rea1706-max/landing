export type Language = 'ru' | 'en';

export interface TranslationContent {
  nav: {
    brand: string;
    brandSub: string;
    details: string;
    availability: string;
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    description: string;
    exploreCta: string;
    availabilityCta: string;
    meta: string;
    imageAlt: string;
  };
  composition: {
    arches: {
      number: string;
      topic: string;
      title: string;
      description: string;
      spec: string;
      imageAlt: string;
    }[];
  };
  objectStory: {
    title: string;
    dayBody: string;
    nightBody: string;
    detailsLabel: string;
    details: { title: string; description: string }[];
  };
  final: {
    brand: string;
    statement: string;
    cta: string;
    inquiryTitle: string;
    nameLabel: string;
    contactLabel: string;
    submitLabel: string;
    successTitle: string;
    successBody: string;
    privacyNote: string;
    closeLabel: string;
  };
  footer: {
    copyright: string;
    details: string;
    availability: string;
  };
}
