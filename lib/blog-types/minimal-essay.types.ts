/**
 * Minimal Essay Content Type
 * 
 * For clean, typography-focused long-form content with minimal visual elements.
 * Emphasizes readability and thoughtful writing over complex layouts.
 */

export interface MinimalEssayData {
  // Optional category tag
  essayCategory?: string
  
  // Essay sections (simple h2 + paragraphs structure)
  sections: Array<{
    title: string
    paragraphs: string[]
  }>
}
