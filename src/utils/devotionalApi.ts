export interface DevotionalData {
  id: string;
  date: string;
  verse_reference: string;
  verse_text_en: string;
  verse_text_ar: string | null;
  verse_text_de: string | null;
  reflection_en: string;
  reflection_ar: string;
  reflection_de: string;
  prayer_en: string;
  prayer_ar: string;
  prayer_de: string;
  version_en: string;
  version_ar: string;
  version_de: string;
  created_at: string;
}

// Fallback function to generate basic devotionals
async function generateBasicDevotional(verseText: string, reference: string): Promise<{
  reflectionEn: string;
  reflectionAr: string;
  reflectionDe: string;
  prayerEn: string;
  prayerAr: string;
  prayerDe: string;
}> {
  return {
    reflectionEn: `This powerful verse from ${reference} speaks directly to our hearts today. As we meditate on these words, we see the heart of Christ revealed—a Savior who calls us into deeper relationship with Him. The beauty of Scripture is that it transforms us from the inside out. When we allow God's Word to dwell richly within us, it shapes our thoughts, our actions, and our very identity in Christ. May we be encouraged to trust Him more deeply and follow His ways with greater devotion.`,
    reflectionAr: `هذه الآية القوية من ${reference} تتحدث مباشرة إلى قلوبنا اليوم. عندما نتأمل في هذه الكلمات، نرى قلب المسيح المُعلن - مخلص يدعونا إلى علاقة أعمق معه. جمال الكتاب المقدس هو أنه يغيرنا من الداخل إلى الخارج. عندما نسمح لكلمة الله أن تسكن بغنى فينا، فإنها تشكل أفكارنا وأفعالنا وهويتنا في المسيح. ليتنا نتشجع للثقة به بشكل أعمق واتباع طرقه بتفانٍ أكبر.`,
    reflectionDe: `Dieser kraftvolle Vers aus ${reference} spricht heute direkt zu unseren Herzen. Wenn wir über diese Worte nachdenken, sehen wir das Herz Christi offenbart – einen Erlöser, der uns zu einer tieferen Beziehung mit Ihm einlädt. Die Schönheit der Heiligen Schrift liegt darin, dass sie uns von innen nach außen verwandelt. Wenn wir Gottes Wort reichlich in uns wohnen lassen, prägt es unsere Gedanken, unsere Handlungen und unsere Identität in Christus. Mögen wir ermutigt werden, Ihm tiefer zu vertrauen und Seinen Wegen mit größerer Hingabe zu folgen.`,
    prayerEn: `Heavenly Father, thank You for Your Word and the truth found in ${reference}. Help us to apply it to our lives today. Guide us by Your Holy Spirit and strengthen our faith. Transform us from the inside out as we meditate on Your truth. In Jesus' name, Amen.`,
    prayerAr: `أيها الآب السماوي، نشكرك على كلمتك والحق الموجود في ${reference}. ساعدنا على تطبيقها في حياتنا اليوم. قدنا بروحك القدوس وقوِّ إيماننا. غيّرنا من الداخل إلى الخارج بينما نتأمل في حقك. باسم يسوع، آمين.`,
    prayerDe: `Himmlischer Vater, danke für Dein Wort und die Wahrheit in ${reference}. Hilf uns, es heute in unserem Leben anzuwenden. Führe uns durch Deinen Heiligen Geist und stärke unseren Glauben. Verwandle uns von innen nach außen, während wir über Deine Wahrheit nachdenken. Im Namen Jesu, Amen.`,
  };
}

export async function fetchDevotional(date: string): Promise<DevotionalData | null> {
  try {
    // Try API endpoint first
    const apiUrl = import.meta.env.DEV
      ? `http://localhost:3000/api/devotional?date=${date}`
      : `/api/devotional?date=${date}`;

    console.log('Fetching from API:', apiUrl);
    const response = await fetch(apiUrl);

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (response.ok && contentType?.includes('application/json')) {
      const data = await response.json();
      console.log('API returned data:', data);
      return data;
    }

    console.log('API not available or returned non-JSON, using fallback');
    
    // Fallback: Get verse from OurManna directly
    const ourmannaResponse = await fetch('https://beta.ourmanna.com/api/v1/get/?format=json');
    
    if (!ourmannaResponse.ok) {
      throw new Error('Failed to fetch daily verse from OurManna');
    }

    const ourmannaData = await ourmannaResponse.json();
    const reference = ourmannaData.verse.details.reference;
    const verseTextEn = ourmannaData.verse.details.text;
    const versionEn = ourmannaData.verse.details.version;

    // Generate basic devotionals
    const devotionals = await generateBasicDevotional(verseTextEn, reference);

    const fallbackData: DevotionalData = {
      id: 'fallback-' + date,
      date,
      verse_reference: reference,
      verse_text_en: verseTextEn,
      verse_text_ar: null,
      verse_text_de: null,
      reflection_en: devotionals.reflectionEn,
      reflection_ar: devotionals.reflectionAr,
      reflection_de: devotionals.reflectionDe,
      prayer_en: devotionals.prayerEn,
      prayer_ar: devotionals.prayerAr,
      prayer_de: devotionals.prayerDe,
      version_en: versionEn,
      version_ar: 'Arabic',
      version_de: 'Elberfelder',
      created_at: new Date().toISOString(),
    };

    console.log('Using fallback data:', fallbackData);
    return fallbackData;

  } catch (err) {
    console.error('Error fetching devotional:', err);
    
    // Last resort fallback with a default verse
    return {
      id: 'emergency-fallback',
      date,
      verse_reference: 'John 3:16',
      verse_text_en: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
      verse_text_ar: null,
      verse_text_de: null,
      reflection_en: 'This verse reminds us of God\'s incredible love for us. Through Jesus Christ, we have the gift of eternal life. May we rest in His grace today and share this wonderful news with others.',
      reflection_ar: 'تذكرنا هذه الآية بمحبة الله المذهلة لنا. من خلال يسوع المسيح، لدينا عطية الحياة الأبدية. ليتنا نستريح في نعمته اليوم ونشارك هذه الأخبار الرائعة مع الآخرين.',
      reflection_de: 'Dieser Vers erinnert uns an Gottes unglaubliche Liebe zu uns. Durch Jesus Christus haben wir das Geschenk des ewigen Lebens. Mögen wir heute in Seiner Gnade ruhen und diese wunderbare Nachricht mit anderen teilen.',
      prayer_en: 'Heavenly Father, thank You for Your unfailing love and the gift of salvation through Jesus Christ. Help us to live in the light of this truth. In Jesus\' name, Amen.',
      prayer_ar: 'أيها الآب السماوي، نشكرك على محبتك التي لا تفشل وعطية الخلاص من خلال يسوع المسيح. ساعدنا على العيش في نور هذه الحقيقة. باسم يسوع، آمين.',
      prayer_de: 'Himmlischer Vater, danke für Deine unveränderliche Liebe und das Geschenk der Erlösung durch Jesus Christus. Hilf uns, im Licht dieser Wahrheit zu leben. Im Namen Jesu, Amen.',
      version_en: 'NIV',
      version_ar: 'Arabic',
      version_de: 'Elberfelder',
      created_at: new Date().toISOString(),
    };
  }
}

export async function getTodayDevotional(): Promise<DevotionalData | null> {
  const today = new Date().toISOString().split('T')[0];
  console.log('Fetching devotional for date:', today);
  return fetchDevotional(today);
}