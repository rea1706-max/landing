import type { TranslationContent } from '../types';

export const translations: Record<'ru' | 'en', TranslationContent> = {
  ru: {
    nav: {
      brand: 'PLUMAGE', brandSub: 'NOCTURNE',
      details: 'ДЕТАЛИ', availability: 'ЗАПРОСИТЬ НАЛИЧИЕ', languageLabel: 'Выбор языка',
    },
    hero: {
      eyebrow: 'Скульптурный светильник',
      titleLine1: 'PLUMAGE', titleLine2: 'NOCTURNE',
      lead: 'Тёплое сияние в выразительном силуэте.',
      description: 'Рифлёный плафон мягко рассеивает свет, а металлическая композиция с павлинами превращает функциональный предмет в заметный акцент интерьера.',
      exploreCta: 'Детали', availabilityCta: 'Запросить наличие',
      meta: '2700K · регулируемая яркость · лимитированный выпуск',
      imageAlt: 'Скульптурный светильник Plumage Nocturne с двумя павлинами и светящимся плафоном',
    },
    composition: {
      arches: [
        {
          number: '01', topic: 'СВЕЧЕНИЕ', title: 'Спокойный вечерний свет',
          description: 'Тёплый оттенок и мягкая интенсивность создают комфортное освещение без резких бликов.',
          spec: '2700K · dimmable', imageAlt: 'Светильник Plumage Nocturne с тёплым светящимся плафоном',
        },
        {
          number: '02', topic: 'СТЕКЛО', title: 'Фактура, которая смягчает источник',
          description: 'Вертикальный рельеф равномерно распределяет поток и придаёт плафону глубину даже при минимальной яркости.',
          spec: 'Рифлёное матовое стекло', imageAlt: 'Крупный план рифлёного плафона светильника',
        },
        {
          number: '03', topic: 'МЕТАЛЛ', title: 'Деталь, которая задаёт характер',
          description: 'Рельефные павлины образуют цельную конструкцию вокруг плафона и делают предмет узнаваемым с любого ракурса.',
          spec: 'Тёмная металлическая отделка', imageAlt: 'Крупный план металлических павлинов светильника',
        },
      ],
    },
    objectStory: {
      title: 'КРАСИВ И ВКЛЮЧЁННЫМ, И ВЫКЛЮЧЕННЫМ',
      dayBody: 'Днём Plumage Nocturne работает как декоративный объект.',
      nightBody: 'Вечером раскрывается через мягкое свечение и игру света на металле.',
      detailsLabel: 'ДЕТАЛИ',
      details: [
        { title: 'Тёплая температура', description: '2700K для спальни, гостиной и камерных зон.' },
        { title: 'Регулировка яркости', description: 'От фонового свечения до более выраженного вечернего света.' },
        { title: 'Матовый плафон', description: 'Без резкой точки источника.' },
        { title: 'Металлический рельеф', description: 'Глубокая детализация и выразительный силуэт.' },
      ],
    },
    final: {
      brand: 'PLUMAGE NOCTURNE',
      statement: 'Светильник для интерьеров, где важна каждая деталь.',
      cta: 'Запросить наличие',
      inquiryTitle: 'Запросить наличие', nameLabel: 'Ваше имя', contactLabel: 'Телефон или e-mail',
      submitLabel: 'Отправить запрос', successTitle: 'Запрос принят',
      successBody: 'Спасибо за интерес к Plumage Nocturne.',
      privacyNote: 'Контакт используется только для ответа по этому запросу.', closeLabel: 'Закрыть',
    },
    footer: {
      copyright: '© 2026 PLUMAGE NOCTURNE.',
      details: 'ДЕТАЛИ', availability: 'ЗАПРОСИТЬ НАЛИЧИЕ',
    },
  },
  en: {
    nav: {
      brand: 'PLUMAGE', brandSub: 'NOCTURNE',
      details: 'DETAILS', availability: 'REQUEST AVAILABILITY', languageLabel: 'Choose language',
    },
    hero: {
      eyebrow: 'Sculptural Light',
      titleLine1: 'PLUMAGE', titleLine2: 'NOCTURNE',
      lead: 'Warm illumination in a distinctive silhouette.',
      description: 'A ribbed shade softens the source, while the peacock metalwork gives the piece a strong presence within the interior.',
      exploreCta: 'Details', availabilityCta: 'Request availability',
      meta: '2700K · dimmable · limited edition',
      imageAlt: 'Sculptural Plumage Nocturne light with two peacocks and an illuminated shade',
    },
    composition: {
      arches: [
        {
          number: '01', topic: 'GLOW', title: 'Calm evening illumination',
          description: 'A warm tone and gentle intensity create a comfortable atmosphere without harsh glare.',
          spec: '2700K · dimmable', imageAlt: 'Plumage Nocturne light with a warm illuminated shade',
        },
        {
          number: '02', topic: 'GLASS', title: 'Texture that softens the source',
          description: 'Vertical ribbing distributes the glow evenly and gives the shade visual depth at every brightness level.',
          spec: 'Ribbed frosted glass', imageAlt: 'Close view of the ribbed frosted shade',
        },
        {
          number: '03', topic: 'METAL', title: 'The detail that defines the piece',
          description: 'Two relief peacocks frame the shade and create a silhouette that remains recognizable from every angle.',
          spec: 'Dark metal finish', imageAlt: 'Close view of the metal peacocks',
        },
      ],
    },
    objectStory: {
      title: 'DESIGNED TO HOLD THE ROOM EVEN WHEN IT IS OFF',
      dayBody: 'By day, Plumage Nocturne reads as a decorative object.',
      nightBody: 'By night, the character shifts through warm illumination and subtle reflections across the metalwork.',
      detailsLabel: 'DETAILS',
      details: [
        { title: 'Warm temperature', description: '2700K for bedrooms, living spaces and intimate interiors.' },
        { title: 'Adjustable brightness', description: 'From a low ambient glow to a stronger evening setting.' },
        { title: 'Frosted shade', description: 'Soft diffusion without an exposed bright source.' },
        { title: 'Detailed metalwork', description: 'Depth, texture and a distinctive profile.' },
      ],
    },
    final: {
      brand: 'PLUMAGE NOCTURNE',
      statement: 'Lighting for interiors where the object matters as much as the atmosphere.',
      cta: 'Request availability',
      inquiryTitle: 'Request availability', nameLabel: 'Your name', contactLabel: 'Phone or email',
      submitLabel: 'Send request', successTitle: 'Request received',
      successBody: 'Thank you for your interest in Plumage Nocturne.',
      privacyNote: 'Your contact is used only to answer this request.', closeLabel: 'Close',
    },
    footer: {
      copyright: '© 2026 PLUMAGE NOCTURNE.',
      details: 'DETAILS', availability: 'REQUEST AVAILABILITY',
    },
  },
};
