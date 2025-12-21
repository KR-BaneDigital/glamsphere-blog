/**
 * Debate Content Type
 * 
 * For presenting two opposing perspectives on business strategy topics,
 * allowing readers to understand both sides of important decisions.
 */

export interface DebateData {
  // Topic Overview
  topic: string
  topicCategory?: string           // "Strategy", "Technology", "Operations"
  description: string
  
  // Pro/For Perspective (Green theme)
  pro: {
    positionLabel: string          // "Rapid AI Adoption"
    title: string
    expert: {
      name: string
      title: string
    }
    paragraphs: string[]
    evidence: {
      title: string                // "Key Evidence", "The Data"
      points: string[]
    }
    pullQuote: string
  }
  
  // Con/Against Perspective (Red/Rose theme)
  con: {
    positionLabel: string          // "Cautious Implementation"
    title: string
    expert: {
      name: string
      title: string
    }
    paragraphs: string[]
    evidence: {
      title: string                // "Critical Risks", "What We're Losing"
      points: string[]
    }
    pullQuote: string
  }
}
