/**
 * 🔒 LOCKED FILE - DO NOT MODIFY
 * 
 * Site Configuration Schema
 * Defines the STRUCTURE of configuration - AI should never edit this file
 * Only developers should modify this to change the config architecture
 */

export interface BrandConfig {
  id: string
  name: string
  description: string
  url: string
  logoPath: string
  faviconPath: string
  ogImagePath: string
  mainAppUrl: string
  legalEmail: string
  privacyEmail: string
  tagline?: string
}

export interface HeroConfig {
  title: string
  subtitle: string
}

export interface AuthorConfig {
  name: string
  bio: string
  role: string
  image: string
}

export interface SectionConfig {
  topArticles: {
    title: string
    description: string
  }
  recentPosts: {
    title: string
  }
  categories: {
    title: string
  }
}

export interface NewsletterConfig {
  title: string
  description: string
  disclaimer: string
}

export interface CategoryConfig {
  name: string
  icon: 'Shield' | 'Heart' | 'Baby'
  slug: string
}

export interface SiteConfigSchema {
  brand: BrandConfig
  hero: HeroConfig
  author: AuthorConfig
  sections: SectionConfig
  newsletter: NewsletterConfig
  categories: CategoryConfig[]
}

export interface ColorScheme {
  primary: string
  secondary: string
  accent: string
}

export interface ColorConfigSchema {
  light: ColorScheme
  dark: ColorScheme
}
