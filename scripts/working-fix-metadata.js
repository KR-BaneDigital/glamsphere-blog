const fs = require('fs');
const path = require('path');

console.log('Starting WORKING metadata fix script...\n');

// Check for test mode (single file)
const testFile = process.argv[2];
const isTestMode = testFile && testFile !== '--test';

// Get all blog directories
const blogDir = path.join(__dirname, '..', 'app', 'blog');
let directories = fs.readdirSync(blogDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Filter to single file if in test mode
if (isTestMode) {
  directories = directories.filter(dir => dir === testFile);
  console.log(`TEST MODE: Processing only ${testFile}\n`);
} else {
  console.log(`Found ${directories.length} blog directories\n`);
}

let fixed = 0;

// Process each blog post
directories.forEach(dir => {
  const pagePath = path.join(blogDir, dir, 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    console.log(`Skipping ${dir} - no page.tsx found`);
    return;
  }

  // Read file content
  let content = fs.readFileSync(pagePath, 'utf8');

  // Skip the working ones
  if (dir === 'indulge-in-luxury-why-the-black-vanilla-set-will-elevate-you' ||
      dir === 'bright-eyes-ahead-unveiling-the-magic-of-luminous-eye-correc' ||
      dir === 'curvlife-glue-kit-elevate-your-craft-with-unstoppable-bondin') {
    console.log(`Skipping ${dir} - already working`);
    return;
  }

  // Extract data from post object (handle variations)
  const titleMatch = content.match(/"title":\s*"([^"]+)"/);
  const excerptMatch = content.match(/"excerpt":\s*"([^"]*)"/);
  const contentMatch = content.match(/"content":\s*"([^"]*)"/);
  const descriptionMatch = excerptMatch || contentMatch; // Use excerpt or content
  const slugMatch = content.match(/"slug":\s*"([^"]+)"/);
  const categoryMatch = content.match(/"category":\s*"([^"]+)"/);
  const subcategoryMatch = content.match(/"subcategory":\s*"([^"]+)"/);

  if (!titleMatch || !descriptionMatch || !slugMatch || !categoryMatch || !subcategoryMatch) {
    console.log(`Skipping ${dir} - missing required data`);
    return;
  }

  const slug = slugMatch[1];
  const category = categoryMatch[1];
  const subcategory = subcategoryMatch[1];

  // Create slugs for category and subcategory
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const subcategorySlug = subcategory.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const imageUrl = `https://glamsphere.org/hero-images/${slug}.jpg`;

  // Make the changes
  let changed = false;

  // 1. Add BlogPost import if missing
  if (!content.includes('import type { BlogPost }')) {
    content = content.replace(
      /import type { Metadata } from "next"/,
      'import type { Metadata } from "next"\nimport type { BlogPost } from "@/lib/blog-data"'
    );
    changed = true;
  }

  // 2. Add images to openGraph
  const openGraphSection = content.match(/"openGraph":\s*{[^}]*}/s)?.[0] || '';
  if (!openGraphSection.includes('"images":')) {
    content = content.replace(
      /("authors":\s*\[\s*"[^"]+"\s*\])/,
      '$1,\n    "images": [\n      {\n        "url": "' + imageUrl + '",\n        "width": 1200,\n        "height": 630\n      }\n    ]'
    );
    changed = true;
  }

  // 3. Add images to twitter - append before closing brace
  if (content.includes('"twitter": {')) {
    const twitterIndex = content.indexOf('"twitter": {');
    const closingBraceIndex = content.indexOf('}', twitterIndex);
    const twitterSection = content.slice(twitterIndex, closingBraceIndex + 1);

    if (!twitterSection.includes('"images":')) {
      console.log(`Adding twitter images to ${dir}`);
      // Find the line before the closing brace (should be the last field)
      const lastLineStart = content.lastIndexOf('\n', closingBraceIndex - 1) + 1;
      const lastLine = content.slice(lastLineStart, closingBraceIndex).trim();
      // Add comma if the last line doesn't end with comma
      const needsComma = !lastLine.endsWith(',');
      const commaStr = needsComma ? ',' : '';
      content = content.slice(0, closingBraceIndex) + commaStr + '\n    "images": "' + imageUrl + '"' + content.slice(closingBraceIndex);
      console.log(`Added twitter images to ${dir}`);
      changed = true;
    }
  }

  // 4. Add content field
  if (!content.includes('"content":')) {
    content = content.replace(
      /("excerpt":\s*"[^"]+")/,
      '$1,\n  "content": ""'
    );
    changed = true;
  }

  // 5. Add categorySlug
  if (!content.includes('"categorySlug":')) {
    content = content.replace(
      /("category":\s*"[^"]+")/,
      '$1,\n  "categorySlug": "' + categorySlug + '"'
    );
    changed = true;
  }

  // 6. Add subcategorySlug
  if (!content.includes('"subcategorySlug":')) {
    content = content.replace(
      /("subcategory":\s*"[^"]+")/,
      '$1,\n  "subcategorySlug": "' + subcategorySlug + '"'
    );
    changed = true;
  }

  // 7. Change contentType to as const
  if (content.includes('"contentType":') && !content.includes('"contentType": "affiliate-product-review" as const')) {
    content = content.replace(
      /("contentType":\s*"[^"]+")/,
      '$1 as const'
    );
    changed = true;
  }

  // 8. Change template call to use as any
  if (!content.includes('post={post as any}')) {
    content = content.replace(
      /post=\{post\}/g,
      'post={post as any}'
    );
    changed = true;
  }

  if (changed) {
    // Write back
    fs.writeFileSync(pagePath, content);
    console.log(`✓ Fixed ${dir}`);
    fixed++;
  } else {
    console.log(`No changes needed for ${dir}`);
  }
});

console.log(`\nScript complete!`);
console.log(`Fixed: ${fixed} files`);
