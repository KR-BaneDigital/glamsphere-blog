/**
 * News/Trend Content Type
 * 
 * For timely articles covering industry news, emerging trends,
 * and market developments with data-driven insights.
 */

export interface NewsTrendData {
  lastUpdated?: string
  introduction?: string[]
  pullQuote?: {
    text: string
    attribution: string
  }
  keyInsights?: Array<{
    icon: string
    title: string
    description: string
  }>
  industryStats?: Array<{
    industry: string
    subtitle: string
    percentage: string
  }>
  caseStudies?: Array<{
    title: string
    description: string
    metrics: Array<{
      value: string
      label: string
    }>
  }>
  expertPerspectives?: Array<{
    quote: string
    name: string
    title: string
  }>
  lookingForward?: string[]
  keyChallenges?: Array<{
    title: string
    description: string
  }>
  closingThoughts?: string[]
}
