const API_KEY = 'dfecf59a67e02727e51fa19db059672a';
const API_BASE = 'https://api.scripture.api.bible/v1';

export const TRANSLATION_IDS = {
  arabic: 'b17e246951402e50-01',
  german: 'f492a38d0e52db0f-01',
};

export interface BibleVersion {
  id: string;
  name: string;
  abbreviation: string;
  language: {
    id: string;
    name: string;
  };
}

export interface Book {
  id: string;
  name: string;
  abbreviation: string;
}

export interface Chapter {
  id: string;
  number: string;
}

const languagePriority = ['arabic,Standard', 'eng', 'deu', 'fra'];

export async function fetchBibleVersions(): Promise<BibleVersion[]> {
  try {
    const response = await fetch(`${API_BASE}/bibles`, {
      headers: { 'api-key': API_KEY },
    });
    const data = await response.json();
    const versions = data.data || [];

    return versions.sort((a: BibleVersion, b: BibleVersion) => {
      const aLangCode = a.language.id;
      const bLangCode = b.language.id;
      const aPriority = languagePriority.indexOf(aLangCode);
      const bPriority = languagePriority.indexOf(bLangCode);

      if (aPriority !== -1 && bPriority !== -1) {
        return aPriority - bPriority;
      }
      if (aPriority !== -1) return -1;
      if (bPriority !== -1) return 1;

      return a.language.name.localeCompare(b.language.name);
    });
  } catch (err) {
    console.error('Error fetching versions:', err);
    return [];
  }
}

export function getUniqueLanguages(versions: BibleVersion[]): Array<{ id: string; name: string }> {
  const languageMap = new Map<string, string>();

  versions.forEach(version => {
    if (!languageMap.has(version.language.id)) {
      languageMap.set(version.language.id, version.language.name);
    }
  });

  const languages = Array.from(languageMap.entries()).map(([id, name]) => ({ id, name }));

  return languages.sort((a, b) => {
    const aPriority = languagePriority.indexOf(a.id);
    const bPriority = languagePriority.indexOf(b.id);

    if (aPriority !== -1 && bPriority !== -1) {
      return aPriority - bPriority;
    }
    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;

    return a.name.localeCompare(b.name);
  });
}

export function filterVersionsByLanguage(versions: BibleVersion[], languageId: string): BibleVersion[] {
  return versions.filter(v => v.language.id === languageId);
}

export async function fetchBooks(versionId: string): Promise<Book[]> {
  try {
    const response = await fetch(`${API_BASE}/bibles/${versionId}/books`, {
      headers: { 'api-key': API_KEY },
    });
    const data = await response.json();
    return data.data || [];
  } catch (err) {
    console.error('Error fetching books:', err);
    return [];
  }
}

export async function fetchChapters(versionId: string, bookId: string): Promise<Chapter[]> {
  try {
    const response = await fetch(`${API_BASE}/bibles/${versionId}/books/${bookId}/chapters`, {
      headers: { 'api-key': API_KEY },
    });
    const data = await response.json();
    return (data.data || []).filter((ch: Chapter) => ch.number && ch.number !== 'intro');
  } catch (err) {
    console.error('Error fetching chapters:', err);
    return [];
  }
}

export async function fetchVerses(versionId: string, chapterId: string): Promise<string[]> {
  try {
    const response = await fetch(
      `${API_BASE}/bibles/${versionId}/chapters/${chapterId}/verses`,
      { headers: { 'api-key': API_KEY } }
    );
    const data = await response.json();
    return (data.data || [])
      .map((v: { id: string }) => {
        const parts = v.id.split('.');
        return parts[parts.length - 1];
      })
      .filter((num: string) => /^\d+$/.test(num));
  } catch (err) {
    console.error('Error fetching verses:', err);
    return [];
  }
}

export async function fetchVerseRange(
  versionId: string,
  chapterId: string,
  fromVerse: number,
  toVerse: number
): Promise<{ content: string; reference: string } | null> {
  try {
    const response = await fetch(
      `${API_BASE}/bibles/${versionId}/passages/${chapterId}.${fromVerse}-${chapterId}.${toVerse}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`,
      { headers: { 'api-key': API_KEY } }
    );
    const data = await response.json();

    if (data.data) {
      return {
        content: data.data.content,
        reference: data.data.reference,
      };
    }
    return null;
  } catch (err) {
    console.error('Error fetching verse range:', err);
    return null;
  }
}

export async function fetchVerseByReference(
  versionId: string,
  book: string,
  chapter: number,
  verse: number
): Promise<string | null> {
  try {
    const books = await fetchBooks(versionId);
    const matchingBook = books.find(
      b => b.name.toLowerCase().includes(book.toLowerCase()) ||
           b.abbreviation.toLowerCase() === book.toLowerCase() ||
           b.name.toLowerCase().replace(/\s+/g, '') === book.toLowerCase().replace(/\s+/g, '')
    );

    if (!matchingBook) return null;

    const chapters = await fetchChapters(versionId, matchingBook.id);
    const matchingChapter = chapters.find(c => c.number === chapter.toString());

    if (!matchingChapter) return null;

    const result = await fetchVerseRange(versionId, matchingChapter.id, verse, verse);
    return result?.content || null;
  } catch (err) {
    console.error('Error fetching verse by reference:', err);
    return null;
  }
}

export function parseVerseReference(reference: string): { book: string; chapter: number; verse: number } | null {
  const match = reference.match(/^(.+?)\s+(\d+):(\d+)/);
  if (!match) return null;

  return {
    book: match[1].trim(),
    chapter: parseInt(match[2]),
    verse: parseInt(match[3]),
  };
}
