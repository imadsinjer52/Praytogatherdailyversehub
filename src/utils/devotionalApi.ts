export interface DevotionalData {
  id?: string;
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
  created_at?: string;
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
    reflectionEn: `This verse reminds us of God's faithfulness and love. As we meditate on ${reference}, let us consider how this truth applies to our daily walk with Christ. May we be encouraged to trust Him more deeply and follow His ways with greater devotion.`,
    reflectionAr: `تذكرنا هذه الآية بأمانة الله ومحبته. بينما نتأمل في ${reference}، دعونا نفكر في كيفية تطبيق هذه الحقيقة على مسيرتنا اليومية مع المسيح. ليتنا نتشجع للثقة به بشكل أعمق واتباع طرقه بتفانٍ أكبر.`,
    reflectionDe: `Dieser Vers erinnert uns an Gottes Treue und Liebe. Während wir über ${reference} nachdenken, lasst uns überlegen, wie diese Wahrheit auf unseren täglichen Weg mit Christus zutrifft. Mögen wir ermutigt werden, Ihm tiefer zu vertrauen und Seinen Wegen mit größerer Hingabe zu folgen.`,
    prayerEn: `Heavenly Father, thank You for Your Word and the truth found in this verse. Help us to apply it to our lives today. Guide us by Your Holy Spirit and strengthen our faith. In Jesus' name, Amen.`,
    prayerAr: `أيها الآب السماوي، نشكرك على كلمتك والحق الموجود في هذه الآية. ساعدنا على تطبيقها في حياتنا اليوم. قدنا بروحك القدوس وقوِّ إيماننا. باسم يسوع، آمين.`,
    prayerDe: `Himmlischer Vater, danke für Dein Wort und die Wahrheit in diesem Vers. Hilf uns, es heute in unserem Leben anzuwenden. Führe uns durch Deinen Heiligen Geist und stärke unseren Glauben. Im Namen Jesu, Amen.`,
  };
}

export async function fetchDevotional(date: string): Promise<DevotionalData | null> {
  try {
    // Try the API endpoint first
    const apiUrl = `/api/devotional?date=${date}`;
    
    console.log('Trying API endpoint:', apiUrl);
    const response = await fetch(apiUrl);

    if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json();
      console.log('API returned data:', data);
      return data;
    }

    console.log('API endpoint failed, using fallback...');
    
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
    };

    console.log('Using fallback data:', fallbackData);
    return fallbackData;

  } catch (err) {
    console.error('Error fetching devotional:', err);
    throw err;
  }
}

export async function getTodayDevotional(): Promise<DevotionalData | null> {
  const today = new Date().toISOString().split('T')[0];
  console.log('Fetching devotional for date:', today);
  return fetchDevotional(today);
}