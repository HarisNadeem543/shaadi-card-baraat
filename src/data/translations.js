/**
 * Haveli Bilingual Translations (English & Urdu)
 * Complete text dictionary for all sections of the invitation.
 * Supports both:
 * - 'full': Baraat, Nikah & Walima (default)
 * - 'walima': Dedicated Walima Reception card
 */

export const TRANSLATIONS = {
  en: {
    hero: {
      bismillah: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ',
      subtitle: "We're Getting Married",
      name1: 'Maida',
      amp: '&',
      name2: 'Usman',
      date: '19 · 12 · 2026',
      city: 'Lahore',
      scroll: 'Scroll',
      entranceLine: 'A house waits for you,\nlamp by lamp',
      entranceInstr: 'Swing the lantern',
      entranceBrand: 'MAIDA & USMAN',
    },
    dearFamily: {
      title: 'Dear family and\nfriends',
      p1: 'After years of our families knowing one another, ours is finally the wedding they get to plan together.',
      p2: 'Two evenings, one open door. Come eat with us, sit with us, and stay far longer than you meant to.',
    },
    saveDate: {
      title: 'Save the date',
      monthYear: 'DECEMBER 2026',
      weekdays: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'],
      dateFooter: 'SATURDAY, THE NINETEENTH',
      markCalendars: 'MARK YOUR CALENDARS',
      days: 'DAYS',
      hours: 'HOURS',
      minutes: 'MINUTES',
      seconds: 'SECONDS',
      clickPadPrompt: 'CLICK THREE TIMES TO VIEW THE DATE',
      clickPadHint: 'Click pad · Tap 3 times to reveal',
      clicksRemaining: (n) => `${n} click${n > 1 ? 's' : ''} to reveal`,
      ringedDay: 19,
      dotDay: 20,
      targetDate: '2026-12-19T18:30:00+05:00',
      calendarEvent: {
        summary: 'Maida & Usman - Baraat & Nikah',
        description: 'We invite you to celebrate the wedding of Maida & Usman at Qasr-e-Noor Banquet, Lahore.',
        location: 'Qasr-e-Noor Banquet, 12-A Cavalry Ground, Lahore Cantt, Lahore',
        filename: 'maida-usman-baraat.ics',
        uid: 'maida-usman-baraat-20261219',
        dtstart: '20261219T133000Z',
        dtend: '20261219T183000Z',
      },
    },
    threeEvenings: {
      title: 'The two evenings',
      events: [
        {
          name: 'Baraat &\nNikah',
          time: '6:30',
          date: 'SAT 19 DEC',
          venue: 'Qasr-e-Noor Banquet,\nCavalry Ground',
          medallion: '/assets/haveli-med-nikah.webp',
        },
        {
          name: 'Walima',
          time: '7:30',
          date: 'SUN 20 DEC',
          venue: 'Mahtab Hall, Gulberg\nIII',
          medallion: '/assets/haveli-med-walima.webp',
        },
      ],
    },
    venue: {
      title: 'Where to come',
      mapBtn: 'OPEN IN MAPS',
      venues: [
        {
          tab: 'BARAAT & NIKAH',
          event: 'SAT 19 DEC · 6:30 PM',
          name: 'Qasr-e-Noor Banquet',
          addr: '12-A Cavalry Ground\nLahore Cantt, Lahore',
          mapUrl: 'https://maps.google.com/?q=Qasr-e-Noor+Banquet+Cavalry+Ground+Lahore',
        },
        {
          tab: 'WALIMA',
          event: 'SUN 20 DEC · 7:30 PM',
          name: 'Mahtab Hall',
          addr: 'Gulberg III\nLahore',
          mapUrl: 'https://maps.google.com/?q=Mahtab+Hall+Gulberg+III+Lahore',
        },
      ],
    },
    gallery: {
      title: 'A Few Moments',
    },
    signoff: {
      dua: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا\nقُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
      closing: "We can't wait to\ncelebrate with you.",
      brand: '',
    },
    controls: {
      audioOn: 'Mute music',
      audioOff: 'Play music',
      langSwitch: 'Switch to Urdu',
    },
  },
  ur: {
    hero: {
      bismillah: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ',
      subtitle: 'شادی خانہ آبادی',
      name1: 'مائدہ',
      amp: 'اور',
      name2: 'عثمان',
      date: '۱۹ · ۱۲ · ۲۰۲۶',
      city: 'لاہور',
      scroll: 'نیچے دیکھیں',
      entranceLine: 'ایک گھر آپ کا منتظر ہے،\nچراغ بہ چراغ',
      entranceInstr: 'لالٹین کو جھلائیں',
      entranceBrand: 'مائدہ اور عثمان',
    },
    dearFamily: {
      title: 'معزز فیملی اور\nدوست احباب',
      p1: 'برسوں کی باہمی شناسائی اور محبت کے بعد، بالآخر ہمارے خاندانوں کو ایک ساتھ خوشیاں منانے کا موقع ملا ہے۔',
      p2: 'دو یادگار شامیں، کھلا در۔ ہمارے ساتھ خوشیوں میں شریک ہوں، اور اس پُرمسرت تقریب کو اپنی دعاؤں سے منور کریں۔',
    },
    saveDate: {
      title: 'تاریخ یاد رکھیں',
      monthYear: 'دسمبر ۲۰۲۶',
      weekdays: ['پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ', 'اتوار'],
      dateFooter: 'ہفتہ، ۱۹ دسمبر ۲۰۲۶',
      markCalendars: 'کیلنڈر پر نشان لگائیں',
      days: 'دن',
      hours: 'گھنٹے',
      minutes: 'منٹ',
      seconds: 'سیکنڈ',
      clickPadPrompt: 'تاریخ دیکھنے کے لیے تین بار کلک کریں',
      clickPadHint: 'کلک پیڈ · ۳ بار دبائیں',
      clicksRemaining: (n) => `مزید ${n === 1 ? '۱' : '۲'} بار کلک کریں`,
      ringedDay: 19,
      dotDay: 20,
      targetDate: '2026-12-19T18:30:00+05:00',
      calendarEvent: {
        summary: 'مائدہ اور عثمان - بارات و نکاح',
        description: 'ہم آپ کو مائدہ اور عثمان کی بارات و نکاح کی پُرمسرت تقریب میں شرکت کی دعوت دیتے ہیں۔',
        location: 'قصرِ نور بینکوئٹ، ۱۲-اے، کیولری گراؤنڈ، لاہور کینٹ، لاہور',
        filename: 'maida-usman-baraat.ics',
        uid: 'maida-usman-baraat-20261219',
        dtstart: '20261219T133000Z',
        dtend: '20261219T183000Z',
      },
    },
    threeEvenings: {
      title: 'دو یادگار شامیں',
      events: [
        {
          name: 'بارات و نکاح',
          time: '۶:۳۰',
          date: 'ہفتہ، ۱۹ دسمبر',
          venue: 'قصرِ نور بینکوئٹ،\nکیولری گراؤنڈ',
          medallion: '/assets/haveli-med-nikah.webp',
        },
        {
          name: 'ولیمہ',
          time: '۷:۳۰',
          date: 'اتوار، ۲۰ دسمبر',
          venue: 'مہتاب ہال، گلبرگ\n۳',
          medallion: '/assets/haveli-med-walima.webp',
        },
      ],
    },
    venue: {
      title: 'کہاں تشریف لائیں',
      mapBtn: 'گوگل میپس پر دیکھیں',
      venues: [
        {
          tab: 'بارات و نکاح',
          event: 'ہفتہ، ۱۹ دسمبر · شام ۶:۳۰ بجے',
          name: 'قصرِ نور بینکوئٹ',
          addr: '۱۲-اے، کیولری گراؤنڈ\nلاہور کینٹ، لاہور',
          mapUrl: 'https://maps.google.com/?q=Qasr-e-Noor+Banquet+Cavalry+Ground+Lahore',
        },
        {
          tab: 'ولیمہ',
          event: 'اتوار، ۲۰ دسمبر · شام ۷:۳۰ بجے',
          name: 'مہتاب ہال',
          addr: 'گلبرگ ۳\nلاہور',
          mapUrl: 'https://maps.google.com/?q=Mahtab+Hall+Gulberg+III+Lahore',
        },
      ],
    },
    gallery: {
      title: 'چند لمحات',
    },
    signoff: {
      dua: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا\nقُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
      closing: 'ہم آپ کی شرکت کے\nمنتظر ہیں',
      brand: '',
    },
    controls: {
      audioOn: 'موسیقی بند کریں',
      audioOff: 'موسیقی سنیں',
      langSwitch: 'Switch to English',
    },
  },
};

/**
 * Returns tailored translations based on active language and invitation mode ('full' vs 'walima')
 */
export function getTranslations(lang = 'en', mode = 'full') {
  const base = TRANSLATIONS[lang] || TRANSLATIONS.en;
  if (mode !== 'walima') {
    return base;
  }

  const isUr = lang === 'ur';

  return {
    ...base,
    hero: {
      ...base.hero,
      subtitle: isUr ? 'دعوتِ ولیمہ' : 'Walima Reception',
      date: isUr ? '۲۰ · ۱۲ · ۲۰۲۶' : '20 · 12 · 2026',
    },
    dearFamily: {
      ...base.dearFamily,
      p2: isUr
        ? 'ایک یادگار شام، کھلا در۔ ہمارے ساتھ خوشیوں میں شریک ہوں، اور اس پُرمسرت تقریب کو اپنی دعاؤں سے منور کریں۔'
        : 'The evening, one open door. Come eat with us, sit with us, and celebrate this blessed occasion.',
    },
    saveDate: {
      ...base.saveDate,
      dateFooter: isUr ? 'اتوار، ۲۰ دسمبر ۲۰۲۶' : 'SUNDAY, THE TWENTIETH',
      ringedDay: 20,
      dotDay: null,
      targetDate: '2026-12-20T19:30:00+05:00',
      calendarEvent: {
        summary: isUr ? 'مائدہ اور عثمان - دعوتِ ولیمہ' : 'Maida & Usman - Walima Reception',
        description: isUr
          ? 'ہم آپ کو مائدہ اور عثمان کی دعوتِ ولیمہ کی پُرمسرت تقریب میں شرکت کی دعوت دیتے ہیں۔'
          : 'We invite you to celebrate the Walima Reception of Maida & Usman at Mahtab Hall, Gulberg III, Lahore.',
        location: isUr ? 'مہتاب ہال، گلبرگ ۳، لاہور' : 'Mahtab Hall, Gulberg III, Lahore',
        filename: 'maida-usman-walima.ics',
        uid: 'maida-usman-walima-20261220',
        dtstart: '20261220T143000Z',
        dtend: '20261220T193000Z',
      },
    },
    threeEvenings: {
      ...base.threeEvenings,
      title: isUr ? 'ایک یادگار شام' : 'The evening',
      events: [
        base.threeEvenings.events.find((e) => e.name.includes('Walima') || e.name.includes('ولیمہ')) || base.threeEvenings.events[1],
      ],
    },
    venue: {
      ...base.venue,
      venues: [
        base.venue.venues.find((v) => v.tab.includes('WALIMA') || v.tab.includes('ولیمہ')) || base.venue.venues[1],
      ],
    },
  };
}
