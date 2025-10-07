import { useState } from 'react';
import { BookOpen, Compass } from 'lucide-react';
import DailyVersePage from './pages/DailyVersePage';
import BibleStudyToolsPage from './pages/BibleStudyToolsPage';

type Page = 'daily' | 'study';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('daily');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Daily Verse & Study Hub
          </h1>

          {/* Navigation */}
          <nav className="flex gap-2 justify-center">
            <button
              onClick={() => setCurrentPage('daily')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 'daily'
                  ? 'bg-green-100 text-green-700 shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BookOpen size={20} />
              <span>Daily Verse</span>
            </button>
            <button
              onClick={() => setCurrentPage('study')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 'study'
                  ? 'bg-green-100 text-green-700 shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Compass size={20} />
              <span>Bible Study Tools</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'daily' ? <DailyVersePage /> : <BibleStudyToolsPage />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p className="text-sm">
            Part of the{' '}
            <a
              href="https://pray-to-gather.base44.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Pray to Gather
            </a>{' '}
            ecosystem
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
