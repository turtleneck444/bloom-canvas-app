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
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const nodeTypes = {
  mindMapNode: MindMapNode,
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
const MIN_DISTANCE = 250; // Minimum distance between node centers

const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }): number => {
  return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
};

const checkCollision = (pos1: { x: number; y: number }, pos2: { x: number; y: number }): boolean => {
  const distance = calculateDistance(pos1, pos2);
  return distance < MIN_DISTANCE;
};

const findSafePosition = (
  desiredPosition: { x: number; y: number },
  existingNodes: Array<Node<NodeData>>,
  maxAttempts: number = 50
): { x: number; y: number } => {
  let currentPosition = { ...desiredPosition };
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    let hasCollision = false;
    
    // Check collision with all existing nodes
    for (const node of existingNodes) {
      if (checkCollision(currentPosition, node.position)) {
        hasCollision = true;
        break;
      }
    }
    
    if (!hasCollision) {
      return currentPosition;
    }
    
    // Try to find a new position by expanding in a spiral pattern
    const angle = (attempts * 0.5) * Math.PI;
    const radius = MIN_DISTANCE + (attempts * 10);
    
    currentPosition = {
      x: desiredPosition.x + Math.cos(angle) * radius,
      y: desiredPosition.y + Math.sin(angle) * radius,
    };
    
    attempts++;
  }
  
  // If we can't find a safe position, return the original with some offset
  return {
    x: desiredPosition.x + (Math.random() - 0.5) * MIN_DISTANCE * 2,
    y: desiredPosition.y + (Math.random() - 0.5) * MIN_DISTANCE * 2,
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
  
  // Find root node (node with no incoming edges)
  const rootNode = updatedNodes.find(n => !edges.some(e => e.target === n.id)) || updatedNodes[0];
  
  if (!rootNode) return updatedNodes;

  console.log(`Applying ${layout} layout to ${updatedNodes.length} nodes`);

  switch (layout) {
    case 'radial':
      return applyRadialLayout(updatedNodes, edges, rootNode);
    case 'tree-horizontal':
      return applyHorizontalTreeLayout(updatedNodes, edges, rootNode);
    case 'tree-vertical':
      return applyVerticalTreeLayout(updatedNodes, edges, rootNode);
    case 'hierarchical':
      return applyHierarchicalLayout(updatedNodes, edges, rootNode);
    case 'organic':
      return applyOrganicLayout(updatedNodes, edges, rootNode);
    case 'spiral':
      return applySpiralLayout(updatedNodes, edges, rootNode);
    case 'force-directed':
      return applyForceDirectedLayout(updatedNodes, edges, rootNode);
    case 'hexagonal':
      return applyHexagonalLayout(updatedNodes, edges, rootNode);
    case 'fractal':
      return applyFractalLayout(updatedNodes, edges, rootNode);
    case 'galaxy':
      return applyGalaxyLayout(updatedNodes, edges, rootNode);
    case 'neural':
      return applyNeuralLayout(updatedNodes, edges, rootNode);
    case 'molecular':
      return applyMolecularLayout(updatedNodes, edges, rootNode);
    case 'freeform':
      return updatedNodes; // Keep current positions
    default:
      return updatedNodes;
  }
};

const applyRadialLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>) => {
  // Responsive center positioning with more space
  const centerX = 800;
  const centerY = 600;
  const baseRadius = 300; // Increased for better spacing
  const childRadius = 150; // Increased for grandchildren
  
  console.log('Applying radial layout, root node:', rootNode.id);
  
  // Position root node at center and ensure it's visible
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
  
  console.log(`Found ${childNodes.length} child nodes in ${Object.keys(categoryGroups).length} categories`);
  
  // Track positioned nodes for collision detection
  const positionedNodes: Node<NodeData>[] = [rootNode];
  
  // Position children by category in organized sectors with collision avoidance
  let currentAngle = 0;
  Object.entries(categoryGroups).forEach(([category, categoryNodes]) => {
    const sectorAngle = (2 * Math.PI) / Object.keys(categoryGroups).length;
    const nodesPerCategory = categoryNodes.length;
    
    categoryNodes.forEach((node, index) => {
      const angle = currentAngle + (index / nodesPerCategory) * sectorAngle * 0.7; // 70% of sector for better spacing
      const radius = baseRadius;
      
      const desiredPosition = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
      
      // Use collision detection to find safe position
      positionNodeSafely(node, desiredPosition, positionedNodes);
      positionedNodes.push(node);
      
      // Assign category color if not already set
      if (!(node.data as NodeData).color) {
        (node.data as NodeData).color = getColorForCategory(category);
      }
      
      console.log(`Positioned ${category} child ${node.id} at (${node.position.x}, ${node.position.y})`);
    });
    
    currentAngle += sectorAngle;
  });
  
  // Position grandchildren in organized clusters with collision avoidance
  childNodes.forEach((childNode, childIndex) => {
    const grandChildren = edges.filter(e => e.source === childNode.id).map(e => e.target);
    const grandChildNodes = nodes.filter(n => grandChildren.includes(n.id));
    
    if (grandChildNodes.length > 0) {
      const childX = childNode.position.x;
      const childY = childNode.position.y;
      const childCategory = (childNode.data as NodeData).category || 'default';
      
      grandChildNodes.forEach((grandChild, grandChildIndex) => {
        const angle = (grandChildIndex / grandChildNodes.length) * 2 * Math.PI;
        const radius = childRadius;
        
        const desiredPosition = {
          x: childX + Math.cos(angle) * radius,
          y: childY + Math.sin(angle) * radius,
        };
        
        // Use collision detection to find safe position
        positionNodeSafely(grandChild, desiredPosition, positionedNodes);
        positionedNodes.push(grandChild);
        
        // Assign category color if not already set
        if (!(grandChild.data as NodeData).color) {
          (grandChild.data as NodeData).color = getColorForCategory(childCategory);
        }
      });
    }
  });
  
  // Final check to ensure root node visibility
  ensureRootNodeVisibility(rootNode, nodes);
  
  console.log('Radial layout completed with collision avoidance');
  return nodes;
};

const applyVerticalTreeLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>) => {
  const visited = new Set<string>();
  const levelHeight = 180; // Optimized spacing
  const startX = 800; // Centered
  const startY = 150; // Top margin
  
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

const applyHorizontalTreeLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>) => {
  const visited = new Set<string>();
  const levelWidth = 280; // Optimized spacing
  const startX = 150; // Left margin
  const startY = 500; // Centered
  
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
      x: startX + (level * levelWidth),
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

const applyHierarchicalLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>) => {
  const visited = new Set<string>();
  const levelHeight = 140; // Optimized spacing
  const startX = 800; // Centered
  const startY = 150; // Top margin
  
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

const applyOrganicLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>) => {
  const centerX = 700;
  const centerY = 500;
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

const applySpiralLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>) => {
  const centerX = 700;
  const centerY = 500;
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

const applyForceDirectedLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>) => {
  const centerX = 700;
  const centerY = 500;
  
  console.log('Applying force-directed layout, root node:', rootNode.id);
  
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

const applyHexagonalLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>) => {
  const centerX = 800;
  const centerY = 500;
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

const applyFractalLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>) => {
  const centerX = 800;
  const centerY = 500;
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

const applyGalaxyLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>) => {
  const centerX = 800;
  const centerY = 500;
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

const applyNeuralLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>) => {
  const centerX = 800;
  const centerY = 500;
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

const applyMolecularLayout = (nodes: Array<Node<NodeData>>, edges: Edge[], rootNode: Node<NodeData>) => {
  const centerX = 800;
  const centerY = 500;
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

  const handleAddNode = useCallback((parentId?: string) => {
    const parentNode = parentId ? nodes.find(n => n.id === parentId) : null;
    const newNode: Node<NodeData> = {
      id: `${Date.now()}`,
      type: 'mindMapNode',
      position: parentNode ? {
        x: parentNode.position.x + (Math.random() - 0.5) * 200,
        y: parentNode.position.y + 150 + (Math.random() - 0.5) * 100,
      } : {
        x: Math.random() * 400 + 200,
        y: Math.random() * 400 + 200,
      },
      data: { 
        label: 'New Idea', 
        color: customTheme.colors.primary,
        fontSize: 14,
        parentId: parentId
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
        style: { stroke: customTheme.colors.secondary, strokeWidth: 2 }
      };
      const newEdges = [...edges, newEdge];
      setEdges(newEdges);
      addToHistory(newNodes, newEdges);
    } else {
      addToHistory(newNodes, edges);
    }
  }, [setNodes, setEdges, nodes, edges, customTheme, addToHistory]);

  // AI-powered node generation with animated appearance
  const handleGenerateRelatedNodes = useCallback((topic: string, parentNodeId?: string) => {
    const parentNode = parentNodeId ? nodes.find(n => n.id === parentNodeId) : nodes.find(n => n.data.label === topic);
    
    if (!parentNode) return;
    
    const category = determineCategory(topic);
    const relatedTopics = generateRelatedNodes(topic, category).map(node => node.label);
    
    // Generate more nodes based on topic complexity - up to 35 nodes for comprehensive mind maps
    const baseNodes = Math.min(relatedTopics.length, 20);
    const complexityBonus = topic.length > 20 ? 15 : 10; // More complex topics get more nodes
    const numNodes = Math.min(relatedTopics.length, baseNodes + complexityBonus);
    const selectedTopics = relatedTopics.slice(0, numNodes);
    
    const newNodes = [...nodes];
    const newEdges = [...edges];
    
    // Create all nodes first but with opacity 0 for animation
    const nodesToAnimate: Node<NodeData>[] = [];
    const edgesToAnimate: Edge[] = [];
    
    selectedTopics.forEach((topic, index) => {
      const nodeId = `${parentNode.id}-${Date.now()}-${index}`;
      const angle = (index / selectedTopics.length) * 2 * Math.PI;
      const distance = 200 + Math.random() * 150; // Increased distance for better spacing
      
      const newNode: Node<NodeData> = {
        id: nodeId,
        type: 'mindMapNode',
        position: {
          x: parentNode.position.x + Math.cos(angle) * distance,
          y: parentNode.position.y + Math.sin(angle) * distance,
        },
        data: {
          label: topic,
          color: getColorForCategory(category),
          fontSize: 14,
          category,
          messages: [`Generated from: ${parentNode.data.label}`], // Add context message
          opacity: 0, // Start invisible for animation
        },
      };
      
      nodesToAnimate.push(newNode);
      
      const newEdge: Edge = {
        id: `${parentNode.id}-${nodeId}`,
        source: parentNode.id,
        target: nodeId,
        type: 'smoothstep',
        style: { 
          stroke: getColorForCategory(category), 
          strokeWidth: 2,
          strokeDasharray: index % 3 === 0 ? '5,5' : undefined, // Varied edge styles
          opacity: 0, // Start invisible for animation
        },
      };
      
      edgesToAnimate.push(newEdge);
    });
    
    // Add all nodes and edges at once
    newNodes.push(...nodesToAnimate);
    newEdges.push(...edgesToAnimate);
    
    setNodes(newNodes);
    setEdges(newEdges);
    addToHistory(newNodes, newEdges);
    
    // Animate nodes appearing one by one
    nodesToAnimate.forEach((node, index) => {
      setTimeout(() => {
        setNodes(currentNodes => 
          currentNodes.map(n => 
            n.id === node.id 
              ? { ...n, data: { ...n.data, opacity: 1 } }
              : n
          )
        );
        
        setEdges(currentEdges => 
          currentEdges.map(e => 
            e.id === edgesToAnimate[index].id 
              ? { ...e, style: { ...e.style, opacity: 1 } }
              : e
          )
        );
      }, index * 150); // 150ms delay between each node
    });
    
    toast.success(`Generated ${selectedTopics.length} advanced topics for "${topic}" 🧠✨`);
  }, [nodes, edges, setNodes, setEdges, addToHistory]);

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

  const handleLayoutChange = useCallback((layout: 'radial' | 'tree-horizontal' | 'tree-vertical' | 'hierarchical' | 'organic' | 'spiral' | 'force-directed' | 'freeform') => {
    console.log('Layout change requested:', layout, 'Current nodes:', nodes.length, 'Current edges:', edges.length);
    
    setCurrentLayout(layout);
    setIsLayoutLoading(true);
    
    // Show loading state
    toast.loading(`Applying ${layout} layout...`);
    
    // Always apply layout immediately, even with existing data
    if (layout !== 'freeform') {
      try {
        const updatedNodes = applyLayout(nodes, edges, layout);
        console.log('Updated nodes:', updatedNodes.length, 'Layout applied:', layout);
        
        // Force React to recognize the change by creating a new array
        setNodes([...updatedNodes]);
        addToHistory(updatedNodes, edges);
        
        // Fit view after layout change for better visibility
        setTimeout(() => {
          if (reactFlowInstance) {
            reactFlowInstance.fitView({ padding: 0.2, duration: 1000 });
            console.log('Fit view applied');
          }
          setIsLayoutLoading(false);
          toast.dismiss();
          toast.success(`Layout changed to ${layout} - ${updatedNodes.length} nodes organized`);
        }, 500);
      } catch (error) {
        console.error('Layout application error:', error);
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
    setNodes([]);
    setEdges([]);
    addToHistory([], []);
    toast.success('Canvas cleared!');
  }, [setNodes, setEdges, addToHistory]);

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

  // Initialize with a root node
  useEffect(() => {
    // Only initialize if no nodes exist
    if (nodes.length === 0) {
      const initialNode: Node<NodeData> = {
        id: '1',
        type: 'mindMapNode',
        position: { x: 500, y: 400 },
        data: { 
          label: '✨ Start Your Mind Map', 
          color: customTheme.colors.primary,
          fontSize: 18,
          isEditing: true, // Start in edit mode
          messages: ['Double-click to edit your central idea', 'Click the sparkles icon to generate related topics', 'Use layout buttons to organize your mind map']
        },
      };
      setNodes([initialNode]);
      addToHistory([initialNode], []);
      toast.success('Welcome to NOV8 Mind Mapping! 🧠✨');
    }
  }, [setNodes, addToHistory, customTheme, nodes.length]);

  // Auto-save functionality
  useEffect(() => {
    const saveData = () => {
      const data = { nodes, edges, currentLayout, currentTheme, customTheme };
      localStorage.setItem('nov8-mindmap', JSON.stringify(data));
    };

    const interval = setInterval(saveData, 5000); // Auto-save every 5 seconds
    return () => clearInterval(interval);
  }, [nodes, edges, currentLayout, currentTheme, customTheme]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('nov8-mindmap');
    if (savedData) {
      try {
        const { nodes: savedNodes, edges: savedEdges, currentLayout: savedLayout, currentTheme: savedTheme, customTheme: savedCustomTheme } = JSON.parse(savedData);
        if (savedNodes?.length > 0) {
          setNodes(savedNodes);
          setEdges(savedEdges || []);
          setCurrentLayout(savedLayout || 'freeform');
          setCurrentTheme(savedTheme || 'nov8-classic');
          if (savedCustomTheme) {
            setCustomTheme(savedCustomTheme);
          }
        }
      } catch (error) {
        console.error('Failed to load saved mind map:', error);
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
      
      // Offer to generate related nodes for any node that's been updated
      if (updates.label && updates.label !== 'Central Idea') {
        const updatedNode = updatedNodes.find(n => n.id === id);
        if (updatedNode) {
          setTimeout(() => {
            if (confirm(`Would you like to generate related nodes for "${updates.label}"?`)) {
              handleGenerateRelatedNodes(updates.label, id);
            }
          }, 100);
        }
      }
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

  return (
    <div className={cn("w-full h-screen relative", className)}>
      <MindMapToolbar
        onAddNode={handleAddNode}
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onFitView={() => fitView()}
        onLayoutChange={handleLayoutChange}
        onThemeChange={handleThemeChange}
        currentLayout={currentLayout}
        currentTheme={currentTheme}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onClearCanvas={handleClearCanvas}
        onQuickDelete={handleQuickDelete}
        onUndo={handleUndo}
        onRedo={handleRedo}
        nodeCount={nodes.length}
        edgeCount={edges.length}
        customThemes={customThemes}
        customTheme={customTheme}
        setCustomTheme={setCustomTheme}
        isLayoutLoading={isLayoutLoading}
      />

      <div ref={reactFlowWrapper} className="w-full h-full mind-map-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          attributionPosition="bottom-left"
          className="mind-map-canvas"
          onInit={setReactFlowInstance}
          snapToGrid={true}
          snapGrid={[20, 20]}
          defaultEdgeOptions={{
            style: { stroke: customTheme.colors.secondary, strokeWidth: 2 },
            type: 'smoothstep',
          }}
          proOptions={{ hideAttribution: true }}
          minZoom={0.1}
          maxZoom={2}
          nodesDraggable={true}
          nodesConnectable={true}
          elementsSelectable={true}
          selectNodesOnDrag={false}
          multiSelectionKeyCode="Shift"
          deleteKeyCode="Delete"
          zoomOnScroll={true}
          zoomOnPinch={true}
          panOnScroll={false}
          zoomOnDoubleClick={false}
          preventScrolling={true}
          onError={(error) => console.error('ReactFlow error:', error)}
          nodesFocusable={true}
          connectionRadius={20}
          panActivationKeyCode="Space"
          selectionKeyCode="Shift"
          zoomActivationKeyCode="Meta"
        >
          <Background 
            variant={getBackgroundVariant()}
            gap={20}
            size={1}
            className="opacity-30"
            color={customTheme.colors.text}
          />
          <Controls 
            className="!bottom-4 !left-4 !bg-white/90 !backdrop-blur-sm !border !shadow-lg"
            showInteractive={false}
          />
          <MiniMap 
            className="!bottom-4 !right-4 !bg-white/90 !backdrop-blur-sm !border !shadow-lg !rounded-lg"
            nodeColor={(node) => {
              const color = (node.data as NodeData)?.color || customTheme.colors.primary;
              return color;
            }}
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

export default MindMapCanvas;