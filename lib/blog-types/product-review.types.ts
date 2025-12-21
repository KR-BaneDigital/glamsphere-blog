/**
 * Product Review Content Type
 * 
 * For comprehensive product evaluations with ratings, specs,
 * pros/cons analysis, and detailed performance breakdowns.
 */

export interface ProductReviewData {
  // Overall Rating & Summary
  overallScore: number                // e.g., 9.2 out of 10
  starRating: number                  // 1-5 stars
  editorChoice?: boolean              // Editor's Choice badge
  quickSummary: string                // Brief verdict summary
  
  // Quick Specs Grid
  specs: Array<{
    label: string
    value: string
  }>
  
  // Performance Breakdown Scores
  performanceScores: Array<{
    category: string
    score: number                     // out of 10
  }>
  
  // Pros & Cons
  pros: string[]
  cons: string[]
  
  // Detailed Review Sections
  sections: Array<{
    title: string
    paragraphs: string[]
  }>
  
  // Final Verdict
  verdict: {
    title: string
    paragraphs: string[]
    recommendation: string
  }
}
