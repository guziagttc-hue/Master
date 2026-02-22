import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  BookOpen, 
  Gamepad2, 
  Keyboard, 
  ChevronRight, 
  Info,
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { EXCEL_SHORTCUTS, Shortcut } from './data/shortcuts';
import { cn } from './lib/utils';
import confetti from 'canvas-confetti';

// --- Components ---

interface ShortcutCardProps {
  shortcut: Shortcut;
}

const ShortcutCard: React.FC<ShortcutCardProps> = ({ shortcut }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative bg-white border border-zinc-200 rounded-xl p-4 hover:border-zinc-400 transition-all shadow-sm hover:shadow-md"
  >
    <div className="flex justify-between items-start mb-2">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
        {shortcut.category}
      </span>
      <kbd className="px-2 py-1 text-xs font-mono font-bold bg-zinc-900 text-white rounded shadow-sm">
        {shortcut.key}
      </kbd>
    </div>
    <h3 className="text-lg font-semibold text-zinc-900 mb-1">{shortcut.action}</h3>
    <p className="text-sm text-zinc-500 leading-relaxed">{shortcut.description}</p>
  </motion.div>
);

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  const currentShortcut = useMemo(() => EXCEL_SHORTCUTS[currentIndex], [currentIndex]);

  const generateOptions = (correctAction: string) => {
    const others = EXCEL_SHORTCUTS
      .filter(s => s.action !== correctAction)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(s => s.action);
    return [...others, correctAction].sort(() => 0.5 - Math.random());
  };

  React.useEffect(() => {
    if (currentShortcut) {
      setOptions(generateOptions(currentShortcut.action));
    }
  }, [currentShortcut]);

  const handleAnswer = (answer: string) => {
    if (feedback) return;

    if (answer === currentShortcut.action) {
      setScore(s => s + 1);
      setFeedback('correct');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#18181b', '#71717a', '#ffffff']
      });
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (currentIndex < EXCEL_SHORTCUTS.length - 1) {
        setCurrentIndex(i => i + 1);
        setFeedback(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setFeedback(null);
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 px-6 bg-white border border-zinc-200 rounded-2xl shadow-xl max-w-md mx-auto"
      >
        <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
          <Trophy className="w-10 h-10 text-zinc-900" />
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Quiz Complete!</h2>
        <p className="text-zinc-500 mb-8 text-center">
          You mastered <span className="font-bold text-zinc-900">{score}</span> out of {EXCEL_SHORTCUTS.length} shortcuts.
        </p>
        <button 
          onClick={resetQuiz}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Question {currentIndex + 1} of {EXCEL_SHORTCUTS.length}</span>
          <div className="h-1.5 w-48 bg-zinc-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-zinc-900" 
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / EXCEL_SHORTCUTS.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-zinc-900 font-bold">
          <Trophy className="w-4 h-4" />
          {score}
        </div>
      </div>

      <motion.div 
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-zinc-900 text-white p-12 rounded-3xl shadow-2xl mb-8 flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
        <Keyboard className="w-12 h-12 mb-6 opacity-20" />
        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-400 mb-4">What does this shortcut do?</h2>
        <div className="text-5xl font-bold tracking-tighter mb-2">
          {currentShortcut.key}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((option, idx) => (
          <button
            key={idx}
            disabled={!!feedback}
            onClick={() => handleAnswer(option)}
            className={cn(
              "group flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left font-medium",
              !feedback && "bg-white border-zinc-100 hover:border-zinc-900 hover:shadow-md",
              feedback === 'correct' && option === currentShortcut.action && "bg-emerald-50 border-emerald-500 text-emerald-700",
              feedback === 'wrong' && option === currentShortcut.action && "bg-emerald-50 border-emerald-500 text-emerald-700",
              feedback === 'wrong' && option !== currentShortcut.action && "bg-rose-50 border-rose-200 text-rose-400 opacity-50"
            )}
          >
            <span>{option}</span>
            <div className="flex items-center">
              {feedback === 'correct' && option === currentShortcut.action && <CheckCircle2 className="w-5 h-5" />}
              {feedback === 'wrong' && option === currentShortcut.action && <CheckCircle2 className="w-5 h-5" />}
              {!feedback && <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'reference' | 'quiz'>('reference');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(EXCEL_SHORTCUTS.map(s => s.category)));

  const filteredShortcuts = useMemo(() => {
    return EXCEL_SHORTCUTS.filter(s => {
      const matchesSearch = s.action.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.key.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || s.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
              <Keyboard className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Excel Master</h1>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Shortcut Trainer</p>
            </div>
          </div>

          <nav className="flex bg-zinc-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('reference')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                activeTab === 'reference' ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-900"
              )}
            >
              <BookOpen className="w-4 h-4" />
              Reference
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                activeTab === 'quiz' ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-900"
              )}
            >
              <Gamepad2 className="w-4 h-4" />
              Quiz Mode
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'reference' ? (
            <motion.div 
              key="reference"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Search & Filters */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text"
                    placeholder="Search shortcuts (e.g. 'Ctrl + C' or 'Copy')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all shadow-sm"
                  />
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                      !selectedCategory ? "bg-zinc-900 text-white" : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400"
                    )}
                  >
                    All
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                        selectedCategory === cat ? "bg-zinc-900 text-white" : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredShortcuts.map((shortcut) => (
                  <ShortcutCard key={shortcut.key} shortcut={shortcut} />
                ))}
                {filteredShortcuts.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <div className="bg-zinc-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Info className="text-zinc-400 w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900">No shortcuts found</h3>
                    <p className="text-zinc-500">Try adjusting your search or filters.</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Keyboard className="w-4 h-4" />
            <span className="text-sm font-medium">Excel Shortcut Master v1.0</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 font-medium transition-colors">Documentation</a>
            <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 font-medium transition-colors">Privacy</a>
            <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 font-medium transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
