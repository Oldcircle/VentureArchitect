# VentureArchitect AI

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## 🇬🇧 English

**VentureArchitect AI** is your virtual serial entrepreneur and growth consultant. It helps you design realistic, profitable side projects or startup ideas based on your specific resources, skills, and constraints.

### Features

1.  **Personalized Assessment**: Inputs your skills, available time, budget, and risk tolerance.
2.  **Multi-Model Support**: Use Google Gemini, OpenAI (GPT), DeepSeek, Claude, or local Ollama models.
3.  **Market-Driven Ideas**: Generates 3 viable business directions.
4.  **Detailed Blueprint**: Creates a comprehensive "Money-Making Design Document" including:
    *   User Persona & Value Prop
    *   Monetization Model & Revenue Projections
    *   Specific Growth/Marketing Channels
    *   Execution Roadmap
    *   Risk Analysis
    *   Immediate "Next Day" Action Items

### Configuration
You can configure different AI providers by clicking the **Settings** icon in the top right corner.
- **Google Gemini**: Uses the native SDK (requires API Key).
- **OpenAI / DeepSeek / Ollama**: Uses OpenAI-compatible endpoints.
- **Base URL**: If left empty, defaults will be used (e.g., `https://api.openai.com/v1`). For Ollama, use `http://localhost:11434/v1`.

### Tech Stack

*   **Frontend**: React, TypeScript, Tailwind CSS
*   **AI**: Google GenAI SDK + Generic Fetch for OpenAI-compatible APIs
*   **Icons**: Lucide React

### Getting Started

1.  Set your `API_KEY` in the environment (default for Gemini).
2.  Run the application.
3.  Configure your preferred model in the UI.

---

<a name="中文"></a>
## 🇨🇳 中文

**VentureArchitect AI** 是您的虚拟连续创业者和增长顾问。它能根据您具体的技能、时间、预算和风险偏好，为您设计现实可落地、可盈利的副业或创业项目。

### 功能特色

1.  **个性化评估**：录入您的技能、可用时间、资金预算和风险承受能力。
2.  **多模型支持**：支持 Google Gemini, OpenAI (GPT), DeepSeek (深度求索), Claude, 以及本地 Ollama 模型。
3.  **市场导向创意**：生成 3 个可行的商业方向。
4.  **详细执行方案**：生成一份详尽的“赚钱项目设计书”，包含：
    *   用户画像与核心价值
    *   变现模型与收入测算
    *   具体的获客/引流渠道
    *   执行路线图
    *   风险分析与兜底方案
    *   极简启动清单（明天就能做的事）

### 模型配置
点击右上角的 **设置** 图标即可配置不同的 AI 服务商。
- **Google Gemini**: 使用原生 SDK (需要 API Key)。
- **OpenAI / DeepSeek / Ollama**: 使用 OpenAI 兼容接口。
- **Base URL**: 留空将使用默认地址 (如 `https://api.openai.com/v1`)。如使用 Ollama，请填写 `http://localhost:11434/v1`。

### 技术栈

*   **前端**: React, TypeScript, Tailwind CSS
*   **人工智能**: Google GenAI SDK + 通用 Fetch (用于 OpenAI 兼容接口)
*   **图标库**: Lucide React

### 快速开始

1.  在环境变量中设置您的 `API_KEY` (默认为 Gemini 使用)。
2.  运行应用程序。
3.  在界面中配置您偏好的模型服务商。
