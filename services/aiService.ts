import { GoogleGenAI, Type } from "@google/genai";
import { UserConstraints, Idea, Blueprint, Language, ModelConfig } from "../types";

// Schema definitions for OpenAI/DeepSeek compatible providers (JSON Schema)
const IDEA_SCHEMA = {
  type: "object",
  properties: {
    ideas: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          targetAudience: { type: "string" },
          problemSolved: { type: "string" },
          monetization: { type: "string" },
          pros: { type: "array", items: { type: "string" } },
          risks: { type: "array", items: { type: "string" } },
          isRecommended: { type: "boolean" },
          recommendationReason: { type: "string" },
        },
        required: ["id", "title", "targetAudience", "problemSolved", "monetization", "pros", "risks", "isRecommended", "recommendationReason"],
      },
    }
  },
  required: ["ideas"]
};

const BLUEPRINT_SCHEMA = {
  type: "object",
  properties: {
    oneLiner: { type: "string" },
    userPersona: { type: "string" },
    valueProposition: { type: "string" },
    productForm: { type: "string" },
    userJourney: { type: "array", items: { type: "string" } },
    monetization: {
      type: "object",
      properties: {
        model: { type: "string" },
        pricing: { type: "string" },
        revenueCalc: { type: "string" },
      },
      required: ["model", "pricing", "revenueCalc"],
    },
    growth: {
      type: "object",
      properties: {
        channels: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              target: { type: "string" },
              actions: { type: "array", items: { type: "string" } },
              costTime: { type: "string" },
            },
            required: ["name", "target", "actions", "costTime"],
          },
        },
      },
      required: ["channels"],
    },
    roadmap: {
      type: "array",
      items: {
        type: "object",
        properties: {
          phase: { type: "string" },
          tasks: { type: "array", items: { type: "string" } },
          metric: { type: "string" },
        },
        required: ["phase", "tasks", "metric"],
      },
    },
    risks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          risk: { type: "string" },
          mitigation: { type: "string" },
        },
        required: ["risk", "mitigation"],
      },
    },
    immediateActions: {
      type: "object",
      properties: {
        tomorrow: { type: "array", items: { type: "string" } },
        thisWeek: { type: "array", items: { type: "string" } },
      },
      required: ["tomorrow", "thisWeek"],
    },
  },
  required: ["oneLiner", "userPersona", "valueProposition", "productForm", "userJourney", "monetization", "growth", "roadmap", "risks", "immediateActions"],
};

/**
 * Generic Fetch for OpenAI Compatible APIs (DeepSeek, Ollama, OpenAI, etc.)
 */
const fetchOpenAICompatible = async (
  config: ModelConfig, 
  systemPrompt: string, 
  userPrompt: string
) => {
  const apiKey = config.apiKey || ""; // Allow empty if local or handled elsewhere
  const baseUrl = config.baseUrl?.replace(/\/+$/, "") || "https://api.openai.com/v1";
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  // Handle Anthropic specific headers if needed, but keeping it simple for "Compatible" endpoints
  // If provider is 'anthropic', the payload structure is different. 
  // For this implementation, we focus on OpenAI-compatible (DeepSeek/Ollama/OpenAI) 
  // and Google. Anthropic users usually use an OpenAI-compat proxy or we would need specific logic.
  // We will assume 'anthropic' users might supply an OpenAI compatible proxy URL or we use standard logic.
  // NOTE: Direct Anthropic API is NOT OpenAI compatible. We will treat non-google as OpenAI compatible for now.
  
  const body = {
    model: config.modelName,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" }, // Many modern models support this
    temperature: 0.7,
  };

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`API Error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content returned from API");
    
    // Attempt to clean markdown code blocks if present (often returns ```json ... ```)
    const jsonString = content.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("OpenAI Compatible Fetch Error:", error);
    throw error;
  }
};

/**
 * Google GenAI Implementation
 */
const fetchGoogleGenAI = async (config: ModelConfig, systemPrompt: string, userPrompt: string, schema: any) => {
  // Use config API key or fallback to env
  const apiKey = config.apiKey || process.env.API_KEY;
  if (!apiKey) throw new Error("No API Key provided for Google GenAI");

  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: config.modelName,
    contents: userPrompt,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  return JSON.parse(response.text || "{}");
};

// --- Main Exported Functions ---

export const generateBusinessIdeas = async (
  constraints: UserConstraints, 
  language: Language,
  config: ModelConfig
): Promise<Idea[]> => {
  const langInstruction = language === 'zh' 
    ? "IMPORTANT: You MUST output all text values in Simplified Chinese (zh-CN)." 
    : "IMPORTANT: You MUST output all text values in English.";

  const systemPrompt = `
    Role: You are a serial entrepreneur, product manager, and growth expert.
    Task: Based on the user's constraints, generate 3 legitimate, profitable business project directions.
    Requirements:
    1. All ideas must be legal and ethical.
    2. Leverage the user's specific skills.
    3. One idea MUST be selected as the "Best Fit" (isRecommended: true).
    4. ${langInstruction}
    Output JSON only.
  `;

  const userPrompt = `
    User Constraints:
    - Skills/Interests: ${constraints.skills}
    - Available Time: ${constraints.time}
    - Budget: ${constraints.budget}
    - Risk Tolerance: ${constraints.risk}
    - Goals: ${constraints.goals}
  `;

  let result;
  if (config.provider === 'google') {
    // Google SDK requires specific Schema type construction, but we passed raw object.
    // The previous implementation used Type.* helpers. 
    // We will reconstruct the simple schema call for Google to match the new dynamic structure.
    // For simplicity in this adapter, we will use the specific Google implementation from before
    // but adapted to take the dynamic config.
    
    // Re-instantiate generic AI for this request
    const ai = new GoogleGenAI({ apiKey: config.apiKey || process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: config.modelName,
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        // We use the Type helper based schema in the original file, 
        // here we map the generic object to what the SDK expects or let SDK infer if possible.
        // To be safe and strict, we use the raw prompt instruction for JSON if schema fails, 
        // but Google supports Schema objects directly now in many cases.
        // Let's use the explicit Type mapping again for safety as per original code.
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              targetAudience: { type: Type.STRING },
              problemSolved: { type: Type.STRING },
              monetization: { type: Type.STRING },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              risks: { type: Type.ARRAY, items: { type: Type.STRING } },
              isRecommended: { type: Type.BOOLEAN },
              recommendationReason: { type: Type.STRING },
            },
            required: ["id", "title", "targetAudience", "problemSolved", "monetization", "pros", "risks", "isRecommended", "recommendationReason"],
          },
        },
      },
    });
    return JSON.parse(response.text || "[]");
  } else {
    // OpenAI Compatible
    result = await fetchOpenAICompatible(config, systemPrompt, userPrompt);
    // Handle structure difference: OpenAI 'ideas' wrapper vs Google Array
    return Array.isArray(result) ? result : (result.ideas || []);
  }
};

export const generateProjectBlueprint = async (
  idea: Idea, 
  constraints: UserConstraints, 
  language: Language,
  config: ModelConfig
): Promise<Blueprint> => {
  const langInstruction = language === 'zh' 
    ? "IMPORTANT: You MUST output all text values in Simplified Chinese (zh-CN)." 
    : "IMPORTANT: You MUST output all text values in English.";

  const systemPrompt = `
    Role: You are a serial entrepreneur and execution expert.
    Task: Create a detailed "Money-Making Project Design Document".
    Requirements:
    - Be extremely specific and actionable.
    - Growth channels must be concrete.
    - "Immediate Actions" must be doable tomorrow.
    - ${langInstruction}
    Output JSON only.
  `;

  const userPrompt = `
    Selected Idea: ${idea.title} - ${idea.problemSolved}
    User Context: ${JSON.stringify(constraints)}
  `;

  if (config.provider === 'google') {
    const ai = new GoogleGenAI({ apiKey: config.apiKey || process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: config.modelName, // e.g. gemini-3-pro-preview
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            oneLiner: { type: Type.STRING },
            userPersona: { type: Type.STRING },
            valueProposition: { type: Type.STRING },
            productForm: { type: Type.STRING },
            userJourney: { type: Type.ARRAY, items: { type: Type.STRING } },
            monetization: {
              type: Type.OBJECT,
              properties: {
                model: { type: Type.STRING },
                pricing: { type: Type.STRING },
                revenueCalc: { type: Type.STRING },
              },
              required: ["model", "pricing", "revenueCalc"],
            },
            growth: {
              type: Type.OBJECT,
              properties: {
                channels: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      target: { type: Type.STRING },
                      actions: { type: Type.ARRAY, items: { type: Type.STRING } },
                      costTime: { type: Type.STRING },
                    },
                    required: ["name", "target", "actions", "costTime"],
                  },
                },
              },
              required: ["channels"],
            },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                  metric: { type: Type.STRING },
                },
                required: ["phase", "tasks", "metric"],
              },
            },
            risks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  risk: { type: Type.STRING },
                  mitigation: { type: Type.STRING },
                },
                required: ["risk", "mitigation"],
              },
            },
            immediateActions: {
              type: Type.OBJECT,
              properties: {
                tomorrow: { type: Type.ARRAY, items: { type: Type.STRING } },
                thisWeek: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["tomorrow", "thisWeek"],
            },
          },
          required: ["oneLiner", "userPersona", "valueProposition", "productForm", "userJourney", "monetization", "growth", "roadmap", "risks", "immediateActions"],
        },
      },
    });
    return JSON.parse(response.text || "{}");
  } else {
    return await fetchOpenAICompatible(config, systemPrompt, userPrompt);
  }
};