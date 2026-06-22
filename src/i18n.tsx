import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'en' | 'hy' | 'ru';

type Dict = Record<string, string>;

export const LANGS: { code: Lang; short: string; label: string }[] = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'hy', short: 'ՀՅ', label: 'Հայերեն' },
  { code: 'ru', short: 'RU', label: 'Русский' },
];

const en: Dict = {
  'nav.shop': 'Shop',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.signIn': 'Sign In',
  'nav.signOut': 'Sign Out',
  'nav.cart': 'Cart',
  'nav.language': 'Language',

  'announce.newCollection': 'New Collection',
  'announce.yerevan': 'Yerevan — Est. 2002',
  'announce.openDaily': 'Open Daily 10:00 – 22:00',
  'announce.style': 'Style of a Winner',

  'home.heroLine1': 'Style',
  'home.heroLine2': 'of a',
  'home.heroPrefix': 'Born to be a',
  'home.heroWinner': 'Winner',
  'home.heroLeader': 'Leader',
  'home.heroChampion': 'Champion',
  'home.heroText': 'Modern sportswear built for confidence, movement, and everyday victory.',
  'home.shopCollection': 'Shop Collection',
  'home.ourStory': 'Our Story',
  'home.instagram': 'Instagram',
  'home.locationShort': 'Yerevan, AM',
  'home.marquee1': 'STYLE OF A WINNER',
  'home.marquee2': "WE DON'T FOLLOW. WE LEAD.",
  'home.marquee3': 'ALL EYES ON US',
  'home.marquee4': 'BUILT FOR WINNERS',
  'home.officialPartners': 'Official Partners',
  'home.nationalTeam': 'National Team',
  'home.clubPartner': 'Club Partner',
  'home.partnerHockey': 'Armenian Ice Hockey National Team',
    'home.partnerFutsal': 'Yerevan Futsal',
  'home.whyDn8Eyebrow': 'Why DN8?',
  'home.whyDn8Title': 'Four reasons\nto move different',
  'home.whyDn8Text': 'A sharper standard for teams and athletes who want their kit to feel powerful before the first whistle.',
  'home.whyPillar1Title': 'Engineered for Movement',
  'home.whyPillar1Text': 'Cuts, fabrics, and details are chosen to move cleanly through training, travel, and match day.',
  'home.whyPillar2Title': 'Born from Champions',
  'home.whyPillar2Text': 'DN8 is built around the mindset of teams that lead first, compete hard, and carry themselves like winners.',
  'home.whyPillar3Title': 'Style That Speaks',
  'home.whyPillar3Text': 'Bold identity, sharp lines, and custom visuals make every team look recognizable before the game even starts.',
  'home.whyPillar4Title': 'Built to Last',
  'home.whyPillar4Text': 'Reliable construction and durable finishes keep the look strong through real use, not just the first photo.',
  'home.collectionEyebrow': '01 — The Collection',
  'home.featuredCollection': 'Featured\nCollection',
  'home.viewAll': 'View All',
  'home.mindset': 'The Mindset',
  'home.dontFollow': "We Don't\nFollow.",
  'home.weLead': 'We Lead.',
  'home.mindsetText': "A mindset before it's a wardrobe. Engineered for those who set the pace — not those who keep up.",
  'home.statementEyebrow': '02 — The Statement',
  'home.statementTitle': 'All Eyes\nOn Us.',
  'home.statementText': "Discipline in the details, confidence in the cut. Sportswear that carries itself like it's already won.",
  'home.dividerBuilt': 'Built for Winners',
  'home.dividerAllEyes': 'All Eyes On Us',
  'home.dividerDontFollow': "We Don't Follow",
  'home.joinEyebrow': 'Join the movement',
  'home.joinTitle': 'Join the\nWinning Side',
  'home.subscribedTitle': "You're on the winning side.",
  'home.subscribedText': 'Welcome to DN8 — watch your inbox for the next drop.',
  'home.emailPlaceholder': 'Enter your email',
  'home.joinNow': 'Join Now',
  'home.noSpam': 'No spam, just drops',
  'home.quickAdd': 'Quick Add',
  'home.whyEyebrow': '02 — The Standard',
  'home.whyTitle': 'Made for\nMomentum',
  'home.whyText': 'Every DN8 piece is shaped around movement, presence, and confidence — the uniform for people who lead from the front.',
  'home.card1Title': 'Cut for Movement',
  'home.card1Text': 'Clean silhouettes, athletic comfort, and details that work from training to the street.',
  'home.card2Title': 'Winner Mentality',
  'home.card2Text': 'Built around discipline, identity, and the quiet confidence of being ready.',
  'home.card3Title': 'Armenian Energy',
  'home.card3Text': 'Created in Yerevan with a bold visual language made to stand out.',
  'home.ctaEyebrow': 'Ready for the next drop?',
  'home.ctaTitle': 'Join the DN8 side.',
  'home.ctaText': 'Explore the collection and find the piece that matches your pace.',
  'home.ctaButton': 'Shop Now',

  'shop.eyebrow': 'The Full Range',
  'shop.title': 'Shop',
  'shop.quickAdd': 'Quick Add',

  'product.back': '← Back to Shop',
  'product.size': 'Size',
  'product.quantity': 'Quantity',
  'product.addToCart': 'Add to Cart',
  'product.freeShipping': 'Free shipping over $120',
  'product.returns': '30-day returns',
  'product.related': 'You May Also Like',

  'about.eyebrow': 'The Brand',
  'about.title': 'Built for\nWinners.',
  'about.p1': 'DN8 Team is a modern sportswear house built on a single belief: the way you move is the way you win. We design for confidence — the quiet certainty of someone who has already decided how the day ends.',
  'about.p2': "Discipline shapes everything we make. Considered cuts, durable fabrics, and details that hold up to real movement. This is performance that doesn't shout, and leadership that doesn't need to.",
  'about.p3': "Sport and lifestyle aren't two wardrobes here. They're one mentality, worn every day. We don't follow trends — we set a pace and let the rest catch up.",
  'about.established': 'Established',
  'about.movementReady': 'Movement-Ready',
  'about.mentality': 'Mentality',
  'about.partners': 'Partners',
  'about.trustedBy': 'Trusted By',
  'about.theChampions': 'The Champions',
  'about.hockeyLine1': 'Armenian Ice Hockey',
  'about.hockeyLine2': 'National Team',
  'about.futsal': 'Yerevan Futsal',
  'about.hockeyDesc': 'Official sportswear partner of the Armenian national ice hockey squad.',
  'about.futsalDesc': 'Proud official kit partner of Yerevan Futsal — Est. 2020.',

  'contact.eyebrow': 'Get in Touch',
  'contact.title': 'Contact',
  'contact.messageSent': 'Message Sent',
  'contact.messageSentText': 'Thanks for reaching out. The DN8 Team will get back to you shortly.',
  'contact.name': 'Name',
  'contact.email': 'Email',
  'contact.message': 'Message',
  'contact.yourName': 'Your name',
  'contact.emailPlaceholder': 'you@example.com',
  'contact.sendMessage': 'Send Message',
  'contact.phone': 'Phone',
  'contact.studio': 'Studio',
  'contact.address': '2/95 Marshal Baghramyan Ave,\nYerevan, Armenia',
  'contact.hours': 'Hours',
  'contact.days': 'Mon – Sun',
  'contact.openEveryDay': 'Open every day',
  'contact.social': 'Social',
  'contact.openMaps': 'Open in Google Maps →',
  'contact.dragZoom': 'Drag & zoom to explore',
  'contact.popupAddress': '2/95 Marshal Baghramyan Ave, Yerevan',

  'footer.tagline': 'Style of a Winner',
  'footer.explore': 'Explore',
  'footer.social': 'Social',
  'footer.visitUs': 'Visit Us',
  'footer.address': '2/95 Marshal Baghramyan,\nYerevan',
  'footer.hours': '10:00 – 22:00 Daily',
  'footer.rights': '© 2026 DN8 Team. All rights reserved.',
  'footer.location': 'Yerevan, Armenia',

  'cart.title': 'Your Cart',
  'cart.orderPlaced': 'Order Placed',
  'cart.orderText': 'Welcome to the winning side. Your DN8 pieces are being prepared.',
  'cart.continue': 'Continue',
  'cart.empty': 'Your cart is empty.',
  'cart.size': 'Size',
  'cart.subtotal': 'Subtotal',
  'cart.shipping': 'Shipping & taxes calculated at checkout.',
  'cart.checkout': 'Checkout',

  'auth.team': 'DN8 Team',
  'auth.signIn': 'Sign In',
  'auth.createAccount': 'Create Account',
  'auth.fullName': 'Full Name',
  'auth.yourName': 'Your name',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.noAccount': "Don't have an account?",
  'auth.hasAccount': 'Already have an account?',
  'auth.createOne': 'Create one',
  'auth.signInSmall': 'Sign in',
  'auth.fillFields': 'Please fill in all fields.',
  'auth.passwordLength': 'Password must be at least 6 characters.',
};

const hy: Dict = {
  'nav.shop': 'Խանութ', 'nav.about': 'Մեր մասին', 'nav.contact': 'Կապ', 'nav.signIn': 'Մուտք', 'nav.signOut': 'Ելք', 'nav.cart': 'Զամբյուղ', 'nav.language': 'Լեզու',
  'announce.newCollection': 'Նոր հավաքածու', 'announce.yerevan': 'Երևան — Հիմն. 2002', 'announce.openDaily': 'Բաց է ամեն օր 10:00 – 22:00', 'announce.style': 'Հաղթողի ոճ',
  'home.heroLine1': 'Ոճ', 'home.heroLine2': 'պատկանող', 'home.heroPrefix': 'Ծնված՝ լինելու', 'home.heroWinner': 'Հաղթողի', 'home.heroLeader': 'Չեմպիոնի', 'home.heroChampion': 'Առաջնորդի', 'home.heroText': 'Ժամանակակից սպորտային հագուստ՝ վստահության, շարժման և ամենօրյա հաղթանակի համար.', 'home.shopCollection': 'Դիտել հավաքածուն', 'home.ourStory': 'Մեր պատմությունը', 'home.instagram': 'Instagram', 'home.locationShort': 'Երևան, AM', 'home.marquee1': 'ՀԱՂԹՈՂԻ ՈՃ', 'home.marquee2': 'ՄԵՆՔ ՉԵՆՔ ՀԵՏԵՎՈՒՄ. ՄԵՆՔ ԱՌԱՋՆՈՐԴՈՒՄ ԵՆՔ.', 'home.marquee3': 'ԲՈԼՈՐ ԱՉՔԵՐԸ ՄԵԶ ՎՐԱ', 'home.marquee4': 'ՍՏԵՂԾՎԱԾ ՀԱՂԹՈՂՆԵՐԻ ՀԱՄԱՐ', 'home.officialPartners': 'Պաշտոնական գործընկերներ', 'home.nationalTeam': 'Ազգային թիմ', 'home.clubPartner': 'Ակումբ գործընկեր', 'home.partnerHockey': 'Հայաստանի հոկեյի ազգային հավաքական', 'home.partnerFutsal': 'Yerevan Futsal', 'home.whyDn8Eyebrow': 'Ինչու՞ DN8', 'home.whyDn8Title': 'Չորս պատճառ\nայլ կերպ շարժվելու', 'home.whyDn8Text': 'Բարձրագույն որակ և ուժի զգացողություն՝ դեռ մինչև առաջին սուլիչը։ Նախատեսված է հաղթողների համար', 'home.whyPillar1Title': 'Ստեղծված է շարժման համար', 'home.whyPillar1Text': 'Կտրվածքները, գործվածքն ու դետալները հատուկ մշակված են՝ բացարձակ շարժման ազատություն պարգևելու համար՝ մարզասրահից մինչև ճանապարհ ու խաղադաշտ', 'home.whyPillar2Title': 'Ծնված չեմպիոններից', 'home.whyPillar2Text': 'DN8-ը ստեղծված է առաջատար, համառորեն պայքարող և հաղթողի հոգեբանություն ունեցող թիմերի համար', 'home.whyPillar3Title': 'Ոճ, որ խոսում է', 'home.whyPillar3Text': 'Համարձակ ինքնություն, ընդգծված գծեր և բացառիկ դիզայն, որպեսզի ձեր թիմը ճանաչելի լինի դեռ մինչև խաղի մեկնարկը', 'home.whyPillar4Title': 'Ստեղծված երկար ծառայելու համար', 'home.whyPillar4Text': 'Ամուր կառուցվածքն ու մաշվածքադիմացկուն նյութերը երաշխավորում են անթերի տեսք ոչ միայն առաջին լուսանկարում, այլև իրական, ինտենսիվ խաղի ընթացքում', 'home.collectionEyebrow': '01 — Հավաքածու', 'home.featuredCollection': 'Առաջարկվող\nհավաքածու', 'home.viewAll': 'Դիտել բոլորը', 'home.mindset': 'Մտածելակերպը', 'home.dontFollow': 'Մենք չենք\nհետևում.', 'home.weLead': 'Մենք առաջնորդում ենք.', 'home.mindsetText': 'Ոչ թե ուղղակի հագուստ, այլ՝ հաղթողի հոգեբանություն։ Ստեղծված նրանց համար, ովքեր սահմանում են խաղի կանոնները, այլ ոչ թե հարմարվում դրանց', 'home.statementEyebrow': '02 — Հայտարարություն', 'home.statementTitle': 'Բոլոր աչքերը\nմեզ վրա.', 'home.statementText': 'Կարգապահություն՝ մանրամասներում, վստահություն՝ կտրվածքում։ Սպորտային հագուստ, որն իր ողջ տեսքով հաղթանակ է ներշնչում', 'home.dividerBuilt': 'Ստեղծված հաղթողների համար', 'home.dividerAllEyes': 'Բոլոր աչքերը մեզ վրա', 'home.dividerDontFollow': 'Մենք չենք հետևում', 'home.joinEyebrow': 'Միացիր շարժմանը', 'home.joinTitle': 'Միացիր\nհաղթողների կողմին', 'home.subscribedTitle': 'Դուք հաղթողների կողմում եք.', 'home.subscribedText': 'Բարի գալուստ DN8 — հետևեք ձեր inbox-ին հաջորդ drop-ի համար.', 'home.emailPlaceholder': 'Մուտքագրեք ձեր email-ը', 'home.joinNow': 'Միանալ հիմա', 'home.noSpam': 'Առանց spam-ի, միայն drops', 'home.quickAdd': 'Արագ ավելացնել', 'home.whyEyebrow': '02 — Ստանդարտ', 'home.whyTitle': 'Ստեղծված\nշարժման համար', 'home.whyText': 'DN8-ի յուրաքանչյուր կտոր ստեղծված է շարժման, ներկայության և վստահության շուրջ՝ համազգեստ նրանց համար, ովքեր առաջնորդում են.', 'home.card1Title': 'Կարված շարժման համար', 'home.card1Text': 'Մաքուր ուրվագծեր, սպորտային հարմարավետություն և մանրամասներ՝ մարզումից մինչև փողոց.', 'home.card2Title': 'Հաղթողի մտածելակերպ', 'home.card2Text': 'Կառուցված կարգապահության, ինքնության և պատրաստ լինելու վստահության շուրջ.', 'home.card3Title': 'Հայկական էներգիա', 'home.card3Text': 'Ստեղծված Երևանում՝ համարձակ վիզուալ լեզվով, որը առանձնանում է.', 'home.ctaEyebrow': 'Պատրա՞ստ ես հաջորդ drop-ին', 'home.ctaTitle': 'Միացիր DN8 կողմին.', 'home.ctaText': 'Դիտիր հավաքածուն և գտիր քո տեմպին համապատասխան կտորը.', 'home.ctaButton': 'Գնել հիմա',
  'shop.eyebrow': 'Ամբողջ տեսականին', 'shop.title': 'Խանութ', 'shop.quickAdd': 'Արագ ավելացնել',
  'product.back': '← Վերադառնալ խանութ', 'product.size': 'Չափ', 'product.quantity': 'Քանակ', 'product.addToCart': 'Ավելացնել զամբյուղ', 'product.freeShipping': 'Անվճար առաքում $120-ից բարձր', 'product.returns': '30 օրվա վերադարձ', 'product.related': 'Կարող է նաև դուր գալ',
  'about.eyebrow': 'Բրենդը', 'about.title': 'Ստեղծված\nհաղթողների համար.', 'about.p1': 'DN8 Team-ը ժամանակակից սպորտային հագուստի բրենդ է՝ կառուցված մեկ համոզմունքի վրա. ինչպես շարժվում ես, այնպես էլ հաղթում ես։ Մենք ստեղծում ենք հագուստ, որը ներշնչում է բացարձակ վստահություն՝ այն հանգիստ, անսասան վստահությունը, երբ արդեն կանխորոշել ես օրվա հաղթական ավարտը', 'about.p2': 'Մեր ստեղծած ամեն ինչ թելադրված է կարգապահությամբ։ Ճշգրիտ կտրվածքներ, ամուր գործվածքներ և դետալներ, որոնք նախատեսված են ինտենսիվ շարժման համար։ Սա ֆունկցիոնալություն է՝ առանց ավելորդ աղմուկի, և առաջատարի կեցվածք, որը բառերի կարիք չունի', 'about.p3': 'Սպորտն ու առօրյան այստեղ բաժանված չեն տարբեր պահարանների։ Դրանք մեկ ամբողջական մտածելակերպ են, որով ապրում ես ամեն օր։ Մենք չենք վազում թրենդների հետևից. մենք ինքներս ենք սահմանում տեմպը', 'about.established': 'Հիմնադրված', 'about.movementReady': 'Շարժման պատրաստ', 'about.mentality': 'Մտածելակերպ', 'about.partners': 'Գործընկերներ', 'about.trustedBy': 'Վստահում են', 'about.theChampions': 'Չեմպիոնները', 'about.hockeyLine1': 'Հայաստանի հոկեյի', 'about.hockeyLine2': 'ազգային հավաքական', 'about.futsal': 'Yerevan Futsal', 'about.hockeyDesc': 'Հայաստանի հոկեյի ազգային հավաքականի պաշտոնական սպորտային հագուստի գործընկեր.', 'about.futsalDesc': 'Yerevan Futsal-ի պաշտոնական համազգեստի հպարտ գործընկեր — Հիմն. 2020.',
  'contact.eyebrow': 'Կապ հաստատել', 'contact.title': 'Կապ', 'contact.messageSent': 'Հաղորդագրությունն ուղարկված է', 'contact.messageSentText': 'Շնորհակալություն կապ հաստատելու համար։ DN8 Team-ը շուտով կպատասխանի ձեզ.', 'contact.name': 'Անուն', 'contact.email': 'Էլ. հասցե', 'contact.message': 'Հաղորդագրություն', 'contact.yourName': 'Ձեր անունը', 'contact.emailPlaceholder': 'you@example.com', 'contact.sendMessage': 'Ուղարկել հաղորդագրությունը', 'contact.phone': 'Հեռախոս', 'contact.studio': 'Ստուդիա', 'contact.address': 'Մարշալ Բաղրամյան պող. 2/95,\nԵրևան, Հայաստան', 'contact.hours': 'Աշխատանքային ժամեր', 'contact.days': 'Երկ – Կիր', 'contact.openEveryDay': 'Բաց է ամեն օր', 'contact.social': 'Սոց. ցանցեր', 'contact.openMaps': 'Բացել Google Maps-ում →', 'contact.dragZoom': 'Քաշեք և մոտեցրեք քարտեզը', 'contact.popupAddress': 'Մարշալ Բաղրամյան պող. 2/95, Երևան',
  'footer.tagline': 'Հաղթողի ոճ', 'footer.explore': 'Ուսումնասիրել', 'footer.social': 'Սոց. ցանցեր', 'footer.visitUs': 'Այցելեք մեզ', 'footer.address': 'Մարշալ Բաղրամյան 2/95,\nԵրևան', 'footer.hours': '10:00 – 22:00 Ամեն օր', 'footer.rights': '© 2026 DN8 Team. Բոլոր իրավունքները պաշտպանված են.', 'footer.location': 'Երևան, Հայաստան',
  'cart.title': 'Ձեր զամբյուղը', 'cart.orderPlaced': 'Պատվերը գրանցված է', 'cart.orderText': 'Բարի գալուստ հաղթողների կողմ։ Ձեր DN8 իրերը պատրաստվում են.', 'cart.continue': 'Շարունակել', 'cart.empty': 'Ձեր զամբյուղը դատարկ է.', 'cart.size': 'Չափ', 'cart.subtotal': 'Ընդամենը', 'cart.shipping': 'Առաքումն ու հարկերը կհաշվարկվեն checkout-ում.', 'cart.checkout': 'Վճարել',
  'auth.team': 'DN8 Team', 'auth.signIn': 'Մուտք', 'auth.createAccount': 'Ստեղծել հաշիվ', 'auth.fullName': 'Ամբողջական անուն', 'auth.yourName': 'Ձեր անունը', 'auth.email': 'Էլ. հասցե', 'auth.password': 'Գաղտնաբառ', 'auth.noAccount': 'Հաշիվ չունե՞ք', 'auth.hasAccount': 'Արդեն ունե՞ք հաշիվ', 'auth.createOne': 'Ստեղծել', 'auth.signInSmall': 'Մուտք գործել', 'auth.fillFields': 'Խնդրում ենք լրացնել բոլոր դաշտերը.', 'auth.passwordLength': 'Գաղտնաբառը պետք է լինի առնվազն 6 նիշ.',
};

const ru: Dict = {
  'nav.shop': 'Магазин', 'nav.about': 'О нас', 'nav.contact': 'Контакты', 'nav.signIn': 'Войти', 'nav.signOut': 'Выйти', 'nav.cart': 'Корзина', 'nav.language': 'Язык',
  'announce.newCollection': 'Новая коллекция', 'announce.yerevan': 'Ереван — осн. 2002', 'announce.openDaily': 'Открыто ежедневно 10:00 – 22:00', 'announce.style': 'Стиль победителя',
  'home.heroLine1': 'Стиль', 'home.heroLine2': 'для', 'home.heroPrefix': 'Рождён быть', 'home.heroWinner': 'Победителя', 'home.heroLeader': 'Лидера', 'home.heroChampion': 'Чемпиона', 'home.heroText': 'Современная спортивная одежда для уверенности, движения и ежедневной победы.', 'home.shopCollection': 'Смотреть коллекцию', 'home.ourStory': 'Наша история', 'home.instagram': 'Instagram', 'home.locationShort': 'Ереван, AM', 'home.marquee1': 'СТИЛЬ ПОБЕДИТЕЛЯ', 'home.marquee2': 'МЫ НЕ СЛЕДУЕМ. МЫ ВЕДЁМ.', 'home.marquee3': 'ВСЕ ВЗГЛЯДЫ НА НАС', 'home.marquee4': 'СОЗДАНО ДЛЯ ПОБЕДИТЕЛЕЙ', 'home.officialPartners': 'Официальные партнёры', 'home.nationalTeam': 'Национальная команда', 'home.clubPartner': 'Клуб-партнёр', 'home.partnerHockey': 'Национальная сборная Армении по хоккею', 'home.partnerFutsal': 'Yerevan Futsal', 'home.whyDn8Eyebrow': 'Почему DN8?', 'home.whyDn8Title': 'Четыре причины\nдвигаться иначе', 'home.whyDn8Text': 'Бескомпромиссный стандарт для команд и атлетов, чей характер виден еще до начала игры', 'home.whyPillar1Title': 'Создано для движения', 'home.whyPillar1Text': 'Идеальный крой, премиальные ткани и безупречные детали. Для полной уверенности в движении: на тренировке, в пути и на поле', 'home.whyPillar2Title': 'ДНК чемпионов', 'home.whyPillar2Text': 'В основе DN8 — философия команд, которые привыкли диктовать свои правила, сражаться бескомпромиссно и нести себя как истинные чемпион', 'home.whyPillar3Title': 'Стиль, который говорит сам за себя', 'home.whyPillar3Text': 'Яркий характер, резкие линии и уникальный визуальный стиль делают команду узнаваемой еще до стартового свистка', 'home.whyPillar4Title': 'Создано на века', 'home.whyPillar4Text': 'Надежная конструкция и износостойкие материалы гарантируют безупречный вид не только на первой фотографии, но и в условиях реальной, жесткой игры', 'home.collectionEyebrow': '01 — Коллекция', 'home.featuredCollection': 'Избранная\nколлекция', 'home.viewAll': 'Смотреть всё', 'home.mindset': 'Менталитет', 'home.dontFollow': 'Мы не\nследуем.', 'home.weLead': 'Мы ведём.', 'home.mindsetText': 'Менталитет прежде гардероба. Создано для тех, кто задаёт темп, а не догоняет.', 'home.statementEyebrow': '02 — Заявление', 'home.statementTitle': 'Все взгляды\nна нас.', 'home.statementText': 'Дисциплина в деталях, уверенность в крое. Спортивная одежда, которая держится так, будто уже победила.', 'home.dividerBuilt': 'Создано для победителей', 'home.dividerAllEyes': 'Все взгляды на нас', 'home.dividerDontFollow': 'Мы не следуем', 'home.joinEyebrow': 'Присоединяйся к движению', 'home.joinTitle': 'Присоединяйся\nк победителям', 'home.subscribedTitle': 'Ты на стороне победителей.', 'home.subscribedText': 'Добро пожаловать в DN8 — следите за inbox для следующего дропа.', 'home.emailPlaceholder': 'Введите email', 'home.joinNow': 'Присоединиться', 'home.noSpam': 'Без спама, только дропы', 'home.quickAdd': 'Быстро добавить', 'home.whyEyebrow': '02 — Стандарт', 'home.whyTitle': 'Создано\nдля движения', 'home.whyText': 'Каждая вещь DN8 создана вокруг движения, присутствия и уверенности — форма для тех, кто ведёт первым.', 'home.card1Title': 'Крой для движения', 'home.card1Text': 'Чистые силуэты, спортивный комфорт и детали, которые работают от тренировки до улицы.', 'home.card2Title': 'Менталитет победителя', 'home.card2Text': 'Построено вокруг дисциплины, идентичности и спокойной уверенности готового человека.', 'home.card3Title': 'Армянская энергия', 'home.card3Text': 'Создано в Ереване с смелым визуальным языком, который выделяется.', 'home.ctaEyebrow': 'Готов к следующему дропу?', 'home.ctaTitle': 'Присоединяйся к DN8.', 'home.ctaText': 'Изучи коллекцию и найди вещь под свой темп.', 'home.ctaButton': 'Купить сейчас',
  'shop.eyebrow': 'Весь ассортимент', 'shop.title': 'Магазин', 'shop.quickAdd': 'Быстро добавить',
  'product.back': '← Назад в магазин', 'product.size': 'Размер', 'product.quantity': 'Количество', 'product.addToCart': 'Добавить в корзину', 'product.freeShipping': 'Бесплатная доставка от $120', 'product.returns': 'Возврат в течение 30 дней', 'product.related': 'Вам также может понравиться',
  'about.eyebrow': 'Бренд', 'about.title': 'Создано\nдля победителей.', 'about.p1': 'DN8 Team — современный бренд спортивной одежды, построенный на одном убеждении: как ты двигаешься, так ты и побеждаешь. Мы создаем экипировку, которая вселяет уверенность — ту самую спокойную, непоколебимую уверенность человека, который уже решил, чем закончится этот день', 'about.p2': 'Дисциплина определяет всё, что мы делаем. Продуманный крой, прочные ткани и детали, готовые к реальным нагрузкам. Это функциональность без лишнего шума и лидерство, которому не нужны доказательства', 'about.p3': 'Спорт и лайфстайл здесь — не два разных гардероба. Это один менталитет на каждый день. Мы не следуем трендам — мы задаём темп', 'about.established': 'Основан', 'about.movementReady': 'Готово к движению', 'about.mentality': 'Менталитет', 'about.partners': 'Партнёры', 'about.trustedBy': 'Нам доверяют', 'about.theChampions': 'Чемпионы', 'about.hockeyLine1': 'Хоккейная сборная', 'about.hockeyLine2': 'Армении', 'about.futsal': 'Yerevan Futsal', 'about.hockeyDesc': 'Официальный партнёр по спортивной форме национальной сборной Армении по хоккею.', 'about.futsalDesc': 'Гордый официальный партнёр по форме Yerevan Futsal — осн. 2020.',
  'contact.eyebrow': 'Связаться', 'contact.title': 'Контакты', 'contact.messageSent': 'Сообщение отправлено', 'contact.messageSentText': 'Спасибо за обращение. Команда DN8 скоро свяжется с вами.', 'contact.name': 'Имя', 'contact.email': 'Email', 'contact.message': 'Сообщение', 'contact.yourName': 'Ваше имя', 'contact.emailPlaceholder': 'you@example.com', 'contact.sendMessage': 'Отправить сообщение', 'contact.phone': 'Телефон', 'contact.studio': 'Студия', 'contact.address': 'пр. Маршала Баграмяна 2/95,\nЕреван, Армения', 'contact.hours': 'Часы', 'contact.days': 'Пн – Вс', 'contact.openEveryDay': 'Открыто каждый день', 'contact.social': 'Соцсети', 'contact.openMaps': 'Открыть в Google Maps →', 'contact.dragZoom': 'Перетащите и приблизьте карту', 'contact.popupAddress': 'пр. Маршала Баграмяна 2/95, Ереван',
  'footer.tagline': 'Стиль победителя', 'footer.explore': 'Разделы', 'footer.social': 'Соцсети', 'footer.visitUs': 'Посетите нас', 'footer.address': 'Маршала Баграмяна 2/95,\nЕреван', 'footer.hours': '10:00 – 22:00 ежедневно', 'footer.rights': '© 2026 DN8 Team. Все права защищены.', 'footer.location': 'Ереван, Армения',
  'cart.title': 'Ваша корзина', 'cart.orderPlaced': 'Заказ оформлен', 'cart.orderText': 'Добро пожаловать на сторону победителей. Ваши вещи DN8 готовятся.', 'cart.continue': 'Продолжить', 'cart.empty': 'Ваша корзина пуста.', 'cart.size': 'Размер', 'cart.subtotal': 'Итого', 'cart.shipping': 'Доставка и налоги рассчитываются при оформлении.', 'cart.checkout': 'Оформить заказ',
  'auth.team': 'DN8 Team', 'auth.signIn': 'Войти', 'auth.createAccount': 'Создать аккаунт', 'auth.fullName': 'Полное имя', 'auth.yourName': 'Ваше имя', 'auth.email': 'Email', 'auth.password': 'Пароль', 'auth.noAccount': 'Нет аккаунта?', 'auth.hasAccount': 'Уже есть аккаунт?', 'auth.createOne': 'Создать', 'auth.signInSmall': 'Войти', 'auth.fillFields': 'Пожалуйста, заполните все поля.', 'auth.passwordLength': 'Пароль должен быть не менее 6 символов.',
};

const dictionaries: Record<Lang, Dict> = { en, hy, ru };

const productText: Record<Lang, Record<string, { name: string; cat: string; desc: string }>> = {
  en: {},
  hy: {
    'signature-tee': { name: 'DN8 Signature պոլո', cat: 'Պոլո', desc: 'Մեր հիմնական մոդելը։ Պրեմիում բամբակյա piqué՝ տոնային DN8 նշանով և ասեղնագործ crest-ով։ Մաքուր կտրվածք՝ ամեն օր կրելու համար։' },
    'winner-tee': { name: 'Style of a Winner պոլո', cat: 'Պոլո', desc: 'Պոդիումի համար ստեղծված performance պոլո։ Կառուցված collar, jacquard թևի դետալ և շարժմանը համապատասխանող ձև։' },
    'all-eyes-tee': { name: 'All Eyes շապիկ', cat: 'Շապիկներ', desc: 'Oversized statement շապիկ՝ ծանր jersey գործվածքով և ընդգծված հետևի գրաֆիկայով։ Ստեղծված է երևալու և հիշվելու համար։' },
    'winner-hoodie': { name: 'Winner հուդի', cat: 'Fleece', desc: 'Ծանր fleece հուդի՝ ասեղնագործ crest-ով և signature patterned lining-ով։ Ջերմություն, կառուցվածք և հանգիստ հեղինակություն։' },
    'essential-sweat': { name: 'Essential սվիթշերթ', cat: 'Fleece', desc: 'Փափուկ brushed-back fleece՝ refined silhouette-ով։ Ամենօրյա շերտ off-duty հաղթողի համար։' },
    'training-pants': { name: 'Training տաբատ', cat: 'Ներքևի հագուստ', desc: "Tapered tech-fleece տաբատ՝ zip գրպաններով և 'Born to Win' ասեղնագործությամբ։ Նախագծված է թե՛ մարզման, թե՛ քաղաքի համար։" },
    'zip-hoodie': { name: 'DN8 Zip հուդի', cat: 'Fleece', desc: 'Oversized full-zip հուդի՝ brushed cotton-ից։ Հարմար, layered և ստեղծված շարժման համար՝ warm-up-ից մինչև wind-down։' },
  },
  ru: {
    'signature-tee': { name: 'Поло DN8 Signature', cat: 'Поло', desc: 'Наша базовая вещь. Премиальный хлопковый piqué с тональным знаком DN8 и вышитым crest. Чистый крой, созданный для каждого дня.' },
    'winner-tee': { name: 'Поло Style of a Winner', cat: 'Поло', desc: 'Performance-поло для пьедестала. Структурированный воротник, жаккардовая деталь на рукаве и посадка, которая движется вместе с вами.' },
    'all-eyes-tee': { name: 'Футболка All Eyes', cat: 'Футболки', desc: 'Oversized statement-футболка из плотного jersey с яркой графикой на спине. Создана, чтобы её заметили и запомнили.' },
    'winner-hoodie': { name: 'Худи Winner', cat: 'Флис', desc: 'Плотное флисовое худи с вышитым crest и фирменной patterned lining. Тепло, форма и спокойная уверенность.' },
    'essential-sweat': { name: 'Свитшот Essential', cat: 'Флис', desc: 'Мягкий brushed-back fleece в утончённом силуэте. Ежедневный слой для победителя вне игры.' },
    'training-pants': { name: 'Тренировочные брюки', cat: 'Низ', desc: "Зауженные tech-fleece брюки с карманами на молнии и вышивкой 'Born to Win'. Для тренировки и улицы одновременно." },
    'zip-hoodie': { name: 'Худи DN8 Zip', cat: 'Флис', desc: 'Oversized full-zip худи из brushed cotton. Расслабленное, многослойное и созданное для движения от разминки до отдыха.' },
  },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  productCopy: (product: { id: string; name: string; cat: string; desc?: string }) => { name: string; cat: string; desc?: string };
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('dn8-lang');
    return saved === 'hy' || saved === 'ru' || saved === 'en' ? saved : 'en';
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem('dn8-lang', next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    setLang,
    t: (key: string) => dictionaries[lang][key] ?? en[key] ?? key,
    productCopy: (product) => ({
      name: productText[lang][product.id]?.name ?? product.name,
      cat: productText[lang][product.id]?.cat ?? product.cat,
      desc: product.desc ? (productText[lang][product.id]?.desc ?? product.desc) : product.desc,
    }),
  }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
