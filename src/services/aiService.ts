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
  private currentModel: string = 'anthropic/claude-3.5-sonnet';
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
  }

  // Advanced Model Selection Intelligence
  private selectOptimalModel(topic: string, context: any = {}): AIModel {
    const detectedDomain = this.analyzeDomain(topic);
    
    // Get recommended model for domain
    const domainProfile = DOMAIN_PROFILES.find(p => p.name === detectedDomain);
    if (domainProfile) {
      const model = AI_MODELS.find(m => m.id === domainProfile.aiModel);
      if (model) {
        console.log(`🎯 Selected ${model.name} for ${detectedDomain} domain`);
        return model;
      }
    }
    
    // Fallback to context-based selection
    const complexity = this.assessComplexity(topic, context);
    
    if (complexity > 0.8) {
      return AI_MODELS.find(m => m.id === 'anthropic/claude-3.5-sonnet') || AI_MODELS[0];
    } else if (complexity > 0.6) {
      return AI_MODELS.find(m => m.id === 'openai/gpt-4o') || AI_MODELS[1];
    } else {
      return AI_MODELS.find(m => m.id === 'mistralai/mixtral-8x7b-instruct') || AI_MODELS[3];
    }
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

    try {
      const selectedModel = model || this.currentModel;
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
      console.error('OpenRouter request failed:', error);
      throw error;
    }
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
    } = {}
  ): Promise<GeneratedNode[]> {
    console.log(`🧠 Generating intelligent nodes for: "${centralTopic}"`);
    
    // Check for smart template match first
    const smartTemplate = SmartTemplateEngine.selectBestTemplate(centralTopic, context);
    if (smartTemplate) {
      console.log(`🎯 Using Smart Template: ${smartTemplate.name}`);
      const templateNodes = SmartTemplateEngine.generateFromTemplate(smartTemplate, centralTopic);
      
      // Quality assessment for template-generated nodes
      const qualityMetrics = this.assessQuality(templateNodes, centralTopic);
      
      toast.success(`🚀 Generated from ${smartTemplate.name} template`, {
        description: `${templateNodes.length} expert nodes • Quality: ${(qualityMetrics.overall * 100).toFixed(1)}%`
      });
      
      // Schedule automatic branching for fundamental template nodes
      const fundamentalNodes = templateNodes.filter((node: any) => node.metadata.isFundamental);
      if (fundamentalNodes.length > 0) {
        setTimeout(() => {
          this.triggerAutomaticBranching(fundamentalNodes);
        }, 3000);
      }
      
      return templateNodes;
    }
    
    // Advanced model selection based on topic and context
    const optimalModel = this.selectOptimalModel(centralTopic, context);
    const domainProfile = DOMAIN_PROFILES.find(p => p.name === this.analyzeDomain(centralTopic));
    
    console.log(`🎯 Using ${optimalModel.name} for optimal results`);
    
    try {
      const systemPrompt = `You are NOV8 AI Pro, the world's most advanced mind mapping intelligence system. Your expertise spans every domain with PhD-level depth in strategy, technology, business, science, and implementation.

MISSION CRITICAL OBJECTIVES:
🎯 IMMEDIATE VALUE: Every node must deliver immediate, actionable intelligence
🧠 EXPERT DEPTH: Generate content at the level of industry thought leaders and domain experts
🌐 COMPREHENSIVE COVERAGE: Create a complete knowledge ecosystem, not scattered thoughts
⚡ IMPLEMENTATION FOCUS: Prioritize practical, executable insights over theoretical concepts
🔗 INTELLIGENT CONNECTIONS: Build meaningful relationship networks between concepts

ADVANCED GENERATION PROTOCOLS:

1. DEPTH REQUIREMENTS:
   - FUNDAMENTAL NODES (9-10 importance): 150-300 word comprehensive descriptions with specific methodologies, frameworks, metrics, and implementation steps
   - STRATEGIC NODES (7-8 importance): 100-200 word detailed explanations with specific examples, case studies, and actionable tactics
   - TACTICAL NODES (5-6 importance): 75-150 word focused insights with concrete methods, tools, and measurable outcomes
   - SUPPORTING NODES (3-4 importance): 50-100 word specific, implementable advice with clear next steps

2. CONTENT INTELLIGENCE STANDARDS:
   - Include specific methodologies, frameworks, and proven approaches
   - Reference industry best practices and benchmarks
   - Provide quantifiable metrics and KPIs where applicable
   - Include implementation timelines and resource requirements
   - Mention specific tools, technologies, or platforms when relevant
   - Add risk factors and mitigation strategies
   - Include success criteria and measurement approaches

3. DOMAIN EXPERTISE PROTOCOLS:
   - Technology: Include architecture patterns, security considerations, scalability factors
   - Business: Include market analysis, competitive advantages, revenue models, ROI calculations
   - Strategy: Include SWOT analysis, stakeholder considerations, change management
   - Innovation: Include emerging trends, disruptive technologies, future implications
   - Operations: Include process optimization, automation opportunities, efficiency metrics

4. INTERCONNECTION INTELLIGENCE:
   - Create 3-5 meaningful connections per node based on dependencies, synergies, or logical flow
   - Prioritize connections that represent implementation sequences or strategic relationships
   - Avoid superficial connections - each must represent real business or operational value

OUTPUT FORMAT: Return ONLY a valid JSON array with no explanations or commentary.`;

      const existingContext = existingNodes.length > 0 
        ? `Existing knowledge base: ${existingNodes.map(n => n.data?.label || n.label).slice(0, 8).join(', ')}`
        : 'Creating foundational knowledge architecture.';

      const userPrompt = `DEEP ANALYSIS REQUEST: "${centralTopic}"

CONTEXT FRAMEWORK:
• Domain Focus: ${context.domain || 'Multi-disciplinary'}
• Strategic Purpose: ${context.purpose || 'Comprehensive knowledge mapping'}
• Target Audience: ${context.audience || 'Expert practitioners'}
• Analysis Depth: ${context.depth || 'Expert-level comprehensive'}
• Current State: ${existingContext}

GENERATION REQUIREMENTS:

1. FOUNDATIONAL LAYER (4-5 nodes, importance 8-10):
   - Core strategic frameworks and comprehensive methodologies that define "${centralTopic}"
   - Fundamental principles with specific implementation approaches and measurement criteria
   - Critical success factors including quantifiable KPIs, benchmarks, and strategic dependencies
   - Essential knowledge domains with detailed prerequisites and learning pathways

2. STRATEGIC LAYER (5-7 nodes, importance 6-8):
   - Comprehensive implementation approaches with step-by-step methodologies and resource requirements
   - Key processes and workflows including automation opportunities and optimization strategies
   - Critical decision frameworks with risk assessment matrices and stakeholder considerations
   - Performance optimization strategies with specific metrics, tools, and continuous improvement cycles

3. TACTICAL LAYER (5-7 nodes, importance 4-6):
   - Specific tools, technologies, and proven methods with implementation guides and cost analysis
   - Practical applications including real-world case studies, best practices, and measurable outcomes
   - Comprehensive measurement and evaluation frameworks with dashboard metrics and reporting systems
   - Resource requirement analysis including budget allocation, timeline planning, and skill development

4. OPERATIONAL LAYER (3-5 nodes, importance 2-4):
   - Detailed implementation steps with project management frameworks and deliverable tracking
   - Industry best practices with lessons learned, proven strategies, and efficiency optimization
   - Risk mitigation strategies including contingency planning and quality assurance protocols
   - Continuous improvement opportunities with innovation cycles and performance enhancement methods

EXPERT-LEVEL JSON STRUCTURE:
[{
  "id": "expert-${Date.now()}-[index]",
  "label": "Strategic [Domain] Implementation Framework - [Specific Focus Area]",
  "category": "strategic-implementation|tactical-execution|operational-excellence|innovation-catalyst",
  "color": "hsl(240, 80%, 60%)",
  "description": "Comprehensive 150-300 word description including: strategic context and business value, specific methodologies and frameworks, implementation roadmap with timelines, required resources and prerequisites, measurable outcomes and KPIs, risk factors and mitigation strategies, success criteria and evaluation methods. Include industry benchmarks, best practices, and concrete examples.",
  "importance": 9,
  "connections": ["prerequisite-concept-id", "implementation-dependency-id", "strategic-outcome-id"],
  "position": {"x": 600, "y": 400},
  "metadata": {
    "isFundamental": true,
    "complexity": 8,
    "parentConcept": "${centralTopic}",
    "suggestedBranches": ["methodology-deep-dive", "implementation-playbook", "optimization-strategies", "measurement-framework"],
    "implementationDifficulty": "medium|high|expert",
    "strategicValue": "high|critical|transformative",
    "knowledgeDomain": "strategic-planning|technical-implementation|operational-management|innovation-development",
    "prerequisites": ["specific-knowledge-area-1", "required-skill-2", "foundational-concept-3"],
    "outcomes": ["measurable-deliverable-1", "quantified-improvement-2", "strategic-milestone-3"],
    "timeframe": "immediate|3-months|6-months|12-months",
    "resourceRequirements": ["budget-range", "team-size", "technology-stack"],
    "successMetrics": ["kpi-1", "benchmark-2", "roi-metric-3"],
    "riskFactors": ["primary-risk", "mitigation-strategy"],
    "industryBenchmarks": ["standard-metric", "best-practice-reference"]
  }
}]

CRITICAL SUCCESS FACTORS:
- Every node must directly relate to and expand upon "${centralTopic}"
- Avoid generic terms like "Overview" or "Introduction" - be specific
- Create natural knowledge hierarchies that build upon each other
- Ensure descriptions provide genuine insights, not placeholder text
- Design connections that represent genuine knowledge relationships
- Generate nodes that an expert practitioner would find valuable and comprehensive

Generate nodes that would satisfy someone asking: "Show me everything I need to know about ${centralTopic} to become truly expert in this area."`;

      const response = await this.callOpenRouter([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], optimalModel.temperature, optimalModel.id);

      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.warn('⚠️ No valid JSON from AI, using enhanced fallback');
        return this.generateEnhancedFallbackNodes(centralTopic, context);
      }

      const generatedNodes: GeneratedNode[] = JSON.parse(jsonMatch[0]);
      console.log(`✨ Generated ${generatedNodes.length} intelligent nodes`);
      
      // Enhanced validation and auto-branching setup
      const validatedNodes = this.validateAndEnhanceNodes(generatedNodes, centralTopic);
      
      // Quality assessment with detailed metrics
      const qualityMetrics = this.assessQuality(validatedNodes, centralTopic);
      
      // Display quality insights
      toast.success(`🎯 Generated ${validatedNodes.length} nodes`, {
        description: `Quality Score: ${(qualityMetrics.overall * 100).toFixed(1)}% • Model: ${optimalModel.name}`
      });
      
      // Set up automatic branching for fundamental nodes
      const fundamentalNodes = validatedNodes.filter(node => node.metadata.isFundamental);
      if (fundamentalNodes.length > 0) {
        console.log(`🌿 Scheduling auto-branching for ${fundamentalNodes.length} fundamental nodes`);
        // Schedule automatic branch generation for fundamental nodes
        setTimeout(() => {
          this.triggerAutomaticBranching(fundamentalNodes);
        }, 2000);
      }
      
      return validatedNodes;
      
    } catch (error) {
      console.warn('⚠️ AI generation failed, using enhanced fallback:', error);
      
      // Show user-friendly message for different error types
      if (error instanceof Error) {
        if (error.message.includes('INSUFFICIENT_CREDITS')) {
          console.info('💳 API credits exhausted - using intelligent fallback system');
        } else if (error.message.includes('RATE_LIMITED')) {
          console.info('⏱️ Rate limited - using intelligent fallback system');
        }
      }
      
      return this.generateEnhancedFallbackNodes(centralTopic, context);
    }
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
    
    // More sophisticated domain detection and node generation
    if (topicLower.includes('business') || topicLower.includes('startup') || topicLower.includes('company') || topicLower.includes('enterprise')) {
      categories = ['Strategy', 'Operations', 'Marketing', 'Finance', 'Technology', 'HR', 'Growth', 'Innovation'];
      nodeTemplates = [
        {label: `${centralTopic} Strategic Vision`, importance: 10, isFundamental: true, description: 'Core strategic direction and long-term goals'},
        {label: `Operational Excellence`, importance: 9, isFundamental: true, description: 'Efficient processes and operational frameworks'},
        {label: `Market Positioning`, importance: 8, isFundamental: true, description: 'Competitive advantage and market differentiation'},
        {label: `Financial Management`, importance: 8, isFundamental: false, description: 'Revenue, costs, and financial planning'},
        {label: `Technology Infrastructure`, importance: 7, isFundamental: false, description: 'Digital systems and technological capabilities'},
        {label: `Team Development`, importance: 7, isFundamental: false, description: 'Human resources and organizational culture'},
        {label: `Growth Strategies`, importance: 6, isFundamental: false, description: 'Expansion plans and scaling methodologies'},
        {label: `Innovation Pipeline`, importance: 6, isFundamental: false, description: 'Future opportunities and disruptive capabilities'},
        {label: `Risk Management`, importance: 5, isFundamental: false, description: 'Risk assessment and mitigation strategies'},
        {label: `Performance Metrics`, importance: 5, isFundamental: false, description: 'KPIs and measurement frameworks'},
      ];
    } else if (topicLower.includes('ai') || topicLower.includes('machine learning') || topicLower.includes('artificial intelligence') || topicLower.includes('technology')) {
      categories = ['Core Technology', 'Data Science', 'Applications', 'Ethics', 'Implementation', 'Innovation', 'Infrastructure', 'Future'];
      nodeTemplates = [
        {label: `${centralTopic} Architecture`, importance: 10, isFundamental: true, description: 'Foundational AI system design and structure'},
        {label: `Data Processing Pipeline`, importance: 9, isFundamental: true, description: 'Data collection, cleaning, and preparation workflows'},
        {label: `Machine Learning Models`, importance: 9, isFundamental: true, description: 'Algorithm selection and model development'},
        {label: `Real-world Applications`, importance: 8, isFundamental: false, description: 'Practical use cases and implementation scenarios'},
        {label: `Ethical Considerations`, importance: 7, isFundamental: false, description: 'Bias, fairness, and responsible AI practices'},
        {label: `Performance Optimization`, importance: 7, isFundamental: false, description: 'Efficiency improvements and scalability'},
        {label: `Infrastructure Requirements`, importance: 6, isFundamental: false, description: 'Hardware, cloud, and computational resources'},
        {label: `Future Innovations`, importance: 6, isFundamental: false, description: 'Emerging trends and next-generation capabilities'},
        {label: `Security & Privacy`, importance: 5, isFundamental: false, description: 'Data protection and AI system security'},
        {label: `ROI & Business Value`, importance: 5, isFundamental: false, description: 'Economic impact and business justification'},
      ];
    } else if (topicLower.includes('marketing') || topicLower.includes('brand') || topicLower.includes('campaign') || topicLower.includes('digital marketing')) {
      categories = ['Strategy', 'Audience', 'Content', 'Channels', 'Analytics', 'Brand', 'Growth', 'Innovation'];
      nodeTemplates = [
        {label: `${centralTopic} Strategy`, importance: 10, isFundamental: true, description: 'Comprehensive marketing approach and objectives'},
        {label: `Target Audience Analysis`, importance: 9, isFundamental: true, description: 'Customer personas and market segmentation'},
        {label: `Content Strategy`, importance: 8, isFundamental: true, description: 'Content creation and distribution framework'},
        {label: `Multi-Channel Approach`, importance: 8, isFundamental: false, description: 'Integrated marketing across platforms'},
        {label: `Brand Identity & Voice`, importance: 7, isFundamental: false, description: 'Brand positioning and messaging strategy'},
        {label: `Performance Analytics`, importance: 7, isFundamental: false, description: 'Metrics, tracking, and optimization'},
        {label: `Growth Hacking`, importance: 6, isFundamental: false, description: 'Innovative growth strategies and tactics'},
        {label: `Customer Journey`, importance: 6, isFundamental: false, description: 'Touchpoints and experience optimization'},
        {label: `Competitive Analysis`, importance: 5, isFundamental: false, description: 'Market positioning and differentiation'},
        {label: `ROI Optimization`, importance: 5, isFundamental: false, description: 'Budget allocation and performance maximization'},
      ];
    } else {
      // Enhanced generic fallback
      categories = ['Foundation', 'Strategy', 'Implementation', 'Innovation', 'Optimization', 'Growth', 'Risk', 'Future'];
      nodeTemplates = [
        {label: `${centralTopic} Fundamentals`, importance: 10, isFundamental: true, description: 'Core principles and foundational concepts'},
        {label: `Strategic Framework`, importance: 9, isFundamental: true, description: 'Comprehensive approach and methodology'},
        {label: `Implementation Plan`, importance: 8, isFundamental: true, description: 'Execution strategy and action items'},
        {label: `Innovation Opportunities`, importance: 7, isFundamental: false, description: 'Creative solutions and improvements'},
        {label: `Optimization Strategies`, importance: 7, isFundamental: false, description: 'Efficiency and performance enhancement'},
        {label: `Growth Pathways`, importance: 6, isFundamental: false, description: 'Expansion and scaling opportunities'},
        {label: `Risk Assessment`, importance: 6, isFundamental: false, description: 'Challenges and mitigation strategies'},
        {label: `Future Considerations`, importance: 5, isFundamental: false, description: 'Long-term trends and adaptations'},
        {label: `Best Practices`, importance: 5, isFundamental: false, description: 'Industry standards and proven methods'},
        {label: `Success Metrics`, importance: 4, isFundamental: false, description: 'Measurement and evaluation criteria'},
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