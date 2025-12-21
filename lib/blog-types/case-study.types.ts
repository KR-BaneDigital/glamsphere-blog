/**
 * Case Study Content Type
 * 
 * For detailed success stories showcasing real-world applications,
 * challenges, solutions, and measurable results.
 */

export interface CaseStudyData {
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
