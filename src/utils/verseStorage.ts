interface StoredVerse {
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

const STORAGE_KEY = 'daily_verses_history';

export function getStoredVerses(): StoredVerse[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveVerse(verse: StoredVerse): void {
  try {
    const verses = getStoredVerses();
    const existingIndex = verses.findIndex(v => v.date === verse.date);

    if (existingIndex >= 0) {
      verses[existingIndex] = verse;
    } else {
      verses.unshift(verse);
    }

    const recentVerses = verses.slice(0, 7);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentVerses));
  } catch (err) {
    console.error('Error saving verse:', err);
  }
}

export function getTodayVerse(): StoredVerse | null {
  const today = new Date().toISOString().split('T')[0];
  const verses = getStoredVerses();
  return verses.find(v => v.date === today) || null;
}

export function getRecentVerses(count: number = 7): StoredVerse[] {
  return getStoredVerses().slice(0, count);
}
