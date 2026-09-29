import { TranslationContent } from '../types';

export const translations: Record<'ru' | 'en', TranslationContent> = {
  ru: {
    nav: {
      brand: 'PLUMAGE', brandSub: 'PARFUMS', home: 'ГЛАВНАЯ', fragrance: 'АРОМАТ',
      object: 'ФЛАКОН', composition: 'СОСТАВ', order: 'ЗАКАЗ', languageLabel: 'Выбор языка',
    },
    hero: {
      eyebrow: 'ПАРФЮМЕРНЫЙ ОБЪЕКТ · ЛИМИТИРОВАННЫЙ ВЫПУСК',
      titleLine1: 'PLUMAGE', titleLine2: 'NOCTURNE',
      subtitle: 'Горький цитрус, белые цветы и сухая древесина — с прохладным минеральным шлейфом.',
      cta: 'ПОЗНАКОМИТЬСЯ С АРОМАТОМ', metaEdition: 'EXTRAIT DE PARFUM · 100 МЛ',
      metaPlace: 'ГРАСС · ФРАНЦИЯ', imageAlt: 'Скульптурный флакон Plumage Nocturne с двумя павлинами',
    },
    composition: {
      label: 'КОМПОЗИЦИЯ', titleLine1: 'АРОМАТ', titleLine2: 'ПО СЛОЯМ',
      description: 'Nocturne начинается сухой цитрусовой горечью, раскрывается плотным белоцветочным сердцем и остаётся на коже тёплой древесиной с амбровой дымкой.',
      cta: 'УВИДЕТЬ ФЛАКОН', noteStructure: 'ВЕРХНИЕ НОТЫ · СЕРДЦЕ · БАЗА',
      arches: [
        { step: '01', title: 'СВЕЖИЙ СТАРТ', notes: ['Бергамот', 'Розовый перец', 'Белый персик'], description: 'Сухая цитрусовая цедра и пряная искра без излишней сладости.', imageAlt: 'Разрезанный цитрус в тёплом боковом свете' },
        { step: '02', title: 'БЕЛЫЕ ЦВЕТЫ', notes: ['Жасмин', 'Флёрдоранж', 'Тубероза'], description: 'Плотный цветочный аккорд с прохладным, почти минеральным краем.', imageAlt: 'Белые цветы жасмина на чёрном фоне' },
        { step: '03', title: 'СУХОЕ ТЕПЛО', notes: ['Сандал', 'Амбра', 'Пачули'], description: 'Древесная фактура, мягкая амбра и спокойный дымный след.', imageAlt: 'Крупный план тёмной древесной коры' },
      ],
    },
    objectStory: {
      label: 'ФЛАКОН', titleLine1: 'ФОРМА', titleLine2: 'БЕЗ', titleLine3: 'ДЕКОРАЦИИ',
      body1: 'В серебристой раме сходятся две фигуры павлинов. Между ними — молочно-белый ребристый объём, спокойный и тактильный.',
      body2: 'Орнамент здесь работает как конструкция: держит силуэт, собирает свет и делает флакон узнаваемым с любого ракурса.',
      cta: 'УЗНАТЬ О ВЫПУСКЕ',
      labels: {
        peacocks: 'ПАРА ПАВЛИНОВ', peacocksDesc: 'Зеркальная композиция формирует верхнюю арку',
        metal: 'ХОЛОДНЫЙ МЕТАЛЛ', metalDesc: 'Матовая серебристая поверхность подчёркивает рельеф',
        vessel: 'РЕБРИСТЫЙ ОБЪЁМ', vesselDesc: 'Молочный корпус мягко рассеивает свет',
      },
      storyLabel: 'ИДЕЯ', storyTitle: 'ПАВЛИН КАК АРХИТЕКТУРА',
      storyBody: 'Вместо буквального изображения пера — ритм линий, симметрия и тяжесть металла. Аромат остаётся чувственным, а объект — собранным.',
      storyCta: 'ПЕРЕЙТИ К ВЫПУСКУ', archiveLabel: 'СКУЛЬПТУРНЫЙ ОБЪЕКТ', scrollLabel: 'СКРОЛЛ ЗАДАЁТ РАКУРС · КУРСОР ОТКРЫВАЕТ БОКОВЫЕ СТОРОНЫ',
    },
    final: {
      brand: 'PLUMAGE NOCTURNE', label: 'ВЫПУСК', type: 'EXTRAIT DE PARFUM', volume: '100 МЛ',
      summaryLine1: 'Сухой цитрусовый старт.', summaryLine2: 'Белые цветы в сердце.', summaryLine3: 'Тёплый древесный след.',
      cta: 'ЗАПРОСИТЬ НАЛИЧИЕ', inquiryTitle: 'ЧАСТНЫЙ ЗАПРОС', nameLabel: 'Ваше имя', contactLabel: 'Телефон или e-mail',
      submitLabel: 'ОТПРАВИТЬ ЗАПРОС', successTitle: 'ЗАПРОС ПРИНЯТ', successBody: 'Мы сохранили ваши данные и вернёмся с информацией о наличии выпуска.',
      privacyNote: 'Контакт используется только для ответа по этому запросу.', closeLabel: 'ЗАКРЫТЬ', editionNote: 'НУМЕРОВАННЫЙ КОЛЛЕКЦИОННЫЙ ВЫПУСК',
      specs: { origin: 'Грасс, Франция', concentration: 'Концентрация 28%', flacon: 'Коллекционный флакон 100 мл' },
    },
    footer: {
      copyright: '© 2026 PLUMAGE PARFUMS.', disclaimer: 'КОЛЛЕКЦИОННЫЙ ФЛАКОН · НУМЕРОВАННЫЙ ВЫПУСК',
      fragrance: 'АРОМАТ', object: 'ФЛАКОН', order: 'ЗАКАЗ', photoCredits: 'ФОТОГРАФИИ ИНГРЕДИЕНТОВ: PEXELS',
    },
  },
  en: {
    nav: {
      brand: 'PLUMAGE', brandSub: 'PARFUMS', home: 'HOME', fragrance: 'FRAGRANCE',
      object: 'THE FLACON', composition: 'COMPOSITION', order: 'AVAILABILITY', languageLabel: 'Choose language',
    },
    hero: {
      eyebrow: 'A PERFUME OBJECT · LIMITED EDITION', titleLine1: 'PLUMAGE', titleLine2: 'NOCTURNE',
      subtitle: 'Bitter citrus, white flowers and dry woods, finished with a cool mineral trail.', cta: 'DISCOVER THE FRAGRANCE',
      metaEdition: 'EXTRAIT DE PARFUM · 100 ML', metaPlace: 'GRASSE · FRANCE', imageAlt: 'Sculptural Plumage Nocturne flacon framed by two peacocks',
    },
    composition: {
      label: 'COMPOSITION', titleLine1: 'THE SCENT', titleLine2: 'IN LAYERS',
      description: 'Nocturne begins with dry citrus bitterness, moves into a dense white-floral heart, then settles into warm woods and a sheer amber haze.',
      cta: 'SEE THE FLACON', noteStructure: 'TOP NOTES · HEART · BASE',
      arches: [
        { step: '01', title: 'BRIGHT OPENING', notes: ['Bergamot', 'Pink pepper', 'White peach'], description: 'Dry citrus peel and a precise spark of spice, without excess sweetness.', imageAlt: 'Cut citrus in warm side light' },
        { step: '02', title: 'WHITE FLOWERS', notes: ['Jasmine', 'Orange blossom', 'Tuberose'], description: 'A dense floral accord edged with a cool, almost mineral clarity.', imageAlt: 'White jasmine flowers against a black background' },
        { step: '03', title: 'DRY WARMTH', notes: ['Sandalwood', 'Amber', 'Patchouli'], description: 'Tactile woods, soft amber and a quiet smoky trail.', imageAlt: 'Close view of dark tree bark' },
      ],
    },
    objectStory: {
      label: 'THE FLACON', titleLine1: 'FORM', titleLine2: 'WITHOUT', titleLine3: 'ORNAMENT',
      body1: 'Two peacocks meet in a silvered frame. Between them sits a milky, ribbed volume: quiet, weighty and tactile.',
      body2: 'The relief behaves as structure. It holds the silhouette, catches the light and keeps the flacon recognisable from every angle.',
      cta: 'VIEW THE EDITION',
      labels: {
        peacocks: 'TWIN PEACOCKS', peacocksDesc: 'A mirrored composition gives the object its crown',
        metal: 'COOL METAL', metalDesc: 'The muted silver surface brings out every relief',
        vessel: 'RIBBED VOLUME', vesselDesc: 'A milky body diffuses light rather than reflecting it',
      },
      storyLabel: 'CONCEPT', storyTitle: 'THE PEACOCK AS ARCHITECTURE',
      storyBody: 'Instead of illustrating a feather, the object uses rhythm, symmetry and the physical weight of metal. The fragrance stays sensual; the form stays precise.',
      storyCta: 'GO TO THE EDITION', archiveLabel: 'SCULPTURAL OBJECT', scrollLabel: 'SCROLL SETS THE ORBIT · CURSOR REVEALS THE SIDES',
    },
    final: {
      brand: 'PLUMAGE NOCTURNE', label: 'THE EDITION', type: 'EXTRAIT DE PARFUM', volume: '100 ML',
      summaryLine1: 'A dry citrus opening.', summaryLine2: 'White flowers at the heart.', summaryLine3: 'A warm, woody trail.',
      cta: 'REQUEST AVAILABILITY', inquiryTitle: 'PRIVATE ENQUIRY', nameLabel: 'Your name', contactLabel: 'Phone or email',
      submitLabel: 'SEND ENQUIRY', successTitle: 'ENQUIRY RECEIVED', successBody: 'Your details have been saved. We will return with availability for this edition.',
      privacyNote: 'Your contact is used only to answer this enquiry.', closeLabel: 'CLOSE', editionNote: 'NUMBERED COLLECTOR EDITION',
      specs: { origin: 'Grasse, France', concentration: '28% concentration', flacon: 'Collector flacon, 100 ml' },
    },
    footer: {
      copyright: '© 2026 PLUMAGE PARFUMS.', disclaimer: 'COLLECTOR FLACON · NUMBERED EDITION',
      fragrance: 'FRAGRANCE', object: 'THE FLACON', order: 'AVAILABILITY', photoCredits: 'INGREDIENT PHOTOGRAPHY: PEXELS',
    },
  },
};
