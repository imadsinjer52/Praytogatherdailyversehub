import { useState } from 'react';
import { BookOpenCheck, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { parseVerseReferenceDetails } from '../utils/bibleBooks';

interface DiveInTheWordProps {
  verseReference: string;
  language: 'en' | 'ar' | 'de';
}

export default function DiveInTheWord({ verseReference, language }: DiveInTheWordProps) {
  const [isOpen, setIsOpen] = useState(false);

  const parsedRef = parseVerseReferenceDetails(verseReference);

  if (!parsedRef) return null;

  const { bookNumber, bookAbbr, chapter, verse } = parsedRef;
  const bookEnglishName = parsedRef.book.toLowerCase().replace(/\s+/g, '-');

  const commentaryLinks = [
    {
      name: language === 'ar' ? 'كلمة الحق: تفسير جون ماك آرثر' : language === 'de' ? 'Wort der Wahrheit: John MacArthur' : 'Word of Truth: John MacArthur',
      url: `https://www.kalimatelhaq.com/ar/verses/${bookNumber}/${chapter}/${verse}/comm`,
    },
    {
      name: 'David Guzik Commentary',
      url: `https://enduringword.com/bible-commentary/${bookEnglishName}-${chapter}/`,
    },
    {
      name: language === 'ar' ? 'مركز الدراسات الكتاب المقدس' : language === 'de' ? 'Bibelstudien-Zentrum' : 'Bible Study Center',
      url: `https://injeel.com/read/vdv,nav,kjv/${bookEnglishName}/${chapter}/${verse}`,
    },
    {
      name: 'Bible Hub: Commentaries',
      url: `https://biblehub.com/commentaries/${bookEnglishName}/${chapter}-${verse}.htm`,
    },
    {
      name: 'Bible Hub: Study',
      url: `https://biblehub.com/study/${bookEnglishName}/${chapter}-${verse}.htm`,
    },
    {
      name: 'Bible Hub: Interlinear',
      url: `https://biblehub.com/interlinear/${bookEnglishName}/${chapter}-${verse}.htm`,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpenCheck className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-800">
            {language === 'ar' ? 'تعمق في الكلمة' : language === 'de' ? 'Tauche in das Wort ein' : 'Dive in the Word'}
          </span>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-200 space-y-2">
          <p className="text-sm text-gray-600 mb-4">
            {language === 'ar'
              ? 'استكشف تعليقات ودراسات متعمقة لهذه الآية'
              : language === 'de'
              ? 'Erkunden Sie ausführliche Kommentare und Studien zu diesem Vers'
              : 'Explore in-depth commentaries and studies for this verse'}
          </p>
          <div className="grid gap-2">
            {commentaryLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
              >
                <span className="text-blue-700 font-medium">{link.name}</span>
                <ExternalLink className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
