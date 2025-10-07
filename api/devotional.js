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

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchVerseByReference(versionId, book, chapter, verse) {
  try {
    const booksResponse = await fetch(`${BIBLE_API_BASE}/bibles/${versionId}/books`, {
      headers: { 'api-key': BIBLE_API_KEY },
    });
    const booksData = await booksResponse.json();
    const books = booksData.data || [];

    const matchingBook = books.find(
      b => b.name.toLowerCase().includes(book.toLowerCase()) ||
           b.abbreviation.toLowerCase() === book.toLowerCase() ||
           b.name.toLowerCase().replace(/\s+/g, '') === book.toLowerCase().replace(/\s+/g, '')
    );

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

  return {
    book: match[1].trim(),
    chapter: parseInt(match[2]),
    verse: parseInt(match[3]),
  };
}

async function generateDevotionalContent(verseText, verseReference, language) {
  const languageNames = {
    en: 'English',
    ar: 'Arabic',
    de: 'German'
  };

  const prompt = `You are a Christian devotional writer. Generate heartfelt reflections and prayers.

Verse: "${verseText}" (${verseReference})

Generate in ${languageNames[language]} language:

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
- End with "In Jesus' name, Amen"

Return ONLY valid JSON format:
{
  "reflection": "your reflection text here",
  "prayer": "your prayer text here"
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
            maxOutputTokens: 1024,
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
        reflection: parsed.reflection,
        prayer: parsed.prayer,
      };
    }

    throw new Error('Failed to parse JSON from Gemini response');
  } catch (err) {
    console.error(`Error generating ${language} devotional:`, err);
    return {
      reflection: 'Reflection generation failed. Please try again later.',
      prayer: 'Prayer generation failed. Please try again later.',
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
      verseTextAr = await fetchVerseByReference(TRANSLATION_IDS.arabic, parsedRef.book, parsedRef.chapter, parsedRef.verse);
      verseTextDe = await fetchVerseByReference(TRANSLATION_IDS.german, parsedRef.book, parsedRef.chapter, parsedRef.verse);
    }

    const [contentEn, contentAr, contentDe] = await Promise.all([
      generateDevotionalContent(verseTextEn, reference, 'en'),
      generateDevotionalContent(verseTextAr || verseTextEn, reference, 'ar'),
      generateDevotionalContent(verseTextDe || verseTextEn, reference, 'de'),
    ]);

    const newDevotional = {
      date,
      verse_reference: reference,
      verse_text_en: verseTextEn,
      verse_text_ar: verseTextAr,
      verse_text_de: verseTextDe,
      reflection_en: contentEn.reflection,
      reflection_ar: contentAr.reflection,
      reflection_de: contentDe.reflection,
      prayer_en: contentEn.prayer,
      prayer_ar: contentAr.prayer,
      prayer_de: contentDe.prayer,
      version_en: versionEn,
      version_ar: 'Arabic, Standard',
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
