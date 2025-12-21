/**
 * How-To Guide Content Type
 * 
 * For step-by-step instructional articles that guide users through
 * processes with clear, actionable steps.
 */

export interface HowToGuideData {
  introduction?: string
  steps?: Array<{
    number: number
    title: string
    description: string
    layout: 'grid' | 'sequential'
    gridItems?: Array<{
      title: string
      description: string
    }>
    sequentialSteps?: Array<{
      title: string
      description: string
    }>
  }>
  conclusion?: string
}
