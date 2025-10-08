import type { PromptCategory, Language } from '../types';

export function generatePrompts(
  category: PromptCategory,
  language: Language,
  verseText: string,
  verseReference: string
): string[] {
  const isArabic = language === 'ar';
  const isGerman = language === 'de';

  switch (category) {
    case 'life-application':
      if (isArabic) {
        return [
          `كيف يمكنك تطبيق رسالة ${verseReference} في حياتك اليومية؟`,
          `ما هي المجالات في حياتك التي تتحدى هذه الآية؟`,
          `كيف يمكن أن تغير هذه الآية طريقة تفكيرك في الأسبوع القادم؟`,
          `ما الخطوات العملية التي يمكنك اتخاذها لتجسيد هذه الحقيقة؟`,
          `كيف يمكن أن تشارك هذا الدرس مع شخص في دائرتك هذا الأسبوع؟`,
        ];
      } else if (isGerman) {
        return [
          `Wie kannst du die Botschaft von ${verseReference} in deinem täglichen Leben anwenden?`,
          `Welche Bereiche deines Lebens fordert dieser Vers heraus?`,
          `Wie könnte dieser Vers deine Denkweise in der nächsten Woche verändern?`,
          `Welche praktischen Schritte kannst du unternehmen, um diese Wahrheit zu verkörpern?`,
          `Wie könntest du diese Lektion diese Woche mit jemandem in deinem Umfeld teilen?`,
        ];
      }
      return [
        `How can you apply the message of ${verseReference} in your daily life?`,
        `What areas of your life does this verse challenge?`,
        `How might this verse change the way you think over the next week?`,
        `What practical steps can you take to embody this truth?`,
        `How could you share this lesson with someone in your circle this week?`,
      ];

    case 'heart-mind-action':
      if (isArabic) {
        return [
          `القلب: ما هي العاطفة أو التحدي الروحي الذي تثيره هذه الآية في قلبك؟`,
          `القلب: كيف يعزيك الله أو يدعوك من خلال هذه الكلمات؟`,
          `العقل: ما الحقيقة الجديدة أو الرؤية الجديدة التي تكشفها هذه الآية؟`,
          `العقل: كيف تتحدى هذه الآية معتقداتك أو افتراضاتك؟`,
          `العمل: ما الخطوة العملية للطاعة التي يدعوك الله إليها؟`,
          `العمل: كيف يمكنك أن تعيش هذه الحقيقة بشكل مختلف غداً؟`,
        ];
      } else if (isGerman) {
        return [
          `Herz: Welche Emotion oder spirituelle Herausforderung weckt dieser Vers in deinem Herzen?`,
          `Herz: Wie tröstet oder ruft Gott dich durch diese Worte?`,
          `Verstand: Welche neue Wahrheit oder Einsicht offenbart dieser Vers?`,
          `Verstand: Wie fordert dieser Vers deine Überzeugungen oder Annahmen heraus?`,
          `Handlung: Welchen praktischen Gehorsamsschritt ruft Gott dich auf zu gehen?`,
          `Handlung: Wie kannst du diese Wahrheit morgen anders leben?`,
        ];
      }
      return [
        `Heart: What emotion or spiritual challenge does this verse stir in your heart?`,
        `Heart: How is God comforting or calling you through these words?`,
        `Mind: What new truth or insight does this verse reveal?`,
        `Mind: How does this verse challenge your beliefs or assumptions?`,
        `Action: What practical step of obedience is God calling you to?`,
        `Action: How can you live this truth differently tomorrow?`,
      ];

    case 'real-life':
      if (isArabic) {
        return [
          `كيف تتحدث هذه الآية عن التحديات التي تواجهها في العمل أو المدرسة؟`,
          `كيف يمكن أن تشكل هذه الحقيقة الطريقة التي تتعامل بها مع علاقاتك العائلية؟`,
          `ما هي الصراعات الشخصية التي تلقي هذه الآية الضوء عليها؟`,
          `كيف يمكن لهذه الآية أن توجه قراراً صعباً تواجهه؟`,
          `أين تحتاج إلى حكمة أو قوة هذه الآية في علاقاتك؟`,
        ];
      } else if (isGerman) {
        return [
          `Wie spricht dieser Vers zu Herausforderungen, die du bei der Arbeit oder in der Schule hast?`,
          `Wie könnte diese Wahrheit die Art und Weise prägen, wie du mit deinen Familienbeziehungen umgehst?`,
          `Auf welche persönlichen Kämpfe wirft dieser Vers Licht?`,
          `Wie könnte dieser Vers eine schwierige Entscheidung leiten, vor der du stehst?`,
          `Wo brauchst du die Weisheit oder Kraft dieses Verses in deinen Beziehungen?`,
        ];
      }
      return [
        `How does this verse speak to challenges you face at work or school?`,
        `How might this truth shape the way you handle your family relationships?`,
        `What personal struggles does this verse shed light on?`,
        `How could this verse guide a difficult decision you're facing?`,
        `Where do you need the wisdom or strength of this verse in your relationships?`,
      ];

    case 'deeper-dive':
      if (isArabic) {
        return [
          `ما الذي تعلمه هذه الآية عن طبيعة الله؟`,
          `كيف تدعوك هذه الآية إلى استسلام أعمق أو ثقة أكبر؟`,
          `ما هي التكلفة أو التحدي في أسلوب الحياة الذي تقدمه هذه الآية؟`,
          `أين تشعر بالمقاومة أو الخوف عند قراءة هذه الآية؟`,
          `كيف تريد من الله أن يغيرك من خلال هذه الحقيقة؟`,
          `ما هو الوعد أو الدعوة المخفية في هذا المقطع؟`,
          `كيف تكشف هذه الآية عن المجالات التي تحتاج فيها إلى النمو؟`,
        ];
      } else if (isGerman) {
        return [
          `Was lehrt dieser Vers über die Natur Gottes?`,
          `Wie ruft dich dieser Vers zu tieferer Hingabe oder größerem Vertrauen auf?`,
          `Was sind die Kosten oder Lebensstil-Herausforderungen, die dieser Vers darstellt?`,
          `Wo spürst du Widerstand oder Angst beim Lesen dieses Verses?`,
          `Wie möchtest du, dass Gott dich durch diese Wahrheit verändert?`,
          `Welches Versprechen oder welche Einladung ist in diesem Abschnitt verborgen?`,
          `Wie offenbart dieser Vers Bereiche, in denen du wachsen musst?`,
        ];
      }
      return [
        `What does this verse teach about the nature of God?`,
        `How does this verse call you to deeper surrender or greater trust?`,
        `What is the cost or lifestyle challenge this verse presents?`,
        `Where do you feel resistance or fear when reading this verse?`,
        `How do you want God to change you through this truth?`,
        `What promise or invitation is hidden in this passage?`,
        `How does this verse expose areas where you need to grow?`,
      ];

    case 'prayer-oriented':
      if (isArabic) {
        return [
          `ما الذي تحتاج إلى التوبة عنه أو الاعتراف به بعد قراءة هذه الآية؟`,
          `لماذا تريد أن تسبح الله أو تشكره بناءً على هذه الآية؟`,
          `ما التوجيه أو الحكمة التي تحتاج إلى أن تطلبها من الله بشأن هذه الحقيقة؟`,
          `كيف يدعوك الله إلى الصلاة من أجل شخص آخر من خلال هذه الآية؟`,
        ];
      } else if (isGerman) {
        return [
          `Wovon musst du Buße tun oder was bekennen, nachdem du diesen Vers gelesen hast?`,
          `Warum möchtest du Gott aufgrund dieses Verses loben oder danken?`,
          `Welche Führung oder Weisheit musst du Gott bezüglich dieser Wahrheit bitten?`,
          `Wie ruft Gott dich auf, durch diesen Vers für jemand anderen zu beten?`,
        ];
      }
      return [
        `What do you need to repent of or confess after reading this verse?`,
        `Why do you want to praise or thank God based on this verse?`,
        `What guidance or wisdom do you need to ask God about this truth?`,
        `How is God calling you to pray for someone else through this verse?`,
      ];

    case 'acts':
      if (isArabic) {
        return [
          `اسأل: ما الأسئلة التي تثيرها هذه الآية في ذهنك؟`,
          `السياق: لماذا كُتبت هذه الآية، ولمن كُتبت؟`,
          `فكر: ما هي الرسالة الأساسية أو الحقيقة في هذه الآية؟`,
          `شارك: كيف يدعوك هذا المقطع لخدمة الآخرين أو مشاركة الإيمان؟`,
          `افكر مرة أخرى: كيف يتحدى هذا المقطع طريقة تفكيرك أو حياتك؟`,
        ];
      } else if (isGerman) {
        return [
          `Fragen: Welche Fragen wirft dieser Vers in deinem Kopf auf?`,
          `Kontext: Warum wurde dieser Vers geschrieben, und für wen?`,
          `Denken: Was ist die Kernbotschaft oder Wahrheit in diesem Vers?`,
          `Teilen/Dienen: Wie ruft dich dieser Abschnitt auf, anderen zu dienen oder den Glauben zu teilen?`,
          `Überdenken: Wie fordert dieser Abschnitt dein Denken oder Leben heraus?`,
        ];
      }
      return [
        `Ask: What questions does this verse raise in your mind?`,
        `Context: Why was this verse written, and to whom?`,
        `Think: What is the core message or truth in this verse?`,
        `Share/Serve: How does this passage call you to serve others or share faith?`,
        `Think Again: How does this passage challenge your thinking or living?`,
      ];

    case 'soap':
      if (isArabic) {
        return [
          `الكتاب المقدس: ما الذي يبرز لك في ${verseReference}؟`,
          `الملاحظة: ما الكلمات أو العبارات المهمة في هذا المقطع؟`,
          `التطبيق: كيف ينطبق هذا على حياتك اليوم؟`,
          `الصلاة: بناءً على هذا المقطع، كيف ستصلي؟`,
        ];
      } else if (isGerman) {
        return [
          `Schrift: Was fällt dir in ${verseReference} auf?`,
          `Beobachtung: Welche Wörter oder Phrasen sind in diesem Abschnitt bedeutsam?`,
          `Anwendung: Wie gilt das für dein Leben heute?`,
          `Gebet: Basierend auf diesem Abschnitt, wie wirst du beten?`,
        ];
      }
      return [
        `Scripture: What stands out to you in ${verseReference}?`,
        `Observation: What words or phrases are significant in this passage?`,
        `Application: How does this apply to your life today?`,
        `Prayer: Based on this passage, how will you pray?`,
      ];

    case 'pray':
      if (isArabic) {
        return [
          `التسبيح: لماذا تسبح الله بناءً على هذه الآية؟`,
          `التوبة: ما الذي يدعوك الله للتوبة عنه؟`,
          `اطلب: ما الذي تحتاج إلى طلبه من الله؟`,
          `الاستسلام: ما الذي تحتاج إلى تسليمه لله؟`,
        ];
      } else if (isGerman) {
        return [
          `Lob: Warum lobst du Gott aufgrund dieses Verses?`,
          `Buße: Wovon ruft Gott dich zur Buße auf?`,
          `Bitten: Worum musst du Gott bitten?`,
          `Hingeben: Was musst du Gott übergeben?`,
        ];
      }
      return [
        `Praise: Why do you praise God based on this verse?`,
        `Repent: What is God calling you to repent of?`,
        `Ask: What do you need to ask God for?`,
        `Yield: What do you need to surrender to God?`,
      ];

    case '5wh':
      if (isArabic) {
        return [
          `من: من هو المتحدث أو المتلقي في هذا المقطع؟`,
          `ماذا: ما هي الرسالة أو الأمر الرئيسي؟`,
          `متى: متى حدث هذا أو متى ينطبق؟`,
          `أين: أين وقعت هذه الأحداث أو أين ينطبق؟`,
          `لماذا: لماذا هذه الحقيقة مهمة لحياتك؟`,
          `كيف: كيف يمكنك تطبيق هذا أو الاستجابة لهذا؟`,
        ];
      } else if (isGerman) {
        return [
          `Wer: Wer spricht oder wird in diesem Abschnitt angesprochen?`,
          `Was: Was ist die Hauptbotschaft oder das Gebot?`,
          `Wann: Wann geschah das oder wann gilt es?`,
          `Wo: Wo fanden diese Ereignisse statt oder wo gilt es?`,
          `Warum: Warum ist diese Wahrheit wichtig für dein Leben?`,
          `Wie: Wie kannst du das anwenden oder darauf reagieren?`,
        ];
      }
      return [
        `Who: Who is speaking or being addressed in this passage?`,
        `What: What is the main message or command?`,
        `When: When did this happen or when does it apply?`,
        `Where: Where did these events take place or where does it apply?`,
        `Why: Why is this truth important for your life?`,
        `How: How can you apply this or respond to it?`,
      ];

    case 'grow':
      if (isArabic) {
        return [
          `الله: ما الذي تتعلمه عن الله من هذه الآية؟`,
          `الواقع: ما هو واقعك الحالي فيما يتعلق بهذه الحقيقة؟`,
          `الخيارات: ما هي الخيارات أو الاستجابات المتاحة لك؟`,
          `الطريق إلى الأمام: ما الخطوة الواحدة التي ستتخذها للنمو في هذا المجال؟`,
          `النمو: كيف سيبدو النمو في هذا المجال بعد شهر من الآن؟`,
        ];
      } else if (isGerman) {
        return [
          `Gott: Was lernst du über Gott aus diesem Vers?`,
          `Realität: Was ist deine aktuelle Realität in Bezug auf diese Wahrheit?`,
          `Optionen: Welche Optionen oder Antworten stehen dir zur Verfügung?`,
          `Weg nach vorn: Welchen einen Schritt wirst du unternehmen, um in diesem Bereich zu wachsen?`,
          `Wachstum: Wie wird Wachstum in diesem Bereich in einem Monat aussehen?`,
        ];
      }
      return [
        `God: What are you learning about God from this verse?`,
        `Reality: What is your current reality regarding this truth?`,
        `Options: What options or responses are available to you?`,
        `Way Forward: What one step will you take to grow in this area?`,
        `Growth: What will growth look like in this area one month from now?`,
      ];

    default:
      return [];
  }
}

export const categoryLabels: Record<PromptCategory, { en: string; ar: string; de: string }> = {
  'life-application': {
    en: 'Life Application Focus',
    ar: 'التطبيق في الحياة اليومية',
    de: 'Lebensanwendung Fokus',
  },
  'heart-mind-action': {
    en: 'Heart + Mind + Action',
    ar: 'القلب + العقل + العمل',
    de: 'Herz + Verstand + Handlung',
  },
  'real-life': {
    en: 'Real-Life Scenarios',
    ar: 'سيناريوهات الحياة الواقعية',
    de: 'Alltags-Szenarien',
  },
  'deeper-dive': {
    en: 'Deeper Dive',
    ar: 'غوص أعمق',
    de: 'Tiefer eintauchen',
  },
  'prayer-oriented': {
    en: 'Prayer-Oriented',
    ar: 'موجه للصلاة',
    de: 'Gebetsorientiert',
  },
  acts: {
    en: 'ACTS Method',
    ar: 'طريقة ACTS',
    de: 'ACTS-Methode',
  },
  soap: {
    en: 'SOAP Method',
    ar: 'طريقة SOAP',
    de: 'SOAP-Methode',
  },
  pray: {
    en: 'P.R.A.Y. Method',
    ar: 'طريقة P.R.A.Y',
    de: 'P.R.A.Y.-Methode',
  },
  '5wh': {
    en: '5W+H Questions',
    ar: 'أسئلة 5W+H',
    de: '5W+H Fragen',
  },
  grow: {
    en: 'G.R.O.W. Method',
    ar: 'طريقة G.R.O.W',
    de: 'G.R.O.W.-Methode',
  },
};