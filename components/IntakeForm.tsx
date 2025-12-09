import React, { useState } from 'react';
import { UserConstraints, Language } from '../types';
import { translations } from '../locales';
import { Clock, DollarSign, Target, AlertTriangle, Cpu } from 'lucide-react';

interface IntakeFormProps {
  onSubmit: (constraints: UserConstraints) => void;
  language: Language;
}

export const IntakeForm: React.FC<IntakeFormProps> = ({ onSubmit, language }) => {
  const t = translations[language].intake;
  const [formData, setFormData] = useState<UserConstraints>({
    skills: '',
    time: '',
    budget: '',
    risk: 'conservative',
    goals: ''
  });

  const handleChange = (field: keyof UserConstraints, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value } as UserConstraints));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = Object.values(formData).every(val => (val as string).length > 0);

  return (
    <div className="max-w-2xl mx-auto pt-10 pb-20 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400">
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Skills */}
        <div className="space-y-3">
          <label className="flex items-center text-lg font-medium text-indigo-300">
            <Cpu className="w-5 h-5 mr-2" />
            {t.skills}
          </label>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 focus-within:border-indigo-500 transition-colors">
            <textarea
              value={formData.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
              placeholder={t.skillsPlace}
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 min-h-[80px]"
            />
          </div>
        </div>

        {/* Time */}
        <div className="space-y-3">
          <label className="flex items-center text-lg font-medium text-indigo-300">
            <Clock className="w-5 h-5 mr-2" />
            {t.time}
          </label>
          <input
            type="text"
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            placeholder={t.timePlace}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Budget */}
        <div className="space-y-3">
          <label className="flex items-center text-lg font-medium text-indigo-300">
            <DollarSign className="w-5 h-5 mr-2" />
            {t.budget}
          </label>
          <input
            type="text"
            value={formData.budget}
            onChange={(e) => handleChange('budget', e.target.value)}
            placeholder={t.budgetPlace}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Risk */}
        <div className="space-y-3">
          <label className="flex items-center text-lg font-medium text-indigo-300">
            <AlertTriangle className="w-5 h-5 mr-2" />
            {t.risk}
          </label>
          <div className="grid grid-cols-3 gap-4">
            {(['conservative', 'moderate', 'aggressive'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => handleChange('risk', level)}
                className={`p-4 rounded-lg border capitalize text-center transition-all ${
                  formData.risk === level
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/50'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                {t.riskLevels[level]}
              </button>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="space-y-3">
          <label className="flex items-center text-lg font-medium text-indigo-300">
            <Target className="w-5 h-5 mr-2" />
            {t.goals}
          </label>
          <textarea
            value={formData.goals}
            onChange={(e) => handleChange('goals', e.target.value)}
            placeholder={t.goalsPlace}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 min-h-[80px]"
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              isFormValid
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            {t.submit}
          </button>
        </div>
      </form>
    </div>
  );
};