/**
 * Product Comparison Content Type
 * 
 * For side-by-side product evaluations with detailed feature analysis,
 * pros/cons breakdowns, and winner recommendations.
 */

export interface ProductComparisonData {
  // Intro/Summary
  introduction?: string[]
  
  // Individual Products (flexible N products)
  products: Array<{
    name: string
    badge: string                    // "Best Overall", "Most Comfortable", etc.
    rating: number                   // 9.2 out of 10
    image?: string
    description: string[]            // Multiple paragraphs
    specs: Array<{
      label: string
      value: string
      isPositive?: boolean           // For check/x icon
    }>
    pros: string[]
    cons: string[]
    bottomLine: string
  }>
  
  // Comparison Table
  comparisonTable: Array<{
    feature: string
    values: string[]                 // One per product, in same order
    bestIndex?: number               // Which product wins this feature (0-based index)
  }>
  
  // Winner & Recommendations
  winner: {
    productName: string
    title: string                    // "Winner: Sony WH-1000XM5"
    paragraphs: string[]
  }
  
  alternativeRecommendations?: Array<{
    productName: string
    whenToChoose: string
  }>
  
  // Final Thoughts
  conclusion?: string[]
}
