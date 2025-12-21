/**
 * Industry Analysis Content Type
 * 
 * For comprehensive market analysis reports with statistics, trends,
 * competitive dynamics, and strategic insights.
 */

export interface IndustryAnalysisData {
  // Introduction
  introduction?: string[]
  
  // Key Statistics (with icons)
  keyStats?: Array<{
    icon: string                    // TrendingUp, BarChart3, Globe, etc.
    value: string
    description: string
  }>
  
  // Analysis Sections
  sections?: Array<{
    title: string
    paragraphs: string[]
    pullQuote?: {
      text: string
      attribution?: string
    }
    comparisonGrid?: {
      leftSide: {
        title: string
        items: string[]
      }
      rightSide: {
        title: string
        items: string[]
      }
    }
    dataVisualization?: {
      title: string
      description?: string
      icon?: string
      data: Array<{
        label: string
        value: string
        percentage: number        // For progress bar width
      }>
    }
    callout?: {
      icon?: string
      title: string
      description: string
      metrics?: Array<{
        label: string
        value: string
      }>
    }
  }>
  
  // Strategic Implications
  strategicImplications?: {
    title?: string
    paragraphs: string[]
  }
  
  // Conclusion
  conclusion?: string[]
}
