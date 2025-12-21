/**
 * Scorecard Content Type
 * 
 * For comparative scorecards that rate and rank products/services
 * across multiple evaluation criteria with numerical scores.
 */

export interface ScorecardData {
  // Introduction paragraph
  introduction?: string
  
  // Methodology explanation
  methodology?: {
    title?: string
    description: string
    criteria: Array<{
      name: string
      description: string
    }>
    scoringScale: Array<{
      range: string  // "90-100"
      label: string  // "Outstanding"
      description: string
    }>
    weightingNote?: string
  }
  
  // Top picks summary cards
  topPicks?: Array<{
    rank: number  // 1, 2, 3
    name: string
    overallScore: number  // 0-100
    badge: string  // "Best Overall", "Best Value"
    description: string
    price?: string
    badgeStyle?: 'primary' | 'secondary' | 'accent'
  }>
  
  // Full scorecard table
  scorecardTable?: {
    title?: string
    columns: string[]  // ["Tool", "Overall", "Ease of Use", "Features", ...]
    rows: Array<{
      name: string
      overallScore: number
      scores: Record<string, number>  // { "Ease of Use": 95, "Features": 91, ... }
      bestFor: string
    }>
    tableNote?: string
  }
  
  // Detailed breakdowns for each option
  detailedBreakdown?: Array<{
    rank: number
    name: string
    overallScore: number
    badge: string
    price: string
    priceDetails?: string
    analysis: string[]  // Paragraph array
    strengths: string[]
    considerations: string[]
    bestFor: string
  }>
  
  // Key takeaways section
  keyTakeaways?: {
    title?: string
    items: Array<{
      number: number
      recommendation: string  // "Choose X if..."
      reasoning: string
    }>
  }
  
  // Methodology details
  methodologyDetails?: {
    title?: string
    description: string
    testingApproach: string[]
  }
}
