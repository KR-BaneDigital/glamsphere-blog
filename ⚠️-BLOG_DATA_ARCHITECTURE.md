#  BLOG DATA ARCHITECTURE - CRITICAL RULES

**Date:** December 9, 2025  
**Status:** 🔒 LOCKED ARCHITECTURE - DO NOT MODIFY WITHOUT READING THIS

---

## 🚨 LOCKED FILES

These files are **LOCKED** and must not be modified:

### `lib/blog-data.ts`
**Current Implementation:** Imports from `blog-data.content.ts`

```typescript
import { blogPosts as blogPostsData } from "./blog-data.content"
export { blogPostsData as blogPosts }
```

**⚠️ DO NOT:**
- Change to use `import.meta.glob` (Vite-only, breaks Next.js)
- Change to use dynamic imports
- Change to use `require.context` (Webpack-only)
- Change the import source

**✅ MUST:**
- Keep importing from `blog-data.content.ts`
- Export the same functions: `blogPosts`, `getPostBySlug`, `getRelatedPosts`, `filterPosts`, `getAllCategories`

---

### `lib/blog-data.content.ts`
**Current Implementation:** Programmatically managed by Avalon backend

**⚠️ DO NOT:**
- Manually edit this file
- Delete this file
- Rename this file

**✅ UNDERSTAND:**
- Backend regenerates this file when pages are built/deleted
- Contains all blog posts in a single array
- Required for Next.js template builds

---

## 🏗️ CURRENT ARCHITECTURE

### Backend (Avalon Content Engine):
```
Build Page
  ↓
Create BlogPost object
  ↓
Generate TWO files:
  1. app/blog/{slug}/page.tsx
  2. lib/blog-data/{slug}.data.ts  ← Individual file (for future use)
  ↓
ALSO regenerate blog-data.content.ts with ALL posts ← Monolithic (for current use)
  ↓
Commit all to GitHub
```

### Template (v0-faceless-templates):
```
lib/blog-data.ts
  ↓
imports from blog-data.content.ts
  ↓
exports blogPosts array
  ↓
app pages import { blogPosts } from '@/lib/blog-data'
  ↓
Build succeeds ✅
```

---

## ❌ WHAT BREAKS THE BUILD

### Attempted on Dec 9, 2025 (FAILED):

**Bad Implementation:**
```typescript
// ❌ BREAKS - import.meta.glob is Vite-only
const dataFileModules = import.meta.glob('./blog-data/*.data.ts', { eager: true })
export const blogPosts = Object.values(dataFileModules).map(m => m.post)
```

**Error:**
```
TypeError: {(intermediate value)}.glob is not a function
```

**Why:** `import.meta.glob` is a Vite bundler feature. Next.js uses Webpack/Turbopack which don't support it.

---

## ✅ WHAT WORKS

### Current Working Implementation:
```typescript
// ✅ WORKS - Standard ES6 import
import { blogPosts as blogPostsData } from "./blog-data.content"
export { blogPostsData as blogPosts }
```

**Why:** Standard imports work in ALL bundlers (Webpack, Turbopack, Vite, etc.)

---

## 📋 BUNDLER COMPATIBILITY RULES

### ✅ SAFE (Works in Next.js):
- Standard ES6 imports: `import { x } from './file'`
- Dynamic imports: `const mod = await import('./file')`
- Re-exports: `export { x } from './file'`

### ❌ UNSAFE (Breaks Next.js):
- `import.meta.glob()` - Vite only
- `require.context()` - Webpack only (deprecated)
- `import.meta.url` - Limited support
- Any Vite-specific APIs

---

## 🎯 IMPLEMENTATION STATUS

### What Was Successfully Implemented:

**✅ Master Repo (avalon-content-engine):**
- `generateIndividualPostDataFile()` function added
- Build route creates individual `{slug}.data.ts` files
- Delete route removes individual files
- Backend architecture ready for scalability

**✅ Template Repo (v0-faceless-templates):**
- `lib/blog-data.ts` imports from monolithic file (Next.js compatible)
- `lib/blog-data/index.ts` deleted (was hybrid merger, no longer needed)
- All 15 placeholders preserved in `blog-data.content.ts`
- Template builds successfully

### What Was Attempted (FAILED):

**❌ Dynamic Import Aggregation:**
- Tried `import.meta.glob` for automatic file discovery
- Not supported in Next.js
- Reverted to monolithic import

---

## 🔮 FUTURE SCALABILITY PATH

### Current State:
- Backend creates individual files ✅
- Template reads monolithic file ✅
- Works but not fully scalable

### Future Option (When Needed):
When sites reach 1000+ posts and monolithic file becomes too large:

**Option A:** Manual import list in blog-data.ts
```typescript
import { post as p1 } from './blog-data/slug-1.data'
import { post as p2 } from './blog-data/slug-2.data'
export const blogPosts = [p1, p2, ...]
```
Generated programmatically by backend.

**Option B:** Build-time generation
Use Node.js fs during build to discover files and generate import statements.

**Option C:** Move to App Router with server components
Use `fs.readdirSync` in server components to load files dynamically.

---

## 🛡️ PROTECTION RULES

### Before Making ANY Changes to Blog Data System:

1. **READ THIS DOCUMENT** 
2. **TEST LOCALLY** - Run `pnpm build` before pushing
3. **VERIFY BUNDLER** - Check feature works in Next.js, not just Vite
4. **CHECK IMPORTS** - Don't break existing app/ file imports
5. **PRESERVE PLACEHOLDERS** - All 15 must remain accessible

### Files That Import from blog-data.ts:
- `app/page.tsx` - Homepage
- `app/blog/page.tsx` - Blog index
- `app/blog/[slug]/page.tsx` - Blog post pages
- `app/category/[slug]/page.tsx` - Category pages
- `app/blog/[slug]/listicle.tsx` - Old file (deprecated)

**ANY change to blog-data.ts MUST preserve:** `blogPosts`, `getPostBySlug`, `getRelatedPosts`, `getAllCategories`, `filterPosts`

---

## 📚 RELATED DOCUMENTATION

- `⚠️-TEMPLATE_REPOSITORY_ARCHITECTURE.md` - Overall template structure
- `SCALABLE_BLOG_DATA_ARCHITECTURE_REBUILD.md` - Original plan (Phase 4 was wrong)
- `HOW_TO_BUILD_TEMPLATES.md` - Template build process

---

## 🎓 LESSONS LEARNED

### December 9, 2025 Incident:

**What Happened:**
- Implemented `import.meta.glob` from architecture document
- Pushed to production
- Template build failed on Vercel
- Had to revert immediately

**Root Cause:**
- Document specified Vite feature without checking Next.js compatibility
- No local build test before push
- Assumed glob patterns work universally

**Prevention:**
- THIS DOCUMENT created
- Always test `pnpm build` locally before push
- Verify feature compatibility with Next.js docs
- Blog data architecture now explicitly documented

---

## 📞 CONTACT FOR CHANGES

If you need to modify the blog data architecture:

1. Read this entire document
2. Understand current vs. desired state  
3. Verify Next.js compatibility
4. Test locally with `pnpm build`
5. Create backup commits before risky changes

**Never assume a bundler feature "should work" - verify it actually works in Next.js.**

---

**END OF CRITICAL ARCHITECTURE DOCUMENT**
