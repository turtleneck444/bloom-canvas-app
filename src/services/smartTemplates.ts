// Revolutionary Smart Templates System
// Auto-adapting, domain-specific intelligent templates

interface SmartTemplate {
  id: string;
  name: string;
  description: string;
  domain: string;
  triggerKeywords: string[];
  nodeStructure: TemplateNode[];
  adaptivePrompts: string[];
  complexityLevel: 'beginner' | 'intermediate' | 'expert';
  estimatedNodeCount: number;
  focusAreas: string[];
}

interface TemplateNode {
  label: string;
  category: string;
  importance: number;
  description: string;
  isFundamental: boolean;
  suggestedBranches: string[];
  color: string;
  position: { x: number; y: number };
}

export const SMART_TEMPLATES: SmartTemplate[] = [
  {
    id: 'business-strategy-master',
    name: 'Business Strategy Mastery',
    description: 'Comprehensive strategic business planning framework',
    domain: 'business-strategy',
    triggerKeywords: ['business strategy', 'strategic planning', 'business plan', 'market strategy'],
    complexityLevel: 'expert',
    estimatedNodeCount: 18,
    focusAreas: ['market-analysis', 'competitive-strategy', 'value-proposition', 'execution-planning'],
    nodeStructure: [
      {
        label: 'Strategic Vision & Mission',
        category: 'foundation',
        importance: 10,
        description: 'Core purpose, vision, and strategic direction that drives all business decisions',
        isFundamental: true,
        suggestedBranches: ['vision-statement', 'mission-alignment', 'core-values', 'strategic-objectives'],
        color: 'hsl(267, 85%, 66%)',
        position: { x: 600, y: 300 }
      },
      {
        label: 'Market Analysis & Positioning',
        category: 'market-research',
        importance: 9,
        description: 'Deep market understanding, customer segments, and competitive positioning strategy',
        isFundamental: true,
        suggestedBranches: ['target-segments', 'market-size', 'competitive-analysis', 'positioning-strategy'],
        color: 'hsl(213, 94%, 68%)',
        position: { x: 900, y: 200 }
      },
      {
        label: 'Value Proposition Design',
        category: 'value-creation',
        importance: 9,
        description: 'Unique value creation framework and customer problem-solution fit analysis',
        isFundamental: true,
        suggestedBranches: ['customer-problems', 'solution-fit', 'value-delivery', 'differentiation'],
        color: 'hsl(292, 91%, 76%)',
        position: { x: 900, y: 400 }
      },
      {
        label: 'Revenue Model Architecture',
        category: 'monetization',
        importance: 8,
        description: 'Sustainable revenue generation strategy and business model optimization',
        isFundamental: false,
        suggestedBranches: ['pricing-strategy', 'revenue-streams', 'cost-structure', 'profitability'],
        color: 'hsl(142, 76%, 50%)',
        position: { x: 300, y: 400 }
      }
    ],
    adaptivePrompts: [
      'What specific industry or market is this business strategy for?',
      'What is the current stage of the business (startup, growth, mature)?',
      'What are the main competitive challenges you\'re facing?',
      'What specific strategic outcomes are you trying to achieve?'
    ]
  },

  {
    id: 'ai-implementation-blueprint',
    name: 'AI Implementation Blueprint',
    description: 'Comprehensive AI project implementation framework',
    domain: 'technology-innovation',
    triggerKeywords: ['ai implementation', 'artificial intelligence', 'machine learning project', 'ai strategy'],
    complexityLevel: 'expert',
    estimatedNodeCount: 20,
    focusAreas: ['ai-architecture', 'data-strategy', 'model-development', 'deployment-strategy'],
    nodeStructure: [
      {
        label: 'AI Strategy & Objectives',
        category: 'strategic-foundation',
        importance: 10,
        description: 'Strategic AI vision, business objectives, and success metrics definition',
        isFundamental: true,
        suggestedBranches: ['business-objectives', 'ai-use-cases', 'success-metrics', 'roi-framework'],
        color: 'hsl(267, 85%, 66%)',
        position: { x: 600, y: 300 }
      },
      {
        label: 'Data Architecture & Pipeline',
        category: 'data-infrastructure',
        importance: 9,
        description: 'Comprehensive data strategy, collection, processing, and quality management',
        isFundamental: true,
        suggestedBranches: ['data-sources', 'data-quality', 'preprocessing', 'data-governance'],
        color: 'hsl(213, 94%, 68%)',
        position: { x: 300, y: 200 }
      },
      {
        label: 'Model Development Framework',
        category: 'ml-engineering',
        importance: 9,
        description: 'AI model selection, training, validation, and optimization methodology',
        isFundamental: true,
        suggestedBranches: ['algorithm-selection', 'training-strategy', 'validation-framework', 'hyperparameter-tuning'],
        color: 'hsl(292, 91%, 76%)',
        position: { x: 900, y: 200 }
      },
      {
        label: 'Production Deployment System',
        category: 'deployment',
        importance: 8,
        description: 'Scalable deployment architecture, monitoring, and maintenance strategy',
        isFundamental: false,
        suggestedBranches: ['deployment-architecture', 'monitoring-system', 'scaling-strategy', 'maintenance-plan'],
        color: 'hsl(35, 91%, 65%)',
        position: { x: 600, y: 500 }
      }
    ],
    adaptivePrompts: [
      'What type of AI application are you building (NLP, computer vision, predictive analytics)?',
      'What is your current data availability and quality?',
      'What are your computational resource constraints?',
      'What are your timeline and budget constraints?'
    ]
  },

  {
    id: 'digital-marketing-engine',
    name: 'Digital Marketing Engine',
    description: 'Advanced digital marketing strategy and execution framework',
    domain: 'creative-design',
    triggerKeywords: ['digital marketing', 'marketing strategy', 'online marketing', 'marketing campaign'],
    complexityLevel: 'intermediate',
    estimatedNodeCount: 16,
    focusAreas: ['content-strategy', 'channel-optimization', 'customer-journey', 'performance-analytics'],
    nodeStructure: [
      {
        label: 'Audience Intelligence & Segmentation',
        category: 'audience-analysis',
        importance: 10,
        description: 'Deep customer persona development and behavioral segmentation strategy',
        isFundamental: true,
        suggestedBranches: ['persona-development', 'behavioral-analysis', 'segmentation-strategy', 'journey-mapping'],
        color: 'hsl(267, 85%, 66%)',
        position: { x: 600, y: 300 }
      },
      {
        label: 'Content Strategy Architecture',
        category: 'content-marketing',
        importance: 9,
        description: 'Comprehensive content creation, distribution, and optimization framework',
        isFundamental: true,
        suggestedBranches: ['content-pillars', 'content-calendar', 'distribution-strategy', 'optimization-framework'],
        color: 'hsl(213, 94%, 68%)',
        position: { x: 300, y: 200 }
      },
      {
        label: 'Multi-Channel Campaign Orchestration',
        category: 'channel-management',
        importance: 8,
        description: 'Integrated marketing channel strategy and campaign coordination',
        isFundamental: false,
        suggestedBranches: ['channel-selection', 'campaign-coordination', 'cross-channel-synergy', 'budget-allocation'],
        color: 'hsl(292, 91%, 76%)',
        position: { x: 900, y: 300 }
      }
    ],
    adaptivePrompts: [
      'What industry or niche is your marketing focused on?',
      'What are your primary marketing goals (awareness, lead generation, sales)?',
      'What is your current marketing budget and team size?',
      'Which marketing channels are you currently using?'
    ]
  },

  {
    id: 'product-development-accelerator',
    name: 'Product Development Accelerator',
    description: 'Comprehensive product development and innovation framework',
    domain: 'project-management',
    triggerKeywords: ['product development', 'product strategy', 'innovation process', 'product management'],
    complexityLevel: 'expert',
    estimatedNodeCount: 17,
    focusAreas: ['user-research', 'product-strategy', 'development-process', 'launch-strategy'],
    nodeStructure: [
      {
        label: 'User Research & Validation',
        category: 'user-research',
        importance: 10,
        description: 'Comprehensive user research methodology and validation framework',
        isFundamental: true,
        suggestedBranches: ['user-interviews', 'market-validation', 'user-testing', 'feedback-loops'],
        color: 'hsl(267, 85%, 66%)',
        position: { x: 600, y: 300 }
      },
      {
        label: 'Product Strategy & Roadmap',
        category: 'product-strategy',
        importance: 9,
        description: 'Strategic product vision, roadmap planning, and feature prioritization',
        isFundamental: true,
        suggestedBranches: ['product-vision', 'roadmap-planning', 'feature-prioritization', 'competitive-analysis'],
        color: 'hsl(213, 94%, 68%)',
        position: { x: 300, y: 200 }
      }
    ],
    adaptivePrompts: [
      'What type of product are you developing (software, hardware, service)?',
      'What stage is your product in (ideation, development, launch, growth)?',
      'Who is your target user or customer?',
      'What are your main product goals and success metrics?'
    ]
  },

  {
    id: 'startup-launch-blueprint',
    name: 'Startup Launch Blueprint',
    description: 'Complete startup launch and scaling framework',
    domain: 'business-strategy',
    triggerKeywords: ['startup', 'entrepreneur', 'business launch', 'startup strategy'],
    complexityLevel: 'expert',
    estimatedNodeCount: 19,
    focusAreas: ['market-validation', 'business-model', 'funding-strategy', 'scaling-plan'],
    nodeStructure: [
      {
        label: 'Market Opportunity & Validation',
        category: 'market-validation',
        importance: 10,
        description: 'Market size analysis, customer validation, and opportunity assessment',
        isFundamental: true,
        suggestedBranches: ['market-size', 'customer-validation', 'problem-solution-fit', 'competitive-landscape'],
        color: 'hsl(267, 85%, 66%)',
        position: { x: 600, y: 300 }
      },
      {
        label: 'Business Model Innovation',
        category: 'business-model',
        importance: 9,
        description: 'Innovative business model design and revenue optimization strategy',
        isFundamental: true,
        suggestedBranches: ['value-proposition', 'revenue-model', 'cost-structure', 'key-partnerships'],
        color: 'hsl(213, 94%, 68%)',
        position: { x: 900, y: 200 }
      }
    ],
    adaptivePrompts: [
      'What problem is your startup solving?',
      'What industry or market are you targeting?',
      'What stage is your startup in (idea, MVP, early traction, scaling)?',
      'What are your funding requirements and timeline?'
    ]
  }
];

// Smart Template Selection Algorithm
export class SmartTemplateEngine {
  static selectBestTemplate(topic: string, context: any = {}): SmartTemplate | null {
    const topicLower = topic.toLowerCase();
    let bestMatch: SmartTemplate | null = null;
    let bestScore = 0;

    for (const template of SMART_TEMPLATES) {
      let score = 0;
      
      // Keyword matching
      for (const keyword of template.triggerKeywords) {
        if (topicLower.includes(keyword.toLowerCase())) {
          score += 2;
        }
      }
      
      // Partial keyword matching
      const topicWords = topicLower.split(' ');
      for (const keyword of template.triggerKeywords) {
        const keywordWords = keyword.toLowerCase().split(' ');
        for (const keywordWord of keywordWords) {
          if (topicWords.includes(keywordWord)) {
            score += 0.5;
          }
        }
      }
      
      // Context matching
      if (context.domain && template.domain.includes(context.domain)) {
        score += 1;
      }
      
      if (score > bestScore && score >= 1) { // Minimum threshold
        bestScore = score;
        bestMatch = template;
      }
    }
    
    if (bestMatch) {
      console.log(`🎯 Smart Template Match: ${bestMatch.name} (confidence: ${bestScore.toFixed(1)})`);
    }
    
    return bestMatch;
  }

  static adaptTemplate(template: SmartTemplate, topic: string, userResponses?: string[]): SmartTemplate {
    // Create an adapted version of the template based on user input
    const adaptedTemplate = { ...template };
    
    // Customize node labels to include the specific topic
    adaptedTemplate.nodeStructure = template.nodeStructure.map(node => ({
      ...node,
      label: node.label.replace(/\b(Strategy|Framework|System|Architecture)\b/g, 
        (match) => `${topic} ${match}`),
      description: node.description.replace(/\b(this|the)\b/g, topic.toLowerCase())
    }));
    
    return adaptedTemplate;
  }

  static generateFromTemplate(template: SmartTemplate, topic: string): any[] {
    console.log(`🚀 Generating mind map from template: ${template.name}`);
    
    return template.nodeStructure.map((node, index) => ({
      id: `template-${template.id}-${index}`,
      label: node.label.includes(topic) ? node.label : `${topic} ${node.label}`,
      category: node.category,
      color: node.color,
      description: node.description,
      importance: node.importance,
      connections: [],
      position: node.position,
      metadata: {
        isFundamental: node.isFundamental,
        complexity: Math.ceil(node.importance / 1.5),
        parentConcept: topic,
        suggestedBranches: node.suggestedBranches,
        templateGenerated: true,
        templateId: template.id,
        templateName: template.name
      }
    }));
  }
}

export default SmartTemplateEngine; 