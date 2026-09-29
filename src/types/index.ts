export type Language = 'ru' | 'en';

export interface TranslationContent {
  nav: {
    brand: string;
    brandSub: string;
    home: string;
    fragrance: string;
    object: string;
    composition: string;
    order: string;
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    cta: string;
    metaEdition: string;
    metaPlace: string;
    imageAlt: string;
  };
  composition: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    cta: string;
    noteStructure: string;
    arches: {
      step: string;
      title: string;
      notes: string[];
      description: string;
      imageAlt: string;
    }[];
  };
  objectStory: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    body1: string;
    body2: string;
    cta: string;
    labels: {
      peacocks: string;
      peacocksDesc: string;
      metal: string;
      metalDesc: string;
      vessel: string;
      vesselDesc: string;
    };
    storyLabel: string;
    storyTitle: string;
    storyBody: string;
    storyCta: string;
    archiveLabel: string;
    scrollLabel: string;
  };
  final: {
    brand: string;
    label: string;
    type: string;
    volume: string;
    summaryLine1: string;
    summaryLine2: string;
    summaryLine3: string;
    cta: string;
    inquiryTitle: string;
    nameLabel: string;
    contactLabel: string;
    submitLabel: string;
    successTitle: string;
    successBody: string;
    privacyNote: string;
    closeLabel: string;
    editionNote: string;
    specs: {
      origin: string;
      concentration: string;
      flacon: string;
    };
  };
  footer: {
    copyright: string;
    disclaimer: string;
    fragrance: string;
    object: string;
    order: string;
    photoCredits: string;
  };
}
