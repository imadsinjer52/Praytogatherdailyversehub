import { useState, useEffect } from 'react';
import { BookOpen, Loader2, Heart, MessageCircle, Calendar, ChevronDown, ChevronUp, RefreshCw, Lightbulb } from 'lucide-react';
import { formatCopyText } from '../utils/copyToClipboard';
import { getTodayDevotional } from '../utils/devotionalApi';
import { saveVerse, getRecentVerses, getTodayVerse } from '../utils/verseStorage';
import { fetchVerseByReference, TRANSLATION_IDS } from '../utils/bibleApi';
import { findBookByName } from '../utils/bibleBooks';
import CopyButton from '../components/CopyButton';
import GoDeeperSection from '../components/GoDeeperSection';
import DiveInTheWord from '../components/DiveInTheWord';
import ReadInContext from '../components/ReadInContext';

type Language = 'en' | 'ar' | 'de';

interface DailyVerseData {
  date: string;
  reference: string;
  verseTextEn: string;
  verseTextAr: string;
  verseTextDe: string;
  reflectionEn: string;
  reflectionAr: string;
  reflectionDe: string;
  prayerEn: string;
  prayerAr: string;
  prayerDe: string;
  versionEn: string;
  versionAr: string;
  versionDe: string;
}

export default function DailyVersePage() {
  const [language, setLanguage] = useState<Language>('en');
  const [todayVerse, setTodayVerse] = useState<DailyVerseData | null>(null);
  const [recentVerses, setRecentVerses] = useState<DailyVerseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reflectionText, setReflectionText] = useState('');
  
  // Translation states
  const [arabicVerse, setArabicVerse] = useState<string | null>(null);
  const [germanVerse, setGermanVerse] = useState<string | null>(null);
  const [loadingArabic, setLoadingArabic] = useState(false);
  const [loadingGerman, setLoadingGerman] = useState(false);
  const [showArabic, setShowArabic] = useState(true);
  const [showGerman, setShowGerman] = useState(true);
  const [showReflectionLinks, setShowReflectionLinks] = useState(false);

  useEffect(() => {
    loadDailyVerse();
  }, []);

  useEffect(() => {
    loadRecentVerses();
  }, [todayVerse]);

  useEffect(() => {
    if (todayVerse) {
      fetchArabicTranslation();
      fetchGermanTranslation();
    }
  }, [todayVerse]);

  const parseVerseReference = (reference: string) => {
    const match = reference.match(/^(.+?)\s+(\d+):(\d+)/);
    if (!match) return null;

    const bookName = match[1].trim();
    const chapter = parseInt(match[2]);
    const verse = parseInt(match[3]);

    return { bookName, chapter, verse };
  };

  const loadDailyVerse = async () => {
    try {
      setLoading(true);
      setError(null);

      const stored = getTodayVerse();
      if (stored) {
        setTodayVerse(stored);
        setLoading(false);
        return;
      }

      console.log('Fetching daily devotional...');
      const devotional = await getTodayDevotional();
      console.log('Devotional received:', devotional);

      if (!devotional) {
        throw new Error('Failed to fetch daily devotional - no data returned');
      }

      const newVerse: DailyVerseData = {
        date: devotional.date,
        reference: devotional.verse_reference,
        verseTextEn: devotional.verse_text_en,
        verseTextAr: devotional.verse_text_ar || devotional.verse_text_en,
        verseTextDe: devotional.verse_text_de || devotional.verse_text_en,
        reflectionEn: devotional.reflection_en,
        reflectionAr: devotional.reflection_ar,
        reflectionDe: devotional.reflection_de,
        prayerEn: devotional.prayer_en,
        prayerAr: devotional.prayer_ar,
        prayerDe: devotional.prayer_de,
        versionEn: devotional.version_en,
        versionAr: devotional.version_ar || 'Arabic',
        versionDe: devotional.version_de || 'Elberfelder',
      };

      saveVerse(newVerse);
      setTodayVerse(newVerse);
    } catch (err: any) {
      const errorMsg = err?.message || 'Unable to load daily verse. Please try again later.';
      setError(errorMsg);
      console.error('Error fetching verse:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchArabicTranslation = async () => {
    if (!todayVerse) return;
    
    setLoadingArabic(true);
    try {
      const parsed = parseVerseReference(todayVerse.reference);
      if (!parsed) {
        setArabicVerse('Could not parse verse reference');
        return;
      }

      const book = findBookByName(parsed.bookName);
      if (!book) {
        setArabicVerse('Book not found');
        return;
      }

      const verse = await fetchVerseByReference(
        TRANSLATION_IDS.arabic,
        book.arabicName,
        parsed.chapter,
        parsed.verse
      );
      
      setArabicVerse(verse || 'Arabic translation not available');
    } catch (err) {
      console.error('Error fetching Arabic translation:', err);
      setArabicVerse('Error loading Arabic translation');
    } finally {
      setLoadingArabic(false);
    }
  };

  const fetchGermanTranslation = async () => {
    if (!todayVerse) return;
    
    setLoadingGerman(true);
    try {
      const parsed = parseVerseReference(todayVerse.reference);
      if (!parsed) {
        setGermanVerse('Could not parse verse reference');
        return;
      }

      const book = findBookByName(parsed.bookName);
      if (!book) {
        setGermanVerse('Book not found');
        return;
      }

      const verse = await fetchVerseByReference(
        TRANSLATION_IDS.german,
        book.germanName,
        parsed.chapter,
        parsed.verse
      );
      
      setGermanVerse(verse || 'German translation not available');
    } catch (err) {
      console.error('Error fetching German translation:', err);
      setGermanVerse('Error loading German translation');
    } finally {
      setLoadingGerman(false);
    }
  };

  const loadRecentVerses = () => {
    const verses = getRecentVerses(7);
    setRecentVerses(verses);
  };

  const getVerseText = (verse: DailyVerseData) => {
    if (language === 'ar' && verse.verseTextAr) return verse.verseTextAr;
    if (language === 'de' && verse.verseTextDe) return verse.verseTextDe;
    return verse.verseTextEn;
  };

  const getReflection = (verse: DailyVerseData) => {
    if (language === 'ar') return verse.reflectionAr;
    if (language === 'de') return verse.reflectionDe;
    return verse.reflectionEn;
  };

  const getVersion = (verse: DailyVerseData) => {
    if (language === 'ar') return verse.versionAr;
    if (language === 'de') return verse.versionDe;
    return verse.versionEn;
  };

  const getChatGPTPrompt = (lang: Language, reference: string) => {
    if (lang === 'ar') {
      return `الآية: ${reference}\nاكتب تأملاً (4-6 جمل) حول هذه الآية:\n- أظهر كيف تشير الآية إلى يسوع المسيح والإنجيل.\n- أوضح كيف تكشف هذه الآية قلب الله.\n- اجعل التأمل عملياً لحياة المؤمن اليومية.\n- شجّع على تعميق الإيمان والثقة بالله.\n- تجنّب أي لهجة لاهوتية طائفية.\nبعد ذلك، اكتب 2-3 أسئلة عميقة تساعد القارئ على الصلاة بهذه الآية من قلبه`;
    } else if (lang === 'de') {
      return `Schreibe eine Reflexion (4–6 Sätze) über diesen Bibelvers: ${reference}\n- Zeige, wie der Vers auf Jesus Christus und das Evangelium hinweist.\n- Erkläre, wie dieser Vers Gottes Herz offenbart.\n- Mache die Reflexion praktisch für das tägliche christliche Leben.\n- Ermutige zu tieferem Glauben und Vertrauen in Gott.\n- Vermeide konfessionelle Theologie.\nSchreibe anschließend 2–3 nachdenkliche Fragen, die dem Leser helfen, diesen Vers persönlich im Gebet zu bewegen.`;
    }
    return `Write a Reflection (4–6 sentences) on this Bible verse: ${reference}\n- Point to Jesus Christ and the Gospel.\n- Show how the verse reveals God's heart.\n- Make it practical for daily Christian living.\n- Encourage deeper faith and trust in God.\n- Avoid denominational theology.\nThen, write 2–3 thoughtful questions to help the reader pray this verse from their heart.`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="mt-4 text-gray-600">Loading today's verse...</p>
      </div>
    );
  }

  if (error || !todayVerse) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700">{error || 'Unable to load verse'}</p>
        <button
          onClick={loadDailyVerse}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentVerseText = getVerseText(todayVerse);
  const currentReflection = getReflection(todayVerse);
  const currentVersion = getVersion(todayVerse);

  const arabicCopyText = arabicVerse ? formatCopyText(arabicVerse, todayVerse.reference, '') : '';
  const germanCopyText = germanVerse ? formatCopyText(germanVerse, todayVerse.reference, '') : '';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setLanguage('en')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              language === 'en'
                ? 'bg-green-100 text-green-700 shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              language === 'ar'
                ? 'bg-green-100 text-green-700 shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            العربية
          </button>
          <button
            onClick={() => setLanguage('de')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              language === 'de'
                ? 'bg-green-100 text-green-700 shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Deutsch
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {language === 'ar' ? 'آية اليوم' : language === 'de' ? 'Heutiger Vers' : "Today's Verse"}
              </h2>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : language === 'de' ? 'de-DE' : 'en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className={`text-lg md:text-xl text-gray-800 leading-relaxed mb-4 italic ${language === 'ar' ? 'text-right' : ''}`}>
              "{currentVerseText}"
            </p>
            <p className={`text-blue-600 font-semibold ${language === 'ar' ? 'text-left' : 'text-right'}`}>
              {todayVerse.reference} ({currentVersion})
            </p>
          </div>

          {/* Arabic Translation Section */}
          <div className="mb-4 border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchArabicTranslation}
                  disabled={loadingArabic}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all disabled:opacity-50"
                >
                  {loadingArabic ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  <span className="font-medium">Arabic Translation</span>
                </button>
              </div>
              <button
                onClick={() => setShowArabic(!showArabic)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                {showArabic ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
            {showArabic && arabicVerse && (
              <div className="bg-blue-50 rounded-lg p-4 mt-2">
                <p className="text-lg text-gray-800 leading-relaxed text-right mb-3" dir="rtl">
                  "{arabicVerse}"
                </p>
                <p className="text-sm text-blue-600 mb-3 text-left">
                  {todayVerse.reference} (Arabic)
                </p>
                <CopyButton text={arabicCopyText} label="نسخ الآية" className="w-full" />
              </div>
            )}
          </div>

          {/* German Translation Section */}
          <div className="mb-6 border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchGermanTranslation}
                  disabled={loadingGerman}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all disabled:opacity-50"
                >
                  {loadingGerman ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  <span className="font-medium">German Translation</span>
                </button>
              </div>
              <button
                onClick={() => setShowGerman(!showGerman)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                {showGerman ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
            {showGerman && germanVerse && (
              <div className="bg-green-50 rounded-lg p-4 mt-2">
                <p className="text-lg text-gray-800 leading-relaxed mb-3">
                  "{germanVerse}"
                </p>
                <p className="text-sm text-green-600 mb-3 text-right">
                  {todayVerse.reference} (Elberfelder)
                </p>
                <CopyButton text={germanCopyText} label="Vers kopieren" className="w-full" />
              </div>
            )}
          </div>

          <ReadInContext verseReference={todayVerse.reference} language={language} />
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">
              {language === 'ar' ? 'التأمل اليومي' : language === 'de' ? 'Tägliche Reflexion' : 'Daily Reflection'}
            </h3>
          </div>
          <p className={`text-gray-700 leading-relaxed whitespace-pre-line ${language === 'ar' ? 'text-right' : ''}`}>
            {currentReflection}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h3 className="font-semibold text-lg text-gray-800">
            {language === 'ar' ? 'تأملك الشخصي' : language === 'de' ? 'Ihre persönliche Reflexion' : 'Your Personal Reflection'}
          </h3>
          
          <button
            onClick={() => setShowReflectionLinks(!showReflectionLinks)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all"
          >
            <Lightbulb className="w-5 h-5" />
            <span>{language === 'ar' ? 'اكتب لي تأملاً' : language === 'de' ? 'Schreibe mir eine Reflexion' : 'Write me a reflection'}</span>
          </button>

          {showReflectionLinks && (
            <div className="grid gap-2 p-4 bg-purple-50 rounded-lg">
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(getChatGPTPrompt('ar', todayVerse.reference))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white hover:bg-purple-100 rounded-lg transition-colors"
              >
                <span className="text-purple-700 font-medium">في العربية</span>
                <MessageCircle className="w-4 h-4 text-purple-600" />
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(getChatGPTPrompt('en', todayVerse.reference))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white hover:bg-purple-100 rounded-lg transition-colors"
              >
                <span className="text-purple-700 font-medium">In English</span>
                <MessageCircle className="w-4 h-4 text-purple-600" />
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(getChatGPTPrompt('de', todayVerse.reference))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white hover:bg-purple-100 rounded-lg transition-colors"
              >
                <span className="text-purple-700 font-medium">Auf Deutsch</span>
                <MessageCircle className="w-4 h-4 text-purple-600" />
              </a>
            </div>
          )}

          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder={language === 'ar' ? 'اكتب أفكارك وصلواتك وتأملاتك هنا...' : language === 'de' ? 'Schreiben Sie hier Ihre Gedanken, Gebete und Reflexionen...' : 'Write your thoughts, prayers, and reflections here...'}
            className={`w-full h-40 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${language === 'ar' ? 'text-right' : ''}`}
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://pray-to-gather.base44.app/GloryWall"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
            >
              <MessageCircle size={18} />
              <span>{language === 'ar' ? 'مشاركة في حائط المجد' : language === 'de' ? 'Auf Glory Wall teilen' : 'Share to Glory Wall'}</span>
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <DiveInTheWord verseReference={todayVerse.reference} language={language} />
          <ReadInContext verseReference={todayVerse.reference} language={language} />
        </div>

        <GoDeeperSection 
          verseText={currentVerseText} 
          verseReference={todayVerse.reference} 
          language={language}
          arabicVerse={arabicVerse}
          germanVerse={germanVerse}
        />
      </div>

      {recentVerses.length > 1 && (
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              {language === 'ar' ? 'الآيات الأخيرة' : language === 'de' ? 'Letzte Verse' : 'Recent Verses'}
            </h2>
          </div>

          <div className="grid gap-6">
            {recentVerses.slice(1).map((verse, index) => {
              const verseText = getVerseText(verse);
              const reflection = getReflection(verse);
              const version = getVersion(verse);
              const verseCopyText = formatCopyText(verseText, verse.reference, reflection);

              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-sm text-gray-500 mb-3">
                    {new Date(verse.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : language === 'de' ? 'de-DE' : 'en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>

                  <p className={`text-lg text-gray-800 leading-relaxed mb-3 italic ${language === 'ar' ? 'text-right' : ''}`}>
                    "{verseText}"
                  </p>
                  <p className={`text-blue-600 font-semibold mb-4 ${language === 'ar' ? 'text-left' : 'text-right'}`}>
                    {verse.reference} ({version})
                  </p>

                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <p className={`text-sm text-gray-700 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`}>
                      {reflection.slice(0, 200)}...
                    </p>
                  </div>

                  <CopyButton
                    text={verseCopyText}
                    label={language === 'ar' ? 'نسخ' : language === 'de' ? 'Kopieren' : 'Copy'}
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}