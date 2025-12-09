import React from 'react';
import { Loader2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../locales';

interface LoadingScreenProps {
  messageKey: keyof typeof translations.en.loading;
  language: Language;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ messageKey, language }) => {
  const t = translations[language].loading;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
      <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mb-6" />
      <h2 className="text-2xl font-bold text-white mb-2">{t.analyzing}</h2>
      <p className="text-slate-400 animate-pulse">{t[messageKey]}</p>
    </div>
  );
};