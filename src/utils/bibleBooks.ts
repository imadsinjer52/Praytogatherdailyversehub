export interface BibleBook {
  abbr: string;
  number: number;
  englishName: string;
  arabicName: string;
  chapters: number;
}

export const bibleBooks: BibleBook[] = [
  { abbr: 'GEN', number: 1, englishName: 'Genesis', arabicName: 'التكوين', chapters: 50 },
  { abbr: 'EXO', number: 2, englishName: 'Exodus', arabicName: 'الخروج', chapters: 40 },
  { abbr: 'LEV', number: 3, englishName: 'Leviticus', arabicName: 'اللاويين', chapters: 27 },
  { abbr: 'NUM', number: 4, englishName: 'Numbers', arabicName: 'العدد', chapters: 36 },
  { abbr: 'DEU', number: 5, englishName: 'Deuteronomy', arabicName: 'التثنية', chapters: 34 },
  { abbr: 'JOS', number: 6, englishName: 'Joshua', arabicName: 'يشوع', chapters: 24 },
  { abbr: 'JDG', number: 7, englishName: 'Judges', arabicName: 'القضاة', chapters: 21 },
  { abbr: 'RUT', number: 8, englishName: 'Ruth', arabicName: 'راعوث', chapters: 4 },
  { abbr: '1SA', number: 9, englishName: '1 Samuel', arabicName: 'صموئيل الأول', chapters: 31 },
  { abbr: '2SA', number: 10, englishName: '2 Samuel', arabicName: 'صموئيل الثاني', chapters: 24 },
  { abbr: '1KI', number: 11, englishName: '1 Kings', arabicName: 'الملوك الأول', chapters: 22 },
  { abbr: '2KI', number: 12, englishName: '2 Kings', arabicName: 'الملوك الثاني', chapters: 25 },
  { abbr: '1CH', number: 13, englishName: '1 Chronicles', arabicName: 'أخبار الأيام الأول', chapters: 29 },
  { abbr: '2CH', number: 14, englishName: '2 Chronicles', arabicName: 'أخبار الأيام الثاني', chapters: 36 },
  { abbr: 'EZR', number: 15, englishName: 'Ezra', arabicName: 'عزرا', chapters: 10 },
  { abbr: 'NEH', number: 16, englishName: 'Nehemiah', arabicName: 'نحميا', chapters: 13 },
  { abbr: 'EST', number: 17, englishName: 'Esther', arabicName: 'أستير', chapters: 10 },
  { abbr: 'JOB', number: 18, englishName: 'Job', arabicName: 'أيوب', chapters: 42 },
  { abbr: 'PSA', number: 19, englishName: 'Psalms', arabicName: 'المزامير', chapters: 150 },
  { abbr: 'PRO', number: 20, englishName: 'Proverbs', arabicName: 'الأمثال', chapters: 31 },
  { abbr: 'ECC', number: 21, englishName: 'Ecclesiastes', arabicName: 'الجامعة', chapters: 12 },
  { abbr: 'SNG', number: 22, englishName: 'Song of Songs', arabicName: 'نشيد الإنشاد', chapters: 8 },
  { abbr: 'ISA', number: 23, englishName: 'Isaiah', arabicName: 'إشعياء', chapters: 66 },
  { abbr: 'JER', number: 24, englishName: 'Jeremiah', arabicName: 'إرميا', chapters: 52 },
  { abbr: 'LAM', number: 25, englishName: 'Lamentations', arabicName: 'مراثي إرميا', chapters: 5 },
  { abbr: 'EZK', number: 26, englishName: 'Ezekiel', arabicName: 'حزقيال', chapters: 48 },
  { abbr: 'DAN', number: 27, englishName: 'Daniel', arabicName: 'دانيال', chapters: 12 },
  { abbr: 'HOS', number: 28, englishName: 'Hosea', arabicName: 'هوشع', chapters: 14 },
  { abbr: 'JOL', number: 29, englishName: 'Joel', arabicName: 'يوئيل', chapters: 3 },
  { abbr: 'AMO', number: 30, englishName: 'Amos', arabicName: 'عاموس', chapters: 9 },
  { abbr: 'OBA', number: 31, englishName: 'Obadiah', arabicName: 'عوبديا', chapters: 1 },
  { abbr: 'JON', number: 32, englishName: 'Jonah', arabicName: 'يونان', chapters: 4 },
  { abbr: 'MIC', number: 33, englishName: 'Micah', arabicName: 'ميخا', chapters: 7 },
  { abbr: 'NAM', number: 34, englishName: 'Nahum', arabicName: 'ناحوم', chapters: 3 },
  { abbr: 'HAB', number: 35, englishName: 'Habakkuk', arabicName: 'حبقوق', chapters: 3 },
  { abbr: 'ZEP', number: 36, englishName: 'Zephaniah', arabicName: 'صفنيا', chapters: 3 },
  { abbr: 'HAG', number: 37, englishName: 'Haggai', arabicName: 'حجّي', chapters: 2 },
  { abbr: 'ZEC', number: 38, englishName: 'Zechariah', arabicName: 'زكريا', chapters: 14 },
  { abbr: 'MAL', number: 39, englishName: 'Malachi', arabicName: 'ملاخي', chapters: 4 },
  { abbr: 'MAT', number: 40, englishName: 'Matthew', arabicName: 'متى', chapters: 28 },
  { abbr: 'MRK', number: 41, englishName: 'Mark', arabicName: 'مرقس', chapters: 16 },
  { abbr: 'LUK', number: 42, englishName: 'Luke', arabicName: 'لوقا', chapters: 24 },
  { abbr: 'JHN', number: 43, englishName: 'John', arabicName: 'يوحنا', chapters: 21 },
  { abbr: 'ACT', number: 44, englishName: 'Acts', arabicName: 'أعمال الرسل', chapters: 28 },
  { abbr: 'ROM', number: 45, englishName: 'Romans', arabicName: 'رومية', chapters: 16 },
  { abbr: '1CO', number: 46, englishName: '1 Corinthians', arabicName: 'كورنثوس الأولى', chapters: 16 },
  { abbr: '2CO', number: 47, englishName: '2 Corinthians', arabicName: 'كورنثوس الثانية', chapters: 13 },
  { abbr: 'GAL', number: 48, englishName: 'Galatians', arabicName: 'غلاطية', chapters: 6 },
  { abbr: 'EPH', number: 49, englishName: 'Ephesians', arabicName: 'أفسس', chapters: 6 },
  { abbr: 'PHP', number: 50, englishName: 'Philippians', arabicName: 'فيلبي', chapters: 4 },
  { abbr: 'COL', number: 51, englishName: 'Colossians', arabicName: 'كولوسي', chapters: 4 },
  { abbr: '1TH', number: 52, englishName: '1 Thessalonians', arabicName: 'تسالونيكي الأولى', chapters: 5 },
  { abbr: '2TH', number: 53, englishName: '2 Thessalonians', arabicName: 'تسالونيكي الثانية', chapters: 3 },
  { abbr: '1TI', number: 54, englishName: '1 Timothy', arabicName: 'تيموثاوس الأولى', chapters: 6 },
  { abbr: '2TI', number: 55, englishName: '2 Timothy', arabicName: 'تيموثاوس الثانية', chapters: 4 },
  { abbr: 'TIT', number: 56, englishName: 'Titus', arabicName: 'تيطس', chapters: 3 },
  { abbr: 'PHM', number: 57, englishName: 'Philemon', arabicName: 'فليمون', chapters: 1 },
  { abbr: 'HEB', number: 58, englishName: 'Hebrews', arabicName: 'العبرانيين', chapters: 13 },
  { abbr: 'JAM', number: 59, englishName: 'James', arabicName: 'يعقوب', chapters: 5 },
  { abbr: '1PE', number: 60, englishName: '1 Peter', arabicName: 'بطرس الأولى', chapters: 5 },
  { abbr: '2PE', number: 61, englishName: '2 Peter', arabicName: 'بطرس الثانية', chapters: 3 },
  { abbr: '1JN', number: 62, englishName: '1 John', arabicName: 'يوحنا الأولى', chapters: 5 },
  { abbr: '2JN', number: 63, englishName: '2 John', arabicName: 'يوحنا الثانية', chapters: 1 },
  { abbr: '3JN', number: 64, englishName: '3 John', arabicName: 'يوحنا الثالثة', chapters: 1 },
  { abbr: 'JUD', number: 65, englishName: 'Jude', arabicName: 'يهوذا', chapters: 1 },
  { abbr: 'REV', number: 66, englishName: 'Revelation', arabicName: 'الرؤيا', chapters: 22 },
];

export function findBookByName(name: string): BibleBook | null {
  const normalized = name.toLowerCase().trim();
  return bibleBooks.find(
    (book) =>
      book.englishName.toLowerCase() === normalized ||
      book.arabicName === name ||
      book.abbr.toLowerCase() === normalized ||
      book.englishName.toLowerCase().replace(/\s+/g, '') === normalized.replace(/\s+/g, '')
  ) || null;
}

export function getBookAbbr(bookName: string): string {
  const book = findBookByName(bookName);
  return book?.abbr || 'GEN';
}

export function getBookNumber(bookName: string): number {
  const book = findBookByName(bookName);
  return book?.number || 1;
}

export function parseVerseReferenceDetails(reference: string): {
  book: string;
  bookAbbr: string;
  bookNumber: number;
  chapter: number;
  verse: number;
} | null {
  const match = reference.match(/^(.+?)\s+(\d+):(\d+)/);
  if (!match) return null;

  const bookName = match[1].trim();
  const book = findBookByName(bookName);

  if (!book) return null;

  return {
    book: bookName,
    bookAbbr: book.abbr,
    bookNumber: book.number,
    chapter: parseInt(match[2]),
    verse: parseInt(match[3]),
  };
}
