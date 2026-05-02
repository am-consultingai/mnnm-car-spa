export type Language = 'he' | 'en';

export const translations = {
  he: {
    dir: 'rtl',
    nav: {
      home: 'בית',
      why: 'למה ידני',
      tech: 'הטכנולוגיה',
      pricing: 'מחירים',
      team: 'האחים',
      book: 'הזמנת תור',
      cta: 'הזמנת תור — 15 ₪',
    },
    hero: {
      title: 'מננם ספא רכב — הרחיצה הכי אנושית בעיר.',
      sub: 'רחיצה ידנית, לא אוטומטית. רק 15 ₪. הזמינו תור היום.',
      cta: 'הזמן תור עכשיו',
      micro: '10% מכל רחיצה נתרמים לחיילי מילואים ולקהילה.',
    },
    why: {
      title: 'למה ידני?',
      card1: {
        title: 'ללא שריטות',
        body: 'ללא סימני סיבוב, ללא מברשות מסתובבות שמשפשפות אבק לתוך הצבע שלך. רק ידיים נקיות, מטלית נקייה, רכב נקי.',
      },
      card2: {
        title: 'תשומת לב לפרטים',
        body: 'אנחנו מבחינים בזבוב על המראה, בעלה בפתח המגבים, באבק על פתח האוורור. מכונה לא עושה את זה.',
      },
      card3: {
        title: 'מחיר הוגן, אמיתי',
        body: '15 ₪. זהו. בלי "שדרוגי פרימיום", בלי תוספות מפתיעות, בלי מלכודות מנוי.',
      },
    },
    tech: {
      title: 'הטכנולוגיה שמאחורי הברק',
      subtitle: 'במננם איננו מתפשרים על הציוד.',
      items: [
        {
          name: 'HydroBlast 9000™',
          spec: 'Precision Water Pressure Gun',
          desc: 'מערכת אספקת מים מהירה ומתקדמת המשתמשת במים מסוננים בלחץ מכויל בקפידה להסרת מזהמים ללא פגיעה בגימור.',
          real: '(תרגום: צינור ממש טוב.)',
        },
        {
          name: 'MicroFiber MOP-X Pro™',
          spec: 'Quad-Layer Particle Capture Mitt',
          desc: 'מהונדס עם מיליארדי סיבים מיקרוסקופיים, כל חוט מאומן באופן אישי למשוך אבק ברמה המולקולרית.',
          real: '(תרגום: מופ מיקרופייבר. אחד יפה.)',
        },
        {
          name: 'FoamCore™',
          spec: 'Tri-Phase pH-Balanced Cleansing Suspension',
          desc: 'תערובת קניינית של חומרים פעילי שטח, מרככים ואופטימיות, מעורבבת ידנית לצפיפות קצף מקסימלית.',
          real: '(תרגום: סבון. אנחנו משתמשים בסבון טוב.)',
        },
        {
          name: 'ChamoisOS v2™',
          spec: 'Adaptive Drying Subsystem',
          desc: 'מטריצת הזחת לחות ברמה עורית, המותנית מראש במים פושרים למקדמי ספיגה אופטימליים.',
          real: '(תרגום: מטלית שמיר. לחה.)',
        },
      ],
      bottom: 'ובכל זאת — בסוף יום, מה שעובד הכי טוב זה ידיים, סבלנות, ואכפתיות.',
    },
    pricing: {
      eyebrow: 'מחיר אחד. רחיצה אחת. בלי הפתעות.',
      price: '15 ₪',
      sub: 'רחיצה חיצונית ידנית מלאה',
      includes: [
        'שטיפה ידנית מלאה',
        'ניקוי חישוקים',
        'ייבוש בשמיר רך',
        'ניקוי חלונות',
        'ריח טוב במתנה',
      ],
      cta: 'הזמן עכשיו',
      notes: 'פנים הרכב? נשמח להציע — נדבר על זה כשמזמינים.',
    },
    team: {
      title: 'שלושה אחים. דלי אחד. רכב נקי.',
      subtitle: 'התחלנו את מננם כי האמנו שאפשר לעשות את זה אחרת — בידיים, בכבוד, ובמחיר שכל אחד יכול להרשות לעצמו.',
      members: [
        {
          name: 'מתן',
          desc: 'האח הגדול. אחראי על המים, על המוזיקה, ועל זה שכולם מגיעים בזמן.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        },
        {
          name: 'נועם',
          desc: 'המוח של הציוד. אם זה מבריק — נועם בחר את החומר.',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
        },
        {
          name: 'נטע',
          desc: 'לא נחה עד שהרכב נראה טוב יותר משיצא מהסוכנות.',
          image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    how: {
      steps: [
        { title: 'הזמנה', body: 'בוחרים יום ושעה באתר. שתי דקות.' },
        { title: 'הגעה', body: 'מגיעים אלינו (או אנחנו אליכם, לפי תיאום).' },
        { title: 'ספא', body: '20–30 דקות של טיפול ידני. ניתן להמתין במקום עם קפה.' },
        { title: 'נסיעה', body: 'רכב נקי, וגם תרומה לחייל מילואים. שניים בתוך אחד.' },
      ],
    },
    testimonials: {
      title: 'מה אומרים עלינו',
      items: [
        { text: 'הזמנתי בספק, יצאתי משוכנעת. 15 שקל, באמת. לא מבינה איך הם עושים את זה.', author: 'דנה, ראשון לציון' },
        { text: 'האחים הכי נחמדים בענף. הרכב מבריק כמו חדש.', author: 'איתי, חולון' },
        { text: 'תרמתי לחיילים בלי לדעת שתרמתי. גאון.', author: 'שירן, באר יעקב' },
      ],
    },
    faq: {
      title: 'שאלות נפוצות',
      items: [
        { q: 'האם 15 ₪ זה באמת המחיר הסופי?', a: 'כן. בלי תוספות מפתיעות.' },
        { q: 'כמה זמן לוקחת רחיצה?', a: 'בין 20 ל-30 דקות, תלוי במצב הרכב.' },
        { q: 'מה לגבי פנים הרכב?', a: 'ניתן להוסיף ניקוי פנימי בתיאום מראש.' },
        { q: 'איך עובדת התרומה לחיילי מילואים?', a: '10% מכל תשלום עוברים ישירות לרכישת ציוד תומך לחימה.' },
      ],
    },
    booking: {
      title: 'הזמנת תור',
      name: 'שם מלא',
      phone: 'טלפון',
      car: 'דגם רכב (אופציונלי)',
      date: 'תאריך מועדף',
      time: 'שעה מועדפת',
      notes: 'הערות',
      submit: 'אישור הזמנה — 15 ₪',
      success: 'תודה! קיבלנו את ההזמנה. נשלח אישור בוואטסאפ תוך כמה דקות. נתראה בקרוב — מתן, נעם ונטע.',
      trust1: 'אישור מיידי בוואטסאפ',
      trust2: 'ביטול חינם עד שעתיים לפני',
      trust3: '10% מהסכום נתרם לקהילה',
    },
    charity: {
      title: '10% מכל רחיצה — חוזר לקהילה.',
      body1: 'במננם אנחנו מאמינים שעסק טוב הוא עסק שמשאיר את הסביבה שלו טובה יותר ממה שמצא אותה. לכן, מכל רחיצה — 15 ₪ או יותר — עשרה אחוז נתרמים ישירות לרכש ציוד עבור חיילי מילואים, ולעמותות קהילתיות בסביבה שלנו.',
      body2: 'לא קופון. לא הנחה. לא "תרומה אם תרצו". פשוט חלק מהמחיר — שנכנס לארגזים של מי שצריך.',
      body3: 'אם אתם רוצים לדעת לאן הלך הכסף החודש, נשמח לשלוח לכם דוח קצר במייל. שקיפות מלאה, כי ככה זה צריך להיות.',
      cta: 'לקבלת הדוח החודשי במייל',
      tagline: 'לרחוץ רכב. לעשות טוב. לחזור הביתה.',
    },
    footer: {
      tagline: 'הרחיצה הכי אנושית בעיר.',
      copyright: '©2026 MNNM ספא רכב.',
      contact: 'צור קשר',
      social: 'עקבו אחרינו',
      privacy: 'פרטיות',
      terms: 'תקנון',
      accessibility: 'הצהרת נגישות',
    }
  },
  en: {
    dir: 'ltr',
    nav: {
      home: 'Home',
      why: 'Why Manual',
      tech: 'Technology',
      pricing: 'Pricing',
      team: 'The Brothers',
      book: 'Book Appointment',
      cta: 'Book — 15 ₪',
    },
    hero: {
      title: 'MNNM Car Spa — the most human wash in town.',
      sub: 'Done by hand, not by machine. Just 15 NIS. Book your appointment today.',
      cta: 'Book now',
      micro: '10% of every wash funds gear for reserve soldiers.',
    },
    why: {
      title: 'Why by hand?',
      card1: {
        title: 'No Scratches',
        body: 'No swirl marks, no rotating brushes scrubbing dust into your paint. Just clean hands, clean cloth, clean car.',
      },
      card2: {
        title: 'Attention to Detail',
        body: "We notice the bug on the mirror, the leaf in the wiper well, the dust on the dashboard vent. A machine doesn't.",
      },
      card3: {
        title: 'Fair, Real Price',
        body: "15 ₪. That's it. No 'premium' upsell, no surprise add-ons, no membership trap.",
      },
    },
    tech: {
      title: 'The technology behind the shine',
      subtitle: "At MNNM, we don't compromise on equipment.",
      items: [
        {
          name: 'HydroBlast 9000™',
          spec: 'Precision Water Pressure Gun',
          desc: 'Our state-of-the-art high-velocity aqueous delivery system propels filtered water at carefully calibrated PSI to dislodge contaminants without harming your finish.',
          real: '(Translation: a really good hose.)',
        },
        {
          name: 'MicroFiber MOP-X Pro™',
          spec: 'Quad-Layer Particle Capture Mitt',
          desc: 'Engineered with billions of microscopic fibers, each strand individually trained to attract dust at a molecular level.',
          real: '(Translation: a microfiber mop. A nice one.)',
        },
        {
          name: 'FoamCore™',
          spec: 'Tri-Phase pH-Balanced Cleansing Suspension',
          desc: 'A proprietary blend of surfactants, conditioners, and optimism, hand-agitated to peak lather density.',
          real: '(Translation: soap. We use good soap.)',
        },
        {
          name: 'ChamoisOS v2™',
          spec: 'Adaptive Drying Subsystem',
          desc: 'A leather-class moisture-displacement matrix, pre-conditioned in lukewarm water for optimal absorption coefficients.',
          real: '(Translation: a chamois cloth. Damp.)',
        },
      ],
      bottom: 'At the end of the day, what really works is hands, patience, and giving a damn.',
    },
    pricing: {
      eyebrow: 'One price. One wash. No surprises.',
      price: '15 ₪',
      sub: 'Full hand-wash, exterior.',
      includes: [
        'Full hand wash',
        'Wheel & rim clean',
        'Soft chamois dry',
        'Window polish',
        'Free fresh-car scent',
      ],
      cta: 'Book Now',
      notes: 'Interior detail available — ask when you book.',
    },
    team: {
      title: 'Three brothers. One bucket. One clean car.',
      subtitle: 'We started MNNM because we believed it could be done differently — with our hands, with respect, and at a price everyone can afford.',
      members: [
        {
          name: 'Matan',
          desc: 'The big brother. In charge of the water, the playlist, and making sure everyone shows up on time.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        },
        {
          name: 'Noam',
          desc: 'The gear nerd. If it shines, Noam picked the product.',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
        },
        {
          name: 'Neta',
          desc: "Doesn't rest until the car looks better than it did at the dealership.",
          image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    how: {
      steps: [
        { title: 'Book', body: 'Pick a slot online. Takes two minutes.' },
        { title: 'Arrive', body: 'Drive in — or we come to you, by arrangement.' },
        { title: 'Spa', body: '20–30 minutes of hand care. Coffee while you wait.' },
        { title: 'Drive Away', body: 'A clean car — and a small gift to a reserve soldier. Two wins in one.' },
      ],
    },
    testimonials: {
      title: 'What people say',
      items: [
        { text: "I was skeptical, but left convinced. 15 NIS, really. I don't know how they do it.", author: 'Dana, Rishon Lezion' },
        { text: 'The nicest brothers in the business. The car shines like new.', author: 'Itai, Holon' },
        { text: 'Donated to soldiers without even knowing I did. Genius.', author: 'Shiran, Be\'er Ya\'akov' },
      ],
    },
    faq: {
      title: 'FAQ',
      items: [
        { q: 'Is 15 ₪ really the final price?', a: 'Yes. No surprise add-ons.' },
        { q: 'How long does a wash take?', a: 'Between 20 to 30 minutes, depending on the car condition.' },
        { q: 'What about the interior?', a: 'Interior cleaning can be added by prior arrangement.' },
        { q: 'How does the donation to reserve soldiers work?', a: '10% of every payment goes directly to purchasing support equipment.' },
      ],
    },
    booking: {
      title: 'Book Appointment',
      name: 'Full Name',
      phone: 'Phone',
      car: 'Car Model (Optional)',
      date: 'Preferred Date',
      time: 'Preferred Time',
      notes: 'Notes',
      submit: 'Confirm Booking — 15 ₪',
      success: 'Thanks! We received your booking. We will send a WhatsApp confirmation in a few minutes. See you soon — Matan, Noam, and Neta.',
      trust1: 'Instant WhatsApp confirmation',
      trust2: 'Free cancellation up to 2 hours before',
      trust3: '10% of every wash goes back to the community',
    },
    charity: {
      title: '10% of every wash goes back to the community.',
      body1: 'At MNNM we believe a good business leaves its surroundings better than it found them. So 10% of every single wash — 15 ₪ or more — goes directly to buying gear for reserve-duty soldiers and to local community organizations.',
      body2: 'Not a coupon. Not a discount. Not "if you\'d like to round up". Just part of the price — that goes into boxes for those who need it.',
      body3: 'Want to know where this month\'s money went? We\'ll send you a short transparency note by email. That\'s how it should work.',
      cta: 'Get the monthly report by email',
      tagline: 'Wash a car. Do some good. Drive home.',
    },
    footer: {
      tagline: 'The most human wash in town.',
      copyright: '©2026 MNNM Car Spa.',
      contact: 'Contact Us',
      social: 'Follow Us',
      privacy: 'Privacy',
      terms: 'Terms',
      accessibility: 'Accessibility',
    }
  }
};
