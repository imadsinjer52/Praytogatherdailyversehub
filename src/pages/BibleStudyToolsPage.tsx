import { useState } from 'react';
import { Search, BookOpen, Sparkles, Loader } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAppContext } from '../App';

interface Analysis {
  summary: string;
  keyThemes: string[];
  practicalApplication: string;
  prayerPoints: string[];
}

function BibleStudyTools() {
  const { language } = useAppContext();
  const [passage, setPassage] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const translations = {
    en: {
      title: "Bible Study Tools",
      subtitle: "Deepen your understanding with AI-powered insights",
      inputLabel: "Enter Bible Passage",
      inputPlaceholder: "e.g., John 3:16 or paste any Bible text...",
      analyzeButton: "Analyze Passage",
      analyzing: "Analyzing...",
      summary: "Summary",
      keyThemes: "Key Themes",
      application: "Practical Application",
      prayer: "Prayer Points",
      errorMessage: "Failed to analyze passage. Please try again.",
      noAnalysis: "Enter a Bible passage above to get started with AI-powered insights and study tools."
    },
    ar: {
      title: "أدوات دراسة الكتاب المقدس",
      subtitle: "عمّق فهمك من خلال رؤى مدعومة بالذكاء الاصطناعي",
      inputLabel: "أدخل مقطع الكتاب المقدس",
      inputPlaceholder: "مثال: يوحنا 3:16 أو الصق أي نص من الكتاب المقدس...",
      analyzeButton: "تحليل المقطع",
      analyzing: "جاري التحليل...",
      summary: "الملخص",
      keyThemes: "المواضيع الرئيسية",
      application: "التطبيق العملي",
      prayer: "نقاط الصلاة",
      errorMessage: "فشل تحليل المقطع. يرجى المحاولة مرة أخرى.",
      noAnalysis: "أدخل مقطعًا من الكتاب المقدس أعلاه للبدء برؤى وأدوات الدراسة المدعومة بالذكاء الاصطناعي."
    },
    de: {
      title: "Bibelstudienwerkzeuge",
      subtitle: "Vertiefen Sie Ihr Verständnis mit KI-gestützten Einblicken",
      inputLabel: "Bibelstelle eingeben",
      inputPlaceholder: "z.B. Johannes 3:16 oder fügen Sie einen beliebigen Bibeltext ein...",
      analyzeButton: "Passage analysieren",
      analyzing: "Wird analysiert...",
      summary: "Zusammenfassung",
      keyThemes: "Hauptthemen",
      application: "Praktische Anwendung",
      prayer: "Gebetspunkte",
      errorMessage: "Analyse der Passage fehlgeschlagen. Bitte versuchen Sie es erneut.",
      noAnalysis: "Geben Sie oben eine Bibelstelle ein, um mit KI-gestützten Einblicken und Studienwerkzeugen zu beginnen."
    }
  };

  const t = translations[language];

  const analyzePassage = async () => {
    if (!passage.trim()) return;

    setLoading(true);
    setError('');

    try {
      const prompt = `Analyze this Bible passage and provide:
1. A brief summary
2. 3-4 key themes
3. Practical application for daily life
4. 3-4 prayer points

Passage: ${passage}

Format your response as JSON with keys: summary, keyThemes (array), practicalApplication, prayerPoints (array)`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDC-n97P-fC9TIqJJEE3tRZ1Z10aHpVrPc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const analysisData = JSON.parse(jsonMatch[0]);
        setAnalysis(analysisData);

        await supabase.from('study_sessions').insert({
          passage,
          analysis: analysisData
        });
      }
    } catch (err) {
      console.error('Error:', err);
      setError(t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-purple-600 dark:text-purple-400 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t.title}</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-200">
          <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.inputLabel}
          </label>
          <textarea
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
            rows={4}
          />
          
          {error && (
            <p className="mt-2 text-red-600 dark:text-red-400 text-sm">{error}</p>
          )}

          <button
            onClick={analyzePassage}
            disabled={loading || !passage.trim()}
            className="mt-4 w-full bg-purple-600 dark:bg-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader className="animate-spin mr-2" size={20} />
                {t.analyzing}
              </>
            ) : (
              <>
                <Sparkles className="mr-2" size={20} />
                {t.analyzeButton}
              </>
            )}
          </button>
        </div>

        {/* Analysis Results */}
        {analysis ? (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <BookOpen className="mr-2 text-purple-600 dark:text-purple-400" size={24} />
                {t.summary}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{analysis.summary}</p>
            </div>

            {/* Key Themes */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Search className="mr-2 text-purple-600 dark:text-purple-400" size={24} />
                {t.keyThemes}
              </h3>
              <ul className="space-y-2">
                {analysis.keyThemes.map((theme, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 dark:text-gray-300">{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Application */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Sparkles className="mr-2 text-purple-600 dark:text-purple-400" size={24} />
                {t.application}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{analysis.practicalApplication}</p>
            </div>

            {/* Prayer Points */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="mr-2 text-2xl">🙏</span>
                {t.prayer}
              </h3>
              <ul className="space-y-2">
                {analysis.prayerPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 dark:text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center transition-colors duration-200">
            <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t.noAnalysis}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default BibleStudyTools;