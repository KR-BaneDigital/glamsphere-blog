/**
 * FAQ Content Type
 * 
 * For question-and-answer format articles that provide comprehensive
 * answers to common questions with structured sections.
 */

export interface FAQData {
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
}
