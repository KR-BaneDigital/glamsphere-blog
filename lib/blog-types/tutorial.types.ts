/**
 * Tutorial Content Type
 * 
 * For comprehensive educational content with detailed step-by-step
 * instructions, examples, and learning outcomes.
 */

export interface TutorialData {
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
