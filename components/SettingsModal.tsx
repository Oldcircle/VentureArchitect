import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { ModelConfig, AIProvider, Language } from '../types';
import { translations } from '../locales';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  configs: ModelConfig[];
  activeConfigId: string;
  onSaveConfigs: (configs: ModelConfig[], newActiveId: string) => void;
  language: Language;
}

const PROVIDERS: { value: AIProvider; label: string; defaultUrl?: string }[] = [
  { value: 'google', label: 'Google Gemini', defaultUrl: '' },
  { value: 'openai', label: 'OpenAI (GPT)', defaultUrl: 'https://api.openai.com/v1' },
  { value: 'deepseek', label: 'DeepSeek', defaultUrl: 'https://api.deepseek.com' },
  { value: 'anthropic', label: 'Anthropic (Claude)', defaultUrl: 'https://api.anthropic.com/v1' },
  { value: 'ollama', label: 'Ollama (Local)', defaultUrl: 'http://localhost:11434/v1' },
  { value: 'other', label: 'Other / Custom', defaultUrl: '' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, onClose, configs, activeConfigId, onSaveConfigs, language 
}) => {
  const t = translations[language].settings;
  const [localConfigs, setLocalConfigs] = useState<ModelConfig[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  
  // Initialize local state when opening
  useEffect(() => {
    if (isOpen) {
      setLocalConfigs(JSON.parse(JSON.stringify(configs)));
      setSelectedId(activeConfigId);
    }
  }, [isOpen, configs, activeConfigId]);

  if (!isOpen) return null;

  const currentConfig = localConfigs.find(c => c.id === selectedId);

  const handleUpdate = (field: keyof ModelConfig, value: string) => {
    setLocalConfigs(prev => prev.map(c => 
      c.id === selectedId ? { ...c, [field]: value } : c
    ));
  };

  const handleCreate = () => {
    const newId = Date.now().toString();
    const newConfig: ModelConfig = {
      id: newId,
      name: 'New Config',
      provider: 'openai',
      apiKey: '',
      baseUrl: '',
      modelName: 'gpt-3.5-turbo'
    };
    setLocalConfigs(prev => [...prev, newConfig]);
    setSelectedId(newId);
  };

  const handleDelete = (id: string) => {
    // Prevent deleting the last config
    if (localConfigs.length <= 1) return;
    
    const newConfigs = localConfigs.filter(c => c.id !== id);
    setLocalConfigs(newConfigs);
    if (id === selectedId) {
      setSelectedId(newConfigs[0].id);
    }
  };

  const handleSave = () => {
    onSaveConfigs(localConfigs, selectedId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl h-[600px] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-700">
        
        {/* Left Sidebar: List */}
        <div className="w-full md:w-1/3 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">{t.configList}</h3>
            <button 
              onClick={handleCreate}
              className="p-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors"
              title={t.createNew}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {localConfigs.map(config => (
              <div 
                key={config.id}
                onClick={() => setSelectedId(config.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all border ${
                  selectedId === config.id 
                    ? 'bg-white dark:bg-slate-700 border-indigo-500 shadow-sm' 
                    : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-500 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-8 rounded-full ${selectedId === config.id ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                  <div className="flex-1 overflow-hidden">
                    <p className={`font-medium truncate ${selectedId === config.id ? 'text-indigo-600 dark:text-indigo-300' : ''}`}>
                      {config.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{config.provider}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Form */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              {t.title}
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {currentConfig && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t.configName}</label>
                  <input 
                    type="text" 
                    value={currentConfig.name}
                    onChange={(e) => handleUpdate('name', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t.provider}</label>
                  <select 
                    value={currentConfig.provider}
                    onChange={(e) => handleUpdate('provider', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    {PROVIDERS.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t.apiKey}</label>
                  <input 
                    type="password" 
                    value={currentConfig.apiKey}
                    onChange={(e) => handleUpdate('apiKey', e.target.value)}
                    placeholder={t.apiKeyPlaceholder}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                  />
                  <p className="text-xs text-slate-500">{t.apiKeyPlaceholder}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t.baseUrl}</label>
                  <input 
                    type="text" 
                    value={currentConfig.baseUrl || ''}
                    onChange={(e) => handleUpdate('baseUrl', e.target.value)}
                    placeholder={PROVIDERS.find(p => p.value === currentConfig.provider)?.defaultUrl || t.baseUrlPlaceholder}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                  />
                  <p className="text-xs text-slate-500">{t.defaultUrlNote}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t.modelName}</label>
                  <input 
                    type="text" 
                    value={currentConfig.modelName}
                    onChange={(e) => handleUpdate('modelName', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                  />
                </div>
              </>
            )}
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
             {localConfigs.length > 1 && (
                <button 
                  onClick={() => handleDelete(selectedId)}
                  className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> {t.delete}
                </button>
             )}
             <div className="flex gap-3 ml-auto">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {t.cancel}
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-slate-900 dark:bg-indigo-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium"
                >
                  <Save className="w-4 h-4" /> {t.save}
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
