# Blog Template v1 - Programmatic Blog Site Generator

A Next.js 14 blog template designed for programmatic brand customization via placeholder replacement.

## 🎯 Purpose

This template serves as the foundation for generating brand-specific blog sites. It uses a placeholder system that allows complete customization by replacing template variables in a single configuration file.

## 📁 Template Structure

```
blog-template-v1/
├── app/                          # Next.js 14 app directory
│   ├── page.tsx                  # Homepage (uses modular components)
│   ├── layout.tsx                # Root layout with metadata
│   ├── globals.css               # Styles with color placeholders
│   └── blog/                     # Blog pages
├── components/
│   ├── blog-header.tsx           # Shared header
│   ├── blog-footer.tsx           # Shared footer
│   ├── blog/                     # Reusable blog components
│   │   ├── post-card.tsx         # Standard post card
│   │   └── post-card-horizontal.tsx  # Compact post card
│   ├── home/                     # Homepage sections
│   │   ├── hero-section.tsx      # Hero with featured post
│   │   ├── top-articles-section.tsx  # Article grid
│   │   ├── sidebar.tsx           # Sidebar content
│   │   └── newsletter-card.tsx   # Reusable newsletter form
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── config.ts                 # ⭐ ALL PLACEHOLDERS HERE
│   └── blog-data.ts              # Sample blog posts
└── public/                       # Static assets
```

## 🏷️ Available Placeholders

### Brand Identity (`lib/config.ts`)
| Placeholder | Purpose | Example Value |
|------------|---------|---------------|
| `{{BRAND_NAME}}` | Brand/site name | "TechInsights" |
| `{{SITE_URL}}` | Full site URL | "https://techinsights.com" |
| `{{SITE_DESCRIPTION}}` | Meta description | "Expert tech insights..." |
| `{{REPO_NAME}}` | GitHub repo name (in package.json) | "techinsights-blog" |

### Hero Section
| Placeholder | Purpose | Example Value |
|------------|---------|---------------|
| `{{HERO_TITLE}}` | Main headline | "Welcome to TechInsights" |
| `{{HERO_SUBTITLE}}` | Hero description | "Your source for tech news" |

### Author Information
| Placeholder | Purpose | Example Value |
|------------|---------|---------------|
| `{{AUTHOR_NAME}}` | Author name | "John Smith" |
| `{{AUTHOR_BIO}}` | Author bio | "Tech journalist with 10 years..." |
| `{{AUTHOR_ROLE}}` | Author title | "Senior Editor" |

### Section Headings
| Placeholder | Purpose | Example Value |
|------------|---------|---------------|
| `{{TOP_ARTICLES_TITLE}}` | Featured section title | "Featured Articles" |
| `{{TOP_ARTICLES_DESCRIPTION}}` | Section description | "Our most popular content" |
| `{{RECENT_POSTS_TITLE}}` | Sidebar recent title | "Recently Published" |
| `{{CATEGORIES_TITLE}}` | Categories heading | "Browse by Category" |

### Newsletter
| Placeholder | Purpose | Example Value |
|------------|---------|---------------|
| `{{NEWSLETTER_TITLE}}` | Newsletter heading | "Stay Informed" |
| `{{NEWSLETTER_DESCRIPTION}}` | Signup description | "Get weekly insights..." |
| `{{NEWSLETTER_DISCLAIMER}}` | Privacy text | "Unsubscribe anytime" |

### Categories (3 categories supported)
| Placeholder | Purpose | Example Value |
|------------|---------|---------------|
| `{{CATEGORY_1_NAME}}` | First category | "Health & Wellness" |
| `{{CATEGORY_1_SLUG}}` | URL slug | "health-wellness" |
| `{{CATEGORY_2_NAME}}` | Second category | "Product Reviews" |
| `{{CATEGORY_2_SLUG}}` | URL slug | "product-reviews" |
| `{{CATEGORY_3_NAME}}` | Third category | "Buyer's Guides" |
| `{{CATEGORY_3_SLUG}}` | URL slug | "buyers-guides" |

### Colors (`app/globals.css`)
| Placeholder | Purpose | Format |
|------------|---------|--------|
| `{{PRIMARY_COLOR}}` | Primary brand color | `oklch(0.5 0.2 220)` |
| `{{SECONDARY_COLOR}}` | Secondary color | `oklch(0.9 0.1 220)` |
| `{{ACCENT_COLOR}}` | Accent color | `oklch(0.85 0.15 220)` |
| `{{PRIMARY_COLOR_DARK}}` | Dark mode primary | `oklch(0.7 0.2 220)` |
| `{{SECONDARY_COLOR_DARK}}` | Dark mode secondary | `oklch(0.3 0.1 220)` |
| `{{ACCENT_COLOR_DARK}}` | Dark mode accent | `oklch(0.4 0.15 220)` |

**Total: 27 placeholders across 3 files**

## 🔄 Usage

### Programmatic Generation (Recommended)

```typescript
import fs from 'fs-extra'
import path from 'path'

async function generateBlogSite(brand: Brand) {
  // 1. Copy template
  const templatePath = 'templates/blog-template-v1'
  const outputPath = `generated-sites/${brand.slug}`
  await fs.copy(templatePath, outputPath)
  
  // 2. Replace placeholders in lib/config.ts
  const configPath = path.join(outputPath, 'lib/config.ts')
  let config = await fs.readFile(configPath, 'utf-8')
  
  config = config.replace(/\{\{BRAND_NAME\}\}/g, brand.name)
  config = config.replace(/\{\{SITE_URL\}\}/g, brand.url)
  config = config.replace(/\{\{SITE_DESCRIPTION\}\}/g, brand.description)
  config = config.replace(/\{\{HERO_TITLE\}\}/g, brand.heroTitle)
  config = config.replace(/\{\{HERO_SUBTITLE\}\}/g, brand.heroSubtitle)
  // ... replace all placeholders
  
  await fs.writeFile(configPath, config)
  
  // 3. Replace colors in app/globals.css
  const cssPath = path.join(outputPath, 'app/globals.css')
  let css = await fs.readFile(cssPath, 'utf-8')
  
  css = css.replace(/\{\{PRIMARY_COLOR\}\}/g, brand.primaryColor)
  css = css.replace(/\{\{SECONDARY_COLOR\}\}/g, brand.secondaryColor)
  css = css.replace(/\{\{ACCENT_COLOR\}\}/g, brand.accentColor)
  // ... replace dark mode colors
  
  await fs.writeFile(cssPath, css)
  
  // 4. Replace repo name in package.json
  const pkgPath = path.join(outputPath, 'package.json')
  let pkg = await fs.readFile(pkgPath, 'utf-8')
  pkg = pkg.replace(/\{\{REPO_NAME\}\}/g, brand.repoName)
  await fs.writeFile(pkgPath, pkg)
  
  // 5. Add real blog posts to lib/blog-data.ts
  // Replace sample posts with generated content
  
  return outputPath
}
```

### Manual Customization

1. Copy `templates/blog-template-v1/` to new directory
2. Find & replace all `{{PLACEHOLDERS}}` in:
   - `lib/config.ts` (20 placeholders)
   - `app/globals.css` (6 color placeholders)
   - `package.json` (1 placeholder)
3. Update `lib/blog-data.ts` with real blog posts
4. Run `pnpm install && pnpm dev` to test
5. Deploy to Vercel

## 🎨 Color Format

Colors use oklch() format for better color perception:

```css
/* Syntax: oklch(lightness chroma hue) */
oklch(0.5 0.2 220)  /* Blue */
oklch(0.7 0.15 140) /* Green */
oklch(0.6 0.18 30)  /* Orange */
```

**Parameters:**
- **Lightness:** 0 (black) to 1 (white)
- **Chroma:** 0 (grey) to 0.4+ (vivid)
- **Hue:** 0-360 (color wheel degrees)

**Why oklch?** It provides perceptually uniform colors and better accessibility than RGB/Hex.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI)
- **Fonts:** Google Fonts (Montserrat, Open Sans, Roboto Slab)
- **Analytics:** Vercel Analytics
- **Type Safety:** TypeScript

## 📦 Installation

```bash
cd templates/blog-template-v1
pnpm install
pnpm dev       # Development server at http://localhost:3000
pnpm build     # Production build
pnpm start     # Production server
```

## 🧩 Customizing Components

### Adding a New Blog Post

Edit `lib/blog-data.ts`:

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: "11",
    slug: "new-post-slug",
    title: "New Post Title",
    excerpt: "Post description...",
    content: `# Post Content\n\nMarkdown here...`,
    image: "/images/new-post.jpg",
    category: "Category 1",
    tags: ["tag1", "tag2"],
    date: "January 15, 2025",
    readTime: "5 min read",
    author: defaultAuthor,  // Uses siteConfig author
    featured: false
  },
  // ... existing posts
]
```

### Modifying Colors

Option 1: Update placeholders in `app/globals.css`:
```css
--primary: oklch(0.5 0.2 220); /* Your brand blue */
```

Option 2: Replace programmatically before deployment

### Adding Images

Place images in `/public/images/` and reference as:
```typescript
image: "/images/my-post-image.jpg"
```

## 📝 Default Values

The template includes sensible defaults (black/grey theme) for local development. These should be replaced with brand-specific values during generation:

- **Brand Name:** "Blog"
- **Description:** "Discover trusted insights..."
- **Colors:** Black/grey monochrome
- **Author:** "Author Name"
- **Categories:** "Category 1", "Category 2", "Category 3"

## 🔗 Integration with Content Generation

This template is designed to work seamlessly with the Avalon Content Engine's V3 content generation system:

```typescript
// Your V3 content generator produces:
interface PureContent {
  title: string
  metaTitle: string
  metaDescription: string
  slug: string
  sections: ParsedSection[]  // Hierarchical content
  excerpt: string
  focusKeyword: string
}

// Convert to BlogPost format:
const blogPost: BlogPost = {
  slug: content.slug,
  title: content.title,
  excerpt: content.excerpt,
  content: sectionsToMarkdown(content.sections),
  // ... map other fields
}
```

## 🏗️ Architecture

**Modular Component Design:**
- **7 new components** extracted from monolithic ClientPage
- **Single source of truth** for configuration (lib/config.ts)
- **DRY principle** - no duplicate code
- **Easy to extend** - add new sections without touching existing code

**Before Refactor:** 600+ line ClientPage with duplicated headers/footers
**After Refactor:** ~60 line homepage composing focused components

## 📄 License

Proprietary - For use with Avalon Content Engine only.

---

## 💡 Tips for Programmatic Generation

1. **Always validate placeholders** are replaced before deployment
2. **Test color contrast** for accessibility (WCAG AA minimum)
3. **Generate 10-20 posts minimum** for a complete site feel
4. **Use real images** - placeholder images should be replaced
5. **Customize categories** based on brand niche
6. **Update package.json name** to match GitHub repo name

## 🐛 Troubleshooting

**Build errors after customization?**
- Check all imports resolve correctly
- Verify `lib/config.ts` exports are valid TypeScript
- Ensure colors are in correct oklch() format

**Colors not applying?**
- Check CSS variable replacements in `app/globals.css`
- Verify both light and dark mode colors are set
- Clear browser cache and rebuild

**Missing content?**
- Ensure `lib/blog-data.ts` has at least one post
- Check defaultAuthor references siteConfig correctly
- Verify all required BlogPost fields are present
