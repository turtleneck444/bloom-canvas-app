import OpenAI from 'openai';

// Rate limiting
const MAX_CALLS_PER_MINUTE = 4;
let callCount = 0;
let lastMinuteStart = Date.now();

type MindMapNode = {
  id: string;
  label: string;
  children?: MindMapNode[];
};

type APIResponse = {
  enhancedLabel?: string;
  detailedDescription?: string;
  keyInsights?: string[];
  actionableSteps?: string[];
  metrics?: string;
  examples?: string;
  challenges?: string;
  complexity?: number;
  importance?: number;
  tags?: string[];
};

export class AIService {
  private openai: OpenAI;
  private apiKey: string;

  constructor(apiKey: string | undefined = process.env.OPENAI_API_KEY) {
    if (!apiKey) {
      throw new Error("Missing OpenAI API key");
    }
    this.apiKey = apiKey;
    this.openai = new OpenAI({ apiKey: this.apiKey });
  }

  private async makeAPICall(prompt: string): Promise<any> {
    // Rate limiting check
    const now = Date.now();
    if (now - lastMinuteStart > 60000) {
      // Reset counter if a minute has passed
      callCount = 0;
      lastMinuteStart = now;
    }

    if (callCount >= MAX_CALLS_PER_MINUTE) {
      console.warn("Rate limit exceeded. Waiting...");
      await new Promise(resolve => setTimeout(resolve, 60000 - (now - lastMinuteStart)));
      console.warn("Resuming API calls.");
      callCount = 0;
      lastMinuteStart = Date.now();
    }

    callCount++;

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4-1106-preview",
        response_format: 'json_object',
      });

      const response = JSON.parse(completion.choices[0].message.content || '{}');
      return response;

    } catch (error: any) {
      console.error("OpenAI API call failed:", error);
      throw error;
    }
  }

  getColorForComplexity(complexity: number): string {
    if (complexity <= 3) {
      return 'hsl(142 76% 36%)'; // Green
    } else if (complexity <= 6) {
      return 'hsl(35 91% 65%)';  // Yellow
    } else {
      return 'hsl(0 84% 60%)';   // Red
    }
  }

  async generateMindMap(topic: string, depth: number = 3): Promise<MindMapNode[]> {
    console.log(`🧠 Generating mind map for topic: ${topic} with depth: ${depth}`);

    try {
      const prompt = `You are an expert in creating structured mind maps. Generate a mind map about "${topic}" with a depth of ${depth} levels. The root node is "${topic}". Return the mind map as a JSON array of nodes, where each node has an id, a label, and an optional array of child nodes. Ensure that the JSON is valid and parsable.`;

      const response = await this.makeAPICall(prompt);

      if (Array.isArray(response)) {
        return response.map((node: any) => ({
          id: node.id,
          label: node.label,
          children: node.children
        }));
      } else {
        throw new Error('Invalid mind map response');
      }
    } catch (error) {
      console.error("Mind map generation failed:", error);
      return [{ id: 'fallback', label: 'Failed to generate mind map. Please try again.' }];
    }
  }

  async generateBranches(nodeLabel: string): Promise<string[]> {
    console.log(`🌱 Generating branches for node: ${nodeLabel}`);

    try {
      const prompt = `You are an expert in brainstorming and idea generation. Generate 5-7 related branches (short labels) for the concept "${nodeLabel}". Return these branches as a JSON array of strings.`;

      const response = await this.makeAPICall(prompt);

      if (Array.isArray(response)) {
        return response.map((branch: any) => branch.toString());
      } else {
        throw new Error('Invalid branches response');
      }
    } catch (error) {
      console.error("Branch generation failed:", error);
      return ['Fallback Branch 1', 'Fallback Branch 2', 'Fallback Branch 3'];
    }
  }

  async identifyFundamentalConcepts(nodes: any[]): Promise<string[]> {
    console.log('💡 Identifying fundamental concepts from nodes:', nodes.map(node => node.label));

    try {
      const prompt = `Given the following concepts: ${nodes.map(node => node.label).join(', ')}. Identify the 2-3 most fundamental concepts that are essential for understanding the topic. Return these concepts as a JSON array of strings.`;

      const response = await this.makeAPICall(prompt);

      if (Array.isArray(response)) {
        return response.map((concept: any) => concept.toString());
      } else {
        throw new Error('Invalid fundamental concepts response');
      }
    } catch (error) {
      console.error("Fundamental concepts identification failed:", error);
      return [];
    }
  }

  async enhanceNode(nodeData: any, context: any[]): Promise<any> {
    console.log('🔧 Enhancing node:', nodeData.label);
    
    try {
      const contextInfo = context.map(node => `- ${node.label}`).join('\n');
      
      const prompt = `You are an expert knowledge synthesizer. Your task is to SIGNIFICANTLY ENHANCE and EXPAND the following concept with much deeper, more detailed, and more actionable information.

ORIGINAL CONCEPT: "${nodeData.label}"
CURRENT CONTEXT: 
${contextInfo}

ENHANCEMENT REQUIREMENTS:
1. Transform the basic concept into a comprehensive, detailed explanation
2. Add specific examples, case studies, or real-world applications
3. Include key metrics, statistics, or quantifiable insights where relevant
4. Provide actionable steps or implementation strategies
5. Add expert-level insights that go beyond surface-level information
6. Include potential challenges, solutions, and best practices
7. Make it significantly more valuable than the original concept

OUTPUT FORMAT:
{
  "enhancedLabel": "Enhanced concept title (more specific and detailed)",
  "detailedDescription": "Comprehensive explanation with specific details",
  "keyInsights": ["insight 1", "insight 2", "insight 3"],
  "actionableSteps": ["step 1", "step 2", "step 3"],
  "metrics": "Relevant statistics or measurements",
  "examples": "Real-world examples or case studies",
  "challenges": "Common obstacles and solutions",
  "complexity": 7,
  "importance": 8,
  "tags": ["tag1", "tag2", "tag3"]
}`;

      const response = await this.makeAPICall(prompt);
      
      if (response && response.enhancedLabel) {
        return {
          label: response.enhancedLabel,
          messages: [
            response.detailedDescription,
            `Key Insights: ${response.keyInsights?.join(', ')}`,
            `Action Steps: ${response.actionableSteps?.join(', ')}`,
            response.metrics ? `Metrics: ${response.metrics}` : null,
            response.examples ? `Examples: ${response.examples}` : null,
            response.challenges ? `Challenges: ${response.challenges}` : null
          ].filter(Boolean),
          complexity: response.complexity || 7,
          importance: response.importance || 8,
          tags: response.tags || [],
          color: this.getColorForComplexity(response.complexity || 7),
          fontSize: 16,
          enhanced: true,
          enhancedAt: new Date().toISOString()
        };
      }
      
      throw new Error('Invalid enhancement response');
      
    } catch (error) {
      console.error('Enhancement failed:', error);
      
      // Fallback enhancement
      return {
        label: `Enhanced: ${nodeData.label}`,
        messages: [
          `This is an enhanced version of "${nodeData.label}" with deeper analysis and actionable insights.`,
          'Key considerations: Implementation strategies, best practices, and measurable outcomes.',
          'Action items: Research, planning, execution, and evaluation phases.',
          'Success metrics: Performance indicators and evaluation criteria.'
        ],
        complexity: 7,
        importance: 8,
        tags: ['enhanced', 'detailed', 'actionable'],
        color: 'hsl(280 100% 70%)',
        fontSize: 16,
        enhanced: true,
        enhancedAt: new Date().toISOString()
      };
    }
  }

  async enhanceAllNodes(nodes: any[], originalTopic: string): Promise<any[]> {
    console.log('🚀 Enhancing all nodes with advanced AI processing...');
    
    try {
      const prompt = `You are an expert knowledge synthesizer. Transform this basic mind map into a comprehensive, expert-level knowledge system.

ORIGINAL TOPIC: "${originalTopic}"
CURRENT NODES: ${nodes.map(n => n.label).join(', ')}

Your task is to SIGNIFICANTLY ENHANCE each node with:
1. Deep, actionable insights
2. Specific examples and case studies
3. Quantifiable metrics and statistics
4. Implementation strategies
5. Expert-level analysis
6. Real-world applications

OUTPUT FORMAT - Return a JSON array where each object represents an enhanced node:
[
  {
    "originalLabel": "original node label",
    "enhancedLabel": "Enhanced, more specific title",
    "detailedContent": "Comprehensive explanation with specific details",
    "keyInsights": ["insight 1", "insight 2", "insight 3"],
    "actionableSteps": ["step 1", "step 2", "step 3"],
    "metrics": "Relevant statistics or measurements",
    "examples": "Real-world examples",
    "challenges": "Common obstacles and solutions",
    "complexity": 7,
    "importance": 8,
    "tags": ["tag1", "tag2", "tag3"]
  }
]

CRITICAL: Make each enhancement significantly more valuable than the original. Add expert-level depth and actionable intelligence.`;

      const response = await this.makeAPICall(prompt);
      
      if (Array.isArray(response)) {
        return response.map((enhanced: any, index: number) => {
          const originalNode = nodes[index];
          return {
            ...originalNode,
            label: enhanced.enhancedLabel || `Enhanced: ${originalNode.label}`,
            messages: [
              enhanced.detailedContent,
              `Key Insights: ${enhanced.keyInsights?.join(', ')}`,
              `Action Steps: ${enhanced.actionableSteps?.join(', ')}`,
              enhanced.metrics ? `Metrics: ${enhanced.metrics}` : null,
              enhanced.examples ? `Examples: ${enhanced.examples}` : null,
              enhanced.challenges ? `Challenges: ${enhanced.challenges}` : null
            ].filter(Boolean),
            complexity: enhanced.complexity || 7,
            importance: enhanced.importance || 8,
            tags: enhanced.tags || [],
            color: this.getColorForComplexity(enhanced.complexity || 7),
            fontSize: 16,
            enhanced: true,
            enhancedAt: new Date().toISOString()
          };
        });
      }
      
      throw new Error('Invalid batch enhancement response');
      
    } catch (error) {
      console.error('Batch enhancement failed:', error);
      
      // Fallback: enhance each node individually
      return Promise.all(
        nodes.map(async (node, index) => {
          const enhanced = await this.enhanceNode(node, nodes);
          return {
            ...node,
            ...enhanced,
            position: node.position // Preserve position
          };
        })
      );
    }
  }
}

export const aiService = new AIService();
