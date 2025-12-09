import { Language } from './types';

export const translations = {
  en: {
    welcome: {
      title: "VentureArchitect AI",
      subtitle: "I am your virtual Serial Entrepreneur & Growth Lead. My goal is to help you design a realistic, profitable project that you can actually execute.",
      noVague: "No vague concepts. Just actionable plans based on your specific resources.",
      marketDriven: "Market Driven",
      marketDrivenDesc: "Validated patterns, not just random ideas.",
      execution: "Execution Focused",
      executionDesc: "Detailed roadmap from Day 1 to First Dollar.",
      riskAware: "Risk Aware",
      riskAwareDesc: "Plans tailored to your specific risk tolerance.",
      start: "Start Assessment"
    },
    intake: {
      title: "Your Resources",
      subtitle: "I need to know your \"ammunition\" before designing the battle plan. Be specific.",
      skills: "Skills & Interests",
      skillsPlace: "e.g., Python programming, graphic design, good at writing, know about fitness...",
      time: "Time Commitment",
      timePlace: "e.g., 2 hours every evening, Full-time...",
      budget: "Budget",
      budgetPlace: "e.g., $0, $1000, $10k...",
      risk: "Risk Tolerance",
      riskLevels: {
        conservative: "Conservative",
        moderate: "Moderate",
        aggressive: "Aggressive"
      },
      goals: "Goals",
      goalsPlace: "e.g., First $100 in 1 month, Scale to $5k/mo in 6 months...",
      submit: "Analyze & Generate Directions"
    },
    selection: {
      title: "Proposed Directions",
      subtitle: "Based on your profile, here are 3 potential paths. I've highlighted the one that offers the best balance of risk/reward for you.",
      targetAudience: "Target Audience",
      problemSolved: "Problem Solved",
      monetization: "Monetization",
      pros: "Pros",
      risks: "Risks",
      recommended: "Recommended",
      selectBtn: "Select This Direction"
    },
    blueprint: {
      whoWhy: "Who & Why",
      targetPersona: "Target Persona",
      valueProp: "Value Proposition",
      userJourney: "User Journey",
      step: "Step",
      growth: "Growth Strategy",
      target: "Target",
      economics: "Economics",
      pricing: "Pricing",
      potential: "Potential",
      roadmap: "Roadmap",
      risks: "Risk & Mitigation",
      immediateAction: "Your Immediate Action Plan",
      tomorrow: "Tomorrow (2 Hours)",
      thisWeek: "This Week",
      startOver: "Start Over"
    },
    loading: {
      analyzing: "Analyzing...",
      marketGaps: "Identifying market gaps based on your skills...",
      drafting: "Drafting execution roadmap and revenue models..."
    },
    nav: {
      poweredBy: "Powered by AI",
      settings: "Settings",
      configureModel: "Configure AI Model"
    },
    settings: {
      title: "Configure AI Model",
      configList: "Config List",
      configName: "Config Name",
      provider: "Provider",
      apiKey: "API Key",
      apiKeyPlaceholder: "Leave empty to use environment variable if set",
      baseUrl: "API Address (Base URL)",
      baseUrlPlaceholder: "https://api.example.com/v1",
      modelName: "Model Name",
      save: "Save & Close",
      cancel: "Cancel",
      delete: "Delete",
      createNew: "Create New",
      defaultUrlNote: "Leave empty to use default provider URL"
    }
  },
  zh: {
    welcome: {
      title: "VentureArchitect AI",
      subtitle: "我是你的虚拟连续创业者兼增长负责人。我的目标是帮你设计一个现实可落地、可赚钱的项目方案。",
      noVague: "拒绝假大空的概念，只提供基于你现有资源的实战计划。",
      marketDriven: "市场导向",
      marketDrivenDesc: "基于验证过的商业模式，而非随机创意。",
      execution: "注重执行",
      executionDesc: "从第1天到第1笔收入的详细路线图。",
      riskAware: "风险把控",
      riskAwareDesc: "根据你的风险承受能力量身定制。",
      start: "开始评估"
    },
    intake: {
      title: "盘点资源",
      subtitle: "在设计作战计划之前，我需要了解你的“弹药库”。请尽量具体。",
      skills: "擅长/感兴趣的领域",
      skillsPlace: "例如：Python编程、平面设计、擅长写作、健身达人...",
      time: "可投入时间",
      timePlace: "例如：每晚 2 小时、全职投入...",
      budget: "资金预算",
      budgetPlace: "例如：0元、1000元、1万元...",
      risk: "风险接受度",
      riskLevels: {
        conservative: "保守",
        moderate: "中等",
        aggressive: "激进"
      },
      goals: "目标周期",
      goalsPlace: "例如：1个月内赚到第1笔钱，6个月达到月入5千...",
      submit: "分析并生成方向"
    },
    selection: {
      title: "建议方向",
      subtitle: "基于你的情况，我为你规划了3个潜在方向。我已经标注了性价比最高、最适合你的那个。",
      targetAudience: "目标客户",
      problemSolved: "解决问题",
      monetization: "变现方式",
      pros: "优点",
      risks: "风险",
      recommended: "推荐选择",
      selectBtn: "选择这个方向"
    },
    blueprint: {
      whoWhy: "用户与价值",
      targetPersona: "目标用户画像",
      valueProp: "核心价值主张",
      userJourney: "用户使用路径",
      step: "第N步",
      growth: "获客方案",
      target: "触达对象",
      economics: "变现模型",
      pricing: "价格区间",
      potential: "收入测算",
      roadmap: "执行路线图",
      risks: "风险与兜底",
      immediateAction: "极简启动清单",
      tomorrow: "明天 (2小时内)",
      thisWeek: "本周任务",
      startOver: "重新开始"
    },
    loading: {
      analyzing: "分析中...",
      marketGaps: "正在根据你的特长识别市场机会...",
      drafting: "正在起草执行路线图和营收模型..."
    },
    nav: {
      poweredBy: "由 AI 驱动",
      settings: "设置",
      configureModel: "配置 AI 模型"
    },
    settings: {
      title: "配置 AI 模型",
      configList: "配置列表",
      configName: "配置名称",
      provider: "服务商",
      apiKey: "API 密钥",
      apiKeyPlaceholder: "留空以使用默认环境变量 (若已配置)",
      baseUrl: "API 地址 (Base URL)",
      baseUrlPlaceholder: "https://api.example.com/v1",
      modelName: "模型名称",
      save: "保存并关闭",
      cancel: "取消",
      delete: "删除",
      createNew: "新建配置",
      defaultUrlNote: "留空以使用服务商默认地址"
    }
  }
};