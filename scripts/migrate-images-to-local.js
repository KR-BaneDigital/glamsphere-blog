const fs = require('fs');
const path = require('path');
const https = require('https');

// Download image from URL and save locally
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const dir = path.dirname(filepath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✅ Downloaded: ${filepath}`);
        resolve(filepath);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Process all blog data files
async function migrateImages() {
  const blogDataDir = path.join(__dirname, '../lib/blog-data');
  const heroImagesDir = path.join(__dirname, '../public/hero-images');
  
  // Create hero-images directory
  if (!fs.existsSync(heroImagesDir)) {
    fs.mkdirSync(heroImagesDir, { recursive: true });
  }

  // Get all .data.ts files
  const files = fs.readdirSync(blogDataDir).filter(f => f.endsWith('.data.ts'));
  
  console.log(`Found ${files.length} blog post files\n`);

  for (const file of files) {
    const filePath = path.join(blogDataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract slug from filename
    const slug = file.replace('.data.ts', '');
    
    // Find image URL in content
    const imageMatch = content.match(/"image":\s*"(https:\/\/m\.media-amazon\.com[^"]+)"/);
    
    if (!imageMatch) {
      console.log(`⏭️  Skipping ${slug} - no Amazon image found`);
      continue;
    }

    const amazonUrl = imageMatch[1];
    const localPath = `/hero-images/${slug}.jpg`;
    const diskPath = path.join(heroImagesDir, `${slug}.jpg`);

    try {
      // Download image
      console.log(`📥 Downloading for ${slug}...`);
      await downloadImage(amazonUrl, diskPath);
      
      // Update file content
      content = content.replace(
        `"image": "${amazonUrl}"`,
        `"image": "${localPath}"`
      );
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✏️  Updated ${file} with local path\n`);
      
    } catch (error) {
      console.error(`❌ Error processing ${slug}:`, error.message);
    }
    
    // Small delay to avoid overwhelming Amazon servers
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n🎉 Migration complete!');
  console.log('\nNext steps:');
  console.log('1. Review the changes: git status');
  console.log('2. Commit: git add . && git commit -m "Migrate to local hero images"');
  console.log('3. Push: git push origin main');
}

// Run migration
migrateImages().catch(console.error);
