const fs = require('fs');
const path = require('path');

console.log('Starting final metadata fix script...\n');

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

  // Skip the working one
  if (dir === 'indulge-in-luxury-why-the-black-vanilla-set-will-elevate-you') {
    console.log(`Skipping ${dir} - already working`);
    return;
  }

  // Extract data from post object
  const titleMatch = content.match(/"title":\s*"([^"]+)"/);
  const descriptionMatch = content.match(/"excerpt":\s*"([^"]+)"/);
  const slugMatch = content.match(/"slug":\s*"([^"]+)"/);
  const categoryMatch = content.match(/"category":\s*"([^"]+)"/);
  const subcategoryMatch = content.match(/"subcategory":\s*"([^"]+)"/);
  const authorMatch = content.match(/"name":\s*"([^"]+)"/);
  const publishedTimeMatch = content.match(/"date":\s*"([^"]+)"/);

  if (!titleMatch || !descriptionMatch || !slugMatch || !categoryMatch || !subcategoryMatch || !authorMatch || !publishedTimeMatch) {
    console.log(`Skipping ${dir} - missing required data`);
    return;
  }

  const title = titleMatch[1];
  const description = descriptionMatch[1];
  const slug = slugMatch[1];
  const category = categoryMatch[1];
  const subcategory = subcategoryMatch[1];
  const author = authorMatch[1];
  const dateStr = publishedTimeMatch[1];

  // Create slugs for category and subcategory
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const subcategorySlug = subcategory.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // Convert date string to ISO format (approximate)
  const date = new Date(dateStr);
  const publishedTime = date.toISOString();

  const imageUrl = `https://glamsphere.org/hero-images/${slug}.jpg`;

  // Add missing import
  if (!content.includes('import type { BlogPost }')) {
    content = content.replace(
      /import type { Metadata } from "next"/,
      'import type { Metadata } from "next"\nimport type { BlogPost } from "@/lib/blog-data"'
    );
  }

  // Replace entire metadata object
  const newMetadata = `export const metadata: Metadata = {
  "title": "${title.replace(/"/g, '\\"')}",
  "description": "${description.replace(/"/g, '\\"')}",
  "openGraph": {
    "title": "${title.replace(/"/g, '\\"')}",
    "description": "${description.replace(/"/g, '\\"')}",
    "type": "article",
    "publishedTime": "${publishedTime}",
    "authors": [
      "${author.replace(/"/g, '\\"')}"
    ],
    "images": [
      {
        "url": "${imageUrl}",
        "width": 1200,
        "height": 630
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "${title.replace(/"/g, '\\"')}",
    "description": "${description.replace(/"/g, '\\"')}",
    "images": "${imageUrl}"
  }
}`;

  // Find and replace the metadata block
  const metadataRegex = /export const metadata: Metadata = {[\s\S]*?};/;
  content = content.replace(metadataRegex, newMetadata);

  // Remove any remaining malformed image blocks
  content = content.replace(/},\s*"images":\s*\[\s*{\s*"url":\s*"[^"]*",\s*"width":\s*\d+,\s*"height":\s*\d+\s*}\s*\]\s*}/g, '}');
  content = content.replace(/},\s*"images":\s*"[^"]*"\s*}/g, '}');

  // Add content field after excerpt
  content = content.replace(
    /("excerpt":\s*"[^"]*")/,
    '$1,\n  "content": ""'
  );

  // Add categorySlug after category
  content = content.replace(
    /("category":\s*"[^"]*")/,
    '$1,\n  "categorySlug": "' + categorySlug + '"'
  );

  // Add subcategorySlug after subcategory
  content = content.replace(
    /("subcategory":\s*"[^"]*")/,
    '$1,\n  "subcategorySlug": "' + subcategorySlug + '"'
  );

  // Change contentType to as const
  content = content.replace(
    /("contentType":\s*"[^"]*")/,
    '$1 as const'
  );

  // Change template call to use as any
  content = content.replace(
    /<AffiliateProductReviewTemplate post=\{post\} \/>/g,
    '<AffiliateProductReviewTemplate post={post as any} />'
  );

  // Write back
  fs.writeFileSync(pagePath, content);
  console.log(`✓ Fixed ${dir}`);
  fixed++;
});

console.log(`\nScript complete!`);
console.log(`Fixed: ${fixed} files`);
