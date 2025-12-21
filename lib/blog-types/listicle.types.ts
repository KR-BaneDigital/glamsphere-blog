/**
 * Listicle Content Type
 * 
 * For numbered list articles that provide actionable strategies,
 * tips, or insights in a structured format.
 */

export interface ListicleData {
  listItems: Array<{
    number: number
    heading: string
    content: string
    image?: string
    insight?: string
    tips?: string[]
  }>
}
