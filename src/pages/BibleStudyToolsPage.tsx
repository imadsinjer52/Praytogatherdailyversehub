import { useState, useEffect } from 'react';
import { Search, Loader2, MessageCircle } from 'lucide-react';
import {
  fetchBibleVersions,
  getUniqueLanguages,
  filterVersionsByLanguage,
  fetchBooks,
  fetchChapters,
  fetchVerses,
  fetchVerseRange,
  type BibleVersion,
  type Book,
  type Chapter,
} from '../utils/bibleApi';
import { formatCopyText } from '../utils/copyToClipboard';
import GoDeeperSection from '../components/GoDeeperSection';
import CopyButton from '../components/CopyButton';
import DiveInTheWord from '../components/DiveInTheWord';
import ReadInContext from '../components/ReadInContext';

type Language = 'en' | 'ar' | 'de';

export default function BibleStudyToolsPage() {
  const [allVersions, setAllVersions] = useState<BibleVersion[]>([]);
  const [languages, setLanguages] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState('');
  const [filteredVersions, setFilteredVersions] = useState<BibleVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [verses, setVerses] = useState<string[]>([]);
  const [fromVerse, setFromVerse] = useState('');
  const [toVerse, setToVerse] = useState('');
  const [verseResult, setVerseResult] = useState<{ content: string; reference: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingVersions, setLoadingVersions] = useState(true);
  const [language, setLanguage] = useState<Language>('en');
  const [reflectionText, setReflectionText] = useState('');

  useEffect(() => {
    loadVersions();
  }, []);

  useEffect(() => {
    if (selectedLanguageId) {
      const filtered = filterVersionsByLanguage(allVersions, selectedLanguageId);
      setFilteredVersions(filtered);
      if (filtered.length > 0) {
        setSelectedVersion(filtered[0].id);
      }
    }
  }, [selectedLanguageId, allVersions]);

  useEffect(() => {
    if (selectedVersion) {
      loadBooks();
    }
  }, [selectedVersion]);

  useEffect(() => {
    if (selectedBook) {
      loadChapters();
    }
  }, [selectedBook]);

  useEffect(() => {
    if (selectedChapter) {
      loadVerses();
    }
  }, [selectedChapter]);

  const loadVersions = async () => {
    try {
      const versions = await fetchBibleVersions();
      setAllVersions(versions);
      const langs = getUniqueLanguages(versions);
      setLanguages(langs);
      if (langs.length > 0) {
        setSelectedLanguageId(langs[0].id);
      }
    } catch (err) {
      console.error('Error loading versions:', err);
    } finally {
      setLoadingVersions(false);
    }
  };

  const loadBooks = async () => {
    try {
      const bookList = await fetchBooks(selectedVersion);
      setBooks(bookList);
      setSelectedBook('');
      setSelectedChapter('');
      setFromVerse('');
      setToVerse('');
      setVerseResult(null);
    } catch (err) {
      console.error('Error loading books:', err);
    }
  };

  const loadChapters = async () => {
    try {
      const chapterList = await fetchChapters(selectedVersion, selectedBook);
      setChapters(chapterList);
      setSelectedChapter('');
      setFromVerse('');
      setToVerse('');
      setVerseResult(null);
    } catch (err) {
      console.error('Error loading chapters:', err);
    }
  };

  const loadVerses = async () => {
    try {
      const verseList = await fetchVerses(selectedVersion, selectedChapter);
      setVerses(verseList);
      setFromVerse('');
      setToVerse('');
      setVerseResult(null);
    } catch (err) {
      console.error('Error loading verses:', err);
    }
  };

  const handleFetchVerses = async () => {
    if (!fromVerse || !toVerse) return;

    try {
      setLoading(true);
      const from = parseInt(fromVerse);
      const to = parseInt(toVerse);

      if (from > to) {
        alert('From verse must be less than or equal to To verse');
        return;
      }

      const result = await fetchVerseRange(selectedVersion, selectedChapter, from, to);

      if (result) {
        setVerseResult(result);
      }
    } catch (err) {
      console.error('Error fetching verse range:', err);
      alert('Error fetching verses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const availableToVerses = verses.filter((v) => {
    if (!fromVerse) return true;
    return parseInt(v) >= parseInt(fromVerse);
  });

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loadingVersions) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="mt-4 text-gray-600">Loading Bible versions...</p>
      </div>
    );
  }

  const currentVersion = filteredVersions.find((v) => v.id === selectedVersion);
  const verseTextOnly = verseResult ? stripHtmlTags(verseResult.content) : '';
  const verseCopyText = verseResult && currentVersion
    ? `Pray with us! https://pray-to-gather.base44.app\n\n${verseResult.reference}\n${verseTextOnly}\n\n${currentVersion.name}`
    : '';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {language === 'ar' ? 'أدوات دراسة الكتاب المقدس' : language === 'de' ? 'Bibelstudien-Tools' : 'Bible Study Tools'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'اللغة' : language === 'de' ? 'Sprache' : 'Language'}
            </label>
            <select
              value={selectedLanguageId}
              onChange={(e) => setSelectedLanguageId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الترجمة' : language === 'de' ? 'Übersetzung' : 'Translation'}
            </label>
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filteredVersions.map((version) => (
                <option key={version.id} value={version.id}>
                  {version.name} ({version.abbreviation})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الكتاب' : language === 'de' ? 'Buch' : 'Book'}
            </label>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!books.length}
            >
              <option value="">
                {language === 'ar' ? 'اختر كتابًا...' : language === 'de' ? 'Wählen Sie ein Buch...' : 'Select a book...'}
              </option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الإصحاح' : language === 'de' ? 'Kapitel' : 'Chapter'}
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!chapters.length}
            >
              <option value="">
                {language === 'ar' ? 'اختر إصحاحًا...' : language === 'de' ? 'Wählen Sie ein Kapitel...' : 'Select a chapter...'}
              </option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {language === 'ar' ? `الإصحاح ${chapter.number}` : language === 'de' ? `Kapitel ${chapter.number}` : `Chapter ${chapter.number}`}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'من الآية' : language === 'de' ? 'Von Vers' : 'From Verse'}
              </label>
              <select
                value={fromVerse}
                onChange={(e) => setFromVerse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!verses.length}
              >
                <option value="">
                  {language === 'ar' ? 'اختر...' : language === 'de' ? 'Wählen...' : 'Select...'}
                </option>
                {verses.map((verse) => (
                  <option key={verse} value={verse}>
                    {verse}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'إلى الآية' : language === 'de' ? 'Bis Vers' : 'To Verse'}
              </label>
              <select
                value={toVerse}
                onChange={(e) => setToVerse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!fromVerse || !verses.length}
              >
                <option value="">
                  {language === 'ar' ? 'اختر...' : language === 'de' ? 'Wählen...' : 'Select...'}
                </option>
                {availableToVerses.map((verse) => (
                  <option key={verse} value={verse}>
                    {verse}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleFetchVerses}
            disabled={!fromVerse || !toVerse || loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{language === 'ar' ? 'جاري التحميل...' : language === 'de' ? 'Wird geladen...' : 'Loading...'}</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>{language === 'ar' ? 'جلب الآيات' : language === 'de' ? 'Verse abrufen' : 'Fetch Verses'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {verseResult && (
        <>
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-blue-600 mb-4">{verseResult.reference}</h3>
            <div
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: verseResult.content }}
            />
            <p className="mb-4 text-sm text-gray-500">
              {currentVersion?.name}
            </p>
            <CopyButton
              text={verseCopyText}
              label={language === 'ar' ? 'نسخ الآية' : language === 'de' ? 'Vers kopieren' : 'Copy Verse'}
              className="w-full"
            />
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
            <DiveInTheWord verseReference={verseResult.reference} language={language} />
            <ReadInContext verseReference={verseResult.reference} language={language} />
          </div>

          <GoDeeperSection verseText={verseTextOnly} verseReference={verseResult.reference} language={language} />
        </>
      )}
    </div>
  );
}