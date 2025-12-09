import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { IntakeForm } from './components/IntakeForm';
import { IdeaSelection } from './components/IdeaSelection';
import { BlueprintView } from './components/BlueprintView';
import { LoadingScreen } from './components/LoadingScreen';
import { SettingsModal } from './components/SettingsModal';
import { generateBusinessIdeas, generateProjectBlueprint } from './services/aiService';
import { AppStep, UserConstraints, Idea, Blueprint, Language, ModelConfig } from './types';
import { translations } from './locales';
import { Languages, Settings } from 'lucide-react';

const DEFAULT_CONFIGS: ModelConfig[] = [
  {
    id: 'default-gemini',
    name: 'Default (Gemini)',
    provider: 'google',
    apiKey: '', // Uses process.env.API_KEY internally if empty
    modelName: 'gemini-2.5-flash',
    baseUrl: ''
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'deepseek',
    apiKey: '',
    modelName: 'deepseek-chat',
    baseUrl: 'https://api.deepseek.com'
  }
];

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [constraints, setConstraints] = useState<UserConstraints | null>(null);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('zh');
  
  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [modelConfigs, setModelConfigs] = useState<ModelConfig[]>(DEFAULT_CONFIGS);
  const [activeConfigId, setActiveConfigId] = useState<string>(DEFAULT_CONFIGS[0].id);

  // Load settings from local storage
  useEffect(() => {
    const savedConfigs = localStorage.getItem('va_model_configs');
    const savedActiveId = localStorage.getItem('va_active_config_id');
    if (savedConfigs) {
      setModelConfigs(JSON.parse(savedConfigs));
    }
    if (savedActiveId) {
      setActiveConfigId(savedActiveId);
    }
  }, []);

  const saveSettings = (configs: ModelConfig[], activeId: string) => {
    setModelConfigs(configs);
    setActiveConfigId(activeId);
    localStorage.setItem('va_model_configs', JSON.stringify(configs));
    localStorage.setItem('va_active_config_id', activeId);
  };

  const activeConfig = modelConfigs.find(c => c.id === activeConfigId) || modelConfigs[0];

  const handleIntakeSubmit = async (data: UserConstraints) => {
    setConstraints(data);
    setStep(AppStep.ANALYZING_IDEAS);
    setError(null);
    try {
      const generatedIdeas = await generateBusinessIdeas(data, language, activeConfig);
      setIdeas(generatedIdeas);
      setStep(AppStep.IDEA_SELECTION);
    } catch (err: any) {
      console.error(err);
      setError(`Failed to generate ideas. ${err.message || 'Check your model configuration.'}`);
      setStep(AppStep.INTAKE);
    }
  };

  const handleIdeaSelect = async (idea: Idea) => {
    if (!constraints) return;
    setStep(AppStep.GENERATING_BLUEPRINT);
    setError(null);
    try {
      // Use a more capable model for blueprint if available in config, 
      // but for this implementation we rely on the user selected active config.
      // If the user selected a "Flash" equivalent, it might be less detailed.
      const generatedBlueprint = await generateProjectBlueprint(idea, constraints, language, activeConfig);
      setBlueprint(generatedBlueprint);
      setStep(AppStep.BLUEPRINT_VIEW);
    } catch (err: any) {
      console.error(err);
      setError(`Failed to generate blueprint. ${err.message || 'Check your model configuration.'}`);
      setStep(AppStep.IDEA_SELECTION);
    }
  };

  const handleReset = () => {
    setStep(AppStep.WELCOME);
    setConstraints(null);
    setIdeas([]);
    setBlueprint(null);
    setError(null);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 selection:bg-indigo-500/30">
        {/* Navbar */}
        <div className="border-b border-slate-800 p-4 sticky top-0 bg-slate-900/80 backdrop-blur-md z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xl text-white tracking-tight">VentureArchitect AI</span>
                  <div className="hidden md:flex items-center gap-2 px-2 py-1 bg-slate-800 rounded-md border border-slate-700/50">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-xs text-slate-300 font-mono truncate max-w-[120px]">
                      {activeConfig.name}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                    title={translations[language].nav.configureModel}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="hidden sm:inline">{translations[language].nav.settings}</span>
                  </button>

                  <button 
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full transition-colors border border-slate-700"
                  >
                    <Languages className="w-4 h-4" />
                    {language === 'en' ? '中文' : 'English'}
                  </button>
                </div>
            </div>
        </div>

        <main className="container mx-auto">
            {error && (
                <div className="max-w-2xl mx-auto mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200">
                    {error}
                </div>
            )}

            {step === AppStep.WELCOME && (
                <WelcomeScreen onStart={() => setStep(AppStep.INTAKE)} language={language} />
            )}

            {step === AppStep.INTAKE && (
                <IntakeForm onSubmit={handleIntakeSubmit} language={language} />
            )}

            {step === AppStep.ANALYZING_IDEAS && (
                <LoadingScreen messageKey="marketGaps" language={language} />
            )}

            {step === AppStep.IDEA_SELECTION && (
                <IdeaSelection ideas={ideas} onSelect={handleIdeaSelect} language={language} />
            )}

            {step === AppStep.GENERATING_BLUEPRINT && (
                <LoadingScreen messageKey="drafting" language={language} />
            )}

            {step === AppStep.BLUEPRINT_VIEW && blueprint && (
                <BlueprintView blueprint={blueprint} onReset={handleReset} language={language} />
            )}
        </main>

        <SettingsModal 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          configs={modelConfigs}
          activeConfigId={activeConfigId}
          onSaveConfigs={saveSettings}
          language={language}
        />
    </div>
  );
}