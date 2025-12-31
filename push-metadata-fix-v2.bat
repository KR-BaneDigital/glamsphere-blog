@echo off
echo === GLAMSPHERE METADATA FIX V2 ===
echo.
echo Changes:
echo - openGraph.images: object array format with width/height
echo - twitter.images: simplified string array format  
echo - Both use empty array [] instead of undefined
echo.
pause

cd C:\Users\kyle\Downloads\glamsphere-blog

echo.
echo === Adding changes ===
git add app/blog/[slug]/page.tsx

echo.
echo === Committing ===
git commit -m "Fix v2: Use empty arrays and object format for og:image rendering"

echo.
echo === Pushing to GitHub ===
git push origin main

echo.
echo === DONE ===
echo Vercel will auto-deploy in ~2 minutes
echo Then run: node C:\Users\kyle\Downloads\avalon-content-engine\scripts\check-meta-tags.js
pause
