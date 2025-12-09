export type Language = 'en' | 'zh';

export type AIProvider = 'google' | 'openai' | 'deepseek' | 'anthropic' | 'ollama' | 'other';

export interface ModelConfig {
  id: string;
  name: string;
  provider: AIProvider;
  apiKey: string;
  baseUrl?: string;
  modelName: string;
}

export interface UserConstraints {
  skills: string;
  time: string;
  budget: string;
  risk: 'conservative' | 'moderate' | 'aggressive';
  goals: string;
}

export interface Idea {
  id: string;
  title: string;
  targetAudience: string;
  problemSolved: string;
  monetization: string;
  pros: string[];
  risks: string[];
  isRecommended: boolean;
  recommendationReason: string;
}

export interface GrowthChannel {
  name: string;
  target: string;
  actions: string[];
  costTime: string;
}

export interface RoadmapPhase {
  phase: string;
  tasks: string[];
  metric: string;
}

export interface RiskMitigation {
  risk: string;
  mitigation: string;
}

export interface Blueprint {
  oneLiner: string;
  userPersona: string;
  valueProposition: string;
  productForm: string;
  userJourney: string[];
  monetization: {
    model: string;
    pricing: string;
    revenueCalc: string;
  };
  growth: {
    channels: GrowthChannel[];
  };
  roadmap: RoadmapPhase[];
  risks: RiskMitigation[];
  immediateActions: {
    tomorrow: string[];
    thisWeek: string[];
  };
}

export enum AppStep {
  WELCOME,
  INTAKE,
  ANALYZING_IDEAS,
  IDEA_SELECTION,
  GENERATING_BLUEPRINT,
  BLUEPRINT_VIEW
}