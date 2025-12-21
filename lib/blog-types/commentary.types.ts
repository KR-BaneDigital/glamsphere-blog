/**
 * Commentary Content Type
 * 
 * For editorial pieces with extensive expert commentary,
 * multiple perspectives, and in-depth analysis with sidebar annotations.
 */

export interface CommentaryData {
  // Main introduction/lede
  introduction?: string
  
  // Multi-part structure with topics
  topics?: Array<{
    partNumber: number
    partLabel: string  // "Part I"
    title: string
    
    // Article content paragraphs
    content: Array<{
      type: 'paragraph' | 'drop-cap' | 'quote' | 'editorial-callout'
      text: string
      attribution?: string  // For quotes
      label?: string  // For editorial callouts
    }>
    
    // Left sidebar commentary
    leftCommentary?: Array<{
      type: 'expert-comment' | 'context' | 'data-point'
      expert?: {
        name: string
        title: string
        perspective: string  // "Pro-Adoption Perspective"
        color?: string  // "emerald", "rose", "blue", "orange"
      }
      comments?: string[]  // Multiple paragraphs
      contextTitle?: string
      contextText?: string
      dataValue?: string  // "$4.2M"
      dataDescription?: string
    }>
    
    // Right sidebar commentary
    rightCommentary?: Array<{
      type: 'expert-comment' | 'context' | 'data-point' | 'social-comment'
      expert?: {
        name: string
        title: string
        perspective: string
        color?: string
      }
      comments?: string[]
      socialHandle?: string
      socialComment?: string
      contextTitle?: string
      contextText?: string
      dataValue?: string
      dataDescription?: string
    }>
  }>
  
  // Final conclusion section
  conclusion?: {
    title?: string
    paragraphs: string[]
  }
}
