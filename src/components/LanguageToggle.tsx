import type { Language } from '../types';

interface LanguageToggleProps {
  language: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onChange('en')}
        className={`px-4 py-2 rounded-md font-medium transition-all ${
          language === 'en'
            ? 'bg-green-100 text-green-700 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        English
      </button>
      <button
        onClick={() => onChange('ar')}
        className={`px-4 py-2 rounded-md font-medium transition-all ${
          language === 'ar'
            ? 'bg-green-100 text-green-700 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        العربية
      </button>
    </div>
  );
}
