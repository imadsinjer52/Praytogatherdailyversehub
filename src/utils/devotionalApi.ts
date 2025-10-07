export interface DevotionalData {
  id: string;
  date: string;
  verse_reference: string;
  verse_text_en: string;
  verse_text_ar: string | null;
  verse_text_de: string | null;
  reflection_en: string;
  reflection_ar: string;
  reflection_de: string;
  prayer_en: string;
  prayer_ar: string;
  prayer_de: string;
  version_en: string;
  version_ar: string;
  version_de: string;
  created_at: string;
}

export async function fetchDevotional(date: string): Promise<DevotionalData | null> {
  try {
    const apiUrl = import.meta.env.DEV
      ? `http://localhost:3000/api/devotional?date=${date}`
      : `/api/devotional?date=${date}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching devotional:', err);
    return null;
  }
}

export async function getTodayDevotional(): Promise<DevotionalData | null> {
  const today = new Date().toISOString().split('T')[0];
  return fetchDevotional(today);
}
