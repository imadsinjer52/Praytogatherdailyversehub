import type { PromptCategory, Language } from '../types';

export function generatePrompts(
  category: PromptCategory,
  language: Language,
  verseText: string,
  verseReference: string
): string[] {
  const isArabic = language === 'ar';

  switch (category) {
    case 'life-application':
      return isArabic
        ? [
            `كيف يمكنك تطبيق رسالة ${verseReference} في حياتك اليومية؟`,
            `ما هي المجالات في حياتك التي تتحدى هذه الآية؟`,
            `كيف يمكن أن تغير هذه الآية طريقة تفكيرك في الأسبوع القادم؟`,
            `ما الخطوات العملية التي يمكنك اتخاذها لتجسيد هذه الحقيقة؟`,
            `كيف يمكن أن تشارك هذا الدرس مع شخص في دائرتك هذا الأسبوع؟`,
          ]
        : [
            `How can you apply the message of ${verseReference} in your daily life?`,
            `What areas of your life does this verse challenge?`,
            `How might this verse change the way you think over the next week?`,
            `What practical steps can you take to embody this truth?`,
            `How could you share this lesson with someone in your circle this week?`,
          ];

    case 'heart-mind-action':
      return isArabic
        ? [
            `القلب: ما هي العاطفة أو التحدي الروحي الذي تثيره هذه الآية في قلبك؟`,
            `القلب: كيف يعزيك الله أو يدعوك من خلال هذه الكلمات؟`,
            `العقل: ما الحقيقة الجديدة أو الرؤية الجديدة التي تكشفها هذه الآية؟`,
            `العقل: كيف تتحدى هذه الآية معتقداتك أو افتراضاتك؟`,
            `العمل: ما الخطوة العملية للطاعة التي يدعوك الله إليها؟`,
            `العمل: كيف يمكنك أن تعيش هذه الحقيقة بشكل مختلف غداً؟`,
          ]
        : [
            `Heart: What emotion or spiritual challenge does this verse stir in your heart?`,
            `Heart: How is God comforting or calling you through these words?`,
            `Mind: What new truth or insight does this verse reveal?`,
            `Mind: How does this verse challenge your beliefs or assumptions?`,
            `Action: What practical step of obedience is God calling you to?`,
            `Action: How can you live this truth differently tomorrow?`,
          ];

    case 'real-life':
      return isArabic
        ? [
            `كيف تتحدث هذه الآية عن التحديات التي تواجهها في العمل أو المدرسة؟`,
            `كيف يمكن أن تشكل هذه الحقيقة الطريقة التي تتعامل بها مع علاقاتك العائلية؟`,
            `ما هي الصراعات الشخصية التي تلقي هذه الآية الضوء عليها؟`,
            `كيف يمكن لهذه الآية أن توجه قراراً صعباً تواجهه؟`,
            `أين تحتاج إلى حكمة أو قوة هذه الآية في علاقاتك؟`,
          ]
        : [
            `How does this verse speak to challenges you face at work or school?`,
            `How might this truth shape the way you handle your family relationships?`,
            `What personal struggles does this verse shed light on?`,
            `How could this verse guide a difficult decision you're facing?`,
            `Where do you need the wisdom or strength of this verse in your relationships?`,
          ];

    case 'deeper-dive':
      return isArabic
        ? [
            `ما الذي تعلمه هذه الآية عن طبيعة الله؟`,
            `كيف تدعوك هذه الآية إلى استسلام أعمق أو ثقة أكبر؟`,
            `ما هي التكلفة أو التحدي في أسلوب الحياة الذي تقدمه هذه الآية؟`,
            `أين تشعر بالمقاومة أو الخوف عند قراءة هذه الآية؟`,
            `كيف تريد من الله أن يغيرك من خلال هذه الحقيقة؟`,
            `ما هو الوعد أو الدعوة المخفية في هذا المقطع؟`,
            `كيف تكشف هذه الآية عن المجالات التي تحتاج فيها إلى النمو؟`,
          ]
        : [
            `What does this verse teach about the nature of God?`,
            `How does this verse call you to deeper surrender or greater trust?`,
            `What is the cost or lifestyle challenge this verse presents?`,
            `Where do you feel resistance or fear when reading this verse?`,
            `How do you want God to change you through this truth?`,
            `What promise or invitation is hidden in this passage?`,
            `How does this verse expose areas where you need to grow?`,
          ];

    case 'prayer-oriented':
      return isArabic
        ? [
            `ما الذي تحتاج إلى التوبة عنه أو الاعتراف به بعد قراءة هذه الآية؟`,
            `لماذا تريد أن تسبح الله أو تشكره بناءً على هذه الآية؟`,
            `ما التوجيه أو الحكمة التي تحتاج إلى أن تطلبها من الله بشأن هذه الحقيقة؟`,
            `كيف يدعوك الله إلى الصلاة من أجل شخص آخر من خلال هذه الآية؟`,
          ]
        : [
            `What do you need to repent of or confess after reading this verse?`,
            `Why do you want to praise or thank God based on this verse?`,
            `What guidance or wisdom do you need to ask God about this truth?`,
            `How is God calling you to pray for someone else through this verse?`,
          ];

    case 'acts':
      return isArabic
        ? [
            `اسأل: ما الأسئلة التي تثيرها هذه الآية في ذهنك؟`,
            `السياق: لماذا كُتبت هذه الآية، ولمن كُتبت؟`,
            `فكر: ما هي الرسالة الأساسية أو الحقيقة في هذه الآية؟`,
            `شارك: كيف يدعوك هذا المقطع لخدمة الآخرين أو مشاركة الإيمان؟`,
            `افكر مرة أخرى: كيف يتحدى هذا المقطع طريقة تفكيرك أو حياتك؟`,
          ]
        : [
            `Ask: What questions does this verse raise in your mind?`,
            `Context: Why was this verse written, and to whom?`,
            `Think: What is the core message or truth in this verse?`,
            `Share/Serve: How does this passage call you to serve others or share faith?`,
            `Think Again: How does this passage challenge your thinking or living?`,
          ];

    case 'soap':
      return isArabic
        ? [
            `الكتاب المقدس: ما الذي يبرز لك في ${verseReference}؟`,
            `الملاحظة: ما الكلمات أو العبارات المهمة في هذا المقطع؟`,
            `التطبيق: كيف ينطبق هذا على حياتك اليوم؟`,
            `الصلاة: بناءً على هذا المقطع، كيف ستصلي؟`,
          ]
        : [
            `Scripture: What stands out to you in ${verseReference}?`,
            `Observation: What words or phrases are significant in this passage?`,
            `Application: How does this apply to your life today?`,
            `Prayer: Based on this passage, how will you pray?`,
          ];

    case 'pray':
      return isArabic
        ? [
            `التسبيح: لماذا تسبح الله بناءً على هذه الآية؟`,
            `التوبة: ما الذي يدعوك الله للتوبة عنه؟`,
            `اطلب: ما الذي تحتاج إلى طلبه من الله؟`,
            `الاستسلام: ما الذي تحتاج إلى تسليمه لله؟`,
          ]
        : [
            `Praise: Why do you praise God based on this verse?`,
            `Repent: What is God calling you to repent of?`,
            `Ask: What do you need to ask God for?`,
            `Yield: What do you need to surrender to God?`,
          ];

    case '5wh':
      return isArabic
        ? [
            `من: من هو المتحدث أو المتلقي في هذا المقطع؟`,
            `ماذا: ما هي الرسالة أو الأمر الرئيسي؟`,
            `متى: متى حدث هذا أو متى ينطبق؟`,
            `أين: أين وقعت هذه الأحداث أو أين ينطبق؟`,
            `لماذا: لماذا هذه الحقيقة مهمة لحياتك؟`,
            `كيف: كيف يمكنك تطبيق هذا أو الاستجابة لهذا؟`,
          ]
        : [
            `Who: Who is speaking or being addressed in this passage?`,
            `What: What is the main message or command?`,
            `When: When did this happen or when does it apply?`,
            `Where: Where did these events take place or where does it apply?`,
            `Why: Why is this truth important for your life?`,
            `How: How can you apply this or respond to it?`,
          ];

    case 'grow':
      return isArabic
        ? [
            `الله: ما الذي تتعلمه عن الله من هذه الآية؟`,
            `الواقع: ما هو واقعك الحالي فيما يتعلق بهذه الحقيقة؟`,
            `الخيارات: ما هي الخيارات أو الاستجابات المتاحة لك؟`,
            `الطريق إلى الأمام: ما الخطوة الواحدة التي ستتخذها للنمو في هذا المجال؟`,
            `النمو: كيف سيبدو النمو في هذا المجال بعد شهر من الآن؟`,
          ]
        : [
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

export const categoryLabels: Record<PromptCategory, { en: string; ar: string }> = {
  'life-application': {
    en: 'Life Application Focus',
    ar: 'التطبيق في الحياة اليومية',
  },
  'heart-mind-action': {
    en: 'Heart + Mind + Action',
    ar: 'القلب + العقل + العمل',
  },
  'real-life': {
    en: 'Real-Life Scenarios',
    ar: 'سيناريوهات الحياة الواقعية',
  },
  'deeper-dive': {
    en: 'Deeper Dive',
    ar: 'غوص أعمق',
  },
  'prayer-oriented': {
    en: 'Prayer-Oriented',
    ar: 'موجه للصلاة',
  },
  acts: {
    en: 'ACTS Method',
    ar: 'طريقة ACTS',
  },
  soap: {
    en: 'SOAP Method',
    ar: 'طريقة SOAP',
  },
  pray: {
    en: 'P.R.A.Y. Method',
    ar: 'طريقة P.R.A.Y',
  },
  '5wh': {
    en: '5W+H Questions',
    ar: 'أسئلة 5W+H',
  },
  grow: {
    en: 'G.R.O.W. Method',
    ar: 'طريقة G.R.O.W',
  },
};
