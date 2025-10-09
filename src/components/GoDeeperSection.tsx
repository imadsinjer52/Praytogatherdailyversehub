import { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, ExternalLink } from 'lucide-react';
import type { PromptCategory, Language } from '../types';
import { generatePrompts, categoryLabels } from '../utils/promptGenerator';
import { formatCopyText } from '../utils/copyToClipboard';
import LanguageToggle from './LanguageToggle';
import CopyButton from './CopyButton';

interface GoDeeperSectionProps {
  verseText: string;
  verseReference: string;
  language: Language;
  arabicVerse?: string | null;
  germanVerse?: string | null;
}

const categories: PromptCategory[] = [
  'life-application',
  'heart-mind-action',
  'real-life',
  'deeper-dive',
  'prayer-oriented',
  'acts',
  'soap',
  'pray',
  '5wh',
  'grow',
];

export default function GoDeeperSection({ verseText, verseReference, language, arabicVerse, germanVerse }: GoDeeperSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<PromptCategory>>(new Set());
  const [categoryLanguages, setCategoryLanguages] = useState<Record<PromptCategory, Language>>(
    categories.reduce((acc, cat) => ({ ...acc, [cat]: 'en' as Language }), {} as Record<PromptCategory, Language>)
  );
  const [reflectionText, setReflectionText] = useState('');

  const toggleCategory = (category: PromptCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const setCategoryLanguage = (category: PromptCategory, lang: Language) => {
    setCategoryLanguages((prev) => ({ ...prev, [category]: lang }));
  };

  const getVerseForLanguage = (lang: Language) => {
    if (lang === 'ar' && arabicVerse) return arabicVerse;
    if (lang === 'de' && germanVerse) return germanVerse;
    return verseText;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all shadow-md"
      >
        <Sparkles size={20} />
        <span>Go Deeper</span>
        <ChevronDown size={20} />
      </button>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <button
        onClick={() => setIsOpen(false)}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
      >
        <span>Hide Reflection Prompts</span>
        <ChevronUp size={20} />
      </button>

      {/* Categories */}
      <div className="space-y-3">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category);
          const catLanguage = categoryLanguages[category];
          const questions = generatePrompts(category, catLanguage, verseText, verseReference);
          const questionsText = questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
          const categoryVerse = getVerseForLanguage(catLanguage);
          const copyText = formatCopyText(categoryVerse, verseReference, questionsText);

          return (
            <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">
                  {categoryLabels[category][catLanguage]}
                </span>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {isExpanded && (
                <div className="p-4 border-t border-gray-200 space-y-4">
                  <div className="flex justify-end">
                    <LanguageToggle
                      language={catLanguage}
                      onChange={(lang) => setCategoryLanguage(category, lang)}
                    />
                  </div>

                  <div className={`space-y-3 ${catLanguage === 'ar' ? 'text-right' : ''}`}>
                    {questions.map((question, index) => (
                      <div key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <p className="flex-1 text-gray-700 leading-relaxed">{question}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <CopyButton
                      text={copyText}
                      label={catLanguage === 'ar' ? 'نسخ الأسئلة' : catLanguage === 'de' ? 'Fragen kopieren' : 'Copy Questions'}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-600">
                      {catLanguage === 'ar' ? '💡 نصيحة: الصق هذه الأسئلة في قسم تأملك الشخصي أدناه لتجيب عليها جميعًا في مكان واحد' : catLanguage === 'de' ? '💡 Tipp: Füge die Fragen unten im Bereich Persönliche Reflexion ein, um sie alle an einem Ort zu beantworten.' : '💡 Pro tip: Paste the questions into the Personal Reflection section below to answer them all in one place.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Personal Reflection */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h3 className="font-semibold text-lg text-gray-800">
          {language === 'ar' ? 'تأملك الشخصي' : language === 'de' ? 'Ihre persönliche Reflexion' : 'Your Personal Reflection'}
        </h3>
        <textarea
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          placeholder={
            language === 'ar' 
              ? 'اكتب أفكارك وصلواتك وتأملاتك هنا...' 
              : language === 'de' 
              ? 'Schreiben Sie hier Ihre Gedanken, Gebete und Reflexionen...' 
              : 'Write your thoughts, prayers, and reflections here...'
          }
          className={`w-full h-40 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${language === 'ar' ? 'text-right' : ''}`}
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <CopyButton
            text={formatCopyText(getVerseForLanguage(language), verseReference, reflectionText)}
            label={language === 'ar' ? 'نسخ التأمل' : language === 'de' ? 'Reflexion kopieren' : 'Copy Reflection'}
            className="flex-1"
          />
          <a
            href="https://pray-to-gather.base44.app/GloryWall"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
          >
            <ExternalLink size={18} />
            <span>{language === 'ar' ? 'مشاركة في حائط المجد' : language === 'de' ? 'Auf Glory Wall teilen' : 'Share to Glory Wall'}</span>
          </a>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {language === 'ar' ? '💡 نصيحة: انسخ تأملك أولًا لتتمكن من لصقه بسهولة على حائط المجد.' : language === 'de' ? '💡 Tipp: Kopiere zuerst deine Reflexion, damit du sie leicht auf der Glory Wall einfügen kannst.' : '💡 Pro tip: Copy your reflection first so you can easily paste it on the Glory Wall.'}
        </p>
      </div>
    </div>
  );
}