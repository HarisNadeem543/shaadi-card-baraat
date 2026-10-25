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
      targetDate: '2026-12-19T19:00:00+05:00',
      calendarEvent: {
        summary: 'Maida & Usman - Baraat & Nikah',
        description: 'We invite you to celebrate the Baraat & Nikah of Maida & Usman at Grand Sapphire Event Complex, Lahore.\n\nTiming: 7:00 PM – 10:00 PM\n• Nikah: 8:00 PM\n• Dinner: 9:00 PM\n• Rukhsati: 9:45 PM\n\nGoogle Maps: https://maps.app.goo.gl/MRTu7TaRG9VEWhva8',
        location: 'Grand Sapphire Event Complex, Ravi Block, Allama Iqbal Town, Lahore',
        filename: 'maida-usman-baraat.ics',
        uid: 'maida-usman-baraat-20261219',
        dtstart: '20261219T140000Z',
        dtend: '20261219T170000Z',
      },
    },
    threeEvenings: {
      title: 'The two evenings',
      events: [
        {
          name: 'Baraat &\nNikah',
          time: '7:00',
          date: 'SAT 19 DEC',
          venue: 'Grand Sapphire Event Complex,\nAllama Iqbal Town',
          program: 'Nikkah 8 PM · Dinner 9 PM · Rukhsati 9:45 PM',
          medallion: '/assets/haveli-med-nikah.webp',
        },
        {
          name: 'Walima',
          time: '7:00',
          date: 'SUN 20 DEC',
          venue: 'Monarch by Elite Palm,\nPGECHS Society',
          program: 'Dinner 9 PM',
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
          event: 'SAT 19 DEC · 7:00 PM – 10:00 PM',
          name: 'Grand Sapphire Event Complex',
          addr: 'Ravi Block, Allama Iqbal Town\nLahore',
          mapUrl: 'https://maps.app.goo.gl/MRTu7TaRG9VEWhva8',
          schedule: [
            { time: '8:00 PM', label: 'Nikkah' },
            { time: '9:00 PM', label: 'Dinner' },
            { time: '9:45 PM', label: 'Rukhsati' },
          ],
        },
        {
          tab: 'WALIMA',
          event: 'SUN 20 DEC · 7:00 PM – 10:00 PM',
          name: 'Monarch by Elite Palm',
          addr: 'Block B1 PGECHS Society\nLahore',
          mapUrl: 'https://maps.app.goo.gl/N34PAkbL8Q2cXHGy5?g_st=aw',
          schedule: [
            { time: '9:00 PM', label: 'Dinner' },
          ],
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
      targetDate: '2026-12-19T19:00:00+05:00',
      calendarEvent: {
        summary: 'مائدہ اور عثمان - بارات و نکاح',
        description: 'ہم آپ کو مائدہ اور عثمان کی بارات و نکاح کی پُرمسرت تقریب میں شرکت کی دعوت دیتے ہیں۔\n\nمقام: گرینڈ سیفائر ایونٹ کمپلیکس، راوی بلاک، علامہ اقبال ٹاؤن، لاہور\nاوقات: شام ۷:۰۰ تا ۱۰:۰۰ بجے\n• نکاح: رات ۸:۰۰ بجے\n• طعام: رات ۹:۰۰ بجے\n• رخصتی: رات ۹:۴۵ بجے\n\nگوگل میپس: https://maps.app.goo.gl/MRTu7TaRG9VEWhva8',
        location: 'گرینڈ سیفائر ایونٹ کمپلیکس، راوی بلاک، علامہ اقبال ٹاؤن، لاہور',
        filename: 'maida-usman-baraat.ics',
        uid: 'maida-usman-baraat-20261219',
        dtstart: '20261219T140000Z',
        dtend: '20261219T170000Z',
      },
    },
    threeEvenings: {
      title: 'دو یادگار شامیں',
      events: [
        {
          name: 'بارات و نکاح',
          time: '۷:۰۰',
          date: 'ہفتہ، ۱۹ دسمبر',
          venue: 'گرینڈ سیفائر ایونٹ کمپلیکس،\nعلامہ اقبال ٹاؤن',
          program: 'نکاح ۸:۰۰ · طعام ۹:۰۰ · رخصتی ۹:۴۵',
          medallion: '/assets/haveli-med-nikah.webp',
        },
        {
          name: 'ولیمہ',
          time: '۷:۰۰',
          date: 'اتوار، ۲۰ دسمبر',
          venue: 'مونارک بائے ایلیٹ پام،\nپی جی ای سی ایچ ایس',
          program: 'طعام ۹:۰۰ بجے',
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
          event: 'ہفتہ، ۱۹ دسمبر · شام ۷:۰۰ تا ۱۰:۰۰ بجے',
          name: 'گرینڈ سیفائر ایونٹ کمپلیکس',
          addr: 'راوی بلاک، علامہ اقبال ٹاؤن\nلاہور',
          mapUrl: 'https://maps.app.goo.gl/MRTu7TaRG9VEWhva8',
          schedule: [
            { time: '۸:۰۰ بجے', label: 'نکاح' },
            { time: '۹:۰۰ بجے', label: 'طعام' },
            { time: '۹:۴۵ بجے', label: 'رخصتی' },
          ],
        },
        {
          tab: 'ولیمہ',
          event: 'اتوار، ۲۰ دسمبر · شام ۷:۰۰ تا ۱۰:۰۰ بجے',
          name: 'مونارک بائے ایلیٹ پام',
          addr: 'بلاک بی ۱، پی جی ای سی ایچ ایس سوسائٹی\nلاہور',
          mapUrl: 'https://maps.app.goo.gl/N34PAkbL8Q2cXHGy5?g_st=aw',
          schedule: [
            { time: '۹:۰۰ بجے', label: 'طعام' },
          ],
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
      targetDate: '2026-12-20T19:00:00+05:00',
      calendarEvent: {
        summary: isUr ? 'مائدہ اور عثمان - دعوتِ ولیمہ' : 'Maida & Usman - Walima Reception',
        description: isUr
          ? 'ہم آپ کو مائدہ اور عثمان کی دعوتِ ولیمہ کی پُرمسرت تقریب میں شرکت کی دعوت دیتے ہیں۔\n\nمقام: مونارک بائے ایلیٹ پام، بلاک بی ۱، پی جی ای سی ایچ ایس سوسائٹی، لاہور\nاوقات: شام ۷:۰۰ تا ۱۰:۰۰ بجے\n• طعام: رات ۹:۰۰ بجے\n\nگوگل میپس: https://maps.app.goo.gl/N34PAkbL8Q2cXHGy5?g_st=aw'
          : 'We invite you to celebrate the Walima Reception of Maida & Usman at Monarch by Elite Palm, Lahore.\n\nTiming: 7:00 PM – 10:00 PM\n• Dinner: 9:00 PM\n\nGoogle Maps: https://maps.app.goo.gl/N34PAkbL8Q2cXHGy5?g_st=aw',
        location: isUr ? 'مونارک بائے ایلیٹ پام، بلاک بی ۱، پی جی ای سی ایچ ایس سوسائٹی، لاہور' : 'Monarch by Elite Palm, Block B1 PGECHS Society, Lahore',
        filename: 'maida-usman-walima.ics',
        uid: 'maida-usman-walima-20261220',
        dtstart: '20261220T140000Z',
        dtend: '20261220T170000Z',
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
