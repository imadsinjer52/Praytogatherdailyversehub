import { useState } from 'react';
import { BookText, ExternalLink } from 'lucide-react';
import { parseVerseReferenceDetails, bibleBooks } from '../utils/bibleBooks';

interface ReadInContextProps {
  verseReference: string;
  language: 'en' | 'ar' | 'de';
}

interface BibleTranslation {
  id: number;
  name: string;
  nameAr: string;
  nameDe: string;
}

const translations: BibleTranslation[] = [
  { id: 14, name: 'Arabic Van Dyke', nameAr: 'ترجمة الفاندايك', nameDe: 'Van Dyke Arabisch' },
  { id: 101, name: 'Ketab Al Hayat', nameAr: 'كتاب الحياة', nameDe: ' Ketab Al Hayat' },
   { id: 195, name: 'Easy Arabic Standard', nameAr: 'ترجمة العربية المبسطة', nameDe: ' Einfach Arabisch' },
  { id: 877, name: 'German - Bibel.Heute', nameAr: ' ألماني - Bibel Heute', nameDe: ' Bibel Heute' },
  { id: 157, name: 'German - Schlachter', nameAr: ' ألماني - Schlachter', nameDe: ' Schlachter' },
  { id: 111, name: 'New International Version', nameAr: 'النسخة الدولية الجديدة', nameDe: 'Neue Internationale Version' },
  { id: 59, name: 'ESV', nameAr: ' إنجليزي - ESV', nameDe: ' ESV' },
{ id: 2692, name: 'NASB', nameAr: ' إنجليزي - NASB', nameDe: ' NASB' },
{ id: 1713, name: 'CSB', nameAr: ' إنجليزي - CSB', nameDe: ' CSB' },
{ id: 2079, name: 'Easy English Bible', nameAr: ' إنجليزي - Easy English Bible', nameDe: ' Easy English Bible' },
{ id: 116, name: 'NLT', nameAr: ' إنجليزي - NLT', nameDe: ' NLT' }
];

export default function ReadInContext({ verseReference, language }: ReadInContextProps) {
  const [selectedTranslation, setSelectedTranslation] = useState(14);

  const parsedRef = parseVerseReferenceDetails(verseReference);

  if (!parsedRef) return null;

  const { bookAbbr, chapter } = parsedRef;

  const bibleComUrl = `https://www.bible.com/ar/bible/${selectedTranslation}/${bookAbbr}.${chapter}`;

  const getTranslationName = (trans: BibleTranslation) => {
    if (language === 'ar') return trans.nameAr;
    if (language === 'de') return trans.nameDe;
    return trans.name;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <BookText className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-lg text-gray-800">
          {language === 'ar' ? 'اقرأ في السياق' : language === 'de' ? 'Im Kontext lesen' : 'Read in Context'}
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'ar' ? 'اختر الترجمة' : language === 'de' ? 'Übersetzung wählen' : 'Select Translation'}
        </label>
        <select
          value={selectedTranslation}
          onChange={(e) => setSelectedTranslation(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {translations.map((trans) => (
            <option key={trans.id} value={trans.id}>
              {getTranslationName(trans)}
            </option>
          ))}
        </select>
      </div>

      <a
        href={bibleComUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
      >
        <span>
          {language === 'ar' ? 'افتح في Bible.com' : language === 'de' ? 'Auf Bible.com öffnen' : 'Open on Bible.com'}
        </span>
        <ExternalLink size={18} />
      </a>
    </div>
  );
}
