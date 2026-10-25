/**
 * Haveli Bilingual Translations (English & Urdu)
 * Complete text dictionary for all sections of the invitation.
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
