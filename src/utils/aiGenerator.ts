export async function generateReflection(
  verseText: string,
  reference: string,
  language: 'en' | 'ar' | 'de'
): Promise<string> {
  const reflections = {
    en: `This powerful verse from ${reference} speaks directly to our hearts today. As we meditate on these words, we see the heart of Christ revealed—a Savior who calls us into deeper relationship with Him.

The beauty of Scripture is that it transforms us from the inside out. When we allow God's Word to dwell richly within us, it shapes our thoughts, our actions, and our very identity in Christ. This passage reminds us that our faith is not merely intellectual assent, but a living, breathing relationship with the Living God.

As followers of Jesus, we're invited to walk in His footsteps, to embody His love, and to reflect His character to a world desperately in need of hope. The Lord doesn't call us to perfection, but to faithful obedience—taking one step at a time, trusting that He who began a good work in us will be faithful to complete it.

Consider how this truth applies to your life today. Where is God calling you to surrender? What area of your heart needs the healing touch of Christ? Let this verse be more than words on a page—let it become a living reality in your daily walk with Jesus.`,
    ar: `هذه الآية القوية من ${reference} تتحدث مباشرة إلى قلوبنا اليوم. عندما نتأمل في هذه الكلمات، نرى قلب المسيح المُعلن - مخلص يدعونا إلى علاقة أعمق معه.

جمال الكتاب المقدس هو أنه يغيرنا من الداخل إلى الخارج. عندما نسمح لكلمة الله أن تسكن بغنى فينا، فإنها تشكل أفكارنا وأفعالنا وهويتنا في المسيح. هذا المقطع يذكرنا أن إيماننا ليس مجرد موافقة فكرية، بل علاقة حية ونابضة بالحياة مع الله الحي.

كأتباع ليسوع، نحن مدعوون للسير في خطواته، لنجسد محبته، ولنعكس صفاته لعالم في أمس الحاجة إلى الرجاء. الرب لا يدعونا إلى الكمال، بل إلى الطاعة الأمينة - نأخذ خطوة واحدة في كل مرة، واثقين أن الذي بدأ فينا عملاً صالحًا سيكون أمينًا لإتمامه.

فكر في كيفية تطبيق هذه الحقيقة على حياتك اليوم. أين يدعوك الله للاستسلام؟ أي منطقة من قلبك تحتاج إلى لمسة الشفاء من المسيح؟ دع هذه الآية تكون أكثر من مجرد كلمات على صفحة - دعها تصبح حقيقة حية في مسيرتك اليومية مع يسوع.`,
    de: `Dieser kraftvolle Vers aus ${reference} spricht heute direkt zu unseren Herzen. Wenn wir über diese Worte nachdenken, sehen wir das Herz Christi offenbart – einen Erlöser, der uns zu einer tieferen Beziehung mit Ihm einlädt.

Die Schönheit der Heiligen Schrift liegt darin, dass sie uns von innen nach außen verwandelt. Wenn wir Gottes Wort reichlich in uns wohnen lassen, prägt es unsere Gedanken, unsere Handlungen und unsere Identität in Christus. Diese Passage erinnert uns daran, dass unser Glaube nicht nur intellektuelle Zustimmung ist, sondern eine lebendige, atmende Beziehung mit dem lebendigen Gott.

Als Nachfolger Jesu sind wir eingeladen, in Seine Fußstapfen zu treten, Seine Liebe zu verkörpern und Seinen Charakter einer Welt zu reflektieren, die verzweifelt Hoffnung braucht. Der Herr ruft uns nicht zur Perfektion, sondern zu treuem Gehorsam – Schritt für Schritt, im Vertrauen darauf, dass Er, der ein gutes Werk in uns begonnen hat, es treu vollenden wird.

Überlegen Sie, wie diese Wahrheit heute auf Ihr Leben zutrifft. Wo ruft Gott Sie zur Hingabe? Welcher Bereich Ihres Herzens braucht die heilende Berührung Christi? Lassen Sie diesen Vers mehr sein als Worte auf einer Seite – lassen Sie ihn zu einer lebendigen Realität in Ihrem täglichen Wandel mit Jesus werden.`,
  };

  return reflections[language];
}

export async function generatePrayer(
  verseText: string,
  reference: string,
  language: 'en' | 'ar' | 'de'
): Promise<string> {
  const prayers = {
    en: `Heavenly Father,

We come before You with grateful hearts, thanking You for the gift of Your Word. Thank You for speaking to us through ${reference}, reminding us of Your love, Your faithfulness, and Your constant presence in our lives.

Lord Jesus, we confess that we often fall short of living out these truths. We ask for Your forgiveness and Your grace to empower us to walk in obedience to Your Word. Help us not merely to read Scripture, but to allow it to transform us from the inside out.

Holy Spirit, we invite You to make these words come alive in our hearts today. Give us wisdom to understand what You're saying, courage to apply it to our lives, and strength to live it out faithfully. Where we are weak, be our strength. Where we are confused, be our guide. Where we are discouraged, be our hope.

We pray for a deeper hunger for Your Word and a closer walk with You. May we grow in faith, hope, and love, reflecting Your character more clearly each day. Use us as instruments of Your peace and love in this world.

We surrender our lives afresh to You, trusting in Your perfect will and Your perfect timing.

In Jesus' mighty name we pray, Amen.`,
    ar: `أبانا السماوي،

نأتي أمامك بقلوب شاكرة، نشكرك على عطية كلمتك. نشكرك لأنك تتكلم إلينا من خلال ${reference}، مذكرًا إيانا بمحبتك وأمانتك وحضورك الدائم في حياتنا.

أيها الرب يسوع، نعترف أننا كثيرًا ما نقصر في تجسيد هذه الحقائق. نطلب مغفرتك ونعمتك لتمكيننا من السير في طاعة كلمتك. ساعدنا ليس فقط لقراءة الكتاب المقدس، بل للسماح له بتغييرنا من الداخل إلى الخارج.

أيها الروح القدس، ندعوك لجعل هذه الكلمات تنبض بالحياة في قلوبنا اليوم. امنحنا الحكمة لفهم ما تقوله، والشجاعة لتطبيقه على حياتنا، والقوة لنعيشه بأمانة. حيث نحن ضعفاء، كن قوتنا. حيث نحن في حيرة، كن دليلنا. حيث نحن محبطون، كن رجاؤنا.

نصلي من أجل جوع أعمق لكلمتك ومسيرة أقرب معك. ليتنا ننمو في الإيمان والرجاء والمحبة، عاكسين صفاتك بشكل أوضح كل يوم. استخدمنا كأدوات لسلامك ومحبتك في هذا العالم.

نسلم حياتنا من جديد لك، واثقين في إرادتك الكاملة وتوقيتك الكامل.

باسم يسوع القدير نصلي، آمين.`,
    de: `Himmlischer Vater,

Wir kommen mit dankbaren Herzen vor Dich und danken Dir für die Gabe Deines Wortes. Danke, dass Du durch ${reference} zu uns sprichst und uns an Deine Liebe, Deine Treue und Deine ständige Gegenwart in unserem Leben erinnerst.

Herr Jesus, wir bekennen, dass wir oft nicht nach diesen Wahrheiten leben. Wir bitten um Deine Vergebung und Deine Gnade, die uns befähigt, in Gehorsam gegenüber Deinem Wort zu wandeln. Hilf uns, nicht nur die Schrift zu lesen, sondern sie uns von innen nach außen verwandeln zu lassen.

Heiliger Geist, wir laden Dich ein, diese Worte heute in unseren Herzen lebendig zu machen. Gib uns Weisheit zu verstehen, was Du sagst, Mut, es auf unser Leben anzuwenden, und Kraft, es treu zu leben. Wo wir schwach sind, sei unsere Stärke. Wo wir verwirrt sind, sei unser Führer. Wo wir entmutigt sind, sei unsere Hoffnung.

Wir beten für einen tieferen Hunger nach Deinem Wort und einen engeren Wandel mit Dir. Mögen wir in Glaube, Hoffnung und Liebe wachsen und Deinen Charakter jeden Tag klarer widerspiegeln. Gebrauche uns als Instrumente Deines Friedens und Deiner Liebe in dieser Welt.

Wir übergeben unser Leben erneut Dir und vertrauen auf Deinen vollkommenen Willen und Dein vollkommenes Timing.

In Jesu mächtigem Namen beten wir, Amen.`,
  };

  return prayers[language];
}

export async function generateStudyPrompts(
  category: string,
  verseText: string,
  reference: string,
  language: 'en' | 'ar' | 'de'
): Promise<string[]> {
  return [
    `How does ${reference} reveal the character and nature of God to you?`,
    `In what practical ways can you live out this truth in your daily walk with Christ?`,
    `What area of your life is God speaking to through this passage?`,
    `How does this verse challenge or encourage you in your current circumstances?`,
    `What step of faith or obedience is God calling you to take based on this Scripture?`,
  ];
}
