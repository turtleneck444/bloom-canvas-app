import React, { useCallback, useRef, useEffect, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
  ConnectionMode,
  useReactFlow,
  ReactFlowProvider,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import MindMapNode, { NodeData } from './MindMapNode';
import MindMapToolbar from './MindMapToolbar';
import AIToolbar from './AIToolbar';
import { Button } from '../ui/button';
import { Brain, Sparkles, Plus, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { aiService, GeneratedNode, FundamentalNode } from '@/services/aiService';
import AuraCard from '../ui/AuraCard';
// 1. Import motion for animation
import { motion, AnimatePresence } from 'framer-motion';

// Support Aura theme by swapping node type
const DefaultNodeTypes = {
  mindMapNode: (props: any) => (
    <MindMapNode {...props} onSubmit={handleGenerateBranchesFromNode} />
  ),
};
const AuraNodeTypes = {
  mindMapNode: (props: any) => {
    const isRoot = !props.data?.parentId;
    return (
      <AuraCard isRoot={isRoot}>
        <MindMapNode {...props} isAuraTheme={true} onSubmit={handleGenerateBranchesFromNode} />
      </AuraCard>
    );
  },
};

// AI-powered node generation - Completely rewritten for relevance
const generateRelatedNodes = (topic: string, parentCategory?: string): Array<{ label: string; color: string; category: string }> => {
  const topicLower = topic.toLowerCase();
  
  // Intelligent topic analysis and generation
  const generateSmartTopics = (mainTopic: string): string[] => {
    const topics: string[] = [];
    const words = mainTopic.toLowerCase().split(' ').filter(word => word.length > 2);
    
    // Extract the core concept (first meaningful word)
    const coreConcept = words[0] || mainTopic.toLowerCase();
    
    // Generate highly relevant subtopics based on the core concept
    if (coreConcept.includes('rapper') || coreConcept.includes('rap') || coreConcept.includes('hip-hop')) {
      topics.push(
        'Lyric Writing & Flow Development',
        'Beat Production & Music Creation',
        'Performance & Stage Presence',
        'Recording & Studio Techniques',
        'Marketing & Brand Building',
        'Networking & Industry Connections',
        'Social Media & Online Presence',
        'Business & Revenue Streams',
        'Collaboration & Features',
        'Equipment & Technology',
        'Legal & Copyright Protection',
        'Fan Engagement & Community'
      );
    } else if (coreConcept.includes('business') || coreConcept.includes('startup') || coreConcept.includes('company')) {
      topics.push(
        'Business Plan & Strategy',
        'Market Research & Analysis',
        'Funding & Investment',
        'Team Building & Leadership',
        'Marketing & Branding',
        'Sales & Customer Acquisition',
        'Operations & Management',
        'Legal & Compliance',
        'Technology & Infrastructure',
        'Financial Planning & Budgeting',
        'Partnerships & Networking',
        'Scaling & Growth Strategy'
      );
    } else if (coreConcept.includes('fitness') || coreConcept.includes('workout') || coreConcept.includes('exercise')) {
      topics.push(
        'Workout Planning & Programming',
        'Nutrition & Diet Planning',
        'Strength Training & Conditioning',
        'Cardio & Endurance Training',
        'Recovery & Rest Days',
        'Equipment & Gear Selection',
        'Form & Technique Mastery',
        'Goal Setting & Progress Tracking',
        'Injury Prevention & Safety',
        'Supplements & Performance',
        'Mental Health & Motivation',
        'Lifestyle & Habit Building'
      );
    } else if (coreConcept.includes('coding') || coreConcept.includes('programming') || coreConcept.includes('development')) {
      topics.push(
        'Programming Languages & Frameworks',
        'Project Planning & Architecture',
        'Code Quality & Best Practices',
        'Testing & Debugging',
        'Version Control & Collaboration',
        'Deployment & DevOps',
        'Performance & Optimization',
        'Security & Data Protection',
        'Documentation & Communication',
        'Learning & Skill Development',
        'Tools & Development Environment',
        'Career Growth & Networking'
      );
    } else if (coreConcept.includes('cooking') || coreConcept.includes('recipe') || coreConcept.includes('food')) {
      topics.push(
        'Recipe Development & Creation',
        'Ingredient Selection & Sourcing',
        'Cooking Techniques & Methods',
        'Kitchen Equipment & Tools',
        'Meal Planning & Preparation',
        'Nutrition & Dietary Requirements',
        'Food Safety & Storage',
        'Presentation & Plating',
        'Flavor Pairing & Seasoning',
        'Cooking Classes & Education',
        'Restaurant & Business Planning',
        'Food Photography & Social Media'
      );
    } else if (coreConcept.includes('travel') || coreConcept.includes('trip') || coreConcept.includes('vacation')) {
      topics.push(
        'Destination Research & Planning',
        'Budget Planning & Cost Management',
        'Accommodation & Booking',
        'Transportation & Logistics',
        'Itinerary & Activity Planning',
        'Packing & Preparation',
        'Safety & Health Considerations',
        'Cultural Immersion & Local Experience',
        'Photography & Documentation',
        'Travel Insurance & Protection',
        'Language & Communication',
        'Souvenirs & Shopping'
      );
    } else if (coreConcept.includes('writing') || coreConcept.includes('author') || coreConcept.includes('book')) {
      topics.push(
        'Story Development & Plotting',
        'Character Creation & Development',
        'Writing Techniques & Style',
        'Research & World Building',
        'Editing & Revision Process',
        'Publishing & Self-Publishing',
        'Marketing & Book Promotion',
        'Author Platform & Branding',
        'Writing Tools & Software',
        'Writing Community & Networking',
        'Time Management & Productivity',
        'Inspiration & Creative Process'
      );
    } else if (coreConcept.includes('design') || coreConcept.includes('art') || coreConcept.includes('creative')) {
      topics.push(
        'Design Principles & Theory',
        'Color Theory & Palette Selection',
        'Typography & Font Selection',
        'Layout & Composition',
        'Digital Tools & Software',
        'Brand Identity & Logo Design',
        'User Experience & Interface Design',
        'Print & Digital Media',
        'Portfolio Development & Presentation',
        'Client Communication & Feedback',
        'Inspiration & Creative Research',
        'Business & Freelancing'
      );
    } else if (coreConcept.includes('marketing') || coreConcept.includes('advertising') || coreConcept.includes('promotion')) {
      topics.push(
        'Market Research & Analysis',
        'Brand Strategy & Positioning',
        'Digital Marketing & Social Media',
        'Content Creation & Strategy',
        'SEO & Search Engine Optimization',
        'Email Marketing & Automation',
        'Paid Advertising & PPC',
        'Influencer Marketing & Partnerships',
        'Analytics & Performance Tracking',
        'Customer Relationship Management',
        'Marketing Automation & Tools',
        'ROI & Performance Optimization'
      );
    } else if (coreConcept.includes('fitness') || coreConcept.includes('health') || coreConcept.includes('wellness')) {
      topics.push(
        'Physical Health & Exercise',
        'Mental Health & Stress Management',
        'Nutrition & Diet Planning',
        'Sleep & Recovery',
        'Preventive Care & Check-ups',
        'Alternative Medicine & Therapies',
        'Work-Life Balance & Lifestyle',
        'Health Insurance & Financial Planning',
        'Medical Research & Information',
        'Support Systems & Community',
        'Goal Setting & Progress Tracking',
        'Long-term Health Planning'
      );
    } else {
      // Generic but intelligent topic generation for any subject
      const coreWords = words.slice(0, 3); // Take first 3 meaningful words
      coreWords.forEach(word => {
        if (word.length > 3) {
          topics.push(
            `${word.charAt(0).toUpperCase() + word.slice(1)} Fundamentals`,
            `${word.charAt(0).toUpperCase() + word.slice(1)} Advanced Techniques`,
            `${word.charAt(0).toUpperCase() + word.slice(1)} Best Practices`,
            `${word.charAt(0).toUpperCase() + word.slice(1)} Tools & Resources`,
            `${word.charAt(0).toUpperCase() + word.slice(1)} Common Challenges`,
            `${word.charAt(0).toUpperCase() + word.slice(1)} Success Strategies`
          );
        }
      });
    }
    
    return topics.slice(0, 12); // Limit to 12 most relevant topics
  };

  const specificTopics = generateSmartTopics(topic);
  
  const colorPalette = [
    'hsl(267 85% 66%)', // NOV8 Primary
    'hsl(213 94% 68%)', // NOV8 Secondary
    'hsl(292 91% 76%)', // NOV8 Accent
    'hsl(142 76% 36%)', // Success
    'hsl(35 91% 65%)',  // Warning
    'hsl(0 84% 60%)',   // Error
    'hsl(220 9% 60%)',  // Neutral
    'hsl(280 100% 70%)', // Purple
    'hsl(200 100% 70%)', // Blue
    'hsl(120 60% 50%)',  // Green
    'hsl(45 100% 60%)',  // Gold
    'hsl(300 100% 70%)', // Magenta
  ];

  return specificTopics.map((concept, index) => ({
    label: concept,
    color: colorPalette[index % colorPalette.length],
    category: 'main'
  }));
};

// Determine category based on topic keywords
const determineCategory = (topic: string): string => {
  const topicLower = topic.toLowerCase();
  
  if (topicLower.includes('business') || topicLower.includes('marketing') || topicLower.includes('finance') || 
      topicLower.includes('strategy') || topicLower.includes('management') || topicLower.includes('sales')) {
    return 'business';
  } else if (topicLower.includes('tech') || topicLower.includes('development') || topicLower.includes('design') || 
             topicLower.includes('ai') || topicLower.includes('machine learning') || topicLower.includes('software')) {
    return 'technology';
  } else if (topicLower.includes('learn') || topicLower.includes('education') || topicLower.includes('curriculum') || 
             topicLower.includes('teaching') || topicLower.includes('student')) {
    return 'education';
  } else if (topicLower.includes('health') || topicLower.includes('wellness') || topicLower.includes('fitness') || 
             topicLower.includes('medical') || topicLower.includes('nutrition')) {
    return 'health';
  } else if (topicLower.includes('creative') || topicLower.includes('design') || topicLower.includes('art') || 
             topicLower.includes('content') || topicLower.includes('brand')) {
    return 'creative';
  } else if (topicLower.includes('project') || topicLower.includes('planning') || topicLower.includes('timeline')) {
    return 'project';
  } else if (topicLower.includes('research') || topicLower.includes('analysis') || topicLower.includes('study')) {
    return 'research';
  } else if (topicLower.includes('personal') || topicLower.includes('life') || topicLower.includes('goals')) {
    return 'personal';
  }
  
  return 'default';
};

// Get color for category
const getColorForCategory = (category: string): string => {
  const colors = {
    business: '#3B82F6', // Blue
    technology: '#10B981', // Green
    education: '#F59E0B', // Amber
    health: '#EF4444', // Red
    creative: '#8B5CF6', // Purple
    project: '#06B6D4', // Cyan
    research: '#84CC16', // Lime
    personal: '#F97316', // Orange
    default: '#6B7280', // Gray
  };
  return colors[category as keyof typeof colors] || colors.default;
};

// Collision detection and avoidance utilities
const NODE_WIDTH = 200;
const NODE_HEIGHT = 120;
const MIN_DISTANCE = 200; // Reduced from 250 for tighter spacing
const VIEWPORT_PADDING = 100; // Ensure nodes stay within viewport

const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }): number => {
  return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
};

const checkCollision = (pos1: { x: number; y: number }, pos2: { x: number; y: number }): boolean => {
  const distance = calculateDistance(pos1, pos2);
  return distance < MIN_DISTANCE;
};

// Improved positioning that keeps nodes in reasonable bounds
const findSafePosition = (
  desiredPosition: { x: number; y: number },
  existingNodes: Array<Node<NodeData>>,
  maxAttempts: number = 72 // more attempts for dense clusters
): { x: number; y: number } => {
  let currentPosition = { ...desiredPosition };
  let attempts = 0;
  const MIN_DISTANCE = 280; // increased minimum distance for clarity
  // Define reasonable viewport bounds
  const bounds = {
    minX: VIEWPORT_PADDING,
    maxX: 1600 - VIEWPORT_PADDING,
    minY: VIEWPORT_PADDING,
    maxY: 1200 - VIEWPORT_PADDING
  };
  while (attempts < maxAttempts) {
    let hasCollision = false;
    for (const node of existingNodes) {
      if (checkCollision(currentPosition, node.position)) {
        hasCollision = true;
        break;
      }
    }
    const withinBounds = currentPosition.x >= bounds.minX && 
                        currentPosition.x <= bounds.maxX && 
                        currentPosition.y >= bounds.minY && 
                        currentPosition.y <= bounds.maxY;
    if (!hasCollision && withinBounds) {
      return currentPosition;
    }
    // More aggressive spiral search
    const angle = (attempts * 0.7) * Math.PI;
    const radius = MIN_DISTANCE + (attempts * 18);
    currentPosition = {
      x: Math.max(bounds.minX, Math.min(bounds.maxX, desiredPosition.x + Math.cos(angle) * radius)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, desiredPosition.y + Math.sin(angle) * radius)),
    };
    attempts++;
  }
  // Fallback: offset in bounds
  return {
    x: Math.max(bounds.minX, Math.min(bounds.maxX, desiredPosition.x + (Math.random() - 0.5) * MIN_DISTANCE)),
    y: Math.max(bounds.minY, Math.min(bounds.maxY, desiredPosition.y + (Math.random() - 0.5) * MIN_DISTANCE)),
  };
};

const positionNodeSafely = (
  node: Node<NodeData>,
  desiredPosition: { x: number; y: number },
  existingNodes: Array<Node<NodeData>>
): void => {
  const safePosition = findSafePosition(desiredPosition, existingNodes);
  node.position = safePosition;
};

const ensureRootNodeVisibility = (rootNode: Node<NodeData>, allNodes: Array<Node<NodeData>>): void => {
  // Ensure root node is always visible and not overlapped
  const centerX = 800;
  const centerY = 600;
  
  // Check if root node is being overlapped
  let isOverlapped = false;
  for (const node of allNodes) {
    if (node.id !== rootNode.id && checkCollision(rootNode.position, node.position)) {
      isOverlapped = true;
      break;
    }
  }
  
  if (isOverlapped) {
    // Move overlapping nodes away from root
    for (const node of allNodes) {
      if (node.id !== rootNode.id && checkCollision(rootNode.position, node.position)) {
        const angle = Math.atan2(node.position.y - rootNode.position.y, node.position.x - rootNode.position.x);
        const newRadius = MIN_DISTANCE + 50;
        
        node.position = {
          x: rootNode.position.x + Math.cos(angle) * newRadius,
          y: rootNode.position.y + Math.sin(angle) * newRadius,
        };
      }
    }
  }
};

// Generate highly personalized topics based on the specific topic and context
const generateSpecificTopics = (topic: string, category: string): string[] => {
  const topicLower = topic.toLowerCase();
  const words = topic.split(' ');
  const keyTerms = words.filter(word => word.length > 3);
  
  // Extract specific context from the topic
  const extractContext = (topic: string) => {
    const context = {
      industry: '',
      technology: '',
      audience: '',
      goal: '',
      timeframe: '',
      scale: '',
      specific: ''
    };
    
    // Enhanced industry detection with more specific terms
    if (topicLower.includes('saas') || topicLower.includes('software') || topicLower.includes('platform') || topicLower.includes('subscription')) context.industry = 'SaaS';
    if (topicLower.includes('ecommerce') || topicLower.includes('retail') || topicLower.includes('shop') || topicLower.includes('store') || topicLower.includes('marketplace')) context.industry = 'E-commerce';
    if (topicLower.includes('healthcare') || topicLower.includes('medical') || topicLower.includes('health') || topicLower.includes('patient') || topicLower.includes('clinical')) context.industry = 'Healthcare';
    if (topicLower.includes('education') || topicLower.includes('learning') || topicLower.includes('course') || topicLower.includes('training') || topicLower.includes('academic')) context.industry = 'Education';
    if (topicLower.includes('finance') || topicLower.includes('banking') || topicLower.includes('payment') || topicLower.includes('money') || topicLower.includes('financial')) context.industry = 'Finance';
    if (topicLower.includes('real estate') || topicLower.includes('property') || topicLower.includes('housing') || topicLower.includes('rental') || topicLower.includes('realty')) context.industry = 'Real Estate';
    if (topicLower.includes('manufacturing') || topicLower.includes('production') || topicLower.includes('factory') || topicLower.includes('supply') || topicLower.includes('industrial')) context.industry = 'Manufacturing';
    if (topicLower.includes('consulting') || topicLower.includes('services') || topicLower.includes('agency') || topicLower.includes('firm') || topicLower.includes('advisory')) context.industry = 'Consulting';
    if (topicLower.includes('marketing') || topicLower.includes('advertising') || topicLower.includes('brand') || topicLower.includes('campaign') || topicLower.includes('promotion')) context.industry = 'Marketing';
    if (topicLower.includes('design') || topicLower.includes('creative') || topicLower.includes('art') || topicLower.includes('visual') || topicLower.includes('graphic')) context.industry = 'Creative';
    if (topicLower.includes('fitness') || topicLower.includes('gym') || topicLower.includes('workout') || topicLower.includes('exercise') || topicLower.includes('wellness')) context.industry = 'Fitness';
    if (topicLower.includes('food') || topicLower.includes('restaurant') || topicLower.includes('cooking') || topicLower.includes('recipe') || topicLower.includes('culinary')) context.industry = 'Food';
    if (topicLower.includes('travel') || topicLower.includes('tourism') || topicLower.includes('vacation') || topicLower.includes('trip') || topicLower.includes('hospitality')) context.industry = 'Travel';
    if (topicLower.includes('music') || topicLower.includes('audio') || topicLower.includes('sound') || topicLower.includes('recording') || topicLower.includes('musical')) context.industry = 'Music';
    if (topicLower.includes('gaming') || topicLower.includes('game') || topicLower.includes('play') || topicLower.includes('entertainment') || topicLower.includes('esports')) context.industry = 'Gaming';
    
    // Enhanced technology detection
    if (topicLower.includes('ai') || topicLower.includes('machine learning') || topicLower.includes('artificial intelligence') || topicLower.includes('neural') || topicLower.includes('deep learning')) context.technology = 'AI/ML';
    if (topicLower.includes('blockchain') || topicLower.includes('crypto') || topicLower.includes('bitcoin') || topicLower.includes('nft') || topicLower.includes('defi')) context.technology = 'Blockchain';
    if (topicLower.includes('mobile') || topicLower.includes('app') || topicLower.includes('ios') || topicLower.includes('android') || topicLower.includes('smartphone')) context.technology = 'Mobile';
    if (topicLower.includes('web') || topicLower.includes('online') || topicLower.includes('website') || topicLower.includes('internet') || topicLower.includes('digital')) context.technology = 'Web';
    if (topicLower.includes('cloud') || topicLower.includes('saas') || topicLower.includes('aws') || topicLower.includes('azure') || topicLower.includes('hosting')) context.technology = 'Cloud';
    if (topicLower.includes('vr') || topicLower.includes('ar') || topicLower.includes('virtual reality') || topicLower.includes('augmented') || topicLower.includes('metaverse')) context.technology = 'VR/AR';
    if (topicLower.includes('iot') || topicLower.includes('internet of things') || topicLower.includes('smart') || topicLower.includes('connected') || topicLower.includes('sensor')) context.technology = 'IoT';
    
    // Enhanced audience detection
    if (topicLower.includes('b2b') || topicLower.includes('enterprise') || topicLower.includes('business') || topicLower.includes('corporate') || topicLower.includes('commercial')) context.audience = 'B2B';
    if (topicLower.includes('b2c') || topicLower.includes('consumer') || topicLower.includes('customer') || topicLower.includes('user') || topicLower.includes('individual')) context.audience = 'B2C';
    if (topicLower.includes('startup') || topicLower.includes('small business') || topicLower.includes('entrepreneur') || topicLower.includes('founder') || topicLower.includes('new venture')) context.audience = 'Startup';
    if (topicLower.includes('freelancer') || topicLower.includes('consultant') || topicLower.includes('independent') || topicLower.includes('solo') || topicLower.includes('contractor')) context.audience = 'Freelancer';
    
    // Enhanced goal detection
    if (topicLower.includes('launch') || topicLower.includes('start') || topicLower.includes('begin') || topicLower.includes('create') || topicLower.includes('initiate')) context.goal = 'Launch';
    if (topicLower.includes('scale') || topicLower.includes('grow') || topicLower.includes('expand') || topicLower.includes('increase') || topicLower.includes('amplify')) context.goal = 'Scale';
    if (topicLower.includes('optimize') || topicLower.includes('improve') || topicLower.includes('enhance') || topicLower.includes('better') || topicLower.includes('upgrade')) context.goal = 'Optimize';
    if (topicLower.includes('transform') || topicLower.includes('change') || topicLower.includes('evolve') || topicLower.includes('upgrade') || topicLower.includes('revolutionize')) context.goal = 'Transform';
    if (topicLower.includes('automate') || topicLower.includes('streamline') || topicLower.includes('efficient') || topicLower.includes('process') || topicLower.includes('systematize')) context.goal = 'Automate';
    
    // Extract specific keywords for personalized generation - more focused
    const specificKeywords = keyTerms.filter(term => 
      term.length > 4 && 
      !['strategy', 'planning', 'management', 'development', 'marketing', 'business', 'system', 'process', 'solution', 'platform', 'service', 'product'].includes(term.toLowerCase())
    );
    if (specificKeywords.length > 0) {
      context.specific = specificKeywords.slice(0, 4).join(' '); // Take more specific keywords
    }
    
    return context;
  };
  
  const context = extractContext(topic);
  
  // Generate personalized topics based on the specific context
  const generatePersonalizedTopics = (baseTopic: string, context: any): string[] => {
    const personalizedTopics: string[] = [];
    
    // Advanced topic generation that's highly relevant to the original topic
    const generateRelevantTopics = () => {
      const topics: string[] = [];
      
      // Extract key concepts from the original topic
      const topicWords = baseTopic.toLowerCase().split(' ').filter(word => word.length > 3);
      const keyConcepts = topicWords.slice(0, 5); // Take first 5 meaningful words
      
      // Generate highly relevant topics based on the original topic's core concepts
      keyConcepts.forEach(concept => {
        if (concept.length > 4) {
          // Core strategy topics
          topics.push(
            `${concept.charAt(0).toUpperCase() + concept.slice(1)} Strategy & Planning`,
            `${concept.charAt(0).toUpperCase() + concept.slice(1)} Implementation & Execution`,
            `${concept.charAt(0).toUpperCase() + concept.slice(1)} Optimization & Performance`,
            `${concept.charAt(0).toUpperCase() + concept.slice(1)} Management & Governance`,
            `${concept.charAt(0).toUpperCase() + concept.slice(1)} Analysis & Assessment`
          );
        }
      });
      
      // Generate industry-specific relevant topics
      if (context.industry) {
        if (context.industry === 'SaaS') {
          topics.push(
            'Customer Success & Retention Strategy',
            'Product Development & Feature Roadmap',
            'Subscription Model & Pricing Optimization',
            'User Experience & Interface Design',
            'Data Analytics & Business Intelligence',
            'API Integration & Third-party Services',
            'Security & Compliance Implementation',
            'Scalability & Infrastructure Planning'
          );
        } else if (context.industry === 'E-commerce') {
          topics.push(
            'Customer Experience & Conversion Optimization',
            'Inventory Management & Supply Chain',
            'Payment Processing & Financial Security',
            'Multi-channel Sales Strategy',
            'Mobile Commerce & App Development',
            'Customer Support & Service Automation',
            'Marketing & Customer Acquisition',
            'Logistics & Fulfillment Strategy'
          );
        } else if (context.industry === 'Healthcare') {
          topics.push(
            'Patient Care & Clinical Workflow',
            'Data Management & Privacy Compliance',
            'Telemedicine & Remote Care Solutions',
            'Medical Device Integration',
            'Healthcare Analytics & Predictive Modeling',
            'Regulatory Compliance & Audit Systems',
            'Patient Engagement & Communication',
            'Interoperability & System Integration'
          );
        } else if (context.industry === 'Education') {
          topics.push(
            'Learning Management & Course Development',
            'Student Engagement & Gamification',
            'Assessment & Evaluation Systems',
            'Personalized Learning & Adaptive Technology',
            'Content Creation & Curriculum Design',
            'Student Analytics & Performance Tracking',
            'Collaborative Learning & Social Features',
            'Mobile Learning & Accessibility'
          );
        } else if (context.industry === 'Finance') {
          topics.push(
            'Digital Banking & Payment Solutions',
            'Risk Assessment & Fraud Detection',
            'Investment Management & Portfolio Optimization',
            'Regulatory Compliance & Audit Systems',
            'Customer Onboarding & KYC Processes',
            'Financial Analytics & Reporting',
            'Blockchain & Cryptocurrency Integration',
            'Mobile Banking & Security'
          );
        }
      }
      
      // Generate technology-specific relevant topics
      if (context.technology) {
        if (context.technology === 'AI/ML') {
          topics.push(
            'Machine Learning Model Development',
            'Natural Language Processing & Chatbots',
            'Computer Vision & Image Recognition',
            'Predictive Analytics & Forecasting',
            'AI Ethics & Bias Mitigation',
            'Model Deployment & MLOps',
            'Data Pipeline & ETL Processes',
            'AI Governance & Model Monitoring'
          );
        } else if (context.technology === 'Blockchain') {
          topics.push(
            'Smart Contract Development & Security',
            'Token Economics & Cryptocurrency',
            'Decentralized Application Architecture',
            'Cross-chain Interoperability',
            'Blockchain Governance & Consensus',
            'Digital Identity & Authentication',
            'Supply Chain Transparency',
            'DeFi Integration & Innovation'
          );
        } else if (context.technology === 'Mobile') {
          topics.push(
            'Cross-platform Development & Optimization',
            'Mobile App Security & Data Protection',
            'User Experience & Interface Design',
            'Push Notification & Engagement',
            'App Store Optimization & Marketing',
            'Mobile Analytics & Performance',
            'Offline Functionality & Synchronization',
            'Mobile Payment & E-commerce'
          );
        }
      }
      
      // Generate audience-specific relevant topics
      if (context.audience) {
        if (context.audience === 'B2B') {
          topics.push(
            'Enterprise Sales & Account Management',
            'B2B Marketing & Lead Generation',
            'Customer Success & Relationship Management',
            'Enterprise Integration & API Development',
            'Sales Enablement & Training',
            'Account-based Marketing & Personalization',
            'Enterprise Security & Compliance',
            'B2B Analytics & Performance'
          );
        } else if (context.audience === 'Startup') {
          topics.push(
            'MVP Development & Rapid Prototyping',
            'Customer Discovery & Market Validation',
            'Funding Strategy & Investor Relations',
            'Lean Startup Methodology & Iteration',
            'Growth Hacking & Viral Marketing',
            'Team Building & Culture Development',
            'Product-Market Fit & Pivot Strategy',
            'Scaling Infrastructure & Automation'
          );
        }
      }
      
      // Generate goal-specific relevant topics
      if (context.goal) {
        if (context.goal === 'Launch') {
          topics.push(
            'Go-to-Market Strategy & Planning',
            'Beta Testing & User Feedback',
            'Marketing Campaign & PR Strategy',
            'Launch Metrics & Success Measurement',
            'Customer Support & Onboarding',
            'Post-launch Optimization & Iteration',
            'Partnership Development & Channel Strategy',
            'Launch Risk Mitigation & Contingency'
          );
        } else if (context.goal === 'Scale') {
          topics.push(
            'Scaling Infrastructure & Technology',
            'Team Scaling & Organizational Development',
            'Market Expansion & Geographic Growth',
            'Process Automation & Efficiency',
            'International Expansion & Localization',
            'Partnership & Acquisition Strategy',
            'Revenue Scaling & Business Model Evolution',
            'Operational Excellence & Quality Assurance'
          );
        }
      }
      
      // Generate highly specific topics using the original topic's unique keywords
      if (context.specific) {
        const specificWords = context.specific.split(' ');
        specificWords.forEach(word => {
          if (word.length > 4) {
            topics.push(
              `${word.charAt(0).toUpperCase() + word.slice(1)} Strategy & Implementation`,
              `${word.charAt(0).toUpperCase() + word.slice(1)} Optimization & Analytics`,
              `${word.charAt(0).toUpperCase() + word.slice(1)} Integration & Automation`,
              `${word.charAt(0).toUpperCase() + word.slice(1)} Management & Governance`,
              `${word.charAt(0).toUpperCase() + word.slice(1)} Development & Innovation`
            );
          }
        });
      }
      
      // Add cross-context combinations for more unique topics
      if (context.industry && context.technology) {
        topics.push(
          `${context.technology} Integration for ${context.industry}`,
          `${context.industry} ${context.technology} Solutions`,
          `${context.technology} Strategy for ${context.industry} Growth`,
          `${context.industry} ${context.technology} Innovation`
        );
      }
      
      if (context.audience && context.goal) {
        topics.push(
          `${context.goal} Strategy for ${context.audience}`,
          `${context.audience} ${context.goal} Implementation`,
          `${context.goal} Optimization for ${context.audience}`,
          `${context.audience} ${context.goal} Innovation`
        );
      }
      
      return topics;
    };
    
    return generateRelevantTopics().slice(0, 40); // Generate 40 highly relevant topics
  };
  
  return generatePersonalizedTopics(topic, context);
};

// Enhanced layout algorithms
const applyLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], layout: string) => {
  // Create a deep copy of nodes to avoid mutation issues
  const updatedNodes = nodes.map(node => ({
    ...node,
    position: { ...node.position }
  }));

  // Helper: Find all connected components (subgraphs)
  const findConnectedComponents = (nodes: Node<NodeData>[], edges: Edge[]) => {
    const visited = new Set<string>();
    const components: Node<NodeData>[][] = [];
    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    const edgeMap = new Map<string, string[]>();
    edges.forEach(e => {
      if (!edgeMap.has(e.source)) edgeMap.set(e.source, []);
      if (!edgeMap.has(e.target)) edgeMap.set(e.target, []);
      edgeMap.get(e.source)!.push(e.target);
      edgeMap.get(e.target)!.push(e.source);
    });
    for (const node of nodes) {
      if (!visited.has(node.id)) {
        const queue = [node.id];
        const component: Node<NodeData>[] = [];
        visited.add(node.id);
        while (queue.length > 0) {
          const curr = queue.shift()!;
          component.push(nodeMap.get(curr)!);
          (edgeMap.get(curr) || []).forEach(neigh => {
            if (!visited.has(neigh)) {
              visited.add(neigh);
              queue.push(neigh);
            }
          });
        }
        components.push(component);
      }
    }
    return components;
  };

  // Find all connected components
  const components = findConnectedComponents(updatedNodes, edges);

  // 1. Find the largest component (main map)
  let mainComponent = components[0] || [];
  for (const comp of components) {
    if (comp.length > mainComponent.length) mainComponent = comp;
  }
  // 2. Lay out the main map from its root node
  const mainEdges = edges.filter(e => mainComponent.some(n => n.id === e.source || n.id === e.target));
  const rootNode = mainComponent.find(n => !mainEdges.some(e => e.target === n.id)) || mainComponent[0];
  if (rootNode) {
    switch (layout) {
      case 'radial':
        applyRadialLayout(mainComponent, mainEdges, rootNode, 900, 600);
        break;
      case 'tree-horizontal':
        applyHorizontalTreeLayout(mainComponent, mainEdges, rootNode, 900, 600);
        break;
      case 'tree-vertical':
        applyVerticalTreeLayout(mainComponent, mainEdges, rootNode, 900, 600);
        break;
      case 'hierarchical':
        applyHierarchicalLayout(mainComponent, mainEdges, rootNode, 900, 600);
        break;
      case 'organic':
        applyOrganicLayout(mainComponent, mainEdges, rootNode, 900, 600);
        break;
      case 'spiral':
        applySpiralLayout(mainComponent, mainEdges, rootNode, 900, 600);
        break;
      case 'force-directed':
        applyForceDirectedLayout(mainComponent, mainEdges, rootNode, 900, 600);
        break;
      case 'hexagonal':
        applyHexagonalLayout(mainComponent, mainEdges, rootNode, 900, 600);
        break;
      case 'fractal':
        applyFractalLayout(mainComponent, mainEdges, rootNode, 900, 600);
        break;
      case 'galaxy':
        applyGalaxyLayout(mainComponent, mainEdges, rootNode, 900, 600);
        break;
      case 'neural':
        applyNeuralLayout(mainComponent, mainEdges, rootNode, 900, 600);
        break;
      case 'molecular':
        applyMolecularLayout(mainComponent, mainEdges, rootNode, 900, 600);
        break;
      case 'freeform':
      default:
        // Do nothing, keep current positions
        break;
    }
  }
  // 3. Place any truly disconnected nodes (not in mainComponent) in a small cluster near the main map
  const orphanComponents = components.filter(comp => comp !== mainComponent);
  let orphanAngle = 0;
  const orphanRadius = 600;
  orphanComponents.forEach((comp, i) => {
    comp.forEach((node, j) => {
      node.position = {
        x: 900 + Math.cos(orphanAngle + j) * orphanRadius,
        y: 1200 + Math.sin(orphanAngle + j) * orphanRadius,
      };
    });
    orphanAngle += Math.PI / 4;
  });
  // Final anti-overlap pass
  nudgeOverlappingNodes(updatedNodes);
  return updatedNodes;
};

const applyRadialLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>, centerX: number, centerY: number) => {
  const baseRadius = 260;
  const childRadius = 200;
  rootNode.position = { x: centerX, y: centerY };
  const rootChildren = edges.filter(e => e.source === rootNode.id).map(e => e.target);
  const childNodes = nodes.filter(n => rootChildren.includes(n.id));
  const categoryGroups: { [key: string]: Node<NodeData>[] } = {};
  childNodes.forEach(node => {
    const category = (node.data as NodeData).category || 'default';
    if (!categoryGroups[category]) categoryGroups[category] = [];
    categoryGroups[category].push(node);
  });
  const positionedNodes: Node<NodeData>[] = [rootNode];
  let currentAngle = 0;
  const totalCategories = Object.keys(categoryGroups).length;
  Object.entries(categoryGroups).forEach(([category, categoryNodes], categoryIndex) => {
    const sectorAngle = (2 * Math.PI) / totalCategories;
    const categoryCenter = currentAngle + sectorAngle / 2;
    categoryNodes.forEach((node, nodeIndex) => {
      const totalNodesInCategory = categoryNodes.length;
      let nodeAngle;
      if (totalNodesInCategory === 1) {
        nodeAngle = categoryCenter;
      } else {
        const angleSpread = Math.min(sectorAngle * 0.7, Math.PI / 2);
        const startAngle = categoryCenter - angleSpread / 2;
        nodeAngle = startAngle + (nodeIndex / (totalNodesInCategory - 1)) * angleSpread;
      }
      const radius = baseRadius + (nodeIndex % 2) * 40;
      const desiredPosition = {
        x: centerX + Math.cos(nodeAngle) * radius,
        y: centerY + Math.sin(nodeAngle) * radius,
      };
      node.position = findSafePosition(desiredPosition, positionedNodes, 48);
      positionedNodes.push(node);
      if (!(node.data as NodeData).color) {
        (node.data as NodeData).color = getColorForCategory(category);
      }
    });
    currentAngle += sectorAngle;
  });
  // Recursively position grandchildren
  childNodes.forEach((childNode) => {
    const grandChildren = edges.filter(e => e.source === childNode.id).map(e => e.target);
    const grandChildNodes = nodes.filter(n => grandChildren.includes(n.id));
    if (grandChildNodes.length > 0) {
      const childX = childNode.position.x;
      const childY = childNode.position.y;
      const childCategory = (childNode.data as NodeData).category || 'default';
      grandChildNodes.forEach((grandChild, grandChildIndex) => {
        const angleToCenter = Math.atan2(childY - centerY, childX - centerX);
        const baseAngle = angleToCenter + Math.PI;
        const angleOffset = (grandChildIndex - (grandChildNodes.length - 1) / 2) * (Math.PI / 4);
        const finalAngle = baseAngle + angleOffset;
        const radius = childRadius;
        const desiredPosition = {
          x: childX + Math.cos(finalAngle) * radius,
          y: childY + Math.sin(finalAngle) * radius,
        };
        grandChild.position = findSafePosition(desiredPosition, positionedNodes, 48);
        positionedNodes.push(grandChild);
        if (!(grandChild.data as NodeData).color) {
          (grandChild.data as NodeData).color = getColorForCategory(childCategory);
        }
      });
    }
  });
  return nodes;
};

const applyVerticalTreeLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>, centerX: number, centerY: number) => {
  const visited = new Set<string>();
  const levelHeight = 180; // Optimized spacing
  const startX = centerX - (levelHeight / 2); // Centered
  const startY = centerY - (levelHeight / 2); // Top margin
  
  console.log('Applying vertical tree layout, root node:', rootNode.id);
  
  const positionNode = (nodeId: string, level: number, siblingIndex: number, siblingsCount: number) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    // Calculate position with better organization
    const baseWidth = Math.max(1000, siblingsCount * 250); // Optimized spacing
    const totalWidth = baseWidth + (level * 80); // Gradual width increase
    const spacing = siblingsCount > 1 ? totalWidth / (siblingsCount - 1) : 0;
    const nodeX = startX - (totalWidth / 2) + (siblingIndex * spacing);
    
    node.position = {
      x: nodeX,
      y: startY + (level * levelHeight),
    };
    
    // Ensure minimum spacing between nodes
    if (siblingIndex > 0) {
      const prevNode = nodes.find(n => n.id === Array.from(visited).slice(-2)[0]);
      if (prevNode && Math.abs(node.position.x - prevNode.position.x) < 180) {
        node.position.x = prevNode.position.x + 180;
      }
    }
    
    // Assign category color if not already set
    const nodeData = node.data as NodeData;
    if (!nodeData.color && nodeData.category) {
      nodeData.color = getColorForCategory(nodeData.category);
    }
    
    console.log(`Positioned node ${node.id} at level ${level}, position (${node.position.x}, ${node.position.y})`);
    
    const children = edges.filter(e => e.source === nodeId).map(e => e.target);
    children.forEach((childId, index) => {
      positionNode(childId, level + 1, index, children.length);
    });
  };
  
  positionNode(rootNode.id, 0, 0, 1);
  return nodes;
};

const applyHorizontalTreeLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>, centerX: number, centerY: number) => {
  const visited = new Set<string>();
  const levelWidth = 280; // Optimized spacing
  const startX = centerX - (levelWidth / 2); // Left margin
  const startY = centerY - (levelWidth / 2); // Centered
  
  console.log('Applying horizontal tree layout, root node:', rootNode.id);
  
  const positionNode = (nodeId: string, level: number, siblingIndex: number, siblingsCount: number) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    // Calculate position with better organization
    const baseHeight = Math.max(800, siblingsCount * 200); // Optimized spacing
    const totalHeight = baseHeight + (level * 80); // Gradual height increase
    const spacing = siblingsCount > 1 ? totalHeight / (siblingsCount - 1) : 0;
    const nodeY = startY - (totalHeight / 2) + (siblingIndex * spacing);
    
    node.position = {
      x: centerX + (level * levelWidth),
      y: nodeY,
    };
    
    // Ensure minimum spacing between nodes
    if (siblingIndex > 0) {
      const prevNode = nodes.find(n => n.id === Array.from(visited).slice(-2)[0]);
      if (prevNode && Math.abs(node.position.y - prevNode.position.y) < 160) {
        node.position.y = prevNode.position.y + 160;
      }
    }
    
    // Assign category color if not already set
    const nodeData = node.data as NodeData;
    if (!nodeData.color && nodeData.category) {
      nodeData.color = getColorForCategory(nodeData.category);
    }
    
    console.log(`Positioned node ${node.id} at level ${level}, position (${node.position.x}, ${node.position.y})`);
    
    const children = edges.filter(e => e.source === nodeId).map(e => e.target);
    children.forEach((childId, index) => {
      positionNode(childId, level + 1, index, children.length);
    });
  };
  
  positionNode(rootNode.id, 0, 0, 1);
  return nodes;
};

const applyHierarchicalLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>, centerX: number, centerY: number) => {
  const visited = new Set<string>();
  const levelHeight = 140; // Optimized spacing
  const startX = centerX - (levelHeight / 2); // Centered
  const startY = centerY - (levelHeight / 2); // Top margin
  
  console.log('Applying hierarchical layout, root node:', rootNode.id);
  
  const positionNode = (nodeId: string, level: number, siblingIndex: number, siblingsCount: number) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    const totalWidth = Math.max(800, siblingsCount * 200); // Optimized spacing
    const spacing = siblingsCount > 1 ? totalWidth / (siblingsCount - 1) : 0;
    const nodeX = startX - (totalWidth / 2) + (siblingIndex * spacing);
    
    node.position = {
      x: nodeX,
      y: startY + (level * levelHeight),
    };
    
    // Assign category color if not already set
    const nodeData = node.data as NodeData;
    if (!nodeData.color && nodeData.category) {
      nodeData.color = getColorForCategory(nodeData.category);
    }
    
    console.log(`Positioned node ${node.id} at level ${level}, position (${node.position.x}, ${node.position.y})`);
    
    const children = edges.filter(e => e.source === nodeId).map(e => e.target);
    children.forEach((childId, index) => {
      positionNode(childId, level + 1, index, children.length);
    });
  };
  
  positionNode(rootNode.id, 0, 0, 1);
  return nodes;
};

const applyOrganicLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>, centerX: number, centerY: number) => {
  const baseRadius = 200;
  
  console.log('Applying organic layout, root node:', rootNode.id);
  
  // Position root node at center
  rootNode.position = { x: centerX, y: centerY };
  
  // Get all children of root and group by category
  const rootChildren = edges.filter(e => e.source === rootNode.id).map(e => e.target);
  const childNodes = nodes.filter(n => rootChildren.includes(n.id));
  
  // Group children by category for better organization
  const categoryGroups: { [key: string]: Node<NodeData>[] } = {};
  childNodes.forEach(node => {
    const category = (node.data as NodeData).category || 'default';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(node);
  });
  
  console.log(`Found ${childNodes.length} child nodes in ${Object.keys(categoryGroups).length} categories for organic layout`);
  
  // Position children by category in organized clusters
  let currentAngle = 0;
  Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
    const sectorAngle = (2 * Math.PI) / Object.keys(categoryGroups).length;
    const nodesPerCategory = categoryNodes.length;
    
    categoryNodes.forEach((node, index) => {
      const angle = currentAngle + (index / nodesPerCategory) * sectorAngle * 0.7; // 70% of sector
      const radius = baseRadius + (Math.random() * 40); // Reduced randomness
      const offsetX = (Math.random() - 0.5) * 20; // Reduced offset
      const offsetY = (Math.random() - 0.5) * 20;
      
      node.position = {
        x: centerX + Math.cos(angle) * radius + offsetX,
        y: centerY + Math.sin(angle) * radius + offsetY,
      };
      
      // Assign category color if not already set
      if (!(node.data as NodeData).color) {
        (node.data as NodeData).color = getColorForCategory(category);
      }
      
      // Ensure minimum distance from other nodes
      const minDistance = 100;
      for (let i = 0; i < index; i++) {
        const otherNode = categoryNodes[i];
        const distance = Math.sqrt(
          Math.pow(node.position.x - otherNode.position.x, 2) + 
          Math.pow(node.position.y - otherNode.position.y, 2)
        );
        
        if (distance < minDistance) {
          const angle = Math.atan2(
            node.position.y - otherNode.position.y,
            node.position.x - otherNode.position.x
          );
          node.position.x = otherNode.position.x + Math.cos(angle) * minDistance;
          node.position.y = otherNode.position.y + Math.sin(angle) * minDistance;
        }
      }
      
      console.log(`Positioned ${category} child ${node.id} at (${node.position.x}, ${node.position.y})`);
    });
    
    currentAngle += sectorAngle;
  });
  
  return nodes;
};

const applySpiralLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>, centerX: number, centerY: number) => {
  const spiralRadius = 60;
  const spiralSpacing = 40; // Optimized spacing
  
  console.log('Applying spiral layout, root node:', rootNode.id);
  
  // Position root node at center
  rootNode.position = { x: centerX, y: centerY };
  
  // Get all children of root and group by category
  const rootChildren = edges.filter(e => e.source === rootNode.id).map(e => e.target);
  const childNodes = nodes.filter(n => rootChildren.includes(n.id));
  
  // Group children by category for better organization
  const categoryGroups: { [key: string]: Node<NodeData>[] } = {};
  childNodes.forEach(node => {
    const category = (node.data as NodeData).category || 'default';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(node);
  });
  
  console.log(`Found ${childNodes.length} child nodes in ${Object.keys(categoryGroups).length} categories for spiral layout`);
  
  // Position children by category in organized spiral sectors
  let currentIndex = 0;
  Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
    categoryNodes.forEach((node, categoryIndex) => {
      const angle = currentIndex * 0.5; // Optimized angle increment
      const radius = spiralRadius + (currentIndex * spiralSpacing);
      
      node.position = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
      
      // Assign category color if not already set
      if (!(node.data as NodeData).color) {
        (node.data as NodeData).color = getColorForCategory(category);
      }
      
      console.log(`Positioned ${category} child ${node.id} at (${node.position.x}, ${node.position.y})`);
      currentIndex++;
    });
  });
  
  return nodes;
};

const applyForceDirectedLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>, centerX: number, centerY: number) => {
  // Position root at center
  rootNode.position = { x: centerX, y: centerY };
  
  const otherNodes = nodes.filter(n => n.id !== rootNode.id);
  
  // Group nodes by category for better initial positioning
  const categoryGroups: { [key: string]: Node<NodeData>[] } = {};
  otherNodes.forEach(node => {
    const category = (node.data as NodeData).category || 'default';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(node);
  });
  
  // Initialize nodes by category in organized clusters
  let currentAngle = 0;
  Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
    const sectorAngle = (2 * Math.PI) / Object.keys(categoryGroups).length;
    
    categoryNodes.forEach((node, index) => {
      const angle = currentAngle + (index / categoryNodes.length) * sectorAngle * 0.8;
      const radius = 180 + (index * 20); // Gradual radius increase within category
      
      node.position = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
      
      // Assign category color if not already set
      if (!(node.data as NodeData).color) {
        (node.data as NodeData).color = getColorForCategory(category);
      }
    });
    
    currentAngle += sectorAngle;
  });
  
  // Enhanced force-directed simulation
  const iterations = 80; // Optimized iterations
  const minDistance = 100; // Optimized minimum distance
  
  for (let iter = 0; iter < iterations; iter++) {
    otherNodes.forEach((node, i) => {
      let fx = 0, fy = 0;
      
      // Repulsion from other nodes
      otherNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const dx = node.position.x - otherNode.position.x;
          const dy = node.position.y - otherNode.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0) {
            // Optimized repulsion forces
            const force = distance < minDistance ? 1500 / (distance * distance) : 400 / (distance * distance);
            fx += (dx / distance) * force;
            fy += (dy / distance) * force;
          }
        }
      });
      
      // Attraction to root
      const dx = centerX - node.position.x;
      const dy = centerY - node.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0) {
        const force = distance * 0.03; // Optimized attraction force
        fx += (dx / distance) * force;
        fy += (dy / distance) * force;
      }
      
      // Apply forces with damping
      const damping = 0.04; // Optimized damping
      node.position.x += fx * damping;
      node.position.y += fy * damping;
    });
  }
  
  console.log(`Force-directed layout completed for ${otherNodes.length} nodes`);
  return nodes;
};

// Advanced Layout Algorithms

const applyHexagonalLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>, centerX: number, centerY: number) => {
  const hexSize = 150; // Increased for better spacing
  
  console.log('Applying hexagonal layout, root node:', rootNode.id);
  
  // Position root node at center and ensure it's visible
  rootNode.position = { x: centerX, y: centerY };
  
  // Get all children of root and group by category
  const rootChildren = edges.filter(e => e.source === rootNode.id).map(e => e.target);
  const childNodes = nodes.filter(n => rootChildren.includes(n.id));
  
  // Group children by category
  const categoryGroups: { [key: string]: Node<NodeData>[] } = {};
  childNodes.forEach(node => {
    const category = (node.data as NodeData).category || 'default';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(node);
  });
  
  // Track positioned nodes for collision detection
  const positionedNodes: Node<NodeData>[] = [rootNode];
  
  // Position children in hexagonal pattern with collision avoidance
  let currentIndex = 0;
  Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
    categoryNodes.forEach((node, categoryIndex) => {
      const ring = Math.floor(currentIndex / 6) + 1;
      const positionInRing = currentIndex % 6;
      const angle = (positionInRing * Math.PI) / 3;
      const radius = ring * hexSize * 1.5;
      
      const desiredPosition = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
      
      // Use collision detection to find safe position
      positionNodeSafely(node, desiredPosition, positionedNodes);
      positionedNodes.push(node);
      
      // Assign category color
      if (!(node.data as NodeData).color) {
        (node.data as NodeData).color = getColorForCategory(category);
      }
      
      currentIndex++;
    });
  });
  
  // Final check to ensure root node visibility
  ensureRootNodeVisibility(rootNode, nodes);
  
  console.log('Hexagonal layout completed with collision avoidance');
  return nodes;
};

const applyFractalLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>, centerX: number, centerY: number) => {
  const baseRadius = 150;
  
  console.log('Applying fractal layout, root node:', rootNode.id);
  
  // Position root node at center
  rootNode.position = { x: centerX, y: centerY };
  
  // Get all children of root and group by category
  const rootChildren = edges.filter(e => e.source === rootNode.id).map(e => e.target);
  const childNodes = nodes.filter(n => rootChildren.includes(n.id));
  
  // Group children by category
  const categoryGroups: { [key: string]: Node<NodeData>[] } = {};
  childNodes.forEach(node => {
    const category = (node.data as NodeData).category || 'default';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(node);
  });
  
  // Position children in fractal pattern
  let currentAngle = 0;
  Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
    const sectorAngle = (2 * Math.PI) / Object.keys(categoryGroups).length;
    
    categoryNodes.forEach((node, index) => {
      const angle = currentAngle + (index / categoryNodes.length) * sectorAngle * 0.8;
      const radius = baseRadius * Math.pow(1.5, Math.floor(index / 3));
      const spiralAngle = angle + (index * 0.3);
      
      node.position = {
        x: centerX + Math.cos(spiralAngle) * radius,
        y: centerY + Math.sin(spiralAngle) * radius,
      };
      
      // Assign category color
      if (!(node.data as NodeData).color) {
        (node.data as NodeData).color = getColorForCategory(category);
      }
    });
    
    currentAngle += sectorAngle;
  });
  
  return nodes;
};

const applyGalaxyLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>, centerX: number, centerY: number) => {
  const baseRadius = 100;
  
  console.log('Applying galaxy layout, root node:', rootNode.id);
  
  // Position root node at center
  rootNode.position = { x: centerX, y: centerY };
  
  // Get all children of root and group by category
  const rootChildren = edges.filter(e => e.source === rootNode.id).map(e => e.target);
  const childNodes = nodes.filter(n => rootChildren.includes(n.id));
  
  // Group children by category
  const categoryGroups: { [key: string]: Node<NodeData>[] } = {};
  childNodes.forEach(node => {
    const category = (node.data as NodeData).category || 'default';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(node);
  });
  
  // Position children in galaxy spiral pattern
  let currentIndex = 0;
  Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
    categoryNodes.forEach((node, categoryIndex) => {
      const angle = currentIndex * 0.8;
      const radius = baseRadius + (currentIndex * 25);
      const spiralOffset = Math.sin(currentIndex * 0.5) * 30;
      
      node.position = {
        x: centerX + Math.cos(angle) * radius + spiralOffset,
        y: centerY + Math.sin(angle) * radius + spiralOffset,
      };
      
      // Assign category color
      if (!(node.data as NodeData).color) {
        (node.data as NodeData).color = getColorForCategory(category);
      }
      
      currentIndex++;
    });
  });
  
  return nodes;
};

const applyNeuralLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>, centerX: number, centerY: number) => {
  const baseRadius = 180;
  
  console.log('Applying neural layout, root node:', rootNode.id);
  
  // Position root node at center
  rootNode.position = { x: centerX, y: centerY };
  
  // Get all children of root and group by category
  const rootChildren = edges.filter(e => e.source === rootNode.id).map(e => e.target);
  const childNodes = nodes.filter(n => rootChildren.includes(n.id));
  
  // Group children by category
  const categoryGroups: { [key: string]: Node<NodeData>[] } = {};
  childNodes.forEach(node => {
    const category = (node.data as NodeData).category || 'default';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(node);
  });
  
  // Position children in neural network pattern
  let currentAngle = 0;
  Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
    const sectorAngle = (2 * Math.PI) / Object.keys(categoryGroups).length;
    
    categoryNodes.forEach((node, index) => {
      const angle = currentAngle + (index / categoryNodes.length) * sectorAngle * 0.7;
      const radius = baseRadius + (Math.random() * 60);
      const neuralOffset = Math.sin(index * 0.7) * 40;
      
      node.position = {
        x: centerX + Math.cos(angle) * radius + neuralOffset,
        y: centerY + Math.sin(angle) * radius + neuralOffset,
      };
      
      // Assign category color
      if (!(node.data as NodeData).color) {
        (node.data as NodeData).color = getColorForCategory(category);
      }
    });
    
    currentAngle += sectorAngle;
  });
  
  return nodes;
};

const applyMolecularLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>, centerX: number, centerY: number) => {
  const baseRadius = 140;
  
  console.log('Applying molecular layout, root node:', rootNode.id);
  
  // Position root node at center
  rootNode.position = { x: centerX, y: centerY };
  
  // Get all children of root and group by category
  const rootChildren = edges.filter(e => e.source === rootNode.id).map(e => e.target);
  const childNodes = nodes.filter(n => rootChildren.includes(n.id));
  
  // Group children by category
  const categoryGroups: { [key: string]: Node<NodeData>[] } = {};
  childNodes.forEach(node => {
    const category = (node.data as NodeData).category || 'default';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(node);
  });
  
  // Position children in molecular pattern
  let currentIndex = 0;
  Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
    categoryNodes.forEach((node, categoryIndex) => {
      const angle = currentIndex * 1.2;
      const radius = baseRadius + (Math.floor(currentIndex / 4) * 80);
      const molecularOffset = Math.cos(currentIndex * 0.8) * 35;
      
      node.position = {
        x: centerX + Math.cos(angle) * radius + molecularOffset,
        y: centerY + Math.sin(angle) * radius + molecularOffset,
      };
      
      // Assign category color
      if (!(node.data as NodeData).color) {
        (node.data as NodeData).color = getColorForCategory(category);
      }
      
      currentIndex++;
    });
  });
  
  return nodes;
};

// Custom themes - Consolidated to best ones
const customThemes = {
  'nov8-classic': {
    name: 'NOV8 Classic',
    colors: {
      primary: 'hsl(267 85% 66%)',
      secondary: 'hsl(213 94% 68%)',
      accent: 'hsl(292 91% 76%)',
      background: 'hsl(240 10% 98%)',
      surface: 'hsl(0 0% 100%)',
      text: 'hsl(222.2 84% 4.9%)',
    }
  },
  'nov8-dark': {
    name: 'NOV8 Dark',
    colors: {
      primary: 'hsl(267 85% 66%)',
      secondary: 'hsl(213 94% 68%)',
      accent: 'hsl(292 91% 76%)',
      background: 'hsl(240 10% 8%)',
      surface: 'hsl(240 10% 12%)',
      text: 'hsl(0 0% 98%)',
    }
  },
  'ocean-blue': {
    name: 'Ocean Blue',
    colors: {
      primary: 'hsl(200 100% 50%)',
      secondary: 'hsl(180 100% 40%)',
      accent: 'hsl(220 100% 60%)',
      background: 'hsl(210 40% 98%)',
      surface: 'hsl(0 0% 100%)',
      text: 'hsl(222.2 84% 4.9%)',
    }
  },
  'ocean-dark': {
    name: 'Ocean Dark',
    colors: {
      primary: 'hsl(200 100% 50%)',
      secondary: 'hsl(180 100% 40%)',
      accent: 'hsl(220 100% 60%)',
      background: 'hsl(210 40% 8%)',
      surface: 'hsl(210 40% 12%)',
      text: 'hsl(0 0% 98%)',
    }
  },
  'forest-green': {
    name: 'Forest Green',
    colors: {
      primary: 'hsl(142 76% 36%)',
      secondary: 'hsl(120 60% 50%)',
      accent: 'hsl(160 100% 40%)',
      background: 'hsl(120 20% 98%)',
      surface: 'hsl(0 0% 100%)',
      text: 'hsl(222.2 84% 4.9%)',
    }
  },
  'midnight-purple': {
    name: 'Midnight Purple',
    colors: {
      primary: 'hsl(280 100% 70%)',
      secondary: 'hsl(267 85% 66%)',
      accent: 'hsl(292 91% 76%)',
      background: 'hsl(240 10% 98%)',
      surface: 'hsl(0 0% 100%)',
      text: 'hsl(222.2 84% 4.9%)',
    }
  },
  'cyber-blue': {
    name: 'Cyber Blue',
    colors: {
      primary: 'hsl(220 100% 60%)',
      secondary: 'hsl(180 100% 50%)',
      accent: 'hsl(280 100% 70%)',
      background: 'hsl(220 40% 98%)',
      surface: 'hsl(0 0% 100%)',
      text: 'hsl(222.2 84% 4.9%)',
    }
  }
};

interface MindMapCanvasProps {
  className?: string;
}

const MindMapCanvasInner: React.FC<MindMapCanvasProps> = ({ className }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('freeform');
  const [currentTheme, setCurrentTheme] = useState('nov8-classic');
  const [customTheme, setCustomTheme] = useState(customThemes['nov8-classic' as keyof typeof customThemes]);
  const [history, setHistory] = useState<Array<{ nodes: Node<NodeData>[]; edges: Edge[] }>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLayoutLoading, setIsLayoutLoading] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [fundamentalNodes, setFundamentalNodes] = useState<FundamentalNode[]>([]);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  // Core functions
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addToHistory = useCallback((newNodes: Node<NodeData>[], newEdges: Edge[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ nodes: newNodes, edges: newEdges });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleAddNode = useCallback(async (parentId?: string) => {
    const parentNode = parentId ? nodes.find(n => n.id === parentId) : null;
    
    let newPosition;
    if (parentNode) {
      // Improved child positioning logic
      const existingChildren = edges.filter(e => e.source === parentId).map(e => e.target);
      const childCount = existingChildren.length;
      
      // Position new child in a more organized way
      const angle = (childCount * (Math.PI / 3)) + (Math.random() - 0.5) * 0.3; // Add slight randomness
      const distance = 180 + (childCount * 20); // Increase distance with more children
      
      const desiredPosition = {
        x: parentNode.position.x + Math.cos(angle) * distance,
        y: parentNode.position.y + Math.sin(angle) * distance,
      };
      
      newPosition = findSafePosition(desiredPosition, nodes);
    } else {
      // For root nodes, position near center
      newPosition = findSafePosition(
        {
          x: 600 + (Math.random() - 0.5) * 200,
          y: 400 + (Math.random() - 0.5) * 200,
        },
        nodes
      );
    }

    let nodeLabel = 'New Idea';
    let nodeDescription = '';
    let nodeCategory = 'general';
    
    // Simple node creation without automatic AI generation
    // AI generation should only happen when explicitly requested
    nodeLabel = 'New Node';
    nodeDescription = '';
    nodeCategory = 'general';
    
    const newNode: Node<NodeData> = {
      id: `${Date.now()}`,
      type: 'mindMapNode',
      position: newPosition,
      data: { 
        label: nodeLabel, 
        color: getContextualColor(nodeCategory),
        fontSize: parentNode ? 13 : 14,
        parentId: parentId,
        category: nodeCategory,
        messages: nodeDescription ? [nodeDescription] : [],
        opacity: 1,
        aiGenerated: false,
        importance: parentNode ? 5 : 7
      },
    };
    
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    
    // Create connection if parent exists
    if (parentId) {
      const newEdge: Edge = {
        id: `edge-${parentId}-${newNode.id}`,
        source: parentId,
        target: newNode.id,
        type: 'smoothstep',
        animated: false,
        style: { stroke: getContextualColor(nodeCategory), strokeWidth: 2 }
      };
      const newEdges = [...edges, newEdge];
      setEdges(newEdges);
      addToHistory(newNodes, newEdges);
    } else {
      addToHistory(newNodes, edges);
    }
    
    // Instantly fit view to new node using requestAnimationFrame for smoothness
    if (reactFlowInstance) {
      requestAnimationFrame(() => {
        reactFlowInstance.fitView({ padding: 0.1, duration: 400 });
      });
    }
  }, [setNodes, setEdges, nodes, edges, customTheme, addToHistory, reactFlowInstance]);

  // Enhanced intelligent node suggestion function
  const generateIntelligentNodeSuggestion = async (parentLabel: string, context: string) => {
    // First try AI if available
    if (aiService.isConfigured()) {
      try {
        const enhancement = await aiService.enhanceNodeWithAI(
          parentLabel || 'new concept', 
          `Context: ${context.slice(0, 200)}...`
        );
        return {
          label: enhancement.enhancedLabel,
          description: enhancement.description,
          category: enhancement.category
        };
      } catch (error) {
        console.log('AI enhancement failed, using intelligent fallback');
      }
    }
    
    // Enhanced intelligent fallback system
    return generateContextualSuggestion(parentLabel, context);
  };

  // Advanced contextual suggestion generator
  const generateContextualSuggestion = (parentLabel: string, context: string) => {
    const contextLower = context.toLowerCase();
    const parentLower = parentLabel.toLowerCase();
    
    // Analyze context for domain and generate relevant suggestions
    const domains = {
      business: ['strategy', 'business', 'company', 'revenue', 'market', 'customer', 'growth', 'profit'],
      technology: ['ai', 'software', 'development', 'tech', 'digital', 'platform', 'app', 'system'],
      marketing: ['marketing', 'brand', 'campaign', 'social', 'content', 'advertising', 'promotion'],
      design: ['design', 'ui', 'ux', 'creative', 'visual', 'interface', 'aesthetic', 'layout'],
      education: ['learning', 'education', 'course', 'training', 'skill', 'knowledge', 'teach'],
      health: ['health', 'medical', 'fitness', 'wellness', 'care', 'treatment', 'therapy'],
      finance: ['finance', 'money', 'investment', 'budget', 'cost', 'price', 'financial'],
      project: ['project', 'plan', 'task', 'goal', 'timeline', 'milestone', 'deliverable']
    };
    
    let detectedDomain = 'general';
    let domainScore = 0;
    
    for (const [domain, keywords] of Object.entries(domains)) {
      const score = keywords.reduce((acc, keyword) => {
        return acc + (contextLower.includes(keyword) ? 1 : 0) + (parentLower.includes(keyword) ? 2 : 0);
      }, 0);
      if (score > domainScore) {
        domainScore = score;
        detectedDomain = domain;
      }
    }
    
    // Generate suggestions based on detected domain and parent context
    const suggestions = {
      business: [
        { label: 'Strategic Planning', description: 'Long-term strategic direction and planning initiatives', category: 'strategy' },
        { label: 'Market Analysis', description: 'Comprehensive market research and competitive analysis', category: 'research' },
        { label: 'Revenue Optimization', description: 'Revenue growth strategies and optimization methods', category: 'finance' },
        { label: 'Customer Experience', description: 'Customer journey and experience improvement strategies', category: 'customer' },
        { label: 'Operational Excellence', description: 'Process optimization and operational efficiency improvements', category: 'operations' },
        { label: 'Innovation Pipeline', description: 'Innovation strategies and new opportunity development', category: 'innovation' }
      ],
      technology: [
        { label: 'System Architecture', description: 'Technical architecture and system design considerations', category: 'architecture' },
        { label: 'Performance Optimization', description: 'System performance and efficiency improvements', category: 'performance' },
        { label: 'Security Framework', description: 'Security protocols and protection mechanisms', category: 'security' },
        { label: 'User Interface Design', description: 'Interface design and user experience optimization', category: 'design' },
        { label: 'Data Management', description: 'Data storage, processing, and analytics strategies', category: 'data' },
        { label: 'Integration Strategy', description: 'System integration and API development approaches', category: 'integration' }
      ],
      marketing: [
        { label: 'Content Strategy', description: 'Content creation and distribution strategy', category: 'content' },
        { label: 'Audience Targeting', description: 'Target audience identification and segmentation', category: 'audience' },
        { label: 'Brand Positioning', description: 'Brand identity and market positioning strategy', category: 'brand' },
        { label: 'Campaign Analytics', description: 'Performance tracking and campaign optimization', category: 'analytics' },
        { label: 'Channel Strategy', description: 'Multi-channel marketing approach and optimization', category: 'channels' },
        { label: 'Customer Acquisition', description: 'Customer acquisition and retention strategies', category: 'acquisition' }
      ],
      design: [
        { label: 'Visual Hierarchy', description: 'Information architecture and visual organization', category: 'visual' },
        { label: 'User Experience Flow', description: 'User journey and interaction design optimization', category: 'ux' },
        { label: 'Design System', description: 'Consistent design patterns and component library', category: 'system' },
        { label: 'Accessibility Standards', description: 'Inclusive design and accessibility considerations', category: 'accessibility' },
        { label: 'Responsive Design', description: 'Multi-device and responsive design strategies', category: 'responsive' },
        { label: 'Creative Direction', description: 'Creative vision and artistic direction', category: 'creative' }
      ],
      general: [
        { label: 'Strategic Framework', description: 'Comprehensive strategic approach and methodology', category: 'strategy' },
        { label: 'Implementation Plan', description: 'Detailed execution strategy and action items', category: 'implementation' },
        { label: 'Success Metrics', description: 'Key performance indicators and measurement criteria', category: 'metrics' },
        { label: 'Risk Assessment', description: 'Risk analysis and mitigation strategies', category: 'risk' },
        { label: 'Resource Planning', description: 'Resource allocation and capacity planning', category: 'resources' },
        { label: 'Future Considerations', description: 'Long-term planning and future opportunities', category: 'future' }
      ]
    };
    
    // Select contextually relevant suggestion
    const domainSuggestions = suggestions[detectedDomain] || suggestions.general;
    
    // If parent label exists, try to find related suggestions
    if (parentLabel && parentLabel !== 'New Idea') {
      const relatedSuggestion = domainSuggestions.find(s => 
        s.label.toLowerCase().includes(parentLower.split(' ')[0]) ||
        parentLower.includes(s.label.toLowerCase().split(' ')[0])
      );
      
      if (relatedSuggestion) return relatedSuggestion;
    }
    
    // Return a contextually appropriate suggestion
    const randomIndex = Math.floor(Math.random() * domainSuggestions.length);
    return domainSuggestions[randomIndex];
  };

  // Helper function to get contextual colors
  const getContextualColor = (category: string) => {
    const categoryColors = {
      strategy: 'hsl(267, 85%, 66%)',
      research: 'hsl(213, 94%, 68%)',
      finance: 'hsl(142, 76%, 50%)',
      customer: 'hsl(35, 91%, 65%)',
      operations: 'hsl(280, 100%, 70%)',
      innovation: 'hsl(292, 91%, 76%)',
      architecture: 'hsl(200, 100%, 70%)',
      performance: 'hsl(45, 100%, 60%)',
      security: 'hsl(0, 84%, 60%)',
      design: 'hsl(300, 100%, 70%)',
      data: 'hsl(180, 70%, 60%)',
      integration: 'hsl(260, 80%, 65%)',
      content: 'hsl(120, 70%, 55%)',
      audience: 'hsl(340, 70%, 65%)',
      brand: 'hsl(220, 80%, 60%)',
      analytics: 'hsl(160, 70%, 60%)',
      general: customTheme.colors.primary
    };
    
    return categoryColors[category] || customTheme.colors.primary;
  };

  // AI-powered intelligent node generation with enhanced animations
  const handleGenerateIntelligentNodes = useCallback(async (topic: string, context: any = {}) => {
    if (!topic.trim()) {
      toast.error('Please enter a specific topic for AI generation');
      return;
    }

    setIsAiProcessing(true);
    toast.loading(`🚀 NOV8 AI Pro analyzing "${topic}"...`, {
      description: 'Generating expert-level, topic-specific content with strategic intelligence'
    });
    
    try {
      const generatedNodes = await aiService.generateIntelligentNodes(topic, nodes, context);
      
      const newNodes = [...nodes];
      const newEdges = [...edges];
      
      // Convert generated nodes to ReactFlow nodes with enhanced positioning
      const nodesToAnimate: Node<NodeData>[] = [];
      const edgesToAnimate: Edge[] = [];
      
      // Enhanced positioning algorithm for better visual layout
      const centerX = 800;
      const centerY = 500;
      const gridCols = Math.ceil(Math.sqrt(generatedNodes.length));
      const gridSpacing = 300;
      const startX = centerX - ((gridCols - 1) * gridSpacing) / 2;
      const startY = centerY - ((Math.ceil(generatedNodes.length / gridCols) - 1) * gridSpacing) / 2;
      
      generatedNodes.forEach((genNode, index) => {
        // Enhanced grid positioning with slight randomization for organic feel
        const col = index % gridCols;
        const row = Math.floor(index / gridCols);
        const baseX = startX + (col * gridSpacing);
        const baseY = startY + (row * gridSpacing);
        
        // Add slight randomization for natural look
        const offsetX = (Math.random() - 0.5) * 80;
        const offsetY = (Math.random() - 0.5) * 80;
        
        const newNode: Node<NodeData> = {
          id: genNode.id,
          type: 'mindMapNode',
          position: {
            x: baseX + offsetX,
            y: baseY + offsetY
          },
          data: {
            label: genNode.label,
            color: genNode.color,
            fontSize: genNode.metadata.isFundamental ? 16 : 14,
            category: genNode.category,
            messages: genNode.description ? [genNode.description] : [],
            opacity: 0, // Start invisible for animation
            scale: 0.3, // Start small for scale animation
            ...genNode.metadata
          },
        };
        
        nodesToAnimate.push(newNode);
        
        // Create connections based on AI suggestions with enhanced edge styling
        genNode.connections.forEach(targetId => {
          if (nodes.find(n => n.id === targetId) || nodesToAnimate.find(n => n.id === targetId)) {
            const edgeId = `${genNode.id}-${targetId}`;
            const newEdge: Edge = {
              id: edgeId,
              source: genNode.id,
              target: targetId,
              type: 'smoothstep',
              animated: genNode.metadata.isFundamental,
              style: { 
                stroke: genNode.color, 
                strokeWidth: genNode.metadata.isFundamental ? 4 : 2,
                strokeDasharray: genNode.metadata.isFundamental ? 'none' : '5,5',
                opacity: 0
              },
            };
            edgesToAnimate.push(newEdge);
          }
        });
      });
      
      // Add all nodes and edges
      newNodes.push(...nodesToAnimate);
      newEdges.push(...edgesToAnimate);
      
      setNodes(newNodes);
      setEdges(newEdges);
      addToHistory(newNodes, newEdges);
      
      // Enhanced staggered animation sequence
      toast.dismiss();
      toast.success('✨ Starting node animation sequence...', { duration: 1000 });
      
      // Phase 1: Animate fundamental nodes first (importance 8+)
      const fundamentalNodes = nodesToAnimate.filter(node => node.data.isFundamental);
      const regularNodes = nodesToAnimate.filter(node => !node.data.isFundamental);
      
      // Animate fundamental nodes with special effects
      fundamentalNodes.forEach((node, index) => {
        setTimeout(() => {
          setNodes(currentNodes => 
            currentNodes.map(n => 
              n.id === node.id 
                ? { 
                    ...n, 
                    data: { 
                      ...n.data, 
                      opacity: 1,
                      scale: 1.1 // Slightly larger for fundamental nodes
                    }
                  }
                : n
            )
          );
          
          // Add pulsing effect for fundamental nodes
          setTimeout(() => {
            setNodes(currentNodes => 
              currentNodes.map(n => 
                n.id === node.id 
                  ? { ...n, data: { ...n.data, scale: 1.0 } }
                  : n
              )
            );
          }, 200);
          
        }, index * 150); // Faster stagger for fundamentals
      });
      
      // Phase 2: Animate regular nodes with wave effect
      regularNodes.forEach((node, index) => {
        setTimeout(() => {
          setNodes(currentNodes => 
            currentNodes.map(n => 
              n.id === node.id 
                ? { 
                    ...n, 
                    data: { 
                      ...n.data, 
                      opacity: 1,
                      scale: 1.05
                    }
                  }
                : n
            )
          );
          
          // Smooth scale back to normal
          setTimeout(() => {
            setNodes(currentNodes => 
              currentNodes.map(n => 
                n.id === node.id 
                  ? { ...n, data: { ...n.data, scale: 1.0 } }
                  : n
              )
            );
          }, 150);
          
        }, fundamentalNodes.length * 150 + index * 80); // Start after fundamentals
      });
      
      // Phase 3: Animate edges with flowing effect
      edgesToAnimate.forEach((edge, index) => {
        setTimeout(() => {
          setEdges(currentEdges => 
            currentEdges.map(e => 
              e.id === edge.id 
                ? { 
                    ...e, 
                    style: { 
                      ...e.style, 
                      opacity: 1,
                      strokeWidth: (e.style?.strokeWidth || 2) * 1.5 // Thicker during animation
                    }
                  }
                : e
            )
          );
          
          // Return to normal thickness
          setTimeout(() => {
            setEdges(currentEdges => 
              currentEdges.map(e => 
                e.id === edge.id 
                  ? { 
                      ...e, 
                      style: { 
                        ...e.style, 
                        strokeWidth: edge.style?.strokeWidth || 2
                      }
                    }
                  : e
              )
            );
          }, 300);
          
        }, (fundamentalNodes.length + regularNodes.length) * 100 + index * 50);
      });
      
      // Phase 4: Final celebration and auto-identify fundamentals
      const totalAnimationTime = (fundamentalNodes.length * 150) + (regularNodes.length * 80) + (edgesToAnimate.length * 50) + 1000;
      
      setTimeout(() => {
        // Check if this was a fallback generation
        const isFallback = generatedNodes.some(node => node.id.includes('fallback'));
        
        if (isFallback) {
          toast.success(`🧠 Generated ${generatedNodes.length} intelligent nodes using enhanced fallback system`, {
            description: 'Fallback algorithms created contextually relevant nodes'
          });
        } else {
          toast.success(`🎯 AI generated ${generatedNodes.length} intelligent nodes for "${topic}"`, {
            description: `Using ${aiService.getCurrentModel().split('/')[1]} model`
          });
          
          // Auto-identify fundamentals for AI-generated content
          setTimeout(() => handleIdentifyFundamentals(), 500);
        }
        
        // Auto-fit view to show all new nodes
        if (reactFlowInstance) {
          reactFlowInstance.fitView({ 
            padding: 0.15, 
            duration: 1000,
            maxZoom: 1.2
          });
        }
        
      }, totalAnimationTime);
      
    } catch (error) {
      console.error('Error generating intelligent nodes:', error);
      toast.dismiss();
      
      // Enhanced error feedback
      if (error instanceof Error && error.message.includes('INSUFFICIENT_CREDITS')) {
        toast.info('💡 AI credits exhausted - Enhanced fallback system activated', {
          description: 'Generated intelligent nodes using domain-specific algorithms'
        });
      } else if (error instanceof Error && error.message.includes('RATE_LIMITED')) {
        toast.warning('⏱️ Rate limited - Using intelligent fallback system', {
          description: 'Please wait a moment before trying again'
        });
      } else {
        toast.error('AI generation failed - using intelligent fallback system');
      }
    } finally {
      setIsAiProcessing(false);
    }
  }, [nodes, edges, setNodes, setEdges, addToHistory, reactFlowInstance]);

  // Enhanced fundamental node identification with better visual feedback
  const handleIdentifyFundamentals = useCallback(async () => {
    if (nodes.length < 2) {
      toast.error('Need at least 2 nodes to identify fundamentals');
      return;
    }
    
    setIsAiProcessing(true);
    toast.loading('🔍 Analyzing fundamental concepts...', {
      description: 'AI is evaluating node importance and connections'
    });
    
    try {
      const identifiedFundamentals = await aiService.identifyFundamentalNodes(nodes, edges);
      setFundamentalNodes(identifiedFundamentals);
      
      // Enhanced visual feedback for fundamental identification
      const updatedNodes = nodes.map(node => {
        const fundamental = identifiedFundamentals.find(f => f.id === node.id);
        if (fundamental) {
          return {
            ...node,
            data: {
              ...node.data,
              isFundamental: true,
              importance: fundamental.importance,
              centralityScore: fundamental.centralityScore,
              messages: [
                ...(node.data.messages || []),
                `🎯 Fundamental concept (Score: ${fundamental.conceptualWeight.toFixed(1)})`
              ],
              pulseEffect: true // Trigger pulsing animation
            }
          };
        }
        return node;
      });
      
      setNodes(updatedNodes);
      addToHistory(updatedNodes, edges);
      
      // Animate fundamental node highlighting
      identifiedFundamentals.forEach((fundamental, index) => {
        setTimeout(() => {
          setNodes(currentNodes => 
            currentNodes.map(n => 
              n.id === fundamental.id 
                ? { 
                    ...n, 
                    data: { 
                      ...n.data, 
                      scale: 1.2,
                      highlightEffect: true
                    }
                  }
                : n
            )
          );
          
          // Return to normal size after highlight
          setTimeout(() => {
            setNodes(currentNodes => 
              currentNodes.map(n => 
                n.id === fundamental.id 
                  ? { 
                      ...n, 
                      data: { 
                        ...n.data, 
                        scale: 1.0,
                        highlightEffect: false
                      }
                    }
                  : n
              )
            );
          }, 600);
          
        }, index * 200);
      });
      
      toast.dismiss();
      
      if (identifiedFundamentals.length === 0) {
        toast.info('No clear fundamental nodes identified in current structure', {
          description: 'Try adding more connected nodes for better analysis'
        });
      } else {
        toast.success(`🎯 Identified ${identifiedFundamentals.length} fundamental nodes`, {
          description: 'Core concepts highlighted with enhanced visual indicators'
        });
      }
      
    } catch (error) {
      console.error('Error identifying fundamentals:', error);
      toast.dismiss();
      
      if (error instanceof Error && error.message.includes('INSUFFICIENT_CREDITS')) {
        toast.info('💡 Used local analysis to identify fundamental concepts', {
          description: 'Enhanced algorithms analyzed node relationships'
        });
      } else {
        toast.error('Using local analysis for fundamental identification');
      }
    } finally {
      setIsAiProcessing(false);
    }
  }, [nodes, edges, setNodes, addToHistory]);

  // Enhanced automatic branch generation with better animations
  const handleAutoGenerateBranches = useCallback(async () => {
    // Auto-identify fundamentals if none exist
    if (fundamentalNodes.length === 0) {
      if (nodes.length < 2) {
        toast.error('Need at least 2 nodes to generate branches. Create some nodes first!');
        return;
      }
      
      toast.info('🔍 Auto-identifying fundamental nodes first...');
      
      try {
        // Run fundamental identification first
        const identifiedFundamentals = await aiService.identifyFundamentalNodes(nodes, edges);
        setFundamentalNodes(identifiedFundamentals);
        
        let fundamentalsToUse = identifiedFundamentals;
        
        if (identifiedFundamentals.length === 0) {
          // If no fundamentals identified, use the most connected nodes
          const nodeConnections = new Map<string, number>();
          edges.forEach(edge => {
            nodeConnections.set(edge.source, (nodeConnections.get(edge.source) || 0) + 1);
            nodeConnections.set(edge.target, (nodeConnections.get(edge.target) || 0) + 1);
          });
          
          const sortedNodes = nodes
            .map(node => ({
              id: node.id,
              label: node.data.label,
              importance: (nodeConnections.get(node.id) || 0) + (node.data.importance || 5),
              centralityScore: nodeConnections.get(node.id) || 0,
              connectionCount: nodeConnections.get(node.id) || 0,
              conceptualWeight: (nodeConnections.get(node.id) || 0) * 2 + (node.data.importance || 5)
            }))
            .sort((a, b) => b.conceptualWeight - a.conceptualWeight)
            .slice(0, Math.min(3, nodes.length));
          
          if (sortedNodes.length > 0) {
            setFundamentalNodes(sortedNodes);
            fundamentalsToUse = sortedNodes;
            toast.success(`🎯 Auto-identified ${sortedNodes.length} nodes as fundamental concepts`);
          } else {
            toast.error('Could not identify fundamental nodes for branch generation');
            return;
          }
        } else {
          toast.success(`🎯 Auto-identified ${identifiedFundamentals.length} fundamental nodes`);
        }
        
        // Use the newly identified fundamentals
        await generateBranchesFromFundamentals(fundamentalsToUse);
        
      } catch (error) {
        console.error('Error in auto-identification:', error);
        toast.error('Auto-identification failed, but you can still generate branches manually');
        return;
      }
    } else {
      // Use existing fundamental nodes
      await generateBranchesFromFundamentals(fundamentalNodes);
    }
  }, [fundamentalNodes, nodes, edges, setFundamentalNodes]);

  // Separate function for actual branch generation
  const generateBranchesFromFundamentals = useCallback(async (fundamentalsToUse: FundamentalNode[]) => {
    setIsAiProcessing(true);
    toast.loading('🌳 Generating intelligent branches...', {
      description: `Creating branches from ${fundamentalsToUse.length} fundamental concepts`
    });
    
    try {
      const allNewNodes: Node<NodeData>[] = [];
      const allNewEdges: Edge[] = [];
      
      // Generate branches for each fundamental node with enhanced positioning
      for (const [fundamentalIndex, fundamentalNode] of fundamentalsToUse.entries()) {
        let branches;
        
        try {
          // Try AI generation first
          branches = await aiService.generateAutomaticBranches(fundamentalNode, nodes, 5);
        } catch (error) {
          console.log('AI branch generation failed, using intelligent fallback');
          // Generate intelligent fallback branches
          branches = generateFallbackBranches(fundamentalNode, 5);
        }
        
        // Position branches in a radial pattern around the fundamental node
        const fundamentalNodePosition = nodes.find(n => n.id === fundamentalNode.id)?.position || { x: 500, y: 500 };
        const branchRadius = 220;
        const angleOffset = (fundamentalIndex * Math.PI) / fundamentalsToUse.length;
        
        branches.forEach((branch, branchIndex) => {
          const angle = (branchIndex / branches.length) * 2 * Math.PI + angleOffset;
          const radiusVariation = branchRadius + (Math.random() - 0.5) * 50;
          
          const newNode: Node<NodeData> = {
            id: branch.id,
            type: 'mindMapNode',
            position: {
              x: fundamentalNodePosition.x + Math.cos(angle) * radiusVariation,
              y: fundamentalNodePosition.y + Math.sin(angle) * radiusVariation
            },
            data: {
              label: branch.label,
              color: branch.color,
              fontSize: 12,
              category: branch.category,
              messages: branch.description ? [branch.description] : [],
              opacity: 0,
              scale: 0.5,
              parentId: fundamentalNode.id,
              branchGenerated: true,
              importance: branch.importance || 4
            },
          };
          
          allNewNodes.push(newNode);
          
          // Create edge to fundamental node
          const edge: Edge = {
            id: `${fundamentalNode.id}-${branch.id}`,
            source: fundamentalNode.id,
            target: branch.id,
            type: 'smoothstep',
            animated: true,
            style: { 
              stroke: branch.color, 
              strokeWidth: 2,
              strokeDasharray: '3,3',
              opacity: 0
            },
          };
          
          allNewEdges.push(edge);
        });
      }
      
      // Add all new nodes and edges
      const updatedNodes = [...nodes, ...allNewNodes];
      const updatedEdges = [...edges, ...allNewEdges];
      
      setNodes(updatedNodes);
      setEdges(updatedEdges);
      addToHistory(updatedNodes, updatedEdges);
      
      // Enhanced branch animation with ripple effect from each fundamental
      toast.dismiss();
      toast.success('🌊 Starting branch animation ripple...', { duration: 1000 });
      
      // Animate branches for each fundamental node with staggered timing
      for (const [fundamentalIndex, fundamentalNode] of fundamentalsToUse.entries()) {
        const fundamentalBranches = allNewNodes.filter(node => node.data.parentId === fundamentalNode.id);
        
        fundamentalBranches.forEach((branch, branchIndex) => {
          const totalDelay = (fundamentalIndex * 300) + (branchIndex * 100);
          
          setTimeout(() => {
            // Animate node appearance
            setNodes(currentNodes => 
              currentNodes.map(n => 
                n.id === branch.id 
                  ? { 
                      ...n, 
                      data: { 
                        ...n.data, 
                        opacity: 1,
                        scale: 1.1
                      }
                    }
                  : n
              )
            );
            
            // Scale to normal size
            setTimeout(() => {
              setNodes(currentNodes => 
                currentNodes.map(n => 
                  n.id === branch.id 
                    ? { ...n, data: { ...n.data, scale: 1.0 } }
                    : n
                )
              );
            }, 200);
            
          }, totalDelay);
        });
        
        // Animate edges for this fundamental
        const fundamentalEdges = allNewEdges.filter(edge => edge.source === fundamentalNode.id);
        fundamentalEdges.forEach((edge, edgeIndex) => {
          const totalDelay = (fundamentalIndex * 300) + (edgeIndex * 100) + 400;
          
          setTimeout(() => {
            setEdges(currentEdges => 
              currentEdges.map(e => 
                e.id === edge.id 
                  ? { ...e, style: { ...e.style, opacity: 1 } }
                  : e
              )
            );
          }, totalDelay);
        });
      }
      
      // Final success message and view fitting
      const totalAnimationTime = (fundamentalsToUse.length * 300) + (5 * 100) + 1000;
      setTimeout(() => {
        toast.success(`🌳 Generated ${allNewNodes.length} intelligent branches`, {
          description: `Expanded from ${fundamentalsToUse.length} fundamental concepts`
        });
        
        // Auto-fit view to show all branches
        if (reactFlowInstance) {
          reactFlowInstance.fitView({ 
            padding: 0.1, 
            duration: 1500,
            maxZoom: 1.0
          });
        }
      }, totalAnimationTime);
      
    } catch (error) {
      console.error('Error generating branches:', error);
      toast.dismiss();
      toast.error('Failed to generate automatic branches. Try running "Find Core Concepts" first.');
    } finally {
      setIsAiProcessing(false);
    }
  }, [nodes, edges, setNodes, setEdges, addToHistory, reactFlowInstance]);

  // Enhanced fallback branch generator
  const generateFallbackBranches = (fundamentalNode: FundamentalNode, count: number) => {
    const branchTypes = [
      'Strategic Implementation', 'Tactical Execution', 'Resource Planning', 'Performance Metrics',
      'Risk Management', 'Innovation Opportunities', 'Best Practices', 'Quality Assurance',
      'Optimization Strategies', 'Future Roadmap'
    ];
    
    const colors = [
      'hsl(200, 80%, 60%)', 'hsl(120, 70%, 55%)', 'hsl(45, 85%, 60%)', 'hsl(300, 75%, 65%)',
      'hsl(180, 70%, 60%)', 'hsl(280, 80%, 65%)', 'hsl(60, 80%, 60%)', 'hsl(340, 70%, 65%)'
    ];

    return branchTypes.slice(0, count).map((type, index) => ({
      id: `enhanced-branch-${fundamentalNode.id}-${Date.now()}-${index}`,
      label: `${fundamentalNode.label}: ${type}`,
      category: type.toLowerCase().replace(' ', '-'),
      color: colors[index % colors.length],
      description: `${type} strategies and approaches for ${fundamentalNode.label}`,
      importance: 4 + Math.floor(Math.random() * 3),
      connections: [fundamentalNode.id],
      position: { x: 0, y: 0 }, // Will be overridden
      metadata: {
        isFundamental: false,
        complexity: 3 + Math.floor(Math.random() * 3),
        parentConcept: fundamentalNode.label,
        suggestedBranches: [],
        branchGenerated: true
      }
    }));
  };

  // AI-powered node enhancement
  const handleEnhanceAllNodes = useCallback(async () => {
    if (nodes.length === 0) {
      toast.error('No nodes to enhance');
      return;
    }
    
    setIsAiProcessing(true);
    toast.loading('🚀 AI Pro is transforming all nodes with expert intelligence...', {
      description: `Enhancing ${nodes.length} nodes with comprehensive frameworks and strategic insights`
    });
    
    try {
      const enhancedNodes = [...nodes];
      let enhancementCount = 0;
      let errorCount = 0;
      
      // Enhanced context with more comprehensive mind map information
      const mindMapContext = {
        centralTheme: nodes.length > 0 ? nodes[0].data.label : 'Unknown',
        nodeStructure: nodes.map(n => ({
          label: n.data.label,
          category: n.data.category,
          importance: n.data.importance || 5,
          connections: edges.filter(e => e.source === n.id || e.target === n.id).length
        })),
        totalNodes: nodes.length,
        categories: [...new Set(nodes.map(n => n.data.category).filter(Boolean))],
        averageConnectivity: edges.length / nodes.length
      };
      
      // Process nodes in strategic batches (fundamental nodes first)
      const fundamentalNodes = nodes.filter(n => n.data.importance >= 8 || n.data.isFundamental);
      const strategicNodes = nodes.filter(n => n.data.importance >= 6 && n.data.importance < 8);
      const tacticalNodes = nodes.filter(n => n.data.importance < 6);
      
      const processingOrder = [...fundamentalNodes, ...strategicNodes, ...tacticalNodes];
      
      for (let i = 0; i < processingOrder.length; i += 2) {
        const batch = processingOrder.slice(i, i + 2);
        
        await Promise.all(batch.map(async (node) => {
          try {
            // Enhanced context with strategic positioning
            const nodePosition = fundamentalNodes.includes(node) ? 'foundational' : 
                                strategicNodes.includes(node) ? 'strategic' : 'tactical';
            
            const relatedNodes = edges
              .filter(e => e.source === node.id || e.target === node.id)
              .map(e => {
                const relatedId = e.source === node.id ? e.target : e.source;
                return nodes.find(n => n.id === relatedId)?.data.label;
              })
              .filter(Boolean)
              .slice(0, 5);
            
            const comprehensiveContext = `
              MIND MAP INTELLIGENCE:
              • Central Theme: ${mindMapContext.centralTheme}
              • Node Position: ${nodePosition} level (importance: ${node.data.importance || 5}/10)
              • Connected Concepts: ${relatedNodes.join(', ') || 'None yet'}
              • Domain Categories: ${mindMapContext.categories.join(', ')}
              • Knowledge Ecosystem Size: ${mindMapContext.totalNodes} nodes
              • Strategic Context: Enhancing comprehensive knowledge framework for expert-level understanding
              • Enhancement Goal: Transform into actionable, strategic intelligence component
            `;
            
            const enhancement = await aiService.enhanceNodeWithAI(node.data.label, comprehensiveContext);
            
            const nodeIndex = enhancedNodes.findIndex(n => n.id === node.id);
            if (nodeIndex !== -1) {
              enhancedNodes[nodeIndex] = {
                ...enhancedNodes[nodeIndex],
                data: {
                  ...enhancedNodes[nodeIndex].data,
                  label: enhancement.enhancedLabel,
                  tags: [...(enhancedNodes[nodeIndex].data.tags || []), ...enhancement.tags],
                  category: enhancement.category || enhancedNodes[nodeIndex].data.category,
                  description: enhancement.description,
                  messages: [
                    ...(enhancedNodes[nodeIndex].data.messages || []),
                    {
                      id: `enhancement-${Date.now()}`,
                      text: enhancement.description,
                      timestamp: new Date().toISOString(),
                      type: 'ai-enhancement' as const,
                      priority: 'high' as const
                    }
                  ],
                  importance: Math.max(
                    enhancedNodes[nodeIndex].data.importance || 5,
                    nodePosition === 'foundational' ? 8 : nodePosition === 'strategic' ? 6 : 4
                  ),
                  lastEnhanced: new Date().toISOString(),
                  enhancementVersion: (enhancedNodes[nodeIndex].data.enhancementVersion || 0) + 1
                }
              };
              
              enhancementCount++;
              
              // Show progress update
              if (enhancementCount % 3 === 0) {
                toast.dismiss();
                toast.loading(`🧠 Enhanced ${enhancementCount}/${nodes.length} nodes`, {
                  description: `Latest: "${enhancement.enhancedLabel}"`
                });
              }
            }
          } catch (error) {
            console.error(`Failed to enhance node ${node.id}:`, error);
            errorCount++;
          }
        }));
        
        // Brief pause to avoid API rate limiting
        if (i + 2 < processingOrder.length) {
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      }
      
      setNodes(enhancedNodes);
      addToHistory(enhancedNodes, edges);
      
      toast.dismiss();
      
      if (enhancementCount > 0) {
        toast.success(`🎯 Advanced AI Enhancement Complete!`, {
          description: `Successfully enhanced ${enhancementCount} nodes with expert-level intelligence${errorCount > 0 ? ` (${errorCount} skipped due to errors)` : ''}`
        });
        
        // Trigger automatic identification of new fundamental concepts
        setTimeout(() => {
          handleIdentifyFundamentals();
        }, 2000);
        
        // Schedule automatic branch generation for newly enhanced fundamental nodes
        setTimeout(() => {
          const newFundamentalNodes = enhancedNodes.filter(n => 
            n.data.importance >= 8 && 
            n.data.enhancementVersion > 0
          );
          if (newFundamentalNodes.length > 0) {
            handleAutoGenerateBranches();
          }
        }, 4000);
      } else {
        toast.error('No nodes could be enhanced. Please try again.');
      }
      
    } catch (error) {
      console.error('Error enhancing nodes:', error);
      toast.dismiss();
      toast.error('Failed to enhance nodes. Please check your connection and try again.');
    } finally {
      setIsAiProcessing(false);
    }
  }, [nodes, edges, setNodes, addToHistory, handleIdentifyFundamentals, handleAutoGenerateBranches]);

  // Legacy method for backward compatibility
  const handleGenerateRelatedNodes = useCallback((topic: string, parentNodeId?: string) => {
    handleGenerateIntelligentNodes(topic, {
      domain: 'General',
      purpose: 'Comprehensive exploration'
    });
  }, [handleGenerateIntelligentNodes]);

  const handleSave = useCallback(() => {
    const data = { nodes, edges, currentLayout, currentTheme, customTheme };
    localStorage.setItem('nov8-mindmap', JSON.stringify(data));
    toast.success('Mind map saved successfully!');
  }, [nodes, edges, currentLayout, currentTheme, customTheme]);

  const handleExport = useCallback(() => {
    const data = { nodes, edges, currentLayout, currentTheme, customTheme };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nov8-mindmap-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Mind map exported successfully!');
  }, [nodes, edges, currentLayout, currentTheme, customTheme]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            setNodes(data.nodes || []);
            setEdges(data.edges || []);
            setCurrentLayout(data.currentLayout || 'freeform');
            setCurrentTheme(data.currentTheme || 'nov8-classic');
            if (data.customTheme) {
              setCustomTheme(data.customTheme);
            }
            toast.success('Mind map imported successfully!');
          } catch (error) {
            toast.error('Failed to import mind map. Invalid file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [setNodes, setEdges]);

  // 2. Utility for animating node position
  const animateNodePosition = (node, targetPosition, duration = 0.7) => {
    // This is a placeholder for future direct animation logic if needed
    // For now, we rely on Framer Motion in the node rendering
    return { ...node, position: targetPosition };
  };

  // 3. In MindMapCanvasInner, update layout switching to animate node movement
  const handleLayoutChange = useCallback((layout) => {
    setCurrentLayout(layout);
    setIsLayoutLoading(true);
    toast.loading(`Applying ${layout} layout...`);
    if (layout !== 'freeform') {
      try {
        const updatedNodes = applyLayout(nodes, edges, layout);
        // Animate node movement by updating positions with a transition
        setNodes(currentNodes =>
          currentNodes.map(node => {
            const updated = updatedNodes.find(n => n.id === node.id);
            if (updated) {
              return {
                ...node,
                position: updated.position,
                data: {
                  ...node.data,
                  // Trigger animation by setting a flag
                  animateMove: true
                }
              };
            }
            return node;
          })
        );
        addToHistory(updatedNodes, edges);
        setTimeout(() => {
          if (reactFlowInstance) {
            reactFlowInstance.fitView({ padding: 0.2, duration: 1000 });
          }
          setIsLayoutLoading(false);
          toast.dismiss();
          toast.success(`Layout changed to ${layout} - ${updatedNodes.length} nodes organized`);
        }, 500);
      } catch (error) {
        setIsLayoutLoading(false);
        toast.dismiss();
        toast.error(`Failed to apply ${layout} layout`);
      }
    } else {
      setIsLayoutLoading(false);
      toast.dismiss();
      toast.success(`Layout changed to ${layout}`);
    }
  }, [nodes, edges, setNodes, addToHistory, reactFlowInstance]);

  const handleQuickDelete = useCallback(() => {
    if (confirm('Are you sure you want to delete all nodes? This action cannot be undone.')) {
      setNodes([]);
      setEdges([]);
      addToHistory([], []);
      toast.success('All nodes deleted successfully!');
    }
  }, [setNodes, setEdges, addToHistory]);

  const handleClearCanvas = useCallback(() => {
    // Confirm before clearing
    if (nodes.length > 0) {
      if (!confirm('Are you sure you want to clear the entire canvas? This cannot be undone.')) {
        return;
      }
    }
    
    // Complete cleanup
    setNodes([]);
    setEdges([]);
    setFundamentalNodes([]);
    setHistory([]);
    setHistoryIndex(-1);
    
    // Clear localStorage to prevent reload issues
    localStorage.removeItem('nov8-mindmap');
    
    // Clear any auto-save intervals
    const data = { nodes: [], edges: [], currentLayout, currentTheme, customTheme };
    localStorage.setItem('nov8-mindmap', JSON.stringify(data));
    
    toast.success('🧹 Canvas completely cleared!', {
      description: 'Ready for a fresh start'
    });
  }, [setNodes, setEdges, setFundamentalNodes, setHistory, setHistoryIndex, nodes.length, currentLayout, currentTheme, customTheme]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousState = history[newIndex];
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
      setHistoryIndex(newIndex);
      toast.info('Undone');
    }
  }, [history, historyIndex, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setHistoryIndex(newIndex);
      toast.info('Redone');
    }
  }, [history, historyIndex, setNodes, setEdges]);

  const handleThemeChange = useCallback((theme: string) => {
    setCurrentTheme(theme);
    
    if (theme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      setCustomTheme(customThemes['nov8-dark']);
    } else if (theme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      setCustomTheme(customThemes['nov8-classic']);
    } else if (customThemes[theme as keyof typeof customThemes]) {
      const selectedTheme = customThemes[theme as keyof typeof customThemes];
      setCustomTheme(selectedTheme);
      
      // Update CSS variables for the theme
      const root = document.documentElement;
      root.style.setProperty('--nov8-primary', selectedTheme.colors.primary);
      root.style.setProperty('--nov8-secondary', selectedTheme.colors.secondary);
      root.style.setProperty('--nov8-accent', selectedTheme.colors.accent);
      root.style.setProperty('--nov8-background', selectedTheme.colors.background);
      root.style.setProperty('--nov8-surface', selectedTheme.colors.surface);
      root.style.setProperty('--nov8-text', selectedTheme.colors.text);
      
      // Set dark mode based on theme
      if (theme.includes('dark') || theme === 'midnight-dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    }
    
    toast.success(`Theme changed to ${customThemes[theme as keyof typeof customThemes]?.name || theme}`);
  }, []);

  const handleToggleDarkMode = useCallback(() => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      setCurrentTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setCurrentTheme('light');
    }
  }, [isDarkMode]);

  const getBackgroundVariant = () => {
    switch (currentTheme) {
      case 'grid': return BackgroundVariant.Lines;
      case 'paper': return BackgroundVariant.Cross;
      default: return BackgroundVariant.Dots;
    }
  };

  // Force clean start function
  const forceCleanStart = useCallback(() => {
    localStorage.removeItem('nov8-mindmap');
    localStorage.removeItem('nov8-mindmap-welcomed');
    setNodes([]);
    setEdges([]);
    setFundamentalNodes([]);
    setHistory([]);
    setHistoryIndex(-1);
    window.location.reload(); // Force refresh to ensure clean state
  }, [setNodes, setEdges, setFundamentalNodes, setHistory, setHistoryIndex]);

  // Initialize with completely blank canvas
  useEffect(() => {
    // Only show welcome message on first load, no default nodes
    if (nodes.length === 0 && !localStorage.getItem('nov8-mindmap-welcomed')) {
      localStorage.setItem('nov8-mindmap-welcomed', 'true');
      toast.success('Welcome to NOV8 AI Mind Mapping! 🧠✨', {
        description: 'Start by adding a node or generating an AI mind map'
      });
    }
  }, [nodes.length]);

  // Auto-save functionality - but only save if there are nodes
  useEffect(() => {
    const saveData = () => {
      const data = { nodes, edges, currentLayout, currentTheme, customTheme };
      if (nodes.length > 0) {
        localStorage.setItem('nov8-mindmap', JSON.stringify(data));
      } else {
        // If no nodes, ensure localStorage is clean
        localStorage.removeItem('nov8-mindmap');
      }
    };

    const interval = setInterval(saveData, 5000); // Auto-save every 5 seconds
    return () => clearInterval(interval);
  }, [nodes, edges, currentLayout, currentTheme, customTheme]);

  // Load saved data on mount - but start fresh if no nodes exist
  useEffect(() => {
    const savedData = localStorage.getItem('nov8-mindmap');
    if (savedData) {
      try {
        const { nodes: savedNodes, edges: savedEdges, currentLayout: savedLayout, currentTheme: savedTheme, customTheme: savedCustomTheme } = JSON.parse(savedData);
        // Only load if there are actual saved nodes, otherwise start fresh
        if (savedNodes?.length > 0) {
          setNodes(savedNodes);
          setEdges(savedEdges || []);
          setCurrentLayout(savedLayout || 'freeform');
          setCurrentTheme(savedTheme || 'nov8-classic');
          if (savedCustomTheme) {
            setCustomTheme(savedCustomTheme);
          }
        } else {
          // Ensure we start with empty canvas
          setNodes([]);
          setEdges([]);
          localStorage.removeItem('nov8-mindmap'); // Clear corrupted data
        }
      } catch (error) {
        console.error('Failed to load saved mind map:', error);
        // Clear corrupted localStorage and start fresh
        localStorage.removeItem('nov8-mindmap');
        setNodes([]);
        setEdges([]);
      }
    }
  }, [setNodes, setEdges]);
  
  // Apply current theme on mount
  useEffect(() => {
    const selectedTheme = customThemes[currentTheme as keyof typeof customThemes];
    if (selectedTheme) {
      const root = document.documentElement;
      root.style.setProperty('--nov8-primary', selectedTheme.colors.primary);
      root.style.setProperty('--nov8-secondary', selectedTheme.colors.secondary);
      root.style.setProperty('--nov8-accent', selectedTheme.colors.accent);
      root.style.setProperty('--nov8-background', selectedTheme.colors.background);
      root.style.setProperty('--nov8-surface', selectedTheme.colors.surface);
      root.style.setProperty('--nov8-text', selectedTheme.colors.text);
    }
  }, [currentTheme]);

  // Event listeners for node updates
  useEffect(() => {
    const handleUpdateNode = (event: any) => {
      const { id, updates } = event.detail;
      const updatedNodes = nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...updates } } : node
      );
      setNodes(updatedNodes);
      addToHistory(updatedNodes, edges);
      
      // Removed automatic generation prompt - AI generation should only be explicit
    };

    const handleDeleteNode = (event: any) => {
      const { id } = event.detail;
      const updatedNodes = nodes.filter((node) => node.id !== id);
      const updatedEdges = edges.filter((edge) => edge.source !== id && edge.target !== id);
      setNodes(updatedNodes);
      setEdges(updatedEdges);
      addToHistory(updatedNodes, updatedEdges);
    };

    const handleAddChildNode = (event: any) => {
      const { parentId } = event.detail;
      handleAddNode(parentId);
    };

    const handleDuplicateNode = (event: any) => {
      const { id } = event.detail;
      const nodeToClone = nodes.find(n => n.id === id);
      if (nodeToClone) {
        const newNode: Node<NodeData> = {
          ...nodeToClone,
          id: `${Date.now()}`,
          position: {
            x: nodeToClone.position.x + 100,
            y: nodeToClone.position.y + 50,
          },
          data: {
            ...nodeToClone.data,
            label: `${nodeToClone.data.label} (Copy)`
          }
        };
        const newNodes = [...nodes, newNode];
        setNodes(newNodes);
        addToHistory(newNodes, edges);
      }
    };

    const handleGenerateBranches = (event: any) => {
      const { id, label } = event.detail;
      handleGenerateRelatedNodes(label, id);
    };

    window.addEventListener('updateNode', handleUpdateNode);
    window.addEventListener('deleteNode', handleDeleteNode);
    window.addEventListener('addChildNode', handleAddChildNode);
    window.addEventListener('duplicateNode', handleDuplicateNode);
    window.addEventListener('generateBranches', handleGenerateBranches);

    return () => {
      window.removeEventListener('updateNode', handleUpdateNode);
      window.removeEventListener('deleteNode', handleDeleteNode);
      window.removeEventListener('addChildNode', handleAddChildNode);
      window.removeEventListener('duplicateNode', handleDuplicateNode);
      window.removeEventListener('generateBranches', handleGenerateBranches);
    };
  }, [setNodes, setEdges, handleAddNode, nodes, edges, addToHistory, handleGenerateRelatedNodes]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;

      switch (event.key) {
        case 'Enter':
          handleAddNode();
          break;
        case 'Tab':
          event.preventDefault();
          handleAddNode();
          break;
        case 'Delete':
        case 'Backspace':
          // Delete selected nodes
          const selectedNodes = nodes.filter(node => node.selected);
          if (selectedNodes.length > 0) {
            const updatedNodes = nodes.filter((node) => !node.selected);
            const updatedEdges = edges.filter((edge) => !edge.selected);
            setNodes(updatedNodes);
            setEdges(updatedEdges);
            addToHistory(updatedNodes, updatedEdges);
          }
          break;
        case '=':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            zoomIn();
          }
          break;
        case '-':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            zoomOut();
          }
          break;
        case '0':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            fitView();
          }
          break;
        case 'z':
          if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
            event.preventDefault();
            handleUndo();
          }
          break;
        case 'Z':
          if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
            event.preventDefault();
            handleRedo();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, fitView, setNodes, setEdges, handleAddNode, handleUndo, handleRedo, nodes, edges, addToHistory]);

  // 4. In handleAutomaticBranches, always position new nodes around the parent node's current position
  const handleAutomaticBranches = (event: CustomEvent) => {
    const { parentNodeId, branches } = event.detail;
    if (!branches || branches.length === 0) return;
    const parentNode = nodes.find(n => n.id === parentNodeId);
    if (!parentNode) return;
    const newNodes = [...nodes];
    const newEdges = [...edges];
    const baseRadius = 250;
    branches.forEach((branch, index) => {
      const angle = (2 * Math.PI * index) / branches.length;
      const branchX = parentNode.position.x + Math.cos(angle) * baseRadius;
      const branchY = parentNode.position.y + Math.sin(angle) * baseRadius;
      const branchNode = {
        id: branch.id,
        type: 'mindMapNode',
        position: { x: branchX, y: branchY },
        data: {
          label: branch.label,
          color: branch.color,
          fontSize: 12,
          category: branch.category,
          messages: branch.description ? [branch.description] : [],
          opacity: 0,
          scale: 0.3,
          parentId: parentNodeId,
          importance: branch.importance,
          ...branch.metadata,
          animateIn: true // Animation flag
        }
      };
      newNodes.push(branchNode);
      const branchEdge = {
        id: `edge-${parentNodeId}-${branch.id}`,
        source: parentNodeId,
        target: branch.id,
        type: 'smoothstep',
        animated: false,
        style: {
          stroke: branch.color,
          strokeWidth: 2,
          opacity: 0
        }
      };
      newEdges.push(branchEdge);
    });
    setNodes(newNodes);
    setEdges(newEdges);
    addToHistory(newNodes, newEdges);
    setTimeout(() => {
      setNodes(current =>
        current.map(node => {
          if (branches.some(b => b.id === node.id)) {
            return {
              ...node,
              data: {
                ...node.data,
                opacity: 1,
                scale: 1,
                animateIn: false
              }
            };
          }
          return node;
        })
      );
      setEdges(current =>
        current.map(edge => {
          if (branches.some(b => edge.target === b.id)) {
            return {
              ...edge,
              style: {
                ...edge.style,
                opacity: 1
              }
            };
          }
          return edge;
        })
      );
    }, 100);
    toast.success(`🌿 Generated ${branches.length} expansion branches`, {
      description: 'Automatic knowledge expansion complete'
    });
  };

  const nodeTypes = currentTheme === 'aura' ? AuraNodeTypes : DefaultNodeTypes;
  return (
    <div className={cn("w-full h-screen relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20", className)}>
      {/* AI Toolbar - Left Sidebar */}
      <AIToolbar
        onGenerateIntelligentNodes={handleGenerateIntelligentNodes}
        onIdentifyFundamentals={handleIdentifyFundamentals}
        onAutoGenerateBranches={handleAutoGenerateBranches}
        onEnhanceAllNodes={handleEnhanceAllNodes}
        nodeCount={nodes.length}
        isProcessing={isAiProcessing}
        fundamentalNodesCount={fundamentalNodes.length}
      />

      {/* Main Toolbar - Top */}
      <div className="absolute top-0 left-96 right-0 h-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-30">
        <MindMapToolbar
          onAddNode={handleAddNode}
          onSave={handleSave}
          onExport={handleExport}
          onImport={handleImport}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onFitView={() => fitView()}
          onLayoutChange={handleLayoutChange}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onClearAll={handleClearCanvas}
          currentLayout={currentLayout}
          canUndo={history.length > 1}
          canRedo={false}
          nodeCount={nodes.length}
          currentTheme={currentTheme}
          onThemeChange={(theme) => {
            setCurrentTheme(theme);
            if (theme === 'dark') {
              setIsDarkMode(true);
              document.documentElement.classList.add('dark');
              setCustomTheme(customThemes['nov8-dark']);
            } else if (theme === 'light') {
              setIsDarkMode(false);
              document.documentElement.classList.remove('dark');
              setCustomTheme(customThemes['nov8-classic']);
            } else if (customThemes[theme as keyof typeof customThemes]) {
              const selectedTheme = customThemes[theme as keyof typeof customThemes];
              setCustomTheme(selectedTheme);
              // Update CSS variables for the theme
              const root = document.documentElement;
              root.style.setProperty('--nov8-primary', selectedTheme.colors.primary);
              root.style.setProperty('--nov8-secondary', selectedTheme.colors.secondary);
              root.style.setProperty('--nov8-accent', selectedTheme.colors.accent);
              root.style.setProperty('--nov8-background', selectedTheme.colors.background);
              root.style.setProperty('--nov8-surface', selectedTheme.colors.surface);
              root.style.setProperty('--nov8-text', selectedTheme.colors.text);
              if (theme.includes('dark') || theme === 'midnight-dark') {
                setIsDarkMode(true);
                document.documentElement.classList.add('dark');
              } else {
                setIsDarkMode(false);
                document.documentElement.classList.remove('dark');
              }
            } else if (theme === 'aura') {
              // Aura theme: keep dark mode as is, but set theme to aura
              setCustomTheme(undefined);
            }
          }}
          customThemes={customThemes}
          customTheme={customTheme}
          setCustomTheme={setCustomTheme}
        />
      </div>

      {/* ReactFlow Canvas - Main area with perfect positioning */}
      <div className="absolute top-[49px] left-96 right-0 bottom-0">
        {/* Beautiful Empty State */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-br from-white/90 to-purple-50/60 dark:from-gray-900/90 dark:to-purple-900/60 backdrop-blur-sm">
            <div className="text-center space-y-6 p-8 max-w-md">
              <div className="relative">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4 text-yellow-900" />
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Welcome to NOV8 AI Mind Mapping
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Create powerful mind maps with revolutionary AI assistance. Start by adding a node or generating an intelligent mind map.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => setTimeout(() => handleAddNode(), 0)}
                  className="bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Node
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const aiToolbar = document.querySelector('.ai-toolbar-topic-input') as HTMLInputElement;
                    if (aiToolbar) {
                      aiToolbar.focus();
                    }
                  }}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate AI Map
                </Button>
              </div>
            </div>
          </div>
        )}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          onInit={setReactFlowInstance}
          proOptions={{ hideAttribution: true }}
          className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
          fitView
          fitViewOptions={{ 
            padding: 0.15,
            maxZoom: 2.5,
            minZoom: 0.05
          }}
          minZoom={0.05}
          maxZoom={2.5}
          zoomOnScroll={true}
          zoomOnPinch={true}
        >
          <Background 
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            className="opacity-40 dark:opacity-20"
            color="#e2e8f0"
          />
          <Controls 
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg"
            showZoom={true}
            showFitView={true}
            showInteractive={false}
          />
          <MiniMap 
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg overflow-hidden"
            nodeColor="#8b5cf6"
            maskColor="rgba(139, 92, 246, 0.1)"
            pannable
            zoomable
          />
        </ReactFlow>
      </div>
    </div>
  );
};

const MindMapCanvas: React.FC<MindMapCanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <MindMapCanvasInner {...props} />
    </ReactFlowProvider>
  );
};

// Handler to generate a tree from a specific node - placeholder
const handleGenerateBranchesFromNode = (nodeId: string) => {
  // This function will be properly implemented inside the component
  console.log('Generate branches for node:', nodeId);
};

// Place nudgeOverlappingNodes above applyLayout for correct scoping
const nudgeOverlappingNodes = (nodes: Array<Node<NodeData>>) => {
  const MIN_DISTANCE = 260;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      if (checkCollision(a.position, b.position)) {
        // Move b away from a
        const dx = b.position.x - a.position.x;
        const dy = b.position.y - a.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const moveDist = (MIN_DISTANCE - dist) / 2 + 1;
        const moveX = (dx / dist) * moveDist;
        const moveY = (dy / dist) * moveDist;
        b.position.x += moveX;
        b.position.y += moveY;
        a.position.x -= moveX;
        a.position.y -= moveY;
      }
    }
  }
};

export default MindMapCanvas;