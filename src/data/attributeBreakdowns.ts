
import { AttributeBreakdown } from '../components/AttributeRhombus';

export const attributeBreakdowns: Record<string, AttributeBreakdown> = {
  'financial-capacity': {
    parentAttribute: 'Financial Capacity',
    subAttributes: [
      {
        name: 'Disposable Income',
        value: 78,
        color: '#10b981',
        description: 'Available income after essential expenses for discretionary spending',
        impact: 'high'
      },
      {
        name: 'Credit Usage',
        value: 65,
        color: '#3b82f6',
        description: 'Pattern of credit utilization and borrowing behavior',
        impact: 'medium'
      },
      {
        name: 'Payment Timeliness',
        value: 82,
        color: '#8b5cf6',
        description: 'Consistency in meeting payment deadlines and obligations',
        impact: 'high'
      },
      {
        name: 'Account Balance',
        value: 71,
        color: '#f59e0b',
        description: 'Average account balance trends and savings patterns',
        impact: 'medium'
      }
    ]
  },
  'engagement-potential': {
    parentAttribute: 'Engagement Potential',
    subAttributes: [
      {
        name: 'Channel Activity',
        value: 85,
        color: '#ef4444',
        description: 'Frequency of interaction across different communication channels',
        impact: 'high'
      },
      {
        name: 'Response Rate',
        value: 72,
        color: '#06b6d4',
        description: 'Likelihood to respond to marketing communications',
        impact: 'high'
      },
      {
        name: 'Session Duration',
        value: 58,
        color: '#84cc16',
        description: 'Average time spent engaging with digital touchpoints',
        impact: 'medium'
      },
      {
        name: 'Feature Adoption',
        value: 67,
        color: '#ec4899',
        description: 'Rate of adopting new features and services',
        impact: 'medium'
      }
    ]
  },
  'digital-fluency': {
    parentAttribute: 'Digital Fluency',
    subAttributes: [
      {
        name: 'Platform Usage',
        value: 89,
        color: '#6366f1',
        description: 'Comfort level with digital platforms and interfaces',
        impact: 'high'
      },
      {
        name: 'Self-Service',
        value: 76,
        color: '#14b8a6',
        description: 'Preference for self-service vs. assisted transactions',
        impact: 'medium'
      },
      {
        name: 'Mobile Adoption',
        value: 92,
        color: '#f97316',
        description: 'Mobile device usage for financial activities',
        impact: 'high'
      },
      {
        name: 'Tech Innovation',
        value: 64,
        color: '#a855f7',
        description: 'Openness to adopting new financial technologies',
        impact: 'low'
      }
    ]
  }
};

export const getAttributeBreakdown = (segmentName: string): AttributeBreakdown => {
  // Map segment names to their primary attribute
  const segmentToAttribute: Record<string, string> = {
    'Tech-Savvy Millennials': 'digital-fluency',
    'Digital Adopters': 'engagement-potential',
    'Cash Flow Optimizers': 'financial-capacity',
    'Traditional Savers': 'financial-capacity',
    'Young Professionals': 'engagement-potential'
  };

  const attributeKey = segmentToAttribute[segmentName] || 'financial-capacity';
  return attributeBreakdowns[attributeKey];
};
