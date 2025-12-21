// Blog Data Type Definitions
// 🔒 LOCKED FILE - Do not modify
// This file contains only TypeScript interfaces and types

import type {
  ListicleData,
  FAQData,
  HowToGuideData,
  CaseStudyData,
  TutorialData,
  ThoughtLeadershipData,
  NewsTrendData,
  ProductReviewData,
  ProductComparisonData,
  IndustryAnalysisData,
  CompetitorRankingData,
  DebateData,
  MinimalEssayData,
  ScorecardData,
  CommentaryData,
  AffiliateProductReviewData
} from './blog-types'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  categorySlug: string  // URL-safe slug
  subcategory?: string  // 🆕 Subcategory name if exists (mirrors database parent/child relationship)
  subcategorySlug?: string  // URL-safe slug
  tags: string[]
  date: string
  readTime: string
  author: Author
  featured: boolean
  views?: number
  relatedPosts?: string[]
  
  // 🆕 NEW: Content type identifier
  contentType?: 'custom' | 'listicle' | 'faq' | 'product-review' | 'affiliate-product-review' | 'how-to-guide' | 
                'competitor-ranking' | 'product-comparison' | 'case-study' | 
                'tutorial' | 'industry-analysis' | 'thought-leadership' | 'news-trend' | 'debate' | 'minimal-essay' | 'scorecard' | 'commentary'
  
  // 🆕 NEW: Type-specific structured data
  typeSpecificData?: TypeSpecificData
}

export interface Author {
  name: string
  bio: string
  image: string
  role: string
}

// 🆕 NEW: Type-specific data structures
export interface TypeSpecificData {
  // LISTICLE
  listItems?: Array<{
    number: number
    heading: string
    content: string
    image?: string  // e.g., "[Image: Item 1 - Tool Name]"
    insight?: string  // 🆕 Key takeaway/insight callout
    tips?: string[]   // 🆕 Action steps bullet list
  }>
  
  // PRODUCT REVIEW
  productReview?: ProductReviewData
  
  // AFFILIATE PRODUCT REVIEW
  affiliateProductReview?: AffiliateProductReviewData
  
  // HOW-TO GUIDE
  howToGuide?: {
    introduction?: string
    steps?: Array<{
      number: number
      title: string
      description: string
      layout: 'grid' | 'sequential'
      gridItems?: Array<{
        title: string
        description: string
      }>
      sequentialSteps?: Array<{
        title: string
        description: string
      }>
    }>
    conclusion?: string
  }
  
  // COMPETITOR RANKING
  competitorRanking?: CompetitorRankingData
  
  // DEBATE / TWO PERSPECTIVES
  debate?: DebateData
  
  // MINIMAL ESSAY
  minimalEssay?: MinimalEssayData
  
  // PRODUCT COMPARISON
  productComparison?: ProductComparisonData
  
  // CASE STUDY
  caseStudy?: {
    testimonial?: {
      name: string
      role: string
      company: string
      image?: string
      quote: string
      keyResult?: string
      timeframe?: string
    }
    challenge?: {
      title: string
      paragraphs: string[]
    }
    problemDetails?: {
      title: string
      intro: string
      listTitle: string
      items: Array<{
        name: string
        description: string
      }>
      conclusion?: string
    }
    solution?: {
      title: string
      paragraphs: string[]
      approaches?: Array<{
        name: string
        description: string
      }>
    }
    resultsTimeline?: {
      title: string
      milestones: Array<{
        timeframe: string
        description: string
      }>
    }
    finalResults?: {
      title: string
      paragraphs: string[]
    }
  }
  
  // TUTORIAL
  tutorial?: {
    difficultyLevel?: string
    tableOfContents?: string[]
    successStory?: {
      name: string
      role: string
      company: string
      image?: string
      quote: string
      keyResult?: string
    }
    sections?: Array<{
      title: string
      intro?: string
      steps?: Array<{
        title: string
        timeRequired?: string
        contentTitle?: string
        content?: string | string[]
        tipTitle?: string
        tip?: string
      }>
      cards?: Array<{
        title: string
        content: string
      }>
    }>
    resultsTimeline?: {
      title?: string
      milestones: Array<{
        timeframe: string
        outcomes: string[]
      }>
    }
    mistakesIntro?: string
    commonMistakes?: Array<{
      title: string
      mistake: string
      solution: string
    }>
  }
  
  // INDUSTRY ANALYSIS
  industryAnalysis?: IndustryAnalysisData
  
  // THOUGHT LEADERSHIP
  thoughtLeadership?: {
    opening?: string
    stats?: Array<{
      value: string
      description: string
    }>
    sections?: Array<{
      title: string
      paragraphs: string[]
      pullQuote?: {
        text: string
        attribution?: string
      }
      comparison?: {
        before: {
          title: string
          items: string[]
        }
        after: {
          title: string
          items: string[]
        }
      }
      callout?: {
        title: string
        content: string
      }
    }>
    conclusion?: string
  }
  
  // NEWS/TREND
  newsTrend?: NewsTrendData
  
  // FAQ
  quickAnswer?: {
    summary: string
    details?: string
  }
  understandingSection?: string[]
  problemSection?: {
    title: string
    intro?: string
    listTitle: string
    items: Array<{
      name: string
      description: string
    }>
    conclusion?: string
  }
  solutionSection?: {
    title: string
    intro: string
    features: Array<{
      name: string
      description: string
    }>
  }
  evidenceSection?: {
    title: string
    intro: string
    listTitle: string
    findings: string[]
    conclusion?: string
  }
  actionSteps?: {
    title: string
    intro: string
    steps: Array<{
      title: string
      description: string
    }>
  }
  practicalTips?: {
    title: string
    intro: string
    tips: Array<{
      title: string
      description: string
    }>
  }
  finalAnswer?: {
    summary: string
    details?: string
  }
  
  // SCORECARD
  scorecard?: ScorecardData
  
  // COMMENTARY
  commentary?: CommentaryData
}
