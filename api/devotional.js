import { createClient } from '@supabase/supabase-js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'gen-lang-client-0414822769';
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://smlthwtofcbcwbhnyivn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtbHRod3RvZmNiY3diaG55aXZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTY5OTk0MywiZXhwIjoyMDc1Mjc1OTQzfQ.sLqRbdf4e-hYziVo0vQKc2yimaYufsS95Uk-v_NoGzg';
const BIBLE_API_KEY = 'dfecf59a67e02727e51fa19db059672a';
const BIBLE_API_BASE = 'https://api.scripture.api.bible/v1';

const TRANSLATION_IDS = {
  arabic: 'b17e246951402e50-01',
  german: 'f492a38d0e52db0f-01',
};

const bibleBooks = [
  { abbr: 'GEN', number: 1, englishName: 'Genesis', arabicName: 'التكوين', germanName: '1. Mose' },
  { abbr: 'EXO', number: 2, englishName: 'Exodus', arabicName: 'الخروج', germanName: '2. Mose' },
  { abbr: 'LEV', number: 3, englishName: 'Leviticus', arabicName: 'اللاويين', germanName: '3. Mose' },
  { abbr: 'NUM', number: 4, englishName: 'Numbers', arabicName: 'العدد', germanName: '4. Mose' },
  { abbr: 'DEU', number: 5, englishName: 'Deuteronomy', arabicName: 'التثنية', germanName: '5. Mose' },
  { abbr: 'JOS', number: 6, englishName: 'Joshua', arabicName: 'يشوع', germanName: 'Josua' },
  { abbr: 'JDG', number: 7, englishName: 'Judges', arabicName: 'القضاة', germanName: 'Richter' },
  { abbr: 'RUT', number: 8, englishName: 'Ruth', arabicName: 'راعوث', germanName: 'Ruth' },
  { abbr: '1SA', number: 9, englishName: '1 Samuel', arabicName: 'صموئيل الأول', germanName: '1. Samuel' },
  { abbr: '2SA', number: 10, englishName: '2 Samuel', arabicName: 'صموئيل الثاني', germanName: '2. Samuel' },
  { abbr: '1KI', number: 11, englishName: '1 Kings', arabicName: 'الملوك الأول', germanName: '1. Könige' },
  { abbr: '2KI', number: 12, englishName: '2 Kings', arabicName: 'الملوك الثاني', germanName: '2. Könige' },
  { abbr: '1CH', number: 13, englishName: '1 Chronicles', arabicName: 'أخبار الأيام الأول', germanName: '1. Chronika' },
  { abbr: '2CH', number: 14, englishName: '2 Chronicles', arabicName: 'أخبار الأيام الثاني', germanName: '2. Chronika' },
  { abbr: 'EZR', number: 15, englishName: 'Ezra', arabicName: 'عزرا', germanName: 'Esra' },
  { abbr: 'NEH', number: 16, englishName: 'Nehemiah', arabicName: 'نحميا', germanName: 'Nehemia' },
  { abbr: 'EST', number: 17, englishName: 'Esther', arabicName: 'أستير', germanName: 'Esther' },
  { abbr: 'JOB', number: 18, englishName: 'Job', arabicName: 'أيوب', germanName: 'Hiob' },
  { abbr: 'PSA', number: 19, englishName: 'Psalms', arabicName: 'المزامير', germanName: 'Psalmen' },
  { abbr: 'PRO', number: 20, englishName: 'Proverbs', arabicName: 'الأمثال', germanName: 'Sprüche' },
  { abbr: 'ECC', number: 21, englishName: 'Ecclesiastes', arabicName: 'الجامعة', germanName: 'Prediger' },
  { abbr: 'SNG', number: 22, englishName: 'Song of Songs', arabicName: 'نشيد الإنشاد', germanName: 'Hoheslied' },
  { abbr: 'ISA', number: 23, englishName: 'Isaiah', arabicName: 'إشعياء', germanName: 'Jesaja' },
  { abbr: 'JER', number: 24, englishName: 'Jeremiah', arabicName: 'إرميا', germanName: 'Jeremia' },
  { abbr: 'LAM', number: 25, englishName: 'Lamentations', arabicName: 'مراثي إرميا', germanName: 'Klagelieder' },
  { abbr: 'EZK', number: 26, englishName: 'Ezekiel', arabicName: 'حزقيال', germanName: 'Hesekiel' },
  { abbr: 'DAN', number: 27, englishName: 'Daniel', arabicName: 'دانيال', germanName: 'Daniel' },
  { abbr: 'HOS', number: 28, englishName: 'Hosea', arabicName: 'هوشع', germanName: 'Hosea' },
  { abbr: 'JOL', number: 29, englishName: 'Joel', arabicName: 'يوئيل', germanName: 'Joel' },
  { abbr: 'AMO', number: 30, englishName: 'Amos', arabicName: 'عاموس', germanName: 'Amos' },
  { abbr: 'OBA', number: 31, englishName: 'Obadiah', arabicName: 'عوبديا', germanName: 'Obadja' },
  { abbr: 'JON', number: 32, englishName: 'Jonah', arabicName: 'يونان', germanName: 'Jona' },
  { abbr: 'MIC', number: 33, englishName: 'Micah', arabicName: 'ميخا', germanName: 'Micha' },
  { abbr: 'NAM', number: 34, englishName: 'Nahum', arabicName: 'ناحوم', germanName: 'Nahum' },
  { abbr: 'HAB', number: 35, englishName: 'Habakkuk', arabicName: 'حبقوق', germanName: 'Habakuk' },
  { abbr: 'ZEP', number: 36, englishName: 'Zephaniah', arabicName: 'صفنيا', germanName: 'Zephanja' },
  { abbr: 'HAG', number: 37, englishName: 'Haggai', arabicName: 'حجّي', germanName: 'Haggai' },
  { abbr: 'ZEC', number: 38, englishName: 'Zechariah', arabicName: 'زكريا', germanName: 'Sacharja' },
  { abbr: 'MAL', number: 39, englishName: 'Malachi', arabicName: 'ملاخي', germanName: 'Maleachi' },
  { abbr: 'MAT', number: 40, englishName: 'Matthew', arabicName: 'متى', germanName: 'Matthäus' },
  { abbr: 'MRK', number: 41, englishName: 'Mark', arabicName: 'مرقس', germanName: 'Markus' },
  { abbr: 'LUK', number: 42, englishName: 'Luke', arabicName: 'لوقا', germanName: 'Lukas' },
  { abbr: 'JHN', number: 43, englishName: 'John', arabicName: 'يوحنا', germanName: 'Johannes' },
  { abbr: 'ACT', number: 44, englishName: 'Acts', arabicName: 'أعمال الرسل', germanName: 'Apostelgeschichte' },
  { abbr: 'ROM', number: 45, englishName: 'Romans', arabicName: 'رومية', germanName: 'Römer' },
  { abbr: '1CO', number: 46, englishName: '1 Corinthians', arabicName: 'كورنثوس الأولى', germanName: '1. Korinther' },
  { abbr: '2CO', number: 47, englishName: '2 Corinthians', arabicName: 'كورنثوس الثانية', germanName: '2. Korinther' },
  { abbr: 'GAL', number: 48, englishName: 'Galatians', arabicName: 'غلاطية', germanName: 'Galater' },
  { abbr: 'EPH', number: 49, englishName: 'Ephesians', arabicName: 'أفسس', germanName: 'Epheser' },
  { abbr: 'PHP', number: 50, englishName: 'Philippians', arabicName: 'فيلبي', germanName: 'Philipper' },
  { abbr: 'COL', number: 51, englishName: 'Colossians', arabicName: 'كولوسي', germanName: 'Kolosser' },
  { abbr: '1TH', number: 52, englishName: '1 Thessalonians', arabicName: 'تسالونيكي الأولى', germanName: '1. Thessalonicher' },
  { abbr: '2TH', number: 53, englishName: '2 Thessalonians', arabicName: 'تسالونيكي الثانية', germanName: '2. Thessalonicher' },
  { abbr: '1TI', number: 54, englishName: '1 Timothy', arabicName: 'تيموثاوس الأولى', germanName: '1. Timotheus' },
  { abbr: '2TI', number: 55, englishName: '2 Timothy', arabicName: 'تيموثاوس الثانية', germanName: '2. Timotheus' },
  { abbr: 'TIT', number: 56, englishName: 'Titus', arabicName: 'تيطس', germanName: 'Titus' },
  { abbr: 'PHM', number: 57, englishName: 'Philemon', arabicName: 'فليمون', germanName: 'Philemon' },
  { abbr: 'HEB', number: 58, englishName: 'Hebrews', arabicName: 'العبرانيين', germanName: 'Hebräer' },
  { abbr: 'JAM', number: 59, englishName: 'James', arabicName: 'يعقوب', germanName: 'Jakobus' },
  { abbr: '1PE', number: 60, englishName: '1 Peter', arabicName: 'بطرس الأولى', germanName: '1. Petrus' },
  { abbr: '2PE', number: 61, englishName: '2 Peter', arabicName: 'بطرس الثانية', germanName: '2. Petrus' },
  { abbr: '1JN', number: 62, englishName: '1 John', arabicName: 'يوحنا الأولى', germanName: '1. Johannes' },
  { abbr: '2JN', number: 63, englishName: '2 John', arabicName: 'يوحنا الثانية', germanName: '2. Johannes' },
  { abbr: '3JN', number: 64, englishName: '3 John', arabicName: 'يوحنا الثالثة', germanName: '3. Johannes' },
  { abbr: 'JUD', number: 65, englishName: 'Jude', arabicName: 'يهوذا', germanName: 'Judas' },
  { abbr: 'REV', number: 66, englishName: 'Revelation', arabicName: 'الرؤيا', germanName: 'Offenbarung' },
];

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function findBookByName(name) {
  const normalized = name.toLowerCase().trim();
  return bibleBooks.find(
    (book) =>
      book.englishName.toLowerCase() === normalized ||
      book.arabicName === name ||
      book.germanName.toLowerCase() === normalized ||
      book.abbr.toLowerCase() === normalized ||
      book.englishName.toLowerCase().replace(/\s+/g, '') === normalized.replace(/\s+/g, '') ||
      book.germanName.toLowerCase().replace(/\s+/g, '') === normalized.replace(/\s+/g, '')
  ) || null;
}

async function fetchVerseByBookNumber(versionId, bookNumber, chapter, verse) {
  try {
    const booksResponse = await fetch(`${BIBLE_API_BASE}/bibles/${versionId}/books`, {
      headers: { 'api-key': BIBLE_API_KEY },
    });
    const booksData = await booksResponse.json();
    const books = booksData.data || [];

    const matchingBook = books[bookNumber - 1];
    if (!matchingBook) return null;

    const chaptersResponse = await fetch(`${BIBLE_API_BASE}/bibles/${versionId}/books/${matchingBook.id}/chapters`, {
      headers: { 'api-key': BIBLE_API_KEY },
    });
    const chaptersData = await chaptersResponse.json();
    const chapters = (chaptersData.data || []).filter(ch => ch.number && ch.number !== 'intro');
    const matchingChapter = chapters.find(c => c.number === chapter.toString());

    if (!matchingChapter) return null;

    const verseResponse = await fetch(
      `${BIBLE_API_BASE}/bibles/${versionId}/passages/${matchingChapter.id}.${verse}-${matchingChapter.id}.${verse}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`,
      { headers: { 'api-key': BIBLE_API_KEY } }
    );
    const verseData = await verseResponse.json();

    if (verseData.data) {
      const cleanContent = verseData.data.content
        .replace(/^\[\d+\]\s*/, '')
        .replace(/\s*\[\d+\]\s*/g, ' ')
        .trim();
      return cleanContent;
    }
    return null;
  } catch (err) {
    console.error('Error fetching verse:', err);
    return null;
  }
}

function parseVerseReference(reference) {
  const match = reference.match(/^(.+?)\s+(\d+):(\d+)/);
  if (!match) return null;

  const bookName = match[1].trim();
  const book = findBookByName(bookName);

  if (!book) return null;

  return {
    book: bookName,
    bookNumber: book.number,
    chapter: parseInt(match[2]),
    verse: parseInt(match[3]),
  };
}

async function generateAllDevotionals(verseTextEn, verseTextAr, verseTextDe, verseReference) {
  const prompt = `You are a Christian devotional writer. Generate heartfelt reflections and prayers for the Bible verse below in THREE languages: English, Arabic, and German.

Verse Reference: ${verseReference}
English Text: "${verseTextEn}"
Arabic Text: "${verseTextAr || verseTextEn}"
German Text: "${verseTextDe || verseTextEn}"

For EACH language, generate:

REFLECTION (4-6 sentences):
- Point to Jesus Christ and the Gospel
- Explain how this verse reveals God's heart
- Make it practical for daily Christian living
- Encourage deeper faith and trust in God
- Avoid denominational theology

PRAYER (4-6 sentences):
- Address God/Father directly
- Thank Him for Jesus and His Word
- Ask for the Holy Spirit's help to apply this truth
- Surrender to God's will
- End with "In Jesus' name, Amen" (or equivalent in each language)

Return ONLY valid JSON format with ALL THREE languages:
{
  "english": {
    "reflection": "your English reflection here",
    "prayer": "your English prayer here"
  },
  "arabic": {
    "reflection": "تأملك باللغة العربية هنا",
    "prayer": "صلاتك باللغة العربية هنا"
  },
  "german": {
    "reflection": "deine deutsche Reflexion hier",
    "prayer": "dein deutsches Gebet hier"
  }
}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        reflectionEn: parsed.english?.reflection || 'Reflection generation failed.',
        prayerEn: parsed.english?.prayer || 'Prayer generation failed.',
        reflectionAr: parsed.arabic?.reflection || 'فشل توليد التأمل.',
        prayerAr: parsed.arabic?.prayer || 'فشل توليد الصلاة.',
        reflectionDe: parsed.german?.reflection || 'Reflexionserstellung fehlgeschlagen.',
        prayerDe: parsed.german?.prayer || 'Gebetserstellung fehlgeschlagen.',
      };
    }

    throw new Error('Failed to parse JSON from Gemini response');
  } catch (err) {
    console.error('Error generating devotionals:', err);
    return {
      reflectionEn: 'Reflection generation failed. Please try again later.',
      prayerEn: 'Prayer generation failed. Please try again later.',
      reflectionAr: 'فشل توليد التأمل. يرجى المحاولة مرة أخرى لاحقًا.',
      prayerAr: 'فشل توليد الصلاة. يرجى المحاولة مرة أخرى لاحقًا.',
      reflectionDe: 'Reflexionserstellung fehlgeschlagen. Bitte versuchen Sie es später erneut.',
      prayerDe: 'Gebetserstellung fehlgeschlagen. Bitte versuchen Sie es später erneut.',
    };
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const { data: existingDevotional, error: fetchError } = await supabase
      .from('devotionals')
      .select('*')
      .eq('date', date)
      .maybeSingle();

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (existingDevotional) {
      return res.status(200).json(existingDevotional);
    }

    const ourmanna = await fetch('https://beta.ourmanna.com/api/v1/get/?format=json');
    if (!ourmanna.ok) {
      return res.status(500).json({ error: 'Failed to fetch daily verse' });
    }

    const ourmannaData = await ourmanna.json();
    const reference = ourmannaData.verse.details.reference;
    const verseTextEn = ourmannaData.verse.details.text;
    const versionEn = ourmannaData.verse.details.version;

    const parsedRef = parseVerseReference(reference);
    let verseTextAr = null;
    let verseTextDe = null;

    if (parsedRef) {
      verseTextAr = await fetchVerseByBookNumber(TRANSLATION_IDS.arabic, parsedRef.bookNumber, parsedRef.chapter, parsedRef.verse);
      verseTextDe = await fetchVerseByBookNumber(TRANSLATION_IDS.german, parsedRef.bookNumber, parsedRef.chapter, parsedRef.verse);
    }

    const devotionals = await generateAllDevotionals(verseTextEn, verseTextAr, verseTextDe, reference);

    const newDevotional = {
      date,
      verse_reference: reference,
      verse_text_en: verseTextEn,
      verse_text_ar: verseTextAr,
      verse_text_de: verseTextDe,
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

    const { data: insertedDevotional, error: insertError } = await supabase
      .from('devotionals')
      .insert([newDevotional])
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return res.status(500).json({ error: 'Failed to save devotional' });
    }

    return res.status(200).json(insertedDevotional);
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}