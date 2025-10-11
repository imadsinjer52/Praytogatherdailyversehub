export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ar' | 'de';

export interface Verse {
  id: string;
  english_text: string;
  arabic_text: string;
  german_text: string;
  reference: string;
  created_at: string;
}

export interface RecentVerse extends Verse {
  isFavorite?: boolean;
}

export interface Analysis {
  summary: string;
  keyThemes: string[];
  practicalApplication: string;
  prayerPoints: string[];
}

export interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export interface LanguageConfig {
  name: string;
  flag: string;
}

export type LanguagesConfig = Record<Language, LanguageConfig>;