import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('damijtech-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      return prefersLight ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('damijtech-theme', theme);
    
    // Update mobile browser theme color header
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'light' ? '#FAFAFA' : '#0F172A');
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
      className="p-2.5 rounded-full border border-slate-200/60 dark:border-slate-800/40 bg-white/70 dark:bg-slate-900/30 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-300 transform hover:rotate-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
      aria-label="Toggle dark/light theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400 animate-[pulse_3s_infinite]" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
}
