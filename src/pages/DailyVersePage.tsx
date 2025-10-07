import { useState, useEffect } from 'react';
import { BookOpen, Loader2, Heart, MessageCircle, Calendar } from 'lucide-react';
import { formatCopyText } from '../utils/copyToClipboard';
import { getTodayDevotional } from '../utils/devotionalApi';
import { saveVerse, getRecentVerses, getTodayVerse } from '../utils/verseStorage';
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

  useEffect(() => {
    loadDailyVerse();
  }, []);

  useEffect(() => {
    loadRecentVerses();
  }, [todayVerse]);

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

      const devotional = await getTodayDevotional();

      if (!devotional) {
        throw new Error('Failed to fetch daily devotional');
      }

      const newVerse: DailyVerseData = {
        date: devotional.date,
        reference: devotional.verse_reference,
        verseTextEn: devotional.verse_text_en,
        verseTextAr: devotional.verse_text_ar,
        verseTextDe: devotional.verse_text_de,
        reflectionEn: devotional.reflection_en,
        reflectionAr: devotional.reflection_ar,
        reflectionDe: devotional.reflection_de,
        prayerEn: devotional.prayer_en,
        prayerAr: devotional.prayer_ar,
        prayerDe: devotional.prayer_de,
        versionEn: devotional.version_en,
        versionAr: devotional.version_ar,
        versionDe: devotional.version_de,
      };

      saveVerse(newVerse);
      setTodayVerse(newVerse);
    } catch (err) {
      setError('Unable to load daily verse. Please try again later.');
      console.error('Error fetching verse:', err);
    } finally {
      setLoading(false);
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

  const getPrayer = (verse: DailyVerseData) => {
    if (language === 'ar') return verse.prayerAr;
    if (language === 'de') return verse.prayerDe;
    return verse.prayerEn;
  };

  const getVersion = (verse: DailyVerseData) => {
    if (language === 'ar') return verse.versionAr;
    if (language === 'de') return verse.versionDe;
    return verse.versionEn;
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
  const currentPrayer = getPrayer(todayVerse);
  const currentVersion = getVersion(todayVerse);

  const fullContent = `${currentReflection}\n\n${currentPrayer}`;
  const copyText = formatCopyText(currentVerseText, todayVerse.reference, fullContent);

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

          <div className="space-y-3">
            <CopyButton text={copyText} label={language === 'ar' ? 'نسخ الآية والتأمل' : language === 'de' ? 'Vers & Reflexion kopieren' : 'Copy Verse & Reflection'} className="w-full" />
            <ReadInContext verseReference={todayVerse.reference} language={language} />
          </div>
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

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-800">
              {language === 'ar' ? 'الصلاة اليومية' : language === 'de' ? 'Tägliches Gebet' : 'Daily Prayer'}
            </h3>
          </div>
          <p className={`text-gray-700 leading-relaxed whitespace-pre-line ${language === 'ar' ? 'text-right' : ''}`}>
            {currentPrayer}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h3 className="font-semibold text-lg text-gray-800">
            {language === 'ar' ? 'تأملك الشخصي' : language === 'de' ? 'Ihre persönliche Reflexion' : 'Your Personal Reflection'}
          </h3>
          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder={language === 'ar' ? 'اكتب أفكارك وصلواتك وتأملاتك هنا...' : language === 'de' ? 'Schreiben Sie hier Ihre Gedanken, Gebete und Reflexionen...' : 'Write your thoughts, prayers, and reflections here...'}
            className={`w-full h-40 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${language === 'ar' ? 'text-right' : ''}`}
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <CopyButton
              text={formatCopyText(currentVerseText, todayVerse.reference, reflectionText)}
              label={language === 'ar' ? 'نسخ التأمل' : language === 'de' ? 'Reflexion kopieren' : 'Copy Reflection'}
              className="flex-1"
            />
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

        <GoDeeperSection verseText={currentVerseText} verseReference={todayVerse.reference} language={language} />
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
              const prayer = getPrayer(verse);
              const version = getVersion(verse);
              const content = `${reflection}\n\n${prayer}`;
              const verseCopyText = formatCopyText(verseText, verse.reference, content);

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

                  <div className="bg-blue-50 rounded-lg p-4 mb-3">
                    <p className={`text-sm text-gray-700 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`}>
                      {reflection.slice(0, 200)}...
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <p className={`text-sm text-gray-700 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`}>
                      {prayer.slice(0, 150)}...
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
