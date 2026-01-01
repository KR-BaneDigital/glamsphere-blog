const fs = require('fs');
const path = require('path');

console.log('Starting metadata image update script...\n');

// Get all blog directories
const blogDir = path.join(__dirname, '..', 'app', 'blog');
const directories = fs.readdirSync(blogDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Found ${directories.length} blog directories\n`);

let updated = 0;
let skipped = 0;

// Process each blog post
directories.forEach(dir => {
  const pagePath = path.join(blogDir, dir, 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    console.log(`Skipping ${dir} - no page.tsx found`);
    return;
  }

  // Read file content
  let content = fs.readFileSync(pagePath, 'utf8');

  // Extract slug from post object
  const slugMatch = content.match(/"slug":\s*"([^"]+)"/);
  if (!slugMatch) {
    console.log(`Skipping ${dir} - no slug found`);
    return;
  }

  const slug = slugMatch[1];
  const imageUrl = `https://glamsphere.org/hero-images/${slug}.jpg`;

  // Check if images already exist in metadata (specifically in openGraph or twitter)
  const metadataRegex = /export const metadata: Metadata = {([\s\S]*?)};/;
  const metadataMatch = content.match(metadataRegex);
  if (metadataMatch) {
    const metadataContent = metadataMatch[1];
    if (metadataContent.includes('"images"')) {
      console.log(`Skipping ${dir} - images already present in metadata`);
      skipped++;
      return;
    }
  }

  // Add images to openGraph - insert before the closing } of openGraph
  content = content.replace(
    /("authors":\s*\[[^\]]*\])(\s*})/,
    `$1,\n    "images": [\n      {\n        "url": "${imageUrl}",\n        "width": 1200,\n        "height": 630\n      }\n    ]\n  $2`
  );

  // Add images to twitter - insert before the closing } of twitter
  content = content.replace(
    /("description":\s*"[^"]*")(\s*})/,
    `$1,\n    "images": "${imageUrl}"\n  $2`
  );

  // Write back
  fs.writeFileSync(pagePath, content);
  console.log(`✓ Updated ${dir}`);
  updated++;
});

console.log(`\nScript complete!`);
console.log(`Updated: ${updated} files`);
console.log(`Skipped: ${skipped} files`);
console.log(`Total processed: ${updated + skipped}`);
