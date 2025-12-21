/**
 * Content Type Badge System
 * 
 * Provides utilities for displaying content type badges on blog cards
 * and throughout the template system.
 */

import React from "react"
import { Badge } from "@/components/ui/badge"

export const CONTENT_TYPE_LABELS: Record<string, { label: string; icon: string }> = {
  'custom': { label: 'Article', icon: '📝' },
  'listicle': { label: 'Listicle', icon: '📋' },
  'faq': { label: 'FAQ', icon: '❓' },
  'product-review': { label: 'Review', icon: '⭐' },
  'how-to-guide': { label: 'Guide', icon: '📖' },
  'competitor-ranking': { label: 'Ranking', icon: '🏆' },
  'product-comparison': { label: 'Comparison', icon: '⚖️' },
  'case-study': { label: 'Case Study', icon: '📊' },
  'tutorial': { label: 'Tutorial', icon: '💻' },
  'industry-analysis': { label: 'Analysis', icon: '📈' },
  'thought-leadership': { label: 'Opinion', icon: '💭' },
  'news-trend': { label: 'News & Trends', icon: '📰' },
  'debate': { label: 'Debate', icon: '⚖️' },
  'minimal-essay': { label: 'Essay', icon: '✍️' },
  'scorecard': { label: 'Scorecard', icon: '📊' },
  'commentary': { label: 'Commentary', icon: '💬' },
  'affiliate-product-review': { label: 'Product Review', icon: '⭐' }
}

/**
 * Get badge configuration for a content type
 */
export function getContentTypeBadge(contentType?: string) {
  const type = contentType || 'custom'
  const config = CONTENT_TYPE_LABELS[type] || CONTENT_TYPE_LABELS['custom']
  return config
}

/**
 * Content Type Badge Component
 * 
 * Displays a badge with icon and label for the content type
 * 
 * @param contentType - The content type identifier
 * @param className - Additional CSS classes
 */
export function ContentTypeBadge({ 
  contentType, 
  className = "",
  useOverlay = true
}: { 
  contentType?: string
  className?: string
  useOverlay?: boolean
}): React.ReactElement {
  const config = getContentTypeBadge(contentType)
  
  // Use brand PRIMARY color with opacity for content type badges
  // Black text for readability, subtle border for definition
  const baseClasses = 'bg-primary/20 text-foreground border border-primary/40'
  const overlayClasses = useOverlay ? 'backdrop-blur-sm shadow-md' : ''
  
  return (
    <Badge 
      className={`${baseClasses} ${overlayClasses} ${className}`.trim()}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  )
}
