import { toast } from 'sonner';
import SmartTemplateEngine, { SMART_TEMPLATES } from './smartTemplates';

// Advanced AI Model Configuration
interface AIModel {
  id: string;
  name: string;
  provider: string;
  strengths: string[];
  costPerToken: number;
  maxTokens: number;
  temperature: number;
  useCase: 'general' | 'creative' | 'analytical' | 'technical' | 'strategic';
}

const AI_MODELS: AIModel[] = [
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    strengths: ['reasoning', 'analysis', 'structured-thinking'],
    costPerToken: 0.000003,
    maxTokens: 200000,
    temperature: 0.7,
    useCase: 'analytical'
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    strengths: ['creativity', 'diverse-knowledge', 'problem-solving'],
    costPerToken: 0.000005,
    maxTokens: 128000,
    temperature: 0.8,
    useCase: 'creative'
  },
  {
    id: 'meta-llama/llama-3.1-405b-instruct',
    name: 'Llama 3.1 405B',
    provider: 'Meta',
    strengths: ['logical-reasoning', 'technical-depth', 'systematic-analysis'],
    costPerToken: 0.000003,
    maxTokens: 128000,
    temperature: 0.6,
    useCase: 'technical'
  },
  {
    id: 'mistralai/mixtral-8x7b-instruct',
    name: 'Mixtral 8x7B',
    provider: 'Mistral',
    strengths: ['efficiency', 'multilingual', 'business-analysis'],
    costPerToken: 0.0000007,
    maxTokens: 32000,
    temperature: 0.7,
    useCase: 'general'
  },
  {
    id: 'google/gemini-pro-1.5',
    name: 'Gemini Pro 1.5',
    provider: 'Google',
    strengths: ['strategic-thinking', 'data-analysis', 'innovation'],
    costPerToken: 0.000002,
    maxTokens: 128000,
    temperature: 0.8,
    useCase: 'strategic'
  }
];

// Advanced Domain Analysis
interface DomainProfile {
  name: string;
  keywords: string[];
  aiModel: string;
  specialPrompts: boolean;
  complexityMultiplier: number;
  focusAreas: string[];
}

const DOMAIN_PROFILES: DomainProfile[] = [
  {
    name: 'business-strategy',
    keywords: ['business', 'strategy', 'market', 'revenue', 'growth', 'competitive', 'startup', 'enterprise'],
    aiModel: 'google/gemini-pro-1.5',
    specialPrompts: true,
    complexityMultiplier: 1.4,
    focusAreas: ['market-analysis', 'strategic-planning', 'competitive-advantage', 'revenue-optimization']
  },
  {
    name: 'technology-innovation',
    keywords: ['ai', 'technology', 'software', 'innovation', 'digital', 'platform', 'development', 'tech'],
    aiModel: 'meta-llama/llama-3.1-405b-instruct',
    specialPrompts: true,
    complexityMultiplier: 1.6,
    focusAreas: ['architecture', 'implementation', 'scalability', 'security', 'performance']
  },
  {
    name: 'creative-design',
    keywords: ['design', 'creative', 'brand', 'visual', 'aesthetic', 'user experience', 'marketing', 'content'],
    aiModel: 'openai/gpt-4o',
    specialPrompts: true,
    complexityMultiplier: 1.2,
    focusAreas: ['user-experience', 'visual-design', 'brand-identity', 'creative-process']
  },
  {
    name: 'analytical-research',
    keywords: ['research', 'analysis', 'data', 'science', 'methodology', 'framework', 'systematic', 'evidence'],
    aiModel: 'anthropic/claude-3.5-sonnet',
    specialPrompts: true,
    complexityMultiplier: 1.5,
    focusAreas: ['methodology', 'data-analysis', 'systematic-approach', 'evidence-based']
  },
  {
    name: 'project-management',
    keywords: ['project', 'management', 'planning', 'execution', 'team', 'delivery', 'process', 'workflow'],
    aiModel: 'mistralai/mixtral-8x7b-instruct',
    specialPrompts: true,
    complexityMultiplier: 1.3,
    focusAreas: ['planning', 'execution', 'team-coordination', 'risk-management']
  }
];

// Advanced Quality Scoring
interface QualityMetrics {
  relevance: number;
  depth: number;
  actionability: number;
  interconnectedness: number;
  innovation: number;
  overall: number;
}

interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface GeneratedNode {
  id: string;
  label: string;
  category: string;
  color: string;
  description?: string;
  importance: number; // 1-10 scale
  connections: string[]; // IDs of nodes this should connect to
  position: { x: number; y: number };
    metadata: {
      isFundamental: boolean;
      complexity: number;
      parentConcept?: string;
      suggestedBranches?: string[];
      aiGenerated?: boolean;
      fallbackGenerated?: boolean;
      branchGenerated?: boolean;
      model?: string;
      implementationDifficulty?: string;
      strategicValue?: string;
      knowledgeDomain?: string;
      prerequisites?: string[];
      outcomes?: string[];
      topicRelevance?: string;
      generatedAt?: string;
      realWorldApplication?: string;
      timeframe?: string;
      resourceRequirements?: string[];
      successMetrics?: string[];
      riskFactors?: string[];
      industryBenchmarks?: string[];
    };
}

interface FundamentalNode {
  id: string;
  label: string;
  importance: number;
  centralityScore: number;
  connectionCount: number;
  conceptualWeight: number;
}

class AIService {
  private currentModel: string = 'mistralai/mixtral-8x7b-instruct';
  private apiKey: string = '';
  private baseUrl: string = 'https://openrouter.ai/api/v1';
  private isConfiguredFlag: boolean = false;
  private requestCount: number = 0;
  private lastRequestTime: number = 0;
  private qualityHistory: QualityMetrics[] = [];

  constructor() {
    this.loadConfiguration();
  }

  private loadConfiguration() {
    this.apiKey = 'ee05P0TpvlnWXugQjO3ODNRfM6PInBw5';
    this.isConfiguredFlag = !!this.apiKey;
    console.log('🤖 Advanced AI Service initialized with multi-model intelligence');
    console.log('🔑 API Key configured:', this.apiKey ? 'YES' : 'NO');
    console.log('📡 Service status:', this.isConfiguredFlag ? 'READY' : 'NOT CONFIGURED');
  }

  // Advanced Model Selection Intelligence
  private selectOptimalModel(topic: string, context: any = {}): AIModel {
    // Force Mixtral for all topics
    return AI_MODELS.find(m => m.id === 'mistralai/mixtral-8x7b-instruct')!;
  }

  private analyzeDomain(topic: string): string {
    const topicLower = topic.toLowerCase();
    let bestMatch = 'general';
    let bestScore = 0;
    
    for (const profile of DOMAIN_PROFILES) {
      const score = profile.keywords.reduce((acc, keyword) => {
        return acc + (topicLower.includes(keyword) ? 1 : 0);
      }, 0) / profile.keywords.length;
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = profile.name;
      }
    }
    
    console.log(`🔍 Domain analysis: ${bestMatch} (confidence: ${(bestScore * 100).toFixed(1)}%)`);
    return bestMatch;
  }

  private assessComplexity(topic: string, context: any): number {
    const factors = [
      topic.length > 50 ? 0.2 : 0,
      (topic.match(/\band\b|\bor\b|\bwith\b/g) || []).length * 0.1,
      context.depth === 'comprehensive' ? 0.3 : 0,
      context.audience === 'expert' ? 0.2 : 0,
      (topic.match(/\b(strategy|framework|methodology|architecture|optimization)\b/g) || []).length * 0.1
    ];
    
    return Math.min(factors.reduce((a, b) => a + b, 0), 1);
  }

  // Enhanced Quality Assessment
  private assessQuality(nodes: GeneratedNode[], centralTopic: string): QualityMetrics {
    const relevance = this.calculateRelevance(nodes, centralTopic);
    const depth = this.calculateDepth(nodes);
    const actionability = this.calculateActionability(nodes);
    const interconnectedness = this.calculateInterconnectedness(nodes);
    const innovation = this.calculateInnovation(nodes);
    
    const overall = (relevance + depth + actionability + interconnectedness + innovation) / 5;
    
    const metrics: QualityMetrics = {
      relevance,
      depth,
      actionability,
      interconnectedness,
      innovation,
      overall
    };
    
    this.qualityHistory.push(metrics);
    console.log(`📊 Quality Assessment: ${(overall * 100).toFixed(1)}% overall`);
    
    return metrics;
  }

  private calculateRelevance(nodes: GeneratedNode[], centralTopic: string): number {
    const topicWords = centralTopic.toLowerCase().split(' ');
    let relevanceSum = 0;
    
    nodes.forEach(node => {
      const nodeText = (node.label + ' ' + (node.description || '')).toLowerCase();
      const matches = topicWords.filter(word => nodeText.includes(word));
      relevanceSum += matches.length / topicWords.length;
    });
    
    return Math.min(relevanceSum / nodes.length, 1);
  }

  private calculateDepth(nodes: GeneratedNode[]): number {
    const avgDescriptionLength = nodes.reduce((sum, node) => 
      sum + (node.description?.length || 0), 0) / nodes.length;
    const avgComplexity = nodes.reduce((sum, node) => 
      sum + (node.metadata.complexity || 5), 0) / nodes.length;
    
    return Math.min((avgDescriptionLength / 100 + avgComplexity / 10) / 2, 1);
  }

  private calculateActionability(nodes: GeneratedNode[]): number {
    const actionWords = ['implement', 'execute', 'develop', 'create', 'build', 'analyze', 'optimize', 'strategy', 'framework'];
    let actionableCount = 0;
    
    nodes.forEach(node => {
      const text = (node.label + ' ' + (node.description || '')).toLowerCase();
      if (actionWords.some(word => text.includes(word))) {
        actionableCount++;
      }
    });
    
    return actionableCount / nodes.length;
  }

  private calculateInterconnectedness(nodes: GeneratedNode[]): number {
    const totalConnections = nodes.reduce((sum, node) => sum + node.connections.length, 0);
    const maxPossibleConnections = nodes.length * (nodes.length - 1);
    return maxPossibleConnections > 0 ? totalConnections / maxPossibleConnections : 0;
  }

  private calculateInnovation(nodes: GeneratedNode[]): number {
    const innovationWords = ['innovative', 'creative', 'novel', 'advanced', 'cutting-edge', 'breakthrough', 'disruptive'];
    let innovativeCount = 0;
    
    nodes.forEach(node => {
      const text = (node.label + ' ' + (node.description || '')).toLowerCase();
      if (innovationWords.some(word => text.includes(word))) {
        innovativeCount++;
      }
    });
    
    return innovativeCount / nodes.length;
  }

  private async callOpenRouter(messages: OpenRouterMessage[], temperature: number = 0.7, model?: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key not configured');
    }
    this.requestCount++;
    this.lastRequestTime = Date.now();
    let lastError = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const selectedModel = 'mistralai/mixtral-8x7b-instruct';
        console.log(`🚀 Making API call to ${selectedModel}`);
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://mindmap.ai',
            'X-Title': 'NOV8 Mind Mapping AI Pro'
          },
          body: JSON.stringify({
            model: selectedModel,
            messages,
            temperature,
            max_tokens: 4000,
            stream: false,
            top_p: 0.9,
            frequency_penalty: 0.1,
            presence_penalty: 0.1
          })
        });
        if (!response.ok) {
          const errorData = await response.text();
          console.warn(`❌ API Error: ${response.status} - ${errorData}`);
          if (response.status === 402) {
            throw new Error('INSUFFICIENT_CREDITS');
          } else if (response.status === 429) {
            throw new Error('RATE_LIMITED');
          }
          throw new Error(`API request failed: ${response.status}`);
        }
        const data = await response.json();
        return data.choices[0]?.message?.content || '';
      } catch (error) {
        lastError = error;
        console.error('OpenRouter request failed (attempt ' + (attempt + 1) + '):', error);
        await new Promise(res => setTimeout(res, 1000 * (attempt + 1)));
      }
    }
    throw lastError || new Error('OpenRouter API failed after 3 attempts');
  }

  // Public methods
  isConfigured(): boolean {
    return this.isConfiguredFlag;
  }

  getCurrentModel(): string {
    return this.currentModel;
  }

  setModel(model: string): void {
    this.currentModel = model;
    console.log(`🔄 Switched to ${model}`);
  }

  getAvailableModels(): AIModel[] {
    return AI_MODELS;
  }

  getQualityMetrics(): QualityMetrics[] {
    return this.qualityHistory;
  }

  getStatus() {
    return {
      configured: this.isConfiguredFlag,
      model: this.currentModel,
      requestCount: this.requestCount,
      available: true,
      qualityScore: this.qualityHistory.length > 0 ? 
        this.qualityHistory[this.qualityHistory.length - 1].overall : 0
    };
  }

  async generateIntelligentNodes(
    centralTopic: string, 
    existingNodes: any[], 
    context: {
      domain?: string;
      purpose?: string;
      audience?: string;
      depth?: number;
      recursionDepth?: number;
      maxDepth?: number;
    } = {}
  ): Promise<GeneratedNode[]> {
    console.log(`🧠 Generating SPECIFIC intelligent nodes for: "${centralTopic}"`);
    
    // Skip template matching - force AI generation for specificity
    const optimalModel = this.selectOptimalModel(centralTopic, context);
    const domainProfile = DOMAIN_PROFILES.find(p => p.name === this.analyzeDomain(centralTopic));
    
    console.log(`🎯 Using ${optimalModel.name} for maximum relevance to "${centralTopic}"`);
    
    try {
      const systemPrompt = `You are NOV8 AI Pro - the world's most advanced mind mapping specialist. Your CRITICAL MISSION is to analyze the specific topic "${centralTopic}" and generate HIGHLY RELEVANT, TOPIC-SPECIFIC nodes that directly address this exact subject.

🎯 ABSOLUTE REQUIREMENT: Every single node MUST be specifically about "${centralTopic}" - NO generic terms allowed!

TOPIC-SPECIFIC ANALYSIS PROTOCOL:
1. ANALYZE "${centralTopic}" for its core components, sub-topics, and related concepts
2. IDENTIFY the specific domain knowledge areas that directly relate to this topic
3. GENERATE nodes that someone researching "${centralTopic}" would find immediately valuable
4. CREATE detailed descriptions that demonstrate deep understanding of "${centralTopic}"
5. ESTABLISH meaningful connections based on how concepts relate within "${centralTopic}"

CONTENT REQUIREMENTS:
- Each node title must include specific terminology related to "${centralTopic}"
- Descriptions must demonstrate expertise in the subject matter of "${centralTopic}"
- No generic words like "Overview", "Introduction", "Basics" - be specific to the topic
- Include real-world applications, methodologies, and frameworks specific to "${centralTopic}"
- Reference industry standards, tools, and practices relevant to "${centralTopic}"

OUTPUT FORMAT: Return ONLY a valid JSON array with no explanations.`;

      const existingContext = existingNodes.length > 0 
        ? `Existing knowledge: ${existingNodes.map(n => n.data?.label || n.label).slice(0, 6).join(', ')}`
        : 'Building comprehensive knowledge base';

      const userPrompt = `SPECIFIC TOPIC ANALYSIS: "${centralTopic}"

ANALYSIS REQUIREMENTS:
Generate 16-32 nodes that are EXCLUSIVELY about "${centralTopic}". Each node must pass this test: "Is this specifically about ${centralTopic} and would an expert in ${centralTopic} find this valuable?"

CONTEXT:
- Domain: ${context.domain || 'Comprehensive coverage'}
- Purpose: ${context.purpose || 'Expert-level understanding'}
- Depth Level: ${context.depth || 'Professional expertise'}
- Current State: ${existingContext}

SPECIFIC NODE GENERATION RULES:

FOUNDATIONAL NODES (6-8 nodes, importance 8-10):
Create nodes about the core principles, methodologies, or frameworks that define "${centralTopic}". Each must be specific to this topic with detailed implementation information.

STRATEGIC NODES (6-12 nodes, importance 6-8): 
Generate nodes about specific approaches, strategies, or processes within "${centralTopic}". Include practical implementation details and real-world applications.

TACTICAL NODES (6-12 nodes, importance 4-6):
Create nodes about specific tools, techniques, or methods used in "${centralTopic}". Include concrete examples and measurable outcomes.

JSON STRUCTURE (generate 16-32 nodes):
[{
  "id": "specific-${centralTopic.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-[index]",
  "label": "[Specific aspect of ${centralTopic}] - [Detailed focus area]",
  "category": "[domain-specific-category-for-${centralTopic}]",
  "color": "hsl([topic-appropriate-hue], 70%, 55%)",
  "description": "Comprehensive 200-300 word description specifically about this aspect of ${centralTopic}. Include specific methodologies, frameworks, tools, metrics, implementation approaches, industry best practices, measurable outcomes, and real-world applications. Reference actual techniques, standards, or approaches used in ${centralTopic}. Provide actionable insights that demonstrate deep expertise.",
  "importance": [1-10 based on relevance to ${centralTopic}],
  "connections": ["[specific-related-aspect-1]", "[specific-related-aspect-2]"],
  "position": {"x": [calculated], "y": [calculated]},
  "metadata": {
    "isFundamental": [true for core concepts],
    "complexity": [1-10],
    "parentConcept": "${centralTopic}",
    "suggestedBranches": ["[specific-sub-area-1]", "[specific-sub-area-2]"],
    "aiGenerated": true,
    "topicRelevance": "direct",
    "implementationDifficulty": "[specific to ${centralTopic}]",
    "strategicValue": "[value within ${centralTopic} context]",
    "knowledgeDomain": "${centralTopic}",
    "prerequisites": ["[specific prerequisites for ${centralTopic}]"],
    "outcomes": ["[specific outcomes in ${centralTopic}]"],
    "realWorldApplication": "[how this applies in ${centralTopic}]"
  }
}]

CRITICAL SUCCESS CRITERIA:
- Every node title must contain specific terminology related to "${centralTopic}"
- Every description must demonstrate deep understanding of "${centralTopic}"
- No generic or placeholder content - everything must be topic-specific
- Connections must represent real relationships within "${centralTopic}"
- Generate content that would satisfy an expert asking: "Show me everything specific to ${centralTopic}"`;

      console.log(`🚀 Making API call with topic-specific prompts for "${centralTopic}"`);
      
      const response = await this.callOpenRouter([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], optimalModel.temperature, optimalModel.id);

      console.log(`📥 Received AI response, parsing for "${centralTopic}" content...`);

      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.error('❌ No valid JSON from AI response, forcing specific fallback');
        return this.generateTopicSpecificFallback(centralTopic, context);
      }

      let generatedNodes: GeneratedNode[];
      try {
        generatedNodes = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('❌ JSON parse error, using specific fallback:', parseError);
        return this.generateTopicSpecificFallback(centralTopic, context);
      }

      // Validate content is actually about the topic
      const validatedNodes = this.validateTopicRelevance(generatedNodes, centralTopic);
      
      if (validatedNodes.length < 6) {
        console.warn('⚠️ Too few topic-specific nodes generated, supplementing...');
        const supplementalNodes = this.generateTopicSpecificFallback(centralTopic, context);
        validatedNodes.push(...supplementalNodes.slice(0, 8 - validatedNodes.length));
      }

      console.log(`✅ Generated ${validatedNodes.length} topic-specific nodes for "${centralTopic}"`);
      
      // Enhanced validation and positioning
      const finalNodes = this.enhanceTopicSpecificNodes(validatedNodes, centralTopic);
      
      // Quality assessment
      const qualityMetrics = this.assessQuality(finalNodes, centralTopic);
      
      toast.success(`🎯 Generated ${finalNodes.length} nodes for "${centralTopic}"`, {
        description: `Topic Relevance: ${(qualityMetrics.relevance * 100).toFixed(1)}% • Quality: ${(qualityMetrics.overall * 100).toFixed(1)}%`
      });
      
      // Set up automatic branching for fundamental nodes
      const fundamentalNodes = finalNodes.filter(node => node.metadata.isFundamental);
      if (fundamentalNodes.length > 0) {
        console.log(`🌿 Scheduling topic-specific branching for ${fundamentalNodes.length} nodes`);
        setTimeout(() => {
          this.triggerAutomaticBranching(fundamentalNodes);
        }, 2000);
      }
      
      // After generating nodes and before returning, recursively generate branches for fundamentals if not at max depth
      const recursionDepth = context.recursionDepth || 0;
      const maxDepth = context.maxDepth || 3;
      if (recursionDepth < maxDepth) {
        for (const fundamental of fundamentalNodes) {
          // Avoid infinite loops by tracking visited topics
          if (!existingNodes.some(n => n.label === fundamental.label)) {
            const branchNodes = await this.generateIntelligentNodes(
              fundamental.label,
              [...existingNodes, ...finalNodes],
              { ...context, recursionDepth: recursionDepth + 1, maxDepth }
            );
            finalNodes.push(...branchNodes);
          }
        }
      }
      
      return finalNodes;
      
    } catch (error) {
      console.error('❌ AI generation failed completely:', error);
      toast.error(`Failed to generate AI content for "${centralTopic}". Using advanced fallback.`);
      // Use a more robust fallback: generate more nodes, add more detail, and randomize content
      let fallbackNodes = this.generateTopicSpecificFallback(centralTopic, context);
      // If fallback is too basic, add more nodes with unique details
      if (fallbackNodes.length < 12) {
        const extraNodes = Array.from({ length: 16 - fallbackNodes.length }, (_, i) => ({
          id: `fallback-${centralTopic.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${i}`,
          label: `${centralTopic} - Unique Aspect ${i + 1}`,
          category: `fallback-category-${i % 4}`,
          color: `hsl(${(i * 30) % 360}, 70%, 55%)`,
          description: `Detailed fallback node for ${centralTopic}, aspect ${i + 1}. This node is generated as a backup and should be replaced with real AI content when available.`,
          importance: 4 + (i % 6),
          connections: [],
          position: { x: 0, y: 0 },
          metadata: {
            isFundamental: i < 4,
            complexity: 5 + (i % 5),
            parentConcept: centralTopic,
            suggestedBranches: [],
            aiGenerated: false,
            topicRelevance: 'fallback',
            implementationDifficulty: 'unknown',
            strategicValue: 'fallback',
            knowledgeDomain: centralTopic,
            prerequisites: [],
            outcomes: [],
            realWorldApplication: '',
          }
        }));
        fallbackNodes = [...fallbackNodes, ...extraNodes];
      }
      return fallbackNodes;
    }
  }

  // New method to validate topic relevance
  private validateTopicRelevance(nodes: GeneratedNode[], centralTopic: string): GeneratedNode[] {
    const topicWords = centralTopic.toLowerCase().split(' ');
    
    return nodes.filter(node => {
      const nodeText = (node.label + ' ' + (node.description || '')).toLowerCase();
      
      // Check if node contains topic-specific terminology
      const hasTopicWords = topicWords.some(word => 
        word.length > 2 && nodeText.includes(word)
      );
      
      // Check for generic terms that indicate non-specific content
      const genericTerms = ['overview', 'introduction', 'basics', 'general', 'generic', 'simple'];
      const hasGenericTerms = genericTerms.some(term => 
        node.label.toLowerCase().includes(term)
      );
      
      return hasTopicWords && !hasGenericTerms;
    });
  }

  // Enhanced topic-specific node enhancement
  private enhanceTopicSpecificNodes(nodes: GeneratedNode[], centralTopic: string): GeneratedNode[] {
    return nodes.map((node, index) => ({
      ...node,
      id: node.id || `specific-${centralTopic.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${index}`,
      importance: Math.max(1, Math.min(10, node.importance || 5)),
      connections: node.connections || [],
      position: node.position || {
        x: 800 + (index % 4) * 300 + (Math.random() - 0.5) * 50,
        y: 300 + Math.floor(index / 4) * 220 + (Math.random() - 0.5) * 40
      },
      metadata: {
        ...node.metadata,
        isFundamental: node.metadata?.isFundamental || node.importance >= 8,
        complexity: node.metadata?.complexity || Math.ceil(node.importance / 1.5),
        parentConcept: centralTopic,
        aiGenerated: true,
        topicRelevance: 'direct',
        generatedAt: new Date().toISOString(),
        model: this.currentModel.split('/')[1] || 'advanced-ai'
      }
    }));
  }

  // New topic-specific fallback that generates relevant content
  private generateTopicSpecificFallback(centralTopic: string, context: any): GeneratedNode[] {
    console.log(`🔧 Generating topic-specific fallback for: "${centralTopic}"`);
    
    const nodes: GeneratedNode[] = [];
    const topicSlug = centralTopic.toLowerCase().replace(/\s+/g, '-');
    
    // Analyze topic for specific domain knowledge
    const topicAnalysis = this.analyzeTopicDomain(centralTopic);
    
    // Generate nodes based on topic analysis
    topicAnalysis.aspects.forEach((aspect, index) => {
      nodes.push({
        id: `fallback-${topicSlug}-${Date.now()}-${index}`,
        label: `${aspect.title} in ${centralTopic}`,
        category: topicAnalysis.primaryDomain,
        color: aspect.color,
        description: `${aspect.description} This is specifically relevant to ${centralTopic} and includes practical implementation approaches, industry best practices, and measurable outcomes. Understanding this aspect is crucial for success in ${centralTopic}.`,
        importance: aspect.importance,
        connections: [],
        position: {
          x: 800 + (index % 4) * 280,
          y: 300 + Math.floor(index / 4) * 200
        },
        metadata: {
          isFundamental: aspect.importance >= 8,
          complexity: Math.ceil(aspect.importance / 1.5),
          parentConcept: centralTopic,
          suggestedBranches: aspect.branches,
          aiGenerated: false,
          fallbackGenerated: true,
          topicRelevance: 'direct'
        }
      });
    });
    
    return nodes;
  }

  // Analyze topic to determine specific domain knowledge areas
  private analyzeTopicDomain(centralTopic: string) {
    const topicLower = centralTopic.toLowerCase();
    
    // Business/Strategy topics
    if (topicLower.includes('business') || topicLower.includes('strategy') || topicLower.includes('startup')) {
      return {
        primaryDomain: 'Business Strategy',
        aspects: [
          { title: 'Strategic Framework', description: 'Core strategic planning methodologies', importance: 9, color: 'hsl(220, 70%, 60%)', branches: ['Planning', 'Execution', 'Metrics'] },
          { title: 'Market Analysis', description: 'Competitive landscape and market positioning', importance: 8, color: 'hsl(200, 70%, 60%)', branches: ['Research', 'Positioning', 'Competitive Analysis'] },
          { title: 'Revenue Model', description: 'Monetization strategies and revenue streams', importance: 8, color: 'hsl(180, 70%, 60%)', branches: ['Pricing', 'Sales Strategy', 'Growth'] },
          { title: 'Operational Excellence', description: 'Process optimization and efficiency', importance: 7, color: 'hsl(160, 70%, 60%)', branches: ['Processes', 'Automation', 'Quality'] }
        ]
      };
    }
    
    // Technology topics
    if (topicLower.includes('ai') || topicLower.includes('technology') || topicLower.includes('software') || topicLower.includes('digital')) {
      return {
        primaryDomain: 'Technology',
        aspects: [
          { title: 'Architecture Design', description: 'System architecture and technical foundations', importance: 9, color: 'hsl(260, 70%, 60%)', branches: ['Design Patterns', 'Scalability', 'Security'] },
          { title: 'Implementation Strategy', description: 'Development methodologies and implementation', importance: 8, color: 'hsl(240, 70%, 60%)', branches: ['Development', 'Testing', 'Deployment'] },
          { title: 'Performance Optimization', description: 'Efficiency and performance enhancement', importance: 7, color: 'hsl(220, 70%, 60%)', branches: ['Monitoring', 'Optimization', 'Scaling'] },
          { title: 'Security Framework', description: 'Security protocols and risk management', importance: 8, color: 'hsl(200, 70%, 60%)', branches: ['Authentication', 'Authorization', 'Compliance'] }
        ]
      };
    }
    
    // Default/General topics - still make them specific
    return {
      primaryDomain: 'Knowledge Domain',
      aspects: [
        { title: 'Core Principles', description: `Fundamental concepts and principles underlying ${centralTopic}`, importance: 9, color: 'hsl(300, 70%, 60%)', branches: ['Fundamentals', 'Best Practices', 'Standards'] },
        { title: 'Practical Application', description: `Real-world implementation and application of ${centralTopic}`, importance: 8, color: 'hsl(280, 70%, 60%)', branches: ['Implementation', 'Case Studies', 'Examples'] },
        { title: 'Advanced Techniques', description: `Sophisticated methods and advanced approaches in ${centralTopic}`, importance: 7, color: 'hsl(260, 70%, 60%)', branches: ['Advanced Methods', 'Expert Techniques', 'Innovation'] },
        { title: 'Measurement & Evaluation', description: `Metrics, KPIs, and evaluation methods for ${centralTopic}`, importance: 7, color: 'hsl(240, 70%, 60%)', branches: ['Metrics', 'Assessment', 'Improvement'] }
      ]
    };
  }

  private validateAndEnhanceNodes(nodes: GeneratedNode[], centralTopic: string): GeneratedNode[] {
    return nodes.map((node, index) => ({
      ...node,
      id: node.id || `ai-enhanced-${Date.now()}-${index}`,
      importance: Math.max(1, Math.min(10, node.importance || 5)),
      connections: node.connections || [],
      position: node.position || {
        x: 600 + (index % 5) * 280 + (Math.random() - 0.5) * 80,
        y: 400 + Math.floor(index / 5) * 200 + (Math.random() - 0.5) * 60
      },
      metadata: {
        ...node.metadata,
        isFundamental: node.metadata?.isFundamental || node.importance >= 8,
        complexity: node.metadata?.complexity || Math.ceil(node.importance / 1.5),
        parentConcept: node.metadata?.parentConcept || centralTopic,
        aiGenerated: true,
        model: this.currentModel.split('/')[1] || 'mixtral'
      }
    }));
  }

  // Enhanced fallback with more sophisticated generation
  private generateEnhancedFallbackNodes(centralTopic: string, context: any): GeneratedNode[] {
    console.log(`🔄 Generating enhanced fallback nodes for: ${centralTopic}`);
    
    const topicLower = centralTopic.toLowerCase();
    let categories: string[] = [];
    let nodeTemplates: Array<{label: string, importance: number, isFundamental: boolean, description: string}> = [];
    
    // Advanced, context-aware fallback with world knowledge and best practices
    // Add more detail, actionable insights, and unique content for each node
    if (topicLower.includes('business') || topicLower.includes('startup') || topicLower.includes('company') || topicLower.includes('enterprise')) {
      categories = ['Strategy', 'Operations', 'Marketing', 'Finance', 'Technology', 'HR', 'Growth', 'Innovation'];
      nodeTemplates = [
        {label: `${centralTopic} Strategic Vision`, importance: 10, isFundamental: true, description: 'Define the core strategic direction, long-term goals, and vision for success. Include frameworks like OKRs, SWOT, and scenario planning.'},
        {label: `Operational Excellence`, importance: 9, isFundamental: true, description: 'Implement Lean, Six Sigma, and agile methodologies for process optimization and operational efficiency.'},
        {label: `Market Positioning`, importance: 8, isFundamental: true, description: 'Analyze competitors, identify unique value propositions, and leverage Porter’s Five Forces for market differentiation.'},
        {label: `Financial Management`, importance: 8, isFundamental: false, description: 'Master budgeting, forecasting, and financial KPIs. Use best practices in cash flow management and capital allocation.'},
        {label: `Technology Infrastructure`, importance: 7, isFundamental: false, description: 'Adopt cloud, SaaS, and cybersecurity best practices. Align IT with business strategy.'},
        {label: `Team Development`, importance: 7, isFundamental: false, description: 'Foster a high-performance culture, talent development, and leadership pipelines.'},
        {label: `Growth Strategies`, importance: 6, isFundamental: false, description: 'Explore organic and inorganic growth, M&A, partnerships, and international expansion.'},
        {label: `Innovation Pipeline`, importance: 6, isFundamental: false, description: 'Establish R&D, open innovation, and design thinking for continuous improvement.'},
        {label: `Risk Management`, importance: 5, isFundamental: false, description: 'Identify, assess, and mitigate risks using ERM frameworks and scenario analysis.'},
        {label: `Performance Metrics`, importance: 5, isFundamental: false, description: 'Track KPIs, dashboards, and balanced scorecards for data-driven decision making.'},
      ];
    } else if (topicLower.includes('ai') || topicLower.includes('machine learning') || topicLower.includes('artificial intelligence') || topicLower.includes('technology')) {
      categories = ['Core Technology', 'Data Science', 'Applications', 'Ethics', 'Implementation', 'Innovation', 'Infrastructure', 'Future'];
      nodeTemplates = [
        {label: `${centralTopic} Architecture`, importance: 10, isFundamental: true, description: 'Design modular, scalable AI systems. Use microservices, APIs, and cloud-native patterns.'},
        {label: `Data Processing Pipeline`, importance: 9, isFundamental: true, description: 'Build robust ETL, data lakes, and real-time streaming. Ensure data quality and governance.'},
        {label: `Machine Learning Models`, importance: 9, isFundamental: true, description: 'Select algorithms, tune hyperparameters, and use AutoML. Apply best practices in model validation and deployment.'},
        {label: `Real-world Applications`, importance: 8, isFundamental: false, description: 'Showcase use cases in NLP, computer vision, and predictive analytics. Reference industry benchmarks.'},
        {label: `Ethical Considerations`, importance: 7, isFundamental: false, description: 'Address bias, fairness, transparency, and responsible AI. Reference IEEE and EU AI guidelines.'},
        {label: `Performance Optimization`, importance: 7, isFundamental: false, description: 'Optimize for latency, throughput, and cost. Use distributed computing and hardware acceleration.'},
        {label: `Infrastructure Requirements`, importance: 6, isFundamental: false, description: 'Leverage cloud, edge, and hybrid architectures. Plan for scalability and resilience.'},
        {label: `Future Innovations`, importance: 6, isFundamental: false, description: 'Explore generative AI, quantum computing, and emerging trends.'},
        {label: `Security & Privacy`, importance: 5, isFundamental: false, description: 'Implement data protection, encryption, and secure model serving.'},
        {label: `ROI & Business Value`, importance: 5, isFundamental: false, description: 'Measure impact, TCO, and business outcomes. Use case studies and real-world metrics.'},
      ];
    } else if (topicLower.includes('marketing') || topicLower.includes('brand') || topicLower.includes('campaign') || topicLower.includes('digital marketing')) {
      categories = ['Strategy', 'Audience', 'Content', 'Channels', 'Analytics', 'Brand', 'Growth', 'Innovation'];
      nodeTemplates = [
        {label: `${centralTopic} Strategy`, importance: 10, isFundamental: true, description: 'Develop integrated marketing plans, set SMART goals, and align with business objectives.'},
        {label: `Target Audience Analysis`, importance: 9, isFundamental: true, description: 'Build personas, segment markets, and use data-driven targeting.'},
        {label: `Content Strategy`, importance: 8, isFundamental: true, description: 'Plan editorial calendars, repurpose content, and optimize for SEO/SEM.'},
        {label: `Multi-Channel Approach`, importance: 8, isFundamental: false, description: 'Coordinate campaigns across social, email, paid, and organic channels.'},
        {label: `Brand Identity & Voice`, importance: 7, isFundamental: false, description: 'Craft brand guidelines, tone, and storytelling.'},
        {label: `Performance Analytics`, importance: 7, isFundamental: false, description: 'Use Google Analytics, attribution models, and A/B testing.'},
        {label: `Growth Hacking`, importance: 6, isFundamental: false, description: 'Apply viral loops, referral programs, and rapid experimentation.'},
        {label: `Customer Journey`, importance: 6, isFundamental: false, description: 'Map touchpoints, optimize UX, and reduce churn.'},
        {label: `Competitive Analysis`, importance: 5, isFundamental: false, description: 'Benchmark against competitors, SWOT, and market trends.'},
        {label: `ROI Optimization`, importance: 5, isFundamental: false, description: 'Allocate budget, measure CAC/LTV, and maximize returns.'},
      ];
    } else {
      // Advanced generic fallback
      categories = ['Foundation', 'Strategy', 'Implementation', 'Innovation', 'Optimization', 'Growth', 'Risk', 'Future'];
      nodeTemplates = [
        {label: `${centralTopic} Fundamentals`, importance: 10, isFundamental: true, description: 'Master the core principles, frameworks, and foundational concepts. Reference ISO, PMI, and industry standards.'},
        {label: `Strategic Framework`, importance: 9, isFundamental: true, description: 'Apply proven methodologies (e.g., Agile, Lean, Design Thinking) for structured execution.'},
        {label: `Implementation Plan`, importance: 8, isFundamental: true, description: 'Detail step-by-step actions, timelines, and resource allocation.'},
        {label: `Innovation Opportunities`, importance: 7, isFundamental: false, description: 'Identify creative solutions, disruptive trends, and blue ocean strategies.'},
        {label: `Optimization Strategies`, importance: 7, isFundamental: false, description: 'Use continuous improvement, Kaizen, and Six Sigma for efficiency.'},
        {label: `Growth Pathways`, importance: 6, isFundamental: false, description: 'Explore scaling, partnerships, and new market entry.'},
        {label: `Risk Assessment`, importance: 6, isFundamental: false, description: 'Conduct risk analysis, FMEA, and mitigation planning.'},
        {label: `Future Considerations`, importance: 5, isFundamental: false, description: 'Anticipate trends, regulatory changes, and technology shifts.'},
        {label: `Best Practices`, importance: 5, isFundamental: false, description: 'Adopt industry standards, certifications, and benchmarking.'},
        {label: `Success Metrics`, importance: 4, isFundamental: false, description: 'Define KPIs, OKRs, and evaluation criteria.'},
      ];
    }

    // Enhanced color palette with more sophisticated options
    const colors = [
      'hsl(267, 85%, 66%)', // NOV8 Primary
      'hsl(213, 94%, 68%)', // NOV8 Secondary  
      'hsl(292, 91%, 76%)', // NOV8 Accent
      'hsl(142, 76%, 50%)', // Success Green
      'hsl(35, 91%, 65%)',  // Warning Orange
      'hsl(0, 84%, 60%)',   // Error Red
      'hsl(280, 100%, 70%)', // Purple
      'hsl(200, 100%, 70%)', // Blue
      'hsl(45, 100%, 60%)',  // Gold
      'hsl(300, 100%, 70%)', // Magenta
    ];

    return nodeTemplates.map((template, index) => ({
      id: `enhanced-fallback-${Date.now()}-${index}`,
      label: template.label,
      category: categories[index % categories.length],
      color: colors[index % colors.length],
      description: template.description,
      importance: template.importance,
      connections: template.isFundamental ? [] : ['enhanced-fallback-' + (Date.now() - 1000) + '-0'],
      position: {
        x: 500 + (index % 4) * 300 + (Math.random() - 0.5) * 60,
        y: 350 + Math.floor(index / 4) * 220 + (Math.random() - 0.5) * 40
      },
      metadata: {
        isFundamental: template.isFundamental,
        complexity: Math.ceil(template.importance / 1.5),
        parentConcept: centralTopic,
        suggestedBranches: template.isFundamental ? [
          `${template.label} Deep Dive`,
          `${template.label} Implementation`,
          `${template.label} Optimization`
        ] : [],
        aiGenerated: false,
        fallbackGenerated: true
      }
    }));
  }

  async identifyFundamentalNodes(nodes: any[], edges: any[]): Promise<FundamentalNode[]> {
    if (nodes.length === 0) return [];

    try {
      const systemPrompt = `You are an advanced AI analyst using Mixtral. Identify the most fundamental mind map nodes based on conceptual importance and connection potential.

ANALYSIS CRITERIA:
- Conceptual centrality and strategic importance
- Natural connection hubs for other concepts  
- Core ideas that enable understanding of the domain
- Foundation concepts that other ideas build upon

Return JSON array only.`;

      const nodeLabels = nodes.map(n => n.data?.label || n.label).slice(0, 12).join(', ');
      const connectionInfo = edges.slice(0, 10).map(e => `${e.source}→${e.target}`).join(', ');

      const userPrompt = `ANALYZE: ${nodeLabels}
CONNECTIONS: ${connectionInfo}

Identify 3-5 most fundamental nodes (highest strategic importance + connection potential).

JSON: [{"id":"node-id","label":"Node Label","importance":9,"centralityScore":8.5,"connectionCount":4,"conceptualWeight":9.2}]`;

      const response = await this.callOpenRouter([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], 0.3);

      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        return this.calculateFundamentalNodesLocally(nodes, edges);
      }

      const fundamentalNodes: FundamentalNode[] = JSON.parse(jsonMatch[0]);
      return fundamentalNodes.slice(0, 5);
      
    } catch (error) {
      console.warn('⚠️ AI fundamental analysis failed, using enhanced local calculation:', error);
      return this.calculateFundamentalNodesLocally(nodes, edges);
    }
  }

  private calculateFundamentalNodesLocally(nodes: any[], edges: any[]): FundamentalNode[] {
    console.log('🔄 Using enhanced local fundamental node analysis');
    
    // More sophisticated local calculation
    const connectionCounts = new Map<string, number>();
    const incomingConnections = new Map<string, number>();
    const outgoingConnections = new Map<string, number>();
    
    edges.forEach(edge => {
      connectionCounts.set(edge.source, (connectionCounts.get(edge.source) || 0) + 1);
      connectionCounts.set(edge.target, (connectionCounts.get(edge.target) || 0) + 1);
      outgoingConnections.set(edge.source, (outgoingConnections.get(edge.source) || 0) + 1);
      incomingConnections.set(edge.target, (incomingConnections.get(edge.target) || 0) + 1);
    });

    const scoredNodes = nodes.map(node => {
      const totalConnections = connectionCounts.get(node.id) || 0;
      const incoming = incomingConnections.get(node.id) || 0;
      const outgoing = outgoingConnections.get(node.id) || 0;
      
      const label = node.data?.label || node.label || 'Unnamed';
      const labelLength = label.length;
      
      // Enhanced scoring with multiple factors
      const connectionScore = totalConnections * 2.5;
      const hubScore = Math.min(incoming, outgoing) * 2; 
      const labelScore = Math.min(labelLength / 12, 3);
      const importanceScore = (node.data?.importance || 5) * 0.5;
      const centralityScore = connectionScore + hubScore + labelScore + importanceScore;
      
      const existingImportance = node.data?.importance || 5;
      const isFundamentalMarked = node.data?.isFundamental || existingImportance >= 8;
      
      return {
        id: node.id,
        label,
        importance: Math.min(10, Math.max(3, 5 + totalConnections + (isFundamentalMarked ? 3 : 0))),
        centralityScore,
        connectionCount: totalConnections,
        conceptualWeight: centralityScore + (isFundamentalMarked ? 4 : 0)
      };
    });

    return scoredNodes
      .sort((a, b) => b.conceptualWeight - a.conceptualWeight)
      .slice(0, 5);
  }

  // Automatic branching system for fundamental nodes
  private async triggerAutomaticBranching(fundamentalNodes: GeneratedNode[]): Promise<void> {
    console.log(`🌿 Triggering automatic branching for ${fundamentalNodes.length} fundamental nodes`);
    
    for (const fundamentalNode of fundamentalNodes) {
      try {
        // Convert GeneratedNode to FundamentalNode format
        const fundamentalNodeData: FundamentalNode = {
          id: fundamentalNode.id,
          label: fundamentalNode.label,
          centralityScore: fundamentalNode.importance / 10,
          connectionCount: fundamentalNode.connections.length,
          conceptualWeight: fundamentalNode.metadata.complexity || 7,
          importance: fundamentalNode.importance
        };
        
        const branches = await this.generateAutomaticBranches(fundamentalNodeData, [], 6);
        
        // Emit event to canvas to add these branches
        if (typeof window !== 'undefined' && window.dispatchEvent) {
          const event = new CustomEvent('addAutomaticBranches', {
            detail: {
              parentNodeId: fundamentalNode.id,
              branches: branches
            }
          });
          window.dispatchEvent(event);
        }
      } catch (error) {
        console.warn(`Failed to generate branches for ${fundamentalNode.label}:`, error);
      }
    }
  }

  // Enhanced branch generation with deep analysis
  async generateAutomaticBranches(
    fundamentalNode: FundamentalNode,
    existingNodes: any[],
    maxBranches: number = 6
  ): Promise<GeneratedNode[]> {
    try {
      const systemPrompt = `You are an expert knowledge architect specializing in hierarchical information design. Your mission is to create comprehensive, actionable branch nodes that provide deep exploration of fundamental concepts.

BRANCH GENERATION EXCELLENCE:
- Create specific, implementable sub-concepts that directly elaborate on the fundamental concept
- Each branch should answer "How?" "What?" or "Why?" about the fundamental concept
- Generate branches that practitioners would need to master the fundamental concept
- Ensure each branch provides concrete value and actionable insights
- Avoid generic terms - be specific and detailed
- Create natural learning progression from fundamental to detailed implementation

QUALITY FRAMEWORK:
- Branch importance: 4-7 (supporting the fundamental concept)
- Each branch must have clear, actionable descriptions
- Strategic connections to related branches
- Professional categorization based on function/purpose
- Implementation-focused metadata

OUTPUT: Return ONLY a valid JSON array with detailed, specific branch nodes.`;

      const existingLabels = existingNodes.map(n => n.data?.label || n.label).slice(0, 8).join(', ');

      const userPrompt = `FUNDAMENTAL CONCEPT EXPANSION: "${fundamentalNode.label}"

CONTEXT:
• Existing Knowledge Base: ${existingLabels || 'Initial fundamental concept'}
• Target Branches: ${maxBranches} detailed expansion nodes
• Focus: Deep, actionable elaboration of the fundamental concept

GENERATION MISSION:
Create ${maxBranches} branch nodes that comprehensively expand "${fundamentalNode.label}" by addressing:

1. IMPLEMENTATION BRANCHES (2-3 nodes):
   - How to practically apply "${fundamentalNode.label}"
   - Specific methodologies and approaches
   - Step-by-step implementation frameworks

2. STRATEGIC BRANCHES (2-3 nodes):
   - Why "${fundamentalNode.label}" matters strategically
   - Decision-making frameworks and considerations
   - Success factors and optimization strategies

3. TACTICAL BRANCHES (1-2 nodes):
   - Specific tools, techniques, and methods for "${fundamentalNode.label}"
   - Measurement and evaluation approaches
   - Common challenges and solutions

ENHANCED BRANCH JSON STRUCTURE:
[{
  "id": "branch-${fundamentalNode.id}-[unique-id]",
  "label": "Specific, Actionable Branch Title",
  "category": "implementation|strategic|tactical",
  "color": "hsl(240, 80%, 60%)",
  "description": "Detailed description explaining how this branch specifically elaborates on ${fundamentalNode.label}. Include actionable insights and practical value.",
  "importance": 6,
  "connections": ["${fundamentalNode.id}"],
  "position": {"x": 800, "y": 400},
  "metadata": {
    "isFundamental": false,
    "complexity": 5,
    "parentConcept": "${fundamentalNode.label}",
    "branchType": "implementation|strategic|tactical",
    "implementationDifficulty": "low|medium|high",
    "strategicValue": "medium|high",
    "learningPrerequisites": ["specific-knowledge-areas"],
    "practicalOutcomes": ["specific-deliverables"],
    "branchGenerated": true
  }
}]

CRITICAL REQUIREMENTS:
- Every branch must specifically elaborate on "${fundamentalNode.label}"
- Avoid generic labels like "Overview", "Introduction", "Basics"
- Each branch should be something a practitioner needs to master "${fundamentalNode.label}"
- Descriptions must provide genuine insights about the branch's relationship to the fundamental concept
- Create branches that answer: "To master ${fundamentalNode.label}, I need to understand..."

Generate branches that would satisfy an expert asking: "Show me the key areas I need to understand to fully implement and leverage ${fundamentalNode.label}."`;

      const response = await this.callOpenRouter([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], 0.7);

      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        return this.generateFallbackBranches(fundamentalNode, maxBranches);
      }

      const branches: GeneratedNode[] = JSON.parse(jsonMatch[0]);
      
      // Enhanced validation with parent connection
      const validatedBranches = branches.map((branch, index) => ({
        ...branch,
        id: `branch-${fundamentalNode.id}-${Date.now()}-${index}`,
        connections: [fundamentalNode.id, ...branch.connections],
        metadata: {
          ...branch.metadata,
          parentConcept: fundamentalNode.label,
          branchGenerated: true,
          aiGenerated: true,
          model: this.currentModel.split('/')[1] || 'mixtral'
        }
      }));
      
      return this.validateAndEnhanceNodes(validatedBranches, fundamentalNode.label);
    } catch (error) {
      console.error('⚠️ Error generating automatic branches:', error);
      return this.generateFallbackBranches(fundamentalNode, maxBranches);
    }
  }

  private generateFallbackBranches(fundamentalNode: FundamentalNode, maxBranches: number): GeneratedNode[] {
    const branchTypes = [
      'Strategic Implementation', 'Tactical Execution', 'Resource Planning', 'Risk Mitigation',
      'Performance Optimization', 'Innovation Opportunities', 'Best Practices', 'Success Metrics',
      'Team Development', 'Technology Integration'
    ];
    const colors = [
      'hsl(200, 80%, 60%)', 'hsl(120, 70%, 55%)', 'hsl(45, 85%, 60%)', 'hsl(300, 75%, 65%)',
      'hsl(180, 70%, 60%)', 'hsl(280, 80%, 65%)', 'hsl(60, 80%, 60%)', 'hsl(340, 70%, 65%)'
    ];

    return branchTypes.slice(0, maxBranches).map((type, index) => ({
      id: `enhanced-branch-${fundamentalNode.id}-${Date.now()}-${index}`,
      label: `${fundamentalNode.label}: ${type}`,
      category: type.toLowerCase().replace(' ', '-'),
      color: colors[index % colors.length],
      description: `${type} strategies and approaches for ${fundamentalNode.label}`,
      importance: 4 + Math.floor(Math.random() * 4),
      connections: [fundamentalNode.id],
      position: {
        x: 500 + (index % 4) * 250 + (Math.random() - 0.5) * 40,
        y: 600 + Math.floor(index / 4) * 200 + (Math.random() - 0.5) * 40
      },
      metadata: {
        isFundamental: false,
        complexity: 3 + Math.floor(Math.random() * 4),
        parentConcept: fundamentalNode.label,
        suggestedBranches: [],
        branchGenerated: true
      }
    }));
  }

  async enhanceNodeWithAI(nodeLabel: string, context: string = ''): Promise<{
    enhancedLabel: string;
    description: string;
    tags: string[];
    category: string;
    suggestedConnections: string[];
  }> {
    const systemPrompt = `You are NOV8 AI Pro's Expert Enhancement Engine - the world's most sophisticated knowledge expansion system. Your mission is to transform basic nodes into comprehensive, expert-level knowledge components that provide immediate strategic and tactical value.

ULTRA-ENHANCEMENT PROTOCOLS:
🎯 DEPTH TRANSFORMATION: Convert surface-level concepts into multi-dimensional expertise
📊 STRATEGIC INTELLIGENCE: Add frameworks, methodologies, metrics, and implementation roadmaps
⚡ ACTIONABLE INSIGHTS: Include specific tools, techniques, processes, and measurable outcomes
🔗 KNOWLEDGE NETWORKS: Identify critical connections, dependencies, and strategic relationships
🏆 EXPERT QUALITY: Elevate to the level that industry thought leaders would recognize as comprehensive

ENHANCEMENT EXCELLENCE STANDARDS:
- Transform generic labels into specific, actionable titles
- Create descriptions that provide genuine strategic insights and implementation guidance
- Generate tags that reflect actual categorization and functional purpose
- Suggest connections that represent meaningful knowledge relationships
- Ensure every enhancement provides practical value for knowledge workers

QUALITY STANDARDS:
- Enhanced labels should be specific and action-oriented, not generic
- Descriptions must include strategic context and practical implications
- Tags should reflect functional categorization and domain expertise
- Connections should represent genuine knowledge dependencies and relationships
- All enhancements should be immediately useful for decision-making and implementation

OUTPUT: Return ONLY valid JSON with enhanced, professional content.`;

    const userPrompt = `NODE ENHANCEMENT REQUEST: "${nodeLabel}"

CONTEXT ANALYSIS:
• Knowledge Context: ${context.slice(0, 300)}...
• Current Node: "${nodeLabel}"
• Enhancement Goal: Transform into comprehensive, actionable knowledge component

ENHANCEMENT REQUIREMENTS:

1. ENHANCED LABEL:
   - Make specific and implementation-focused
   - Avoid generic terms like "Overview", "Introduction", "Basic"
   - Include action orientation where appropriate
   - Ensure professional terminology

2. STRATEGIC DESCRIPTION:
   - Provide 2-3 sentences of genuine strategic insight
   - Explain practical implications and value
   - Include implementation considerations
   - Connect to broader knowledge context

3. FUNCTIONAL CATEGORIZATION:
   - Classify based on primary function and domain
   - Use professional taxonomy
   - Reflect actual usage and purpose

4. STRATEGIC CONNECTIONS:
   - Suggest 3-5 meaningful related concepts
   - Focus on genuine knowledge dependencies
   - Include both upstream and downstream relationships
   - Ensure connections add strategic value

JSON STRUCTURE:
{
  "enhancedLabel": "Specific, Action-Oriented Professional Title",
  "description": "Comprehensive description providing strategic insights, practical implications, and implementation guidance. Should explain why this matters and how it connects to broader objectives.",
  "tags": ["functional-category", "domain-area", "implementation-type"],
  "category": "professional-category",
  "suggestedConnections": ["related-concept-1", "prerequisite-knowledge", "implementation-method", "strategic-outcome", "evaluation-framework"]
}

CRITICAL SUCCESS FACTORS:
- Enhanced label must be more specific and valuable than original
- Description must provide genuine insights, not placeholder text
- Tags should reflect actual functional categorization
- Connections should represent meaningful knowledge relationships
- All content should be immediately useful for strategic decision-making

Transform "${nodeLabel}" into a knowledge component that would satisfy an expert asking: "What do I need to know about this to make informed decisions and take effective action?"`;

    try {
      const response = await this.callOpenRouter([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], 0.6);

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON in response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('⚠️ Error enhancing node:', error);
      return {
        enhancedLabel: `Strategic ${nodeLabel} Framework`,
        description: `Comprehensive analysis and implementation approach for ${nodeLabel}, including strategic considerations, practical implications, and actionable next steps for effective execution.`,
        tags: ['strategic-framework', 'implementation', 'analysis'],
        category: 'strategic-analysis',
        suggestedConnections: ['implementation-strategy', 'success-metrics', 'resource-requirements', 'risk-assessment', 'optimization-opportunities']
      };
    }
  }
}

export const aiService = new AIService();
export type { GeneratedNode, FundamentalNode }; 