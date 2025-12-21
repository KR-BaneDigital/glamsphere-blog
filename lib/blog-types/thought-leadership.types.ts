/**
 * Thought Leadership Content Type
 * 
 * For opinion pieces, vision statements, and strategic insights
 * focused on future trends and leadership perspectives.
 */

export interface ThoughtLeadershipData {
  opening?: string
  stats?: Array<{
    value: string
    description: string
  }>
  sections?: Array<{
    title: string
    paragraphs: string[]
    pullQuote?: {
      text: string
      attribution?: string
    }
    comparison?: {
      before: {
        title: string
        items: string[]
      }
      after: {
        title: string
        items: string[]
      }
    }
    callout?: {
      title: string
      content: string
    }
  }>
  conclusion?: string
}
