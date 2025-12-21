/**
 * Competitor Ranking Content Type
 * 
 * For competitive analysis with provider rankings, capability scoring,
 * market share analysis, and strategic positioning insights.
 */

export interface CompetitorRankingData {
  // Executive Summary
  introduction?: string[]
  
  // Market Overview Stats
  marketStats?: Array<{
    icon: string                    // TrendingUp, BarChart3, Globe, etc.
    value: string
    description: string
  }>
  
  // Market Share Distribution
  marketShare?: {
    title?: string
    providers: Array<{
      name: string
      percentage: string
      growth: string                // "+12% YoY"
      barWidth: number              // 0-100 for progress bar
    }>
  }
  
  // Competitor Overview Cards
  competitors: Array<{
    name: string
    rating: number                  // 8.2 out of 10
    badge: string                   // "Best in Class", "Enterprise Champion"
    badgeColor?: string             // "primary", "blue", "green"
    description: string
    specs: Array<{
      label: string
      value: string
    }>
  }>
  
  // Capability Comparisons
  capabilityComparisons?: Array<{
    title: string
    description?: string
    dimensions: Array<{
      dimensionName: string
      winnerColor?: string          // "primary", "blue", "green"
      scores: Array<{
        provider: string
        score: number               // 0-10
        barWidth: number            // percentage
        color: string               // "primary", "blue-600", "green-600"
      }>
      note?: string
    }>
  }>
  
  // Key Takeaways
  keyTakeaways?: {
    title?: string
    items: Array<{
      provider: string
      color: string                 // "primary", "blue-600", "green-600"
      summary: string
    }>
  }
  
  // Detailed Analysis (optional - can reuse sections from industry-analysis)
  detailedAnalysis?: Array<{
    title: string
    paragraphs: string[]
  }>
}
