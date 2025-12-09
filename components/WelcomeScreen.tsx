import React from 'react';
import { ArrowRight, Briefcase, TrendingUp, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../locales';

interface WelcomeScreenProps {
  onStart: () => void;
  language: Language;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, language }) => {
  const t = translations[language].welcome;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center max-w-3xl mx-auto animate-fadeIn">
      <div className="bg-indigo-600/20 p-4 rounded-full mb-8">
        <Briefcase className="w-12 h-12 text-indigo-400" />
      </div>
      
      <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6 pb-2">
        {t.title}
      </h1>
      
      <p className="text-xl text-slate-400 mb-12 leading-relaxed">
        {t.subtitle}
        <br/><br/>
        {t.noVague}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
          <TrendingUp className="w-8 h-8 text-green-400 mb-4 mx-auto" />
          <h3 className="font-semibold text-white mb-2">{t.marketDriven}</h3>
          <p className="text-sm text-slate-400">{t.marketDrivenDesc}</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
          <Briefcase className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
          <h3 className="font-semibold text-white mb-2">{t.execution}</h3>
          <p className="text-sm text-slate-400">{t.executionDesc}</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
          <ShieldCheck className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
          <h3 className="font-semibold text-white mb-2">{t.riskAware}</h3>
          <p className="text-sm text-slate-400">{t.riskAwareDesc}</p>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900"
      >
        {t.start}
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};