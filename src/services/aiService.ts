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
  private apiKey: string;
  private baseUrl: string;
  private models = {
    mixtral: 'mistralai/mixtral-8x7b-instruct',
    claude: 'anthropic/claude-3.5-sonnet',
    gpt4: 'openai/gpt-4o',
    gemini: 'google/gemini-pro'
  };
  private currentModel: string;

  constructor() {
    // Use the new API key provided
    this.apiKey = 'ee05P0TpvlnWXugQjO3ODNRfM6PInBw5';
    this.baseUrl = 'https://openrouter.ai/api/v1';
    this.currentModel = this.models.mixtral; // Default to Mixtral
    
    console.log('🤖 AI Service initialized with Mixtral model');
  }

  // Method to switch models dynamically
  setModel(modelName: 'mixtral' | 'claude' | 'gpt4' | 'gemini') {
    if (this.models[modelName]) {
      this.currentModel = this.models[modelName];
      console.log(`🔄 Switched to ${modelName} model`);
    }
  }

  private async callOpenRouter(messages: OpenRouterMessage[], temperature: number = 0.7): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    try {
      console.log(`🚀 Making API call to ${this.currentModel}`);
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'NOV8 Mind Mapping App - Enhanced AI'
        },
        body: JSON.stringify({
          model: this.currentModel,
          messages,
          temperature,
          max_tokens: this.currentModel.includes('mixtral') ? 2000 : 1500, // Mixtral can handle more tokens
          stream: false,
          top_p: 0.9,
          frequency_penalty: 0.1,
          presence_penalty: 0.1
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.warn(`❌ API Error: ${response.status} - ${errorData}`);
        
        // Handle specific error cases
        if (response.status === 402) {
          throw new Error('INSUFFICIENT_CREDITS');
        } else if (response.status === 429) {
          throw new Error('RATE_LIMITED');
        }
        
        throw new Error(`OpenRouter API error: ${response.status} - ${errorData}`);
      }

      const data: OpenRouterResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from OpenRouter API');
      }

      console.log(`✅ Successful API response from ${this.currentModel}`);
      return data.choices[0].message.content;
    } catch (error) {
      console.warn('⚠️ OpenRouter API error:', error);
      
      // If it's a credit or rate limit error, throw specific error for better handling
      if (error instanceof Error && (error.message.includes('INSUFFICIENT_CREDITS') || error.message.includes('RATE_LIMITED'))) {
        throw error;
      }
      
      throw error;
    }
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
    console.log(`🧠 Generating intelligent nodes for: "${centralTopic}" using ${this.currentModel}`);
    
    // Enhanced system prompt for better results
    try {
      const systemPrompt = `You are an advanced AI mind mapping expert powered by Mixtral. Create comprehensive, interconnected node structures for professional mind maps.

CAPABILITIES:
- Generate 10-16 highly relevant nodes with strategic importance levels (1-10)
- Identify 3-4 fundamental concepts (importance 8-10) as connection hubs
- Create logical hierarchies with meaningful relationships  
- Assign domain-appropriate categories and aesthetic colors
- Include detailed metadata for professional presentations

OUTPUT: Return ONLY a valid JSON array. No explanations.`;

      const existingContext = existingNodes.length > 0 
        ? `Existing nodes: ${existingNodes.map(n => n.data?.label || n.label).slice(0, 5).join(', ')}`
        : 'Fresh mind map creation.';

      const userPrompt = `Create a professional mind map for: "${centralTopic}"

CONTEXT:
• Domain: ${context.domain || 'General'}
• Purpose: ${context.purpose || 'Strategic exploration'}
• Audience: ${context.audience || 'Professional'}
• Depth: ${context.depth || 'Comprehensive'}
• ${existingContext}

REQUIREMENTS:
1. Generate 10-16 nodes with varying importance (1-10)
2. Mark 3-4 as fundamental (isFundamental: true, importance 8-10)
3. Create meaningful connections between related concepts
4. Use professional color schemes (HSL format)
5. Position nodes for optimal layout

JSON STRUCTURE:
[{
  "id": "unique-id-${Date.now()}",
  "label": "Professional Node Title",
  "category": "strategic-category",
  "color": "hsl(240, 80%, 60%)",
  "description": "Clear, actionable description",
  "importance": 8,
  "connections": ["related-node-ids"],
  "position": {"x": 500, "y": 300},
  "metadata": {
    "isFundamental": true,
    "complexity": 7,
    "parentConcept": "${centralTopic}",
    "suggestedBranches": ["expansion-1", "expansion-2"]
  }
}]`;

      const response = await this.callOpenRouter([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], 0.8);

      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.warn('⚠️ No valid JSON from AI, using enhanced fallback');
        return this.generateEnhancedFallbackNodes(centralTopic, context);
      }

      const generatedNodes: GeneratedNode[] = JSON.parse(jsonMatch[0]);
      console.log(`✨ Generated ${generatedNodes.length} intelligent nodes`);
      return this.validateAndEnhanceNodes(generatedNodes, centralTopic);
      
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

  getCurrentModel(): string {
    return this.currentModel;
  }

  getAvailableModels(): Record<string, string> {
    return this.models;
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  getStatus(): { configured: boolean; model: string; baseUrl: string; provider: string } {
    return {
      configured: this.isConfigured(),
      model: this.currentModel,
      baseUrl: this.baseUrl,
      provider: this.currentModel.split('/')[0] || 'mixtral'
    };
  }

  // Rest of the methods remain the same but with enhanced error handling
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

  // Enhanced branch generation
  async generateAutomaticBranches(
    fundamentalNode: FundamentalNode,
    existingNodes: any[],
    maxBranches: number = 10
  ): Promise<GeneratedNode[]> {
    try {
      const systemPrompt = `You are an advanced AI using Mixtral to generate intelligent branch nodes. Create detailed, actionable branches that expand from fundamental concepts with professional depth.

BRANCH REQUIREMENTS:
- Directly related to the fundamental concept
- Actionable and specific (not generic)
- Varying importance levels (4-8 for branches)
- Professional categorization
- Strategic positioning for optimal layout`;

      const existingLabels = existingNodes.map(n => n.data?.label || n.label).slice(0, 8).join(', ');

      const userPrompt = `FUNDAMENTAL CONCEPT: "${fundamentalNode.label}"
EXISTING NODES: ${existingLabels}

Generate ${maxBranches} professional branch nodes that:
- Explore actionable aspects of "${fundamentalNode.label}"
- Provide specific, implementable sub-concepts  
- Have strategic importance levels (4-8)
- Include expansion metadata

JSON STRUCTURE: Same as previous, but branches (isFundamental: false)`;

      const response = await this.callOpenRouter([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], 0.8);

      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        return this.generateFallbackBranches(fundamentalNode, maxBranches);
      }

      const branches: GeneratedNode[] = JSON.parse(jsonMatch[0]);
      return this.validateAndEnhanceNodes(branches, fundamentalNode.label);
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
    const systemPrompt = `You are an advanced AI assistant using Mixtral to enhance mind map nodes with professional, actionable content.`;

    const userPrompt = `ENHANCE NODE: "${nodeLabel}"
CONTEXT: ${context}

Create professional enhancement with:
- Improved, action-oriented title
- Clear, strategic description  
- Relevant tags for categorization
- Appropriate category classification
- Strategic connection suggestions

JSON: {"enhancedLabel":"Professional Title","description":"Strategic description","tags":["tag1","tag2"],"category":"category","suggestedConnections":["concept1","concept2"]}`;

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
        enhancedLabel: `Enhanced: ${nodeLabel}`,
        description: `Strategic analysis and implementation approach for ${nodeLabel}`,
        tags: ['ai-enhanced', 'strategic'],
        category: 'enhanced',
        suggestedConnections: ['implementation', 'strategy', 'optimization']
      };
    }
  }
}

export const aiService = new AIService();
export type { GeneratedNode, FundamentalNode }; 