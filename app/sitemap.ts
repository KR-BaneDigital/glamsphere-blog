/**
 * Dynamic Sitemap Generation
 * 
 * Next.js automatically serves this at /sitemap.xml
 * Reads from blog-data.ts to always stay in sync with actual content
 */

import { blogPosts } from '@/lib/blog-data'
import { getAllCategorySlugs } from '@/lib/categories'
import { siteConfig } from '@/lib/config'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Filter out placeholder posts - only include real content in sitemap
  const realPosts = blogPosts.filter(post => !post.id.startsWith('placeholder-'))
  
  // Homepage - highest priority
  const homepage = {
    url: siteConfig.brand.url,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }
  
  // Blog index page - high priority
  const blogIndex = {
    url: `${siteConfig.brand.url}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }
  
  // Blog posts - standard priority
  const blogUrls = realPosts.map(post => ({
    url: `${siteConfig.brand.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // Category pages - dynamically generated from database categories
  const categorySlugs = getAllCategorySlugs()
  const categoryUrls = categorySlugs.map(slug => ({
    url: `${siteConfig.brand.url}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Static pages - privacy and terms
  const staticPages = [
    {
      url: `${siteConfig.brand.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${siteConfig.brand.url}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]
  
  return [homepage, blogIndex, ...blogUrls, ...categoryUrls, ...staticPages]
}
