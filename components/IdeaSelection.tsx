import React from 'react';
import { Idea, Language } from '../types';
import { translations } from '../locales';
import { CheckCircle, AlertCircle, TrendingUp, Award } from 'lucide-react';

interface IdeaSelectionProps {
  ideas: Idea[];
  onSelect: (idea: Idea) => void;
  language: Language;
}

export const IdeaSelection: React.FC<IdeaSelectionProps> = ({ ideas, onSelect, language }) => {
  const t = translations[language].selection;

  return (
    <div className="max-w-6xl mx-auto pt-10 pb-20 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {ideas.map((idea) => (
          <div 
            key={idea.id}
            className={`relative flex flex-col h-full rounded-2xl border transition-all duration-300 ${
              idea.isRecommended 
                ? 'bg-slate-800 border-indigo-500 shadow-2xl shadow-indigo-900/20 ring-1 ring-indigo-500' 
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'
            }`}
          >
            {idea.isRecommended && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center shadow-lg">
                <Award className="w-4 h-4 mr-1" /> {t.recommended}
              </div>
            )}

            <div className="p-6 flex-grow">
              <h3 className="text-2xl font-bold text-white mb-4">{idea.title}</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{t.targetAudience}</span>
                  <p className="text-slate-300 text-sm mt-1">{idea.targetAudience}</p>
                </div>
                
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{t.problemSolved}</span>
                  <p className="text-slate-300 text-sm mt-1">{idea.problemSolved}</p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{t.monetization}</span>
                  <p className="text-emerald-400 text-sm font-medium mt-1">{idea.monetization}</p>
                </div>

                <div className="pt-4 border-t border-slate-700">
                    <h4 className="flex items-center text-sm font-semibold text-green-400 mb-2">
                        <TrendingUp className="w-4 h-4 mr-2" /> {t.pros}
                    </h4>
                    <ul className="space-y-1">
                        {idea.pros.map((pro, idx) => (
                            <li key={idx} className="text-xs text-slate-400 flex items-start">
                                <span className="mr-2">•</span> {pro}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pt-2">
                    <h4 className="flex items-center text-sm font-semibold text-orange-400 mb-2">
                        <AlertCircle className="w-4 h-4 mr-2" /> {t.risks}
                    </h4>
                    <ul className="space-y-1">
                        {idea.risks.map((risk, idx) => (
                            <li key={idx} className="text-xs text-slate-400 flex items-start">
                                <span className="mr-2">•</span> {risk}
                            </li>
                        ))}
                    </ul>
                </div>
              </div>
            </div>

            {idea.isRecommended && (
                <div className="px-6 py-3 bg-indigo-900/30 border-t border-indigo-900/50">
                    <p className="text-xs text-indigo-200 italic">
                        "{idea.recommendationReason}"
                    </p>
                </div>
            )}

            <div className="p-6 pt-0 mt-4">
              <button
                onClick={() => onSelect(idea)}
                className={`w-full py-3 rounded-lg font-bold transition-colors flex items-center justify-center ${
                  idea.isRecommended
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                }`}
              >
                {t.selectBtn} <CheckCircle className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};