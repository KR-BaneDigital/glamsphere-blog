/**
 * 🔒 LOCKED FILE - DO NOT MODIFY
 * 
 * Site Configuration Assembly
 * This file imports and re-exports configuration from content files
 * AI should NEVER modify this file - only edit lib/config.content.ts
 * 
 * This architecture prevents AI from accidentally deleting config sections
 */

export { siteContent as siteConfig, colorContent as colorConfig } from './config.content'
export type { SiteConfigSchema, ColorConfigSchema } from './config.schema'
