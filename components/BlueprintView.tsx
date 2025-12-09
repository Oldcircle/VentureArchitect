import React from 'react';
import { Blueprint, Language } from '../types';
import { translations } from '../locales';
import { 
  Users, Target, Layers, DollarSign, Rocket, Map, AlertTriangle, CheckSquare, Calendar
} from 'lucide-react';

interface BlueprintViewProps {
  blueprint: Blueprint;
  onReset: () => void;
  language: Language;
}

export const BlueprintView: React.FC<BlueprintViewProps> = ({ blueprint, onReset, language }) => {
  const t = translations[language].blueprint;
  
  return (
    <div className="max-w-5xl mx-auto pt-10 pb-20 px-4">
      {/* Header */}
      <div className="mb-12 border-b border-slate-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">{blueprint.oneLiner}</h1>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="px-3 py-1 bg-indigo-900/50 text-indigo-200 rounded-full border border-indigo-700">
            {blueprint.productForm}
          </span>
          <span className="px-3 py-1 bg-emerald-900/50 text-emerald-200 rounded-full border border-emerald-700">
            {blueprint.monetization.model}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Core Value */}
        <div className="md:col-span-2 space-y-8">
          <section className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-400" />
              {t.whoWhy}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase">{t.targetPersona}</h3>
                <p className="text-slate-200">{blueprint.userPersona}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase">{t.valueProp}</h3>
                <p className="text-slate-200 italic border-l-2 border-indigo-500 pl-4">
                  {blueprint.valueProposition}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Layers className="w-5 h-5 mr-2 text-blue-400" />
              {t.userJourney}
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
                {blueprint.userJourney.map((step, idx) => (
                    <div key={idx} className="flex-1 bg-slate-900/50 p-3 rounded border border-slate-800 text-sm text-slate-300">
                        <span className="block text-xs text-slate-500 mb-1">{t.step} {idx + 1}</span>
                        {step}
                    </div>
                ))}
            </div>
          </section>

          <section className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Rocket className="w-5 h-5 mr-2 text-pink-400" />
              {t.growth}
            </h2>
            <div className="space-y-6">
                {blueprint.growth.channels.map((channel, idx) => (
                    <div key={idx} className="border-b border-slate-700 last:border-0 pb-4 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-white">{channel.name}</h3>
                            <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">{channel.costTime}</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{t.target}: {channel.target}</p>
                        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                            {channel.actions.map((action, i) => (
                                <li key={i}>{action}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Money & Roadmap */}
        <div className="space-y-8">
            <section className="bg-emerald-900/10 rounded-xl p-6 border border-emerald-900/30">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-emerald-400" />
                    {t.economics}
                </h2>
                <div className="space-y-4">
                    <div>
                        <span className="text-xs text-slate-400 block">{t.pricing}</span>
                        <p className="text-white font-medium">{blueprint.monetization.pricing}</p>
                    </div>
                    <div>
                        <span className="text-xs text-slate-400 block">{t.potential}</span>
                        <p className="text-emerald-300 text-sm">{blueprint.monetization.revenueCalc}</p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Map className="w-5 h-5 mr-2 text-amber-400" />
                    {t.roadmap}
                </h2>
                <div className="relative border-l border-slate-700 ml-2 space-y-6">
                    {blueprint.roadmap.map((phase, idx) => (
                        <div key={idx} className="pl-6 relative">
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                            <h3 className="text-white font-semibold text-sm">{phase.phase}</h3>
                            <p className="text-xs text-amber-400 mb-2">{phase.metric}</p>
                            <ul className="text-xs text-slate-400 space-y-1">
                                {phase.tasks.map((t, i) => <li key={i}>- {t}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </div>

      {/* Risks */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-500" />
            {t.risks}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blueprint.risks.map((item, idx) => (
                <div key={idx} className="bg-orange-900/10 border border-orange-900/30 p-5 rounded-lg">
                    <h3 className="text-orange-200 font-medium mb-2">{item.risk}</h3>
                    <p className="text-sm text-slate-400">{item.mitigation}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Immediate Actions */}
      <section className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 rounded-2xl p-8 border border-indigo-700/50">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3 text-indigo-400" />
            {t.immediateAction}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <div className="flex items-center mb-4">
                    <CheckSquare className="w-5 h-5 text-indigo-400 mr-2" />
                    <h3 className="text-lg font-bold text-white">{t.tomorrow}</h3>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-1">
                    {blueprint.immediateActions.tomorrow.map((action, idx) => (
                        <div key={idx} className="flex items-start p-3 border-b border-slate-800 last:border-0">
                            <input type="checkbox" className="mt-1 mr-3 accent-indigo-500 w-4 h-4" />
                            <span className="text-slate-300 text-sm">{action}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                    <h3 className="text-lg font-bold text-white">{t.thisWeek}</h3>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-1">
                    {blueprint.immediateActions.thisWeek.map((action, idx) => (
                        <div key={idx} className="flex items-start p-3 border-b border-slate-800 last:border-0">
                            <input type="checkbox" className="mt-1 mr-3 accent-blue-500 w-4 h-4" />
                            <span className="text-slate-300 text-sm">{action}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      <div className="mt-12 text-center">
          <button 
            onClick={onReset}
            className="text-slate-500 hover:text-white underline transition-colors"
          >
            {t.startOver}
          </button>
      </div>
    </div>
  );
};