export interface DailyVerse {
  reference: string;
  text: string;
  version: string;
}

export interface Verse {
  reference: string;
  text: string;
  book: string;
  chapter: number;
  verses: string;
}

export type Language = 'en' | 'ar';

export type PromptCategory =
  | 'life-application'
  | 'heart-mind-action'
  | 'real-life'
  | 'deeper-dive'
  | 'prayer-oriented'
  | 'acts'
  | 'soap'
  | 'pray'
  | '5wh'
  | 'grow';

export interface GeneratedPrompts {
  category: PromptCategory;
  language: Language;
  questions: string[];
}
